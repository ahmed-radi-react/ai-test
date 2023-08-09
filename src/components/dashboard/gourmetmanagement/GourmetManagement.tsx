import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container } from "@mui/material";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import Overview from "~/reusable/Overview";
import { GourmetManagmentdata, IOverview, amenitiesOverview } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreWhite.svg";
import { ReactComponent as ViewsIcon } from "@/assets/icons/viewsIcon.svg";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

type Props = {
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
};

const GourmetManagement = ({ setSetting }: Props) => {
  const navigate = useNavigate();

  const [gourmetOverViewReq, setGourmetOverViewReq] =
    useState<IOverview[]>(amenitiesOverview);

  useEffect(() => {
    setGourmetOverViewReq((prev: IOverview[]) =>
      StatusCounterCard({
        prev,
        data: GourmetManagmentdata, // need correct data
      })
    );
  }, []);

  if (!false) {
    return (
      <Container className="gourmet">
        <div className="gourmet_header">
          <span className="header_span">Gourmet Management</span>
          <div className="btn">
            <Button
              variant="contained"
              className="setting_btn"
              onClick={() => setSetting(false)}
            >
              <SettingsIcon />
              Setting
            </Button>
            <Button
              variant="contained"
              className="_add_amenity"
              onClick={() => navigate("addwebsite")}
            >
              {/* <AmenitiesSvg /> */}
              Add Website
            </Button>
          </div>
        </div>
        {/* {amenitiesData && (
          <List
            data={amenitiesData}
            addbutton={"Add New Amenity"}
            showAll={"Show All Amenities"}
            addNavigate={"addamenity"}
            showNavigate={"amenitieslist"}
          />
        )} */}
        <Overview title={"Gourmet Management"} data={gourmetOverViewReq} />
        <div className="gourmet_header">
          <span className="span_gourmet">Gourmet Website</span>
          {/* <div className="pagination">
            <Button className="btn">
              <LeftIcon />
            </Button>
            <span> 01/{noticeData?.length}</span>
            <Button className="btn">
              <RightIcon />
            </Button>
          </div> */}
        </div>
        <div className="gourmet_divs">
          {GourmetManagmentdata?.data.items?.map((item) => {
            return (
              <div key={item._id} className="notice_item">
                <div className="image_div">
                  <div className="opacity_div"></div>
                  {item?.images && (
                    <img src={item?.images[0]?.url} alt="notices image" />
                  )}
                  <MoreIcon />
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
        {/* <DashboardChart title={"Amenities"} /> */}
        {/* {!!open && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog open={open} className="dialog_request">
          <DialogContent>
            <RequestDialog data={amenitiesData?.items} title={"Amenities"} />
          </DialogContent>
        </Dialog> */}
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default GourmetManagement;
