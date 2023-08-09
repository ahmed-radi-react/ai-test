import { Button, CircularProgress, Dialog, DialogContent } from "@mui/material";
import { Container } from "@mui/system";
import Overview from "~/reusable/Overview";
import { IOverview, bellboyOverview } from "@/utils/constant";
import BellboyDashboardTable from "./BellboyDashboardTable";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreicon.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/message.svg";
import { ReactComponent as CallIcon } from "@/assets/icons/CallIcon.svg";
import { useEffect, useState } from "react";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { queryRequest } from "@/requests-body/queries";
import BellboyDialog from "./BellboyDialog";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { IBellboyList } from "~/types/types";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const BellboyDashboard = () => {
  const [open, setOpen] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);

  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const [showList, setShowList] = useState(false);
  const [bellboyList, setBellboyList] = useState<IBellboyList[]>([]);
  const { data, isSuccess, isLoading } = queryRequest({
    url: `/service-actor?serviceFlow=bellboy&offset=0&limit=100`,
    method: "get",
    key: "requestBellboyKey",
  });

  const { data: bellboyReq, isSuccess: bellboyReqIsSuccess } = queryRequest({
    url: "/service-request/bellboy?offset=0&limit=10000",
    method: "get",
    key: "bellboy + 1000",
  });
  const [bellboyOverViewReq, setBellboyOverViewReq] =
    useState<IOverview[]>(bellboyOverview);
  useEffect(() => {
    if (bellboyReqIsSuccess) {
      setBellboyOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data: bellboyReq,
        })
      );
    }
  }, [bellboyReqIsSuccess]);
  useEffect(() => {
    if (isSuccess) {
      setBellboyList(data?.data?.items);
    }
  }, [isSuccess, data?.data]);

  if (!isLoading) {
    return (
      <>
        {hideMessage && (
          <div className="content content_alert">
            <MessageAlert messagesort={messagesort} />
          </div>
        )}

        <Container className="bellboy_dashboard">
          <div className="header">
            <div className="text_div">
              <div onClick={() => setShowList(false)}>
                <span className={showList ? "active" : ""}>Bellboy </span>
              </div>
              <div onClick={() => setShowList(true)}>
                <span className={!showList ? "active" : ""}>
                  Show Bellboys List
                </span>
              </div>
            </div>
            <div className="btn_div_">
              {/* {!showList && (
                <Button variant="contained" className="btn">
                  <SettingsIcon />
                  Setting
                </Button>
              )} */}
              <Button
                variant="contained"
                className="btn btnReq"
                onClick={handleOpen}
              >
                <AddIcon />
                Add Bellboy Request
              </Button>
              {/* {!showList && (
                <Button variant="contained" className="btn">
                  <VisitorsIcon />
                  Add New Bellboy
                </Button>
              )} */}
            </div>
          </div>
          {!showList ? (
            <div>
              {" "}
              <Overview title={"Bellboy"} data={bellboyOverViewReq} />
              <div className="bellboy_req_div">
                <div className="title_div">
                  <span>Bellboy requests</span>
                  <div>{bellboyOverViewReq[0]?.taskNumber}</div>
                </div>
                {/* <Button variant="contained" className="btn">
                  See All Requests
                </Button> */}
              </div>
              <BellboyDashboardTable />
            </div>
          ) : (
            <div className="cards">
              {bellboyList?.map((item) => {
                return (
                  <div key={item._id} className="card">
                    <MoreIcon className="more" />
                    <div className="img_div">
                      {item?.image?.url && (
                        <img src={item?.image.url} alt="bellboy item image" />
                      )}
                      <div className="active">
                        <div></div>
                      </div>
                    </div>
                    <span className="name">{item.firstName}</span>
                    <div className="req_div">
                      <span>{item.numberOfNotifications} Ongoing Requests</span>
                    </div>
                    <div className="btn_div">
                      <Button variant="contained" className="btn">
                        <MessageIcon />
                        Message
                      </Button>
                      <Button variant="contained" className="btn">
                        <CallIcon />
                        Call Ali
                      </Button>
                    </div>
                  </div>
                );
              })}
              {/* <Button variant="contained" className="addbellboy">
                <AddIcon />
                Add New Bellboy
              </Button> */}
            </div>
          )}
          {!!open && (
            <div className="close" onClick={handleClose}>
              <Elipse />
              <CloseIcon />
            </div>
          )}
          <Dialog open={open} className="bellboy_req" onClose={handleClose}>
            <DialogContent className="bellboy_req">
              <BellboyDialog
                setOpen={setOpen}
                setMessageSort={setMessageSort}
                setHideMessage={setHideMessage}
              />
            </DialogContent>
          </Dialog>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default BellboyDashboard;
