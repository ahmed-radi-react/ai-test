import { Button, Container, Dialog } from "@mui/material";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { sortServiceTable } from "@/utils/constant";
import { useState } from "react";
import ManagementTable from "~/reusable/ManagementTable";
import AddNewUserDialog from "./AddNewUserDialog";
import { columnsUser } from "@/utils/tableColumn";
import { queryRequest } from "@/requests-body/queries";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import BuildingCarousel from "~/reusable/carousel/BuildingCarousel";

const UserManagement = () => {
  const [selectBuilding, setSelectBuilding] = useState("0");
  const [searchVal, setSearchVal] = useState("");
  const { data, isLoading } = queryRequest({
    url: `/user?offset=0&limit=10000${
      searchVal.length ? `&searchKey=${searchVal}` : ""
    }${selectBuilding.length > 2 ? `&buildingId=${selectBuilding}` : ""}`,
    method: "get",
    key: "amenitieskeyreq" + searchVal + selectBuilding,
  });
  const [sortTable, setSortTable] = useState("All");
  const handleChange = (label: string) => {
    setSortTable(label);
  };

  const [openContent, setOpenContent] = useState(false);

  const handleOpenDialog = () => {
    setOpenContent(true);
  };
  const handleCloseDialog = () => {
    setOpenContent(false);
  };
  return (
    <Container className="usermanagement_conatiner">
      <BackNavigate title={"Home"} />
      <div className="request_header">
        <span>User Management</span>
        <Button variant="contained" className="btn" onClick={handleOpenDialog}>
          <AddIcon />
          Add new User
        </Button>
      </div>
      <BuildingCarousel
        selectBuilding={selectBuilding}
        setSelectBuilding={setSelectBuilding}
      />
      <ManagementTable
        columns={columnsUser}
        classname={"management_user_table"}
        data={data?.data?.items}
        setSearchVal={setSearchVal}
        isLoading={isLoading}
      />
      {!!openContent && (
        <div className="close" onClick={handleCloseDialog}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog open={openContent} onClose={handleCloseDialog} className="action">
        <AddNewUserDialog />
      </Dialog>
    </Container>
  );
};

export default UserManagement;
