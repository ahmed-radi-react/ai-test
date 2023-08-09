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
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { ReactComponent as CloseDiv } from "@/assets/icons/closeDiv.svg";
import { IBuilding, IBellboyDialog } from "~/types/types";
import { queryClient } from "@/main";

const BellboyDialog = ({
  setOpen,
  setMessageSort,
  setHideMessage,
}: IBellboyDialog) => {
  const filter = createFilterOptions<{ inputValue: string; title: string }>();

  const [buildingData, setBuildingData] = useState<IBuilding[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const [selectedAprtId, setSelectedAprtId] = useState("");
  const [selectedTenantid, setSelectedTenantid] = useState("");

  const [aprtData, setAprtData] = useState<any>([]);
  const { mutate: tenantData } = mutationRequest({
    url: `/tenant?buildingId=${selectedBuildingId}&apartmentId=${selectedAprtId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

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

  const { mutate } = mutationRequest({
    url: "/service-request/bellboy",
    method: "post",
    isAuth: true,
  });
  const handleReq = () => {
    mutate.mutate(
      {
        scheduleDateFrom: momentObj,
        scheduleDateTo: momentObj,
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
          queryClient.invalidateQueries(["bellboyKey"]);
        },
      }
    );
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      selectedTenantid.length &&
      selectedBuildingId.length &&
      selectedAprtId.length
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [selectedTenantid, selectedBuildingId, selectedAprtId]);
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
  const {
    data: building,
    isSuccess: isBuildingSuccess,
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
      <span>Bellboy Request </span>
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
        <Autocomplete
          className="autocomplatesearch"
          value={optionValue ? optionValue : []}
          onChange={(event, newValue) => {
            setShowError((prev) => (prev = false));

            if (newValue && newValue.firstName) {
              setSelectedTenantid(newValue?._id);
            } else {
              setShowError((prev) => (prev = false));
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            setShowError((prev) => (prev = false));
            if (params.inputValue !== "") {
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

export default BellboyDialog;
