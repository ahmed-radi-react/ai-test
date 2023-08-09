import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { queryRequest } from "@/requests-body/queries";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";
import { otherPropertiesOverview } from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as OtherPropertiesIcon } from "@/assets/icons/OtherPropertiesIconWhite.svg";
import OtherPropertiesTableRequest from "./propertyTable/OtherPropertiesTableRequest";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { IOtherProperties } from "~/types/types";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";
import ContentContextProvider from "@/context/OtherPropertiesContext";

const OtherProperties = ({ setSetting }: IOtherProperties) => {
  const [serviceSearch, _] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const {
    data: otherPropertiesReq,
    isSuccess: otherPropertiesReqIsSuccess,
    isLoading,
  } = queryRequest({
    url: `/service-request/other_properties?offset=0&limit=100&searchKey=${serviceSearch}`,
    method: "get",
    key: `other_propertyKey`,
  });
  const [otherPropertiesOverViewReq, setOtherPropertiesOverViewReq] = useState(
    otherPropertiesOverview
  );
  useEffect(() => {
    if (otherPropertiesReqIsSuccess) {
      setOtherPropertiesOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data: otherPropertiesReq,
        })
      );
    }
  }, [otherPropertiesReqIsSuccess]);

  const handleClick = () => {
    setSetting(false);
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleNavigate = () => navigate("otherpropertiestablerequest");
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
  if (!isLoading) {
    return (
      <>
        {hideMessageReq && (
          <div className="content content_alert">
            <MessageAlert
              messagesort={{
                icon: CongratsIcon,
                message: "Notice has been added Successfully",
                title: "Done",
                style: "done notice",
              }}
            />
          </div>
        )}
        <Container className="other_properties">
          <div className="properties_header">
            <span className="header_span">Other Properties</span>
            <div className="btn">
              <Button
                variant="contained"
                className="setting_btn"
                onClick={handleClick}
              >
                <SettingsIcon />
                Setting
              </Button>

              <Button
                variant="contained"
                className="_add_other_properties"
                onClick={() => navigate("addotherproperties")}
              >
                <OtherPropertiesIcon />
                Add New Property
              </Button>
            </div>
          </div>
          <Overview
            title={"Other Properties"}
            data={otherPropertiesOverViewReq}
          />
          <div className="pending_latest_properties">
            <div className="latest_span_div">
              <span>Properties Requests</span>
              <div>05</div>
            </div>
            <Button
              variant="contained"
              className="see_all_btn"
              onClick={handleNavigate}
            >
              See All Requests
            </Button>
          </div>
          <ContentContextProvider>
            <OtherPropertiesTableRequest isDashboard={true} />
          </ContentContextProvider>
          {!!open && (
            <div className="close" onClick={handleClose}>
              <Elipse />
              <CloseIcon />
            </div>
          )}
          <Dialog open={open} className="dialog_request">
            <DialogContent>
              {/* <RequestDialog data={amenitiesData?.items} title={"Other Properties"} url={"amenity"}/> */}
            </DialogContent>
          </Dialog>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default OtherProperties;
