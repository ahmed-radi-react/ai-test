import { Button, CircularProgress, Container } from "@mui/material";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import Overview from "~/reusable/Overview";
import { IOverview, amenitiesOverview } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { queryRequest } from "@/requests-body/queries";
import { useEffect, useState } from "react";
import List from "~/reusable/List";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const ServicesDashboard = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/services/servicemanagement");
  };
  const { data, isSuccess, isLoading } = queryRequest({
    url: "/service?offset=0&limit=10000",
    method: "get",
    key: "serviceKey",
  });
  const [serviceData, setServiceData] = useState();
  const [servicesOverViewReq, setServicesOverViewReq] =
    useState<IOverview[]>(amenitiesOverview);
  useEffect(() => {
    if (isSuccess) {
      setServiceData(data?.data);
    }

    setServicesOverViewReq((prev: IOverview[]) =>
      StatusCounterCard({
        prev,
        data,
      })
    );
  }, [isSuccess]);

  if (!isLoading) {
    return (
      <Container className="service_dashboard">
        <div className="service_dashboard_header">
          <span className="header_service">Services</span>
          <div className="btn">
            <Button variant="contained" className="setting_btn">
              <SettingsIcon />
              Setting
            </Button>
            <Button
              variant="contained"
              className="add_btn"
              onClick={handleNavigate}
            >
              <AddIcon />
              Add New Service
            </Button>
          </div>
        </div>
        {serviceData && (
          <List
            data={serviceData}
            addbutton={"Add Service"}
            showAll={"Show All Services"}
            addNavigate={"/service/addservice"}
            showNavigate={"serviceslist"}
          />
        )}
        <Overview title={"Services Overview"} data={servicesOverViewReq} />
        {/* <DashboardChart title={"Services Overview"} /> */}
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default ServicesDashboard;
