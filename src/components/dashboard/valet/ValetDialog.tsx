import {
  Autocomplete,
  Button,
  createFilterOptions,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import moment from "moment-timezone";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { ReactComponent as CloseDiv } from "@/assets/icons/closeDiv.svg";
import { IBellboyDialog, IBuilding } from "~/types/types";
import { queryClient } from "../../../main";

const ValetDialog = ({
  setOpen,
  setMessageSort,
  setHideMessage,
}: IBellboyDialog) => {
  const navigate = useNavigate();
  const filter = createFilterOptions<{ inputValue: string; title: string }>();
  const [tenant, setTenant] = useState<{ _id: string; firstName: string }[]>(
    []
  );
  const [buildingData, setBuildingData] = useState<IBuilding[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const [selectedAprtId, setSelectedAprtId] = useState("");
  const [selectedTenantid, setSelectedTenantid] = useState("");

  const [aprtData, setAprtData] = useState<any>([]);
  const [carsData, setCarsData] = useState<any>([]);
  const { data: tenantdata, isSuccess: successTenant } = queryRequest({
    url: "/tenant?offset=0&limit=10000",
    method: "get",
    key: "requsetKeytenant",
  });
  const { mutate: tenantData } = mutationRequest({
    url: `/tenant?buildingId=${selectedBuildingId}&apartmentId=${selectedAprtId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });
  useEffect(() => {
    if (successTenant) {
      setTenant(tenantdata?.data?.items);
    }
  }, [successTenant]);
  useEffect(() => {
    tenantData.mutate({});
  }, [selectedAprtId]);
  useEffect(() => {
    if (tenantData.isSuccess) {
      setOptionValue(
        tenantData?.data?.data?.items ? tenantData?.data?.data?.items : []
      );
    }
  }, [tenantData.isSuccess]);
  const formatString = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)";
  const momentObj = moment
    .tz(new Date() + "", formatString, "Asia/Yerevan")
    .toISOString();
  const [optionValue, setOptionValue] = useState<any | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [tenantId, setTenantId] = useState<{
    tenantid: string;
    buildingid: string;
  }>({ tenantid: "", buildingid: "" });

  // const [textareval, setTextareval] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedApartment, setSelectedApartment] = useState("");

  const { mutate } = mutationRequest({
    url: `/service-request/valet`,
    method: "post",
    isAuth: true,
  });
  const handleReq = () => {
    mutate.mutate(
      {
        scheduleDateFrom: momentObj,
        scheduleDateTo: momentObj,
        car: {
          name: "string",
          model: "string",
        },
        specialRequest: "string",
        description: "textareval",
        serviceId: "63b416cf42916b799adf2ac1",
        buildingId: selectedBuildingId,
        tenantId: selectedTenantid,
        requestedBy: "admin",
        paymentInfo: {
          paymentMethod: "cash",
          amount: 0,
          prePaidAmount: 0,
        },
        images: [],
        timeToServe: "later",
      },
      {
        onSuccess: () => {
          // Refetch data after the mutation is successful
          queryClient.invalidateQueries(["key" + "valet"]);
        },
      }
    );
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      selectedTenantid.length &&
      selectedBuildingId.length &&
      selectedAprtId.length &&
      tenantCarsId?.length
      // textareval.length
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [
    selectedTenantid,
    selectedBuildingId,
    selectedAprtId,
    // textareval
  ]);
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (mutate.isSuccess && setHideMessage && setMessageSort) {
      setHideMessage(true);
      setMessageSort({
        icon: DoneSvg,
        message: "Request has been added Successfully",
        title: "Done",
        style: "request reqamen",
      });
      if (setOpen) {
        setOpen(false);
      }
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    if (mutate.isError && setHideMessage && setMessageSort) {
      setHideMessage(true);
      setMessage((mutate.error as { message: string }).message);
      setMessageSort({
        icon: Canceled,
        message: message,
        title: "Canceled",
        style: "delete amenReq",
      });
      if (setOpen) {
        setOpen(false);
      }
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
  }, [mutate.isSuccess, mutate.isError]);

  // const [amenityId, setAmenityId] = useState<string>("");
  // const [subId, setSubId] = useState("");
  // const handleClick = (id: string, parentId?: string) => {
  //   setAmenityId(id);
  //   if (parentId) {
  //     setSubId(parentId);
  //   }
  // };

  const {
    data: building,
    isSuccess: isBuildingSuccess,
    isLoading: isBuildingLoading,
  } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });

  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${selectedBuildingId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });
  const { mutate: tenantCars } = mutationRequest({
    url: `/tenant/cars/${selectedTenantid}`,
    method: "get",
    isAuth: true,
  });
  const [tenantCarsId, setTenantCarsId] = useState<any>();

  useEffect(() => {
    if (selectedTenantid.length) {
      tenantCars.mutate({});
    }
  }, [selectedTenantid]);

  useEffect(() => {
    if (mutate.isSuccess) {
      setCarsData(tenantCars?.data);
    }
  }, [mutate.isSuccess]);

  useEffect(() => {
    if (selectedBuildingId.length) {
      apartmentTenant.mutate({});
    }
  }, [selectedBuildingId]);

  useEffect(() => {
    if (apartmentTenant.isSuccess) {
      setAprtData(
        apartmentTenant?.data?.data?.items
          ? apartmentTenant?.data?.data?.items
          : []
      );
    }
  }, [apartmentTenant.isSuccess]);

  useEffect(() => {
    if (isBuildingSuccess) {
      setBuildingData(building?.data?.items);
    }
  }, [isBuildingSuccess]);

  return (
    <div className="belboy_dialog">
      <span>Valet Request </span>
      <div className="formcontrol_request">
        <Select
          value={selectedBuildingId}
          onChange={(e) => {
            setSelectedBuildingId(e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
          renderValue={(selectedBuildingId: string) => {
            if (selectedBuildingId.length === 0) {
              return <span className="selesct_span_d">Select Building</span>;
            }
            return buildingData.find((item) => item?._id === selectedBuildingId)
              ?.name;
          }}
          IconComponent={(props) =>
            !selectedBuildingId.length ? (
              <ArrowIcon {...props} />
            ) : (
              <CloseDiv
                className="arrow_icon_close"
                onClick={() => {
                  setSelectedBuildingId("");
                }}
              />
            )
          }
        >
          {buildingData?.map(({ _id, name }: { _id: string; name: string }) => {
            return (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            );
          })}
        </Select>

        <Select
          value={selectedAprtId}
          onChange={(e) => {
            setSelectedAprtId(e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
          renderValue={(selectedAprtId: string) => {
            return selectedAprtId.length === 0 ? (
              <span className="selesct_span_d">Select Apartment</span>
            ) : (
              aprtData.find(
                (item: { _id: string }) => item?._id === selectedAprtId
              )?.name
            );
          }}
          IconComponent={(props) =>
            !selectedAprtId.length ? (
              <ArrowIcon {...props} />
            ) : (
              <CloseDiv
                className="arrow_icon_close"
                onClick={() => setSelectedAprtId("")}
              />
            )
          }
        >
          <MenuItem value="" className="selesctedfirst">
            <ArrowIcon className="arrow_icon" />
          </MenuItem>
          {aprtData?.map((item: any) => {
            return (
              <MenuItem key={item?._id} value={item?._id}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      </div>
      <div className="search">
        {/* <Input placeholder="Select Tenant" className="input" /> */}
        <Autocomplete
          className="autocomplatesearch"
          value={optionValue ? optionValue : []}
          onChange={(event, newValue) => {
            setShowError((prev) => (prev = false));

            if (newValue && newValue.firstName) {
              setSelectedTenantid(newValue?._id);

              // setOptionValue(newValue.firstName);
              // setTenantId((prev) => {
              //   return {
              //     ...prev,
              //     tenantid: newValue._id,
              //     buildingid: newValue.buildings[0]._id,
              //   };
              // });
            } else {
              setShowError((prev) => (prev = false));
              // setOptionValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            setShowError((prev) => (prev = false));
            if (params.inputValue !== "") {
              // no option to show
            }
            if (filtered?.length === 0) {
              setShowError((prev) => (prev = true));
            }
            return filtered;
          }}
          id="free-solo-dialog-demo"
          options={optionValue ? optionValue : []}
          getOptionLabel={(option) => {
            if (option?.firstName) {
              return option?.firstName;
            }
            return "";
          }}
          selectOnFocus
          handleHomeEndKeys
          renderOption={(props, option) => (
            <li
              {...props}
              style={{
                background: "#fff",
                paddingLeft: "10px",
                height: "47px",
              }}
              className="dialog_li"
              key={option?._id}
            >
              <div
                className="selected-row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  width: "100%",
                }}
                // onClick={() => setOptionValue(option)}
              >
                <div
                  className="selected-row__image_container"
                  style={{ width: "28px", height: "28px" }}
                >
                  <img
                    src={option?.image?.url}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  className="selected-row__info"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <span
                    className="selected-row__info-name"
                    style={{
                      fontWeight: "500",
                      fontSize: "14px",
                      lineHeight: "20px",
                    }}
                  >
                    {option?.firstName}
                  </span>
                  <span
                    className="selected-row__info-apartment"
                    style={{
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "17px",
                      color: "#8b8b8b",
                    }}
                  >
                    Apartment:{" "}
                    <span
                      className="selected-row__info-apartment-number"
                      style={{
                        fontWeight: "700",
                        fontSize: "12px",
                        lineHeight: "17px",
                        color: "#000",
                      }}
                    >
                      {option?.tenantInfo?.apartmentNumber}
                    </span>
                  </span>
                </div>
              </div>
            </li>
          )}
          freeSolo
          sx={{
            width: "100%",
            "& .MuiAutocomplete-inputRoot": {
              backgroundColor: "#EBEBEB",
              height: "36px",
              fontWeight: "bold",
              fontSize: "12px",
              borderRadius: "6px",
            },
            "& .MuiOutlinedInput-input": {
              paddingLeft: "24px", // space for icon
            },
            "& .MuiOutlinedInput-root": {
              "& .MuiAutocomplete-input": {
                padding: "0px !important",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Select Tenant" />
          )}
          PaperComponent={(props) => (
            <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
          )}
        />
        <SearchIcon />
      </div>
      <div className="formcontrol_request">
        <Select
          value={tenantCarsId}
          onChange={(e) => {
            setTenantCarsId(e.target.value);
          }}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          className="select"
          renderValue={(tenantCarsId: string) => {
            return !tenantCarsId?.length ? (
              <span className="selesct_span_d">Select Car</span>
            ) : (
              carsData?.find(
                (item: { _id: string }) => item?._id === tenantCarsId
              )?.name
            );
          }}
          IconComponent={(props) =>
            !carsData?.length ? (
              <ArrowIcon {...props} />
            ) : (
              <CloseDiv
                className="arrow_icon_close"
                onClick={() => setTenantCarsId("")}
              />
            )
          }
        >
          <MenuItem value="" className="selesctedfirst">
            <ArrowIcon className="arrow_icon" />
          </MenuItem>
          {carsData?.map(({ _id, name }: { _id: string; name: string }) => {
            return (
              <MenuItem key={_id} value={_id}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </div>

      {/* <Textarea
        placeholder="Any Special Request?"
        className="textarea"
        onChange={(e) => setTextareval(e.target.value)}
      /> */}
      <Button
        variant="contained"
        className={`btn ${disable ? "request" : ""}`}
        onClick={handleReq}
      >
        Request Now
      </Button>
    </div>
  );
};

export default ValetDialog;
