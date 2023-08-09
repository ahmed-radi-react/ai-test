import { FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { IBuidling } from "../AddTenant";
import { ILocation } from "~/types/types";

const Location = ({
  setOrganization,
  organization,
  setBuildingNumber,
  buildingNumber,
  setApartmentNumberID,
  setBuilding,
  building,
  apartmentNumberID,
  setTenantId,
  tenantId,
  apartmentName,
  setApartmentName,
}: ILocation) => {
  const { data, isSuccess } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });

  useEffect(() => {
    if (isSuccess) {
      setBuilding(data?.data?.items);
      const buildingName = data?.data?.items?.find(
        (item: { _id: string }) => tenantId.buildingid === item?._id
      )?.name;
      setBuildingNumber(buildingName ? buildingName : "");
    }
  }, [isSuccess, tenantId.buildingid]);
  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${tenantId.buildingid}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });
  useEffect(() => {
    if (tenantId.buildingid.length) {
      apartmentTenant.mutate({});
    }
  }, [tenantId.buildingid]);

  return (
    <div className="location_tenant">
      <FormControl sx={{ width: 390 }} className="formcontrol">
        <ArrowIcon />
        <Select
          value={organization ? organization : "default-Organization"}
          onChange={(e: any) => setOrganization(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
        >
          <MenuItem value={"default-Organization"} disabled>
            Organization
          </MenuItem>
          <MenuItem value={"E-b"}>Volanete</MenuItem>
          {/* <MenuItem value={"EButler"}>EButler</MenuItem> */}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 390 }} className="formcontrol">
        <ArrowIcon />
        <Select
          value={buildingNumber ? buildingNumber : "default-BuildingNumber"}
          onChange={(e) => setBuildingNumber(e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
        >
          {/* <MenuItem value="" className="building">Building Number</MenuItem> */}
          <MenuItem value={"default-BuildingNumber"} disabled>
            Building Number
          </MenuItem>
          {/* <MenuItem value={"A"}>A</MenuItem>
          <MenuItem value={"B"}>B</MenuItem>
          <MenuItem value={"C"}>C</MenuItem> */}
          {building?.map((item) => {
            return (
              <MenuItem
                value={item.name}
                key={item._id}
                onClick={() =>
                  setTenantId((prev: any) => {
                    return {
                      ...prev,
                      buildingid: item?._id,
                    };
                  })
                }
              >
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl sx={{ width: 390 }} className="formcontrol">
        <ArrowIcon />
        <Select
          value={
            apartmentNumberID ? apartmentNumberID : "default-ApartmentNumber"
          }
          onChange={(e) => {
            setApartmentNumberID(e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
        >
          {/* <MenuItem value="" className="building">Building Number</MenuItem> */}
          <MenuItem value={"default-ApartmentNumber"} disabled>
            Apartment Number
          </MenuItem>
          {apartmentTenant?.data?.data?.items.map(
            (item: { name: string; _id: string }, id: number) => {
              return (
                <MenuItem
                  value={item._id}
                  key={id}
                  onClick={() => {
                    setApartmentName(item.name);
                  }}
                >
                  {item.name}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
    </div>
  );
};

export default Location;
