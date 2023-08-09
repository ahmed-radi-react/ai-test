import {
  Autocomplete,
  Box,
  Button,
  TextField,
  Paper,
  createFilterOptions,
  Input,
} from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as CongratsSvg } from "@/assets/icons/CongratsSvg.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import moment from "moment-timezone";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import {
  autoCompleteStyle,
  visitorRequestDialogStyle,
  visitorRequestsDialogInputsGenerator,
} from "@/utils/constant";
import { IVisitorDialogProp } from "~/types/types";
import { queryClient } from "@/main";

const VisitorRequestDialog = ({
  handleShowAlert,
  setOpenVisitor,
}: IVisitorDialogProp) => {
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const [apartamentId, setApartamentId] = useState("");
  const [selectedTenantId, setSelectedTenantId] = useState("");

  const { data: building } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });
  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${selectedBuildingId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });
  const { mutate: tenantData } = mutationRequest({
    url: `/tenant?buildingId=${selectedBuildingId}&apartmentId=${apartamentId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [aprtData, setAprtData] = useState<any>([]);
  const [tenantDataReq, setTenantDataReq] = useState<any>([]);
  // const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedBuildingNumber, setSelectedBuildingNumber] = useState<
    any | null
  >(null);
  const [selectedApartment, setSelectedApartment] = useState("");
  const filter = createFilterOptions<any>();
  const [optionValue, setOptionValue] = useState<any | null>(null);
  const [showError, setShowError] = useState<boolean>(false);
  const [optionValueApartment, setOptionValueApartment] = useState<any | null>(
    null
  );

  useEffect(() => {
    if (selectedBuildingId?.length) {
      apartmentTenant.mutate({});
    }
  }, [selectedBuildingId]);
  useEffect(() => {
    if (apartamentId?.length) {
      tenantData.mutate({});
    }
  }, [apartamentId]);

  useEffect(() => {
    if (apartmentTenant?.isSuccess) {
      setAprtData(
        apartmentTenant?.data?.data?.items
          ? apartmentTenant?.data?.data?.items
          : []
      );
    }
  }, [apartmentTenant?.isSuccess]);

  useEffect(() => {
    if (tenantData?.isSuccess) {
      setTenantDataReq(
        tenantData?.data?.data?.items ? tenantData?.data?.data?.items : []
      );
    }
  }, [tenantData?.isSuccess]);

  const formatString = "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)";
  const momentObj = moment
    .tz(new Date() + "", formatString, "Asia/Yerevan")
    .toISOString();
  const { mutate } = mutationRequest({
    url: "/service-request/visitor",
    method: "post",
    isAuth: true,
  });

  const [message, setMessage] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate.mutate(
      {
        scheduleDateFrom: momentObj,
        scheduleDateTo: momentObj,
        visitorName: visitorName.name,
        visitorPhoneNumber: pickUpPersonPhone,
        buildingNumber: selectedBuildingNumber?.name?.replace(/\D/g, ""),
        // apartmentNumber: optionValue.tenantInfo?.apartmentNumber,
        apartmentNumber: optionValueApartment?.name.replace("Apartment", ""),
        visitorOtp: "string",
        visitPurpose: visitorName.purpose,
        numberOfVisitors: +visitorName.number,
        description: "string",
        serviceId: "63b416c142916b799adf2ac0",
        buildingId: selectedBuildingId,
        tenantId: selectedTenantId,
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
          handleShowAlert(
            CongratsSvg,
            "Visitor has been added and tenant notified",
            "Done",
            "done"
          );
          if (setOpenVisitor) {
            setOpenVisitor(false);
          }
          queryClient.invalidateQueries(["requestKey+s"]);
        },
        onError: (error) => {
          setMessage((mutate.error as { message: string }).message);
          handleShowAlert(Canceled, message, "Canceled", "delete");
          if (setOpenVisitor) {
            setOpenVisitor(false);
          }
        },
      }
    );
  };
  const [_, setTenant] = useState<{ _id: string; firstName: string }[]>([]);
  const [pickUpPersonPhone, setPickUpPersonPhone] = useState("+966");
  const [visitorName, setVisitorName] = useState({
    name: "",
    purpose: "",
    number: 1,
  });
  const { data: tenantdata, isSuccess: successTenant } = queryRequest({
    url: "/tenant?offset=0&limit=10000",
    method: "get",
    key: "requsetKeytenant",
  });
  useEffect(() => {
    if (successTenant) {
      setTenant(
        tenantdata?.data?.items?.filter(
          (item: { status: string }) => item.status === "active"
        )
      );
    }
  }, [successTenant]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      visitorName.name.length &&
      pickUpPersonPhone &&
      selectedBuildingId &&
      optionValueApartment &&
      optionValue
    ) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [optionValue, selectedBuildingNumber, selectedApartment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "number") {
      const parsedValue = parseInt(value, 10);
      const newValue = isNaN(parsedValue) ? 1 : Math.max(parsedValue, 1);

      setVisitorName((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setVisitorName((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form className="visitor_dialog" onSubmit={handleSubmit}>
      <p>Add Visitor Request</p>
      <div className="visitor_dialog__container_input">
        {visitorRequestsDialogInputsGenerator({
          value: [visitorName.name, visitorName.purpose, visitorName.number],
          handleChange,
        }).map(
          ({ placeholder, className, value, onChange, name, type }, index) => (
            <Input
              key={index}
              placeholder={placeholder}
              className={className}
              value={value}
              onChange={onChange}
              name={name}
              type={type}
            />
          )
        )}

        <PhoneInputWithCountrySelect
          // value={pickUpPersonPhone}
          onChange={(value: string) => setPickUpPersonPhone(value)}
          defaultCountry="SA"
          limitMaxLength
          international
          name="person_phone"
          className="PhoneInput"
        />
        <Box position={"relative"} className="box_search">
          <Autocomplete
            value={building?.data?.items ? building?.data?.items : []}
            onChange={(event, newValue) => {
              if (newValue && newValue?.name) {
                setSelectedBuildingId(newValue?._id);
                setSelectedBuildingNumber(newValue);
              } else {
                setSelectedBuildingId(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            id="free-solo-dialog-building"
            options={building?.data?.items ? building?.data?.items : []}
            getOptionLabel={(option) => {
              return option?.name ? option?.name : "";
            }}
            selectOnFocus
            handleHomeEndKeys
            renderOption={(props, option) => (
              <li {...props} key={option?._id} className="dialog_li">
                <div
                  className="selected-row"
                  onClick={() => setSelectedBuildingId(option?.name)}
                >
                  {option?.name}
                </div>
              </li>
            )}
            freeSolo
            sx={visitorRequestDialogStyle}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Building" />
            )}
            PaperComponent={(props) => (
              <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
            )}
          />
        </Box>
        <Box position={"relative"} className="box_search">
          <Autocomplete
            value={aprtData ? aprtData : []}
            onChange={(event, newValue) => {
              if (newValue) {
                // setOptionValueApartment(newValue?._id);
                setOptionValueApartment(newValue);
                setApartamentId(newValue?._id);
                // setTenantId((prev: any) => {
                //   return {
                //     ...prev,
                //     tenantid: newValue._id,
                //     buildingid: newValue.buildings[0]._id,
                //   };
                // });
              } else {
                setOptionValueApartment(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
              return filtered;
            }}
            id="free-solo-dialog-building"
            options={aprtData ? aprtData : []}
            getOptionLabel={(option) => {
              return option?.name ? option?.name : "";
            }}
            selectOnFocus
            handleHomeEndKeys
            renderOption={(props, option) => (
              <li
                {...props}
                key={option?._id}
                // style={{ height: "38px" }}
                className="dialog_li"
              >
                {/* <span className="radio-icon-container">
                    {optionValueApartment?.firstName === option?.firstName ? (
                      <TickCircle />
                    ) : (
                      <span className="radio-icon"></span>
                    )}
                  </span> */}
                <div className="selected-row">{option?.name}</div>
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
              <TextField {...params} placeholder="Select Apartment" />
            )}
            PaperComponent={(props) => (
              <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
            )}
          />
          {/* {!optionValueApartment && <SearchIcon className="search_icon" />} */}
        </Box>
        <Box position={"relative"} className="box_search">
          <Autocomplete
            value={tenantDataReq ? tenantDataReq : []}
            onChange={(event, newValue) => {
              setShowError((prev) => (prev = false));

              if (newValue) {
                setSelectedTenantId(newValue?._id);
                // if there name match
                // setShowError(prev => prev = false)
                // setOptionValue(newValue.label);
              } else {
                // remove error after click on close icon
                setShowError((prev) => (prev = false));
                setOptionValue(newValue);
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
            options={tenantDataReq ? tenantDataReq : []}
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
                key={option?._id}
                className="dialog_li"
              >
                <div
                  className="selected-row"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    width: "100%",
                  }}
                  onClick={() => setOptionValue(option)}
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
            sx={autoCompleteStyle}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Tenant" />
            )}
            PaperComponent={(props) => (
              <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
            )}
          />
          {optionValue && (
            <span className="note">
              Tenant will be notified about this visitor name{" "}
            </span>
          )}
          {/* {!optionValue && <SearchIcon className="search_icon" />} */}
          <>
            {showError && (
              <span className="error_text">Please select a valid option</span>
            )}
          </>
        </Box>
      </div>
      <div className="btn_container">
        <Button
          className={`visitor_btn ${disable ? "notify" : ""}`}
          type="submit"
        >
          Notify Tenant
        </Button>
      </div>
    </form>
  );
};
export default VisitorRequestDialog;
