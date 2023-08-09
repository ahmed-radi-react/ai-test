import { Button, Dialog, DialogContent } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import Overview from "~/reusable/Overview";
import { ValetOverview } from "@/utils/constant";
import ValetDashboardTable from "./ValetDashboardTable";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import ValetDialog from "./ValetDialog";
import MessageAlert from "~/reusable/MessageAlert";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const ValetDashboard = () => {
  const [hideMessage, setHideMessage] = useState(false);
  const [messagesort, setMessageSort] = useState({
    //Car link has been copied
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });
  const navigate = useNavigate();
  const handleNavigate = () => navigate("valetrequests");
  const {
    data: valetOverviewReq,
    isSuccess: valetOverviewReqIsSuccess,
    isLoading,
  } = queryRequest({
    url: `/service-request/valet?offset=0&limit=100`,
    method: "get",
    key: `valetKey`,
  });
  const [ValetOverviewReq, setValetOverViewReq] = useState(ValetOverview);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (valetOverviewReqIsSuccess) {
      setValetOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data: valetOverviewReq,
        })
      );
    }
  }, [valetOverviewReqIsSuccess]);
  return (
    <div>
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      <Container className="valet_dashboard">
        <div className="header">
          <span className="valet_header">Valet</span>
          <div className="btn">
            <Button variant="contained" className="button_valet setting">
              <SettingsIcon />
              Setting
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              className="button_valet add "
            >
              <AddIcon />
              Add Valet Request
            </Button>
            {/* <Button variant="contained" className="button_valet valet">
              <VisitorsIcon />
              Add New Valet
            </Button> */}
          </div>
        </div>
        <Overview title={"Visitors"} data={ValetOverviewReq} />
        <div className="pending_latest_valet">
          <div className="latest_span_div">
            <span>Latest Valet Requests</span>
            <div>{valetOverviewReq?.data?.count}</div>
          </div>
          <Button
            variant="contained"
            className="see_all_btn"
            onClick={handleNavigate}
          >
            See All Requests
          </Button>
        </div>
        <ValetDashboardTable
          setHideMessage={setHideMessage}
          url={"valet?offset=0&limit=7"}
          setMessageSort={setMessageSort}
          hideMessage={hideMessage}
        />
        {!!open && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog open={open} className="bellboy_req" onClose={handleClose}>
          <DialogContent className="bellboy_req">
            <ValetDialog
              setOpen={setOpen}
              setMessageSort={setMessageSort}
              setHideMessage={setHideMessage}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
};

export default ValetDashboard;
