import { Button } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { queryRequest } from "@/requests-body/queries";
import BackNavigate from "~/reusable/BackNavigate";
import { ITenant } from "~/types/types";
import TenantsTable from "./TenantsTable";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import MessageAlert from "~/reusable/MessageAlert";
import BuildingCarousel from "~/reusable/carousel/BuildingCarousel";
interface IbuidlingData {
  _id: string;
  name?: string;
  images?: { url?: string }[];
  code: string;
}

const TenantsList = () => {
  const [searchVal, setSearchVal] = useState("");
  const [selectBuilding, setSelectBuilding] = useState("0");
  const { state } = useLocation();
  const [tenantTable, setTenantTable] = useState<ITenant[]>([]);
  const [filteredData, setFilteredData] = useState<ITenant[]>([]);
  const [pending, setPending] = useState("tenant");
  const [pendingCount, setpendingCount] = useState<number>(0);
  const { data, isSuccess, isLoading } = queryRequest({
    url: `/tenant?offset=0&limit=10000${
      selectBuilding.length > 2 ? `&buildingId=${selectBuilding}` : ""
    }${searchVal.length ? `&searchKey=${searchVal}` : ""}`,
    method: "get",
    key: "requestKey" + state?.data + selectBuilding + searchVal,
  });
  useEffect(() => {
    if (isSuccess) {
      const filteredItems = data?.data?.items.filter(
        (item: { status: string }) => {
          return pending === "tenant"
            ? item.status === "active"
            : item.status !== "active";
        }
      );

      setpendingCount(filteredItems?.length);
      setTenantTable(filteredItems);
      setFilteredData(filteredItems);
    }

    setChangeData(!changeData);
  }, [isSuccess, pending, data?.data]);

  const { data: building, isSuccess: isSuccessBuilding } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });
  const [buidlingData, setBuildingData] = useState<IbuidlingData[]>([]);
  useEffect(() => {
    if (isSuccessBuilding) {
      setBuildingData([{ name: "All", _id: "0" }, ...building?.data?.items]);
    }
  }, [isSuccessBuilding]);

  const navigate = useNavigate();
  const [changeData, setChangeData] = useState(false);
  const [sortedData, setSortedData] = useState<any[]>([]);
  useEffect(() => {
    const array = tenantTable?.map((item: any) => {
      return [item.buildings[0]?._id, item.buildings[0]?.name];
    });
    const result = [...new Set(array)].reduce((obj: any, itemobj) => {
      const sortreqdata = tenantTable?.filter((item: any) => {
        return item.buildings[0]?._id === itemobj;
      });
      obj.push({ id: itemobj[0], data: sortreqdata, name: itemobj[1] });
      return obj;
    }, []);
    setSortedData(result);
  }, [changeData]);
  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });
  const [hideMessage, setHideMessage] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (state?.data === "success") {
      setMessageSort({
        icon: CongratsIcon,
        message: `${state?.message} has been added Successfully`,
        title: "Done",
        style: "done",
      });
      setHideMessage(true);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    window.history.replaceState({}, document.title);
    return () => {
      clearTimeout(time);
    };
  }, [state?.data]);

  return (
    <>
      {" "}
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      <Container className="tenantstable">
        <BackNavigate title={"Tenants"} />
        <div className="tableHeader">
          <div className="headerdiv">
            <div
              className={`tenantspan ${pending === "tenant" ? "active" : ""}`}
              onClick={() => setPending("tenant")}
            >
              Tenants
            </div>
            <div
              className={`pendingspan ${pending === "pending" ? "active" : ""}`}
              onClick={() => setPending("pending")}
            >
              Pending Tenants
              <div>{pendingCount}</div>
            </div>
          </div>
          <Button
            variant="contained"
            className="addbtn"
            onClick={() => {
              navigate("/tenants/addtenant");
            }}
          >
            <AddIcon />
            Add New Tenant
          </Button>
        </div>
        <BuildingCarousel
          selectBuilding={selectBuilding}
          setSelectBuilding={setSelectBuilding}
        />

        <TenantsTable
          isLoading={isLoading}
          tenantTable={tenantTable}
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          pending={pending}
          setSearchVal={setSearchVal}
        />
      </Container>
    </>
  );
};

export default TenantsList;
