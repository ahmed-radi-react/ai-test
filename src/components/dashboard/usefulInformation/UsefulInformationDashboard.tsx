import { Container } from "@mui/system";
import { usefulInfoOverview } from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreWhite.svg";
import { ReactComponent as ViewsIcon } from "@/assets/icons/viewsIcon.svg";
import { Button, CircularProgress } from "@mui/material";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import Dropdown from "react-multilevel-dropdown";
import { IUsefulInformationData } from "~/types/types";
import Pagination from "~/reusable/Pagination";
import { queryClient } from "../../../main";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const UsefulInformationDashboard = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const success = (data: IUsefulInformationData[]) => {
    setUsefulInformationData(data);
  };
  const { state } = useLocation();
  const { data, isSuccess, isLoading, refetch } = queryRequest({
    url: `/service-request/useful_info?offset=${currentPage}&limit=6`,
    method: "get",
    key: "useful_info + 10000" + currentPage,
    cb: success,
  });
  const [usefulInformationData, setUsefulInformationData] = useState<
    IUsefulInformationData[]
  >([]);

  const [usefulInformationOverViewReq, setUsefulInformationOverViewReq] =
    useState(usefulInfoOverview);
  useEffect(() => {
    if (isSuccess) {
      setUsefulInformationOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data,
        })
      );
    }
  }, [isSuccess]);

  const navigate = useNavigate();
  const [hideMessageReq, setHideMessageReq] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (state?.data === "success") {
      setHideMessageReq(true);
    }
    time = setTimeout(() => {
      setHideMessageReq(false);
    }, 3000);
    window.history.replaceState({}, document.title);
    return () => {
      clearTimeout(time);
    };
  }, [state?.data]);
  const [noticesID, setNoticesId] = useState("");

  const {
    mutate: {
      mutate: deleteNoticeRequest,
      isSuccess: deleteNoticeRequestIsSuccess,
    },
  } = mutationRequest({
    url: `/service-request/notices/${noticesID}`,
    method: "delete",
    isAuth: true,
  });

  const handleDelete = () => {
    deleteNoticeRequest(
      {
        id: noticesID,
      },
      {
        onSuccess: () => {
          // queryClient.invalidateQueries([`noticeKey + ${data}`]);
          refetch();
        },
      }
    );
  };

  if (!isLoading) {
    return (
      <>
        {hideMessageReq && (
          <div className="content content_alert">
            <MessageAlert
              messagesort={{
                icon: CongratsIcon,
                message: "UsefulInfo has been added Successfully",
                title: "Done",
                style: "done usefulInfo",
              }}
            />
          </div>
        )}
        <Container className="usefulInfo_dashboard">
          <div className="usefulInfo_dashboard__header">
            <h2 className="usefulInfo_title">Useful Information</h2>
            <div className="button_container">
              {/* <Button className="btn_save">
              Save Tenant
            </Button> */}
              <Button
                className="btn_add usefulInfo"
                onClick={() => navigate("addusefulinformation")}
                style={{ width: "max-content" }}
              >
                <AddIcon />
                Add Useful Information
              </Button>
            </div>
          </div>
          <Overview
            title={"Useful Information"}
            data={usefulInformationOverViewReq}
          />
          <div className="usefulInfo_header">
            <span className="span_usefulInfo">Useful Information</span>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              data={data}
              limit={6}
            />
          </div>
          <div className="usefulInfo_divs">
            {usefulInformationData?.map((item) => {
              return (
                <div key={item._id} className="usefulInfo_item">
                  <div className="image_div">
                    <div className="opacity_div"></div>
                    {item?.images && (
                      <img src={item?.images[0]?.url} alt="usefulInfo image" />
                    )}

                    <Dropdown
                      title={<MoreIcon />}
                      buttonClassName="button_dropdown_list_multi_levels_home_usefulInfo"
                      menuClassName="menu_dropdown_list_multi_levels_home_usefulInfo"
                      position="left"
                      wrapperClassName="wrapper_usefulInfo_dropdown"
                      onClick={() => setNoticesId(item._id)}
                    >
                      <Dropdown.Item onClick={handleDelete}>
                        Delete information
                      </Dropdown.Item>
                    </Dropdown>
                    <span>
                      {moment(item?.scheduleDateFrom).format("ddd MMM DD")}{" "}
                    </span>
                  </div>
                  <div className="info_div">
                    <div className="description_div">
                      <span className="span_desc">{item.title}</span>
                      <div>
                        <ViewsIcon />
                        <span>{item.views} views</span>
                      </div>
                    </div>
                    <span className="detail">{item.description}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default UsefulInformationDashboard;
