import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, CircularProgress, Container } from "@mui/material";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import List from "~/reusable/List";
import Overview from "~/reusable/Overview";
import { IOverview, buildingsOverview } from "@/utils/constant";
import { queryRequest } from "@/requests-body/queries";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

type Props = {};

function BuildingDashboard({}: Props) {
  const navigate = useNavigate();
  const [buildingData, setBuildingData] = useState<{
    items: {
      label: string;
      images: { url?: string }[];
      name: string;
      icon: { url: string };
    }[];
    count: number;
  }>();
  const { data, isSuccess, isLoading } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });
  const [buildingOverViewReq, setBuildingOverViewReq] =
    useState<IOverview[]>(buildingsOverview);
  useEffect(() => {
    if (isSuccess) {
      setBuildingData(data?.data);
    }
    setBuildingOverViewReq((prev) =>
      StatusCounterCard({
        prev,
        data,
      })
    );
  }, [isSuccess, data?.data]);

  if (!isLoading) {
    return (
      <Container className="building">
        <div className="building_header">
          <span className="header_span">Buildings</span>
          <div className="btn">
            {/* <Button
              variant="contained"
              className="setting_btn"
            // onClick={handleClick}
            >
              <SettingsIcon />
              Setting
            </Button> */}
            <Button
              variant="contained"
              className="add_btn"
              onClick={() => navigate("addbuilding")}
            >
              <AddIcon />
              Add New Building
            </Button>
          </div>
        </div>
        {true && (
          <List
            data={buildingData}
            addbutton={"Add Building"}
            showAll={"Show All Building"}
            addNavigate={"addbuilding"}
            showNavigate={"buildinglist"}
          />
        )}
        <Overview title={"Buildings "} data={buildingOverViewReq} />

        {/* <DashboardChart title={"Buildings "} /> */}
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
}

export default BuildingDashboard;
