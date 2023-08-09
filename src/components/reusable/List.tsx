import { Box, Button } from "@mui/material";
import { ReactComponent as AddItemIcon } from "@/assets/icons/addlist.svg";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreicon.svg";
import { useNavigate } from "react-router-dom";
import amenityImage from "@/assets/images/dropimage.png";
import { IList } from "~/types/types";

const List = ({
  data,
  addbutton,
  showAll,
  addNavigate,
  showNavigate,
}: IList) => {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(addNavigate);
  const handleClickNavigate = () => navigate(showNavigate);

  return (
    <Box display={"flex"} gap="22px" className="list_box">
      <div className="add_div">
        <Button
          variant="contained"
          className="btn_additem"
          onClick={handleNavigate}
        >
          <AddItemIcon />
        </Button>
        <span className="span_add">{addbutton}</span>
      </div>
      {data?.items &&
        data?.items.map((item, index: number) => {
          if (index <= 2) {
            return (
              <div key={index} className="list_item">
                <div className="list_div">
                  {!(
                    location.pathname.includes("service") ||
                    location.pathname.includes("properties")
                  ) ? (
                    item?.images && item?.images[0] ? (
                      <img
                        src={
                          item?.images[0]?.url ||
                          item?.icon?.url ||
                          item.icon?.url ||
                          amenityImage
                        }
                        alt="list image"
                      />
                    ) : (
                      <img src={item?.image?.url} alt="tenant" />
                    )
                  ) : (
                    <img src={item?.icon?.url} alt="list image" />
                  )}
                </div>
                <div className="list_item_req_count">
                  <span className="itemLabel">
                    {item.name || item?.firstName}
                  </span>
                  <div className="req_count">
                    <span>{item?.numberOfRequests}</span>
                  </div>
                </div>
              </div>
            );
          }
        })}
      {/* {data.count === 3 && ( */}
      <div className="show_more">
        <Button className="show_btn" onClick={handleClickNavigate}>
          <MoreIcon />
        </Button>
        <span className="show_span">{showAll}</span>
      </div>
      {/* )} */}
    </Box>
  );
};

export default List;
