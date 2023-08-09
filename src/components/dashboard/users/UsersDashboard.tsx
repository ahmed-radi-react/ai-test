import { Button, CircularProgress, Container } from "@mui/material";
import { useEffect, useState } from "react";
import List from "~/reusable/List";
import { queryRequest } from "@/requests-body/queries";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as UserIcon } from "@/assets/icons/userpageIcon.svg";
import Overview from "~/reusable/Overview";
import { IOverview, buildingsOverview } from "@/utils/constant";
import { useNavigate } from "react-router-dom";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";

const UsersDashboard = () => {
  const navigate = useNavigate();
  const [usersBuildingData, setUsersBuildingData] = useState<{
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

  const [userOverViewReq, setUserOverViewReq] =
    useState<IOverview[]>(buildingsOverview);

  useEffect(() => {
    if (isSuccess) {
      setUsersBuildingData(data?.data);
    }
    setUserOverViewReq((prev: IOverview[]) =>
      StatusCounterCard({
        prev,
        data,
      })
    );
  }, [isSuccess, data?.data]);

  if (!isLoading) {
    return (
      <Container className="user_page_container">
        <div className="user_page_header">
          <span className="header_span">Users</span>
          <div className="btn">
            <Button variant="contained" className="setting_btn">
              <SettingsIcon />
              Setting
            </Button>
            <Button
              variant="contained"
              className="_add_user"
              onClick={() => navigate("/users/adduser")}
            >
              <UserIcon />
              Add New User
            </Button>
          </div>
        </div>
        {true && (
          <List
            data={usersBuildingData}
            addbutton={"Add user"}
            showAll={"Show All users"}
            addNavigate={"adduser"}
            showNavigate={"usermanagement"}
          />
        )}
        <Overview title={"Users "} data={userOverViewReq} />
      </Container>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default UsersDashboard;
