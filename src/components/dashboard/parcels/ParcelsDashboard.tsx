import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";
import { IOverview, parcelsOverview } from "@/utils/constant";
import Overview from "~/reusable/Overview";
import RequestDialog from "~/reusable/RequestDialog";
import { useEffect, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { useNavigate } from "react-router-dom";
import ParcelManagementTable from "./ParcelManagementTable";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";
import ContentContextParcelProvider from "@/context/ParcelContext";

export interface IsetSetting {
  setSetting: (value: boolean) => void;
  parcelData: any;
  setParcelData: any;
}
const ParcelsDashboard = ({ setSetting, setParcelData }: IsetSetting) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const { data, isSuccess, isLoading } = queryRequest({
    url: "/service-request/parcels?offset=0&limit=10000",
    method: "get",
    key: "parcelkey",
  });

  const [parcelsOverViewReq, setParcelsOverViewReq] =
    useState<IOverview[]>(parcelsOverview);

  useEffect(() => {
    if (isSuccess) {
      setParcelData(data?.data);
      setParcelsOverViewReq((prev: IOverview[]) =>
        StatusCounterCard({
          prev,
          data,
        })
      );
    }
  }, [isSuccess, data?.data]);

  const handleClick = () => {
    setSetting(false);
  };

  const navigate = useNavigate();

  if (!isLoading) {
    return (
      <Container className="parcels">
        <div className="parcels_header">
          <span className="header_span">Parcels</span>
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
              className="add_btn"
              onClick={() => navigate("addparcels")}
            >
              <AddIcon />
              Add Parcel Request
            </Button>
          </div>
        </div>
        <Overview title={"Parcels"} data={parcelsOverViewReq} />
        <div className="pending_latest_visitor">
          <div className="latest_span_div"></div>
          <Button
            variant="contained"
            className="see_all_btn"
            onClick={() => navigate("/parcels/management")}
          >
            See All Requests
          </Button>
        </div>
        <div className="table_container_r_padding">
          <ContentContextParcelProvider>
            <ParcelManagementTable isDashboard={true} />
          </ContentContextParcelProvider>
        </div>
        <Dialog open={open} onClose={handleClose} className="dialog_request">
          <DialogContent>
            <RequestDialog title={"Parcels"} />
          </DialogContent>
        </Dialog>
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default ParcelsDashboard;
