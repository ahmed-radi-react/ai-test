import { Button, Dialog, DialogContent } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { visitorsOverview } from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import VisitorRequestDialog from "./VisitorRequestDialog";
import MessageAlert from "~/reusable/MessageAlert";
import AddVisitorsRequests from "./AddVisitorsRequests";
import { queryRequest } from "@/requests-body/queries";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";
import ContentContextParcelProvider, {
  ContentContext,
} from "@/context/ParcelContext";

const VisitorsDashboard = () => {
  const { data: visitorRequestData, isSuccess } = queryRequest({
    url: `/service-request/visitor?offset=0&limit=10000`,
    method: "get",
    key: "requestKeyVisitor",
  });
  const [visitorsOverViewReq, setVisitorsOverViewReq] =
    useState(visitorsOverview);

  const { messagesort, handleShowAlert, hideMessage }: any =
    useContext(ContentContext);
  useEffect(() => {
    if (isSuccess) {
      setVisitorsOverViewReq((prev: any) =>
        StatusCounterCard({
          prev,
          data: visitorRequestData,
        })
      );
    }
  }, [isSuccess]);

  const [pendingCount, setPendingCount] = useState(0);
  useEffect(() => {
    if (isSuccess) {
      const number = visitorRequestData?.data?.items.filter(
        (item: any) => item.status === "pending"
      ).length;
      setPendingCount(number);
    }
  }, [isSuccess]);
  const navigate = useNavigate();
  const handleNavigate = () => navigate("visitorsrequests");
  const [openVisitor, setOpenVisitor] = useState(false);
  const handleClose = () => {
    setOpenVisitor(false);
  };
  const handleAddRequest = () => {
    setOpenVisitor(true);
  };

  const [open, setOpen] = useState(false);
  const [visitorOTP, setVisitorOTP] = useState("");
  return (
    <>
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      <Container className="visitors">
        <div className="visitors_header">
          <span className="visitors_span">Visitors</span>
          <div className="btn">
            <Button
              variant="contained"
              className="button_visitors add "
              onClick={handleAddRequest}
            >
              <AddIcon />
              Add Visitor Request
            </Button>
          </div>
        </div>
        <Overview title={"Visitors "} data={visitorsOverViewReq} />
        <div className="pending_latest_visitor">
          <div className="latest_span_div">
            <span>Latest pending visitors requests</span>
            <div>{pendingCount}</div>
          </div>
          <Button
            variant="contained"
            className="see_all_btn"
            onClick={() => setOpen((prev) => !prev)}
          >
            Verify Visitor
          </Button>
        </div>
        <ContentContextParcelProvider>
          <AddVisitorsRequests open={open} setOpen={setOpen} visitorOTP={visitorOTP} setVisitorOTP={setVisitorOTP} />
        </ContentContextParcelProvider>
        {!!openVisitor && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog open={openVisitor} className="action" onClose={handleClose}>
          <DialogContent>
            <VisitorRequestDialog
              handleClose={handleClose}
              handleShowAlert={handleShowAlert}
              setOpenVisitor={setOpenVisitor}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default VisitorsDashboard;
