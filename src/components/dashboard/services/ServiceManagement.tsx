import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as MenuTable } from "@/assets/icons/menuCalendar.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { sortServiceTable } from "@/utils/constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManagementTable from "~/reusable/ManagementTable";
import { IServiceManagement } from "~/types/types";
import { columnsservice } from "@/utils/tableColumn";

const ServiceManagement = ({ setChangeTable, data }: IServiceManagement) => {
  const navigate = useNavigate();

  const [sortTable, setSortTable] = useState("All");
  const handleChange = (label: string) => {
    setSortTable(label);
  };
  const handleNavigate = () => {
    navigate("/service/addservice");
  };

  return (
    <Container className="service_management">
      <BackNavigate title={"Service"} />
      <div className="request_header">
        <span>Service Management</span>
        <div className="service_management_div_btn">
          <Button
            variant="contained"
            className="btn cards"
            onClick={() => {
              setChangeTable && setChangeTable(false);
            }}
          >
            <MenuTable />
            Cards View
          </Button>
          <Button variant="contained" className="btn" onClick={handleNavigate}>
            <AddIcon />
            Add new Service
          </Button>
        </div>
      </div>
      <div className="sortServiceTable">
        {sortServiceTable.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleChange(item.label)}
              className={sortTable === item.label ? "activeserv" : ""}
            >
              {item.label}
            </div>
          );
        })}
      </div>
      <ManagementTable columns={columnsservice} data={data} />
    </Container>
  );
};

export default ServiceManagement;
