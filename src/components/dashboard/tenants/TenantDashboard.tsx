import { Button, CircularProgress, Container } from "@mui/material";
import { ReactComponent as AmenitiesSvg } from "@/assets/icons/amenities.svg";
import List from "~/reusable/List";
import { queryRequest } from "@/requests-body/queries";
import { useEffect, useState } from "react";
import Overview from "~/reusable/Overview";
import { IOverview, maintenanceOverview } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const TenantDashboard = () => {
  const navigate = useNavigate();

  const { data, isSuccess, isLoading } = queryRequest({
    url: "/tenant?offset=0&limit=10000",
    method: "get",
    key: "tenantKey",
  });
  const [tenant, setTenant] = useState();
  const [tenantOverViewReq, setTenantOverViewReq] =
    useState<IOverview[]>(maintenanceOverview);

  useEffect(() => {
    if (isSuccess) {
      setTenant(data?.data);
    }
    setTenantOverViewReq((prev: IOverview[]) =>
      StatusCounterCard({
        prev,
        data,
      })
    );
  }, [isSuccess, data?.data]);

  if (!isLoading) {
    return (
      <Container className="amenities tenant">
        <div className="amenities_header tenant">
          <span className="header_span">Tenants</span>
          <div className="btn">
            {/* <Button variant="contained" className="setting_btn">
              <SettingsIcon />
              Setting
            </Button> */}

            <Button
              variant="contained"
              className="_add_amenity add_tenant"
              onClick={() => navigate("addtenant")}
            >
              <AmenitiesSvg />
              Add New Tenants
            </Button>
          </div>
        </div>
        {tenant && (
          <List
            data={tenant}
            addbutton={"Add Tenants"}
            showAll={"Show All Buildings"}
            addNavigate={"addtenant"}
            showNavigate={"tenantbuilding"}
          />
        )}
        <Overview title={"Tenants"} data={tenantOverViewReq} />
        {/* <DashboardChart title={"Tenants"} /> */}
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default TenantDashboard;
