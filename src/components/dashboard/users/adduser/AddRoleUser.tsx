import { Checkbox, FormControlLabel } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { ReactComponent as Checkbtn } from "@/assets/icons/checkbtn.svg";
import { queryRequest } from "@/requests-body/queries";

interface SelectedState {
  servicesIds: string[];
  buildingsIds: string[];
  roleId: string;
}
interface ServiceData {
  _id: string;
  name: string;
}

interface BuildingData {
  _id: string;
  name: string;
}

interface Role {
  _id: string;
  name: string;
}
interface IAddRole {
  selected: SelectedState;
  setSelected: Dispatch<SetStateAction<SelectedState>>;
}
interface SelectedState {
  servicesIds: string[];
  buildingsIds: string[];
  roleId: string;
}

const AddRoleUser = ({ selected, setSelected }: IAddRole) => {
  const successService = (data: []) => {
    setServiceData(data);
  };

  const { isLoading } = queryRequest({
    url: "/service?offset=0&limit=10000",
    method: "get",
    key: "serviceKey",
    cb: successService
  });

  const { data, isSuccess } = queryRequest({url: "/role", method: "get", key: "role"});

  useEffect(() => {
    if (isSuccess) {
      setRole(data?.data);
    }
  }, [isSuccess]);

  const success = (data: []) => {
    setBuildingData(data);
  };

  const [buidlingData, setBuildingData] = useState<BuildingData[]>([]);
  const [serviceData, setServiceData] = useState<ServiceData[]>([]);
  const [role, setRole] = useState<Role[]>([]);

  queryRequest({url: `/building?offset=0&limit=10000`, method: "get", key: "buildingKey", cb: success});

  const handleSelectAll = (
    event: ChangeEvent<HTMLInputElement>,
    data: ServiceData[] | BuildingData[],
    key: keyof SelectedState
  ) => {
    if (event.target.checked) {
      const allIds = data.map((item) => item._id);
      setSelected((prevSelected) => ({
        ...prevSelected,
        [key]: allIds,
      }));
    } else {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [key]: [],
      }));
    }
  };

  const handleCheckbox = (
    event: ChangeEvent<HTMLInputElement>,
    id: string,
    key: keyof SelectedState
  ) => {
    if (event.target.checked) {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [key]: [...prevSelected[key], id],
      }));
    } else {
      setSelected((prevSelected) => ({
        ...prevSelected,
        [key]: (prevSelected[key] as string[]).filter(
          (itemId) => itemId !== id
        ),
      }));
    }
  };
  return (
    <div className="addRole_user">
      <div className="select_service service_fisrt">
        <div className="building_assigned building_check service">
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox"
                icon={<div className="checkincon"></div>}
                checkedIcon={
                  <div className="checked">
                    <Checkbtn />
                  </div>
                }
                checked={selected.servicesIds.length === serviceData.length}
                onChange={(event) =>
                  handleSelectAll(event, serviceData, "servicesIds")
                }
              />
            }
            label="Select All Services"
            labelPlacement="end"
          />
          {serviceData?.map((item, index) => (
            <div key={index} className="">
              <FormControlLabel
                control={
                  <Checkbox
                    className="checkbox"
                    icon={<div className="checkincon"></div>}
                    checkedIcon={
                      <div className="checked">
                        <Checkbtn />
                      </div>
                    }
                    checked={selected.servicesIds.includes(item._id)}
                    onChange={(event) =>
                      handleCheckbox(event, item._id, "servicesIds")
                    }
                  />
                }
                label={item.name}
                labelPlacement="end"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="select_service specific">
        <div className="building_assigned building_check">
          <FormControlLabel
            control={
              <Checkbox
                className="checkbox "
                icon={<div className="checkincon"></div>}
                checkedIcon={
                  <div className="checked">
                    <Checkbtn />
                  </div>
                }
                checked={selected.buildingsIds.length === buidlingData.length}
                onChange={(event) =>
                  handleSelectAll(event, buidlingData, "buildingsIds")
                }
              />
            }
            label={"Select All Buildings"}
            labelPlacement="end"
          />
          {buidlingData?.map((item, index) => (
            <div key={index} className="">
              <FormControlLabel
                control={
                  <Checkbox
                    className="checkbox "
                    icon={<div className="checkincon"></div>}
                    checkedIcon={
                      <div className="checked">
                        <Checkbtn />
                      </div>
                    }
                    checked={selected.buildingsIds.includes(item._id)}
                    onChange={(event) =>
                      handleCheckbox(event, item._id, "buildingsIds")
                    }
                  />
                }
                label={item.name}
                labelPlacement="end"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="select_service service_fisrt">
        <div className="building_assigned building_check service">
          <span className="role_span">Select Role</span>
          {role?.map((item, index) => (
            <div key={index} className="">
              <FormControlLabel
                control={
                  <Checkbox
                    className="checkbox "
                    icon={<div className="checkincon"></div>}
                    checkedIcon={
                      <div className="checked">
                        <Checkbtn />
                      </div>
                    }
                    checked={selected.roleId === item._id}
                    onChange={() =>
                      setSelected((prev) => {
                        return { ...prev, roleId: item._id };
                      })
                    }
                  />
                }
                label={item.name}
                labelPlacement="end"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddRoleUser;
