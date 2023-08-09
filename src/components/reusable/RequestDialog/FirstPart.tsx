import {
  Autocomplete,
  Button,
  Paper,
  Slider,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, SetStateAction, useEffect, useState } from "react";
import { ReactComponent as ArrowRight } from "@/assets/icons/arrowRight.svg";
import { ReactComponent as TickCircle } from "@/assets/icons/tick-circle.svg";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { IDataReq, ITenant, TFirstStepProps } from "~/types/types";
import { maintenance, marks, responsiveDialog } from "@/utils/constant";

const FirstPart: FC<TFirstStepProps> = ({
  data,
  setMessage,
  setOpenReq,
  title,
  setError,
  setHideMessageReq,
  setHideMessage,
  setOpen,
  setMessageSort,
  selectTime,
  setSelectTime,
  dialog,
  setDialog,
  setTenantId,
  optionValueApartment,
  setOptionValueApartment,
  optionValue,
  setOptionValue,
  period,
  sortedTenant,
  setPeriod,
  buildingData,
  setSelectedBuildingId,
  aprtData,
}) => {
  const [value, setValue] = useState<any>("");
  const [tenantData, setTenantData] = useState<ITenant[]>([]);
  const [selectedBuildingId] = useState("");
  const [mesError, setMesError] = useState("");
  const { data: tenant, isSuccess } = queryRequest({
    url: `/tenant?offset=0&limit=10000`,
    method: "get",
    key: "detailKey",
  });
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
  const { mutate } = mutationRequest({
    url: "/service-request/amenity",
    method: "post",
    isAuth: true,
  });
  const { mutate: addMaintenanceMutate } = mutationRequest({
    url: `/service-request/${maintenance}`,
    method: "post",
    isAuth: true,
  });

  useEffect(() => {
    if (isSuccess) {
      setTenantData(
        tenant?.data?.items.filter(
          (item: { status: string }) => item.status === "active"
        )
      );
    }
  }, [isSuccess]);

  const [subId, setSubId] = useState("");

  const [subData, setSubData] = useState<{ _id: string; name: string }[]>([]);
  const { mutate: subCategoryMutate } = mutationRequest({
    url: `/service/${maintenance}?parentId=${subId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [closeIcon, setCloseIcon] = useState(true);

  useEffect(() => {
    if (subCategoryMutate.isSuccess) {
      setSubData(subCategoryMutate?.data?.data?.items);
    }
  }, [subCategoryMutate.isSuccess]);
  const handleClick = () => {
    setSelectTime(!selectTime);
  };

  const filter = createFilterOptions<any>();
  // const [period, setPeriod] = useState(0);
  // const [optionValue, setOptionValue] = useState<any | null>(null);
  const [optionValueSub, setOptionValueSub] = useState<any | null>(null);
  const [optionValueBuilding, setOptionValueBuilding] = useState<any | null>(
    null
  );
  const [optionValueAprt, setOptionValueAprt] = useState<any | null>(null);

  // const [optionValueApartment, setOptionValueApartment] = useState<any | null>(
  //   null
  // );

  useEffect(() => {
    if (optionValue && dialog) {
      setCloseIcon(false);
    } else {
      setCloseIcon(true);
    }
  }, [optionValue, dialog]);

  useEffect(() => {
    if (dialog && optionValue) {
      setCloseIcon(false);
    } else {
      setCloseIcon(true);
    }
  }, [dialog, optionValue]);

  useEffect(() => {
    if (setOpenReq) {
      if ((mutate.isSuccess || addMaintenanceMutate.isSuccess) && setError) {
        setOpenReq(false);
        setError(false);
        if (setHideMessageReq) {
          setHideMessageReq(true);
        }
        setTimeout(() => {
          if (setHideMessageReq) {
            setHideMessageReq(false);
          }
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
      if (mutate.isError || addMaintenanceMutate.isError) {
        if (setError) {
          setOpenReq(false);
          setError(true);
          if (setHideMessageReq && setMessage) {
            setHideMessageReq(true);
            setMessage((mutate.error as { message: string }).message);
          }
        }
        setTimeout(() => {
          if (setHideMessageReq) {
            setHideMessageReq(false);
          }
        }, 3000);
        setMesError((mutate.error as { message: string }).message);
      }
    }
    if (setOpen) {
      if (mutate.isSuccess || addMaintenanceMutate.isSuccess) {
        setOpen(false);
        if (setHideMessage) {
          setHideMessage(true);
          if (setMessageSort) {
            setMessageSort({
              icon: DoneSvg,
              message: "Request has been added Successfully",
              title: "Done",
              style: "request",
            });
          }
        }

        setTimeout(() => {
          if (setHideMessage) {
            setHideMessage(false);
          }
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
      if (mutate.isError || addMaintenanceMutate.isError) {
        setOpen(false);
        if (setHideMessage) {
          setHideMessage(true);
          setMesError((mutate.error as { message: string }).message);
          if (setMessageSort) {
            setMessageSort({
              icon: Canceled,
              message: mesError,
              title: "Canceled",
              style: "delete ",
            });
          }
        }

        setTimeout(() => {
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
    }
  }, [
    mutate.isSuccess,
    mutate.isError,
    addMaintenanceMutate.isSuccess,
    addMaintenanceMutate.isError,
  ]);

  const handlePeriod = (e: any) => {
    setPeriod(e.target.value);
  };

  return (
    <div className="formcontrol_request amenity">
      <div className="select_amenity">
        <div className="select_amenity__content">
          <span className="select_amenity__content-header">Select {title}</span>
          <Box position={"relative"} className="box_search">
            <Autocomplete
              value={value || dialog?.name}
              onChange={(event, newValue: { name?: string }) => {
                if (newValue && newValue.name) {
                  setDialog(newValue as SetStateAction<IDataReq | null>);
                  setValue(newValue.name);
                } else {
                  setValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={data?.filter((item) => item.bookable === true) as []}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.name) {
                  return option.name;
                }
                return option.name;
              }}
              selectOnFocus
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li
                  {...props}
                  style={{ borderTop: "1px solid #fff", height: "30px" }}
                  className="dialog_li"
                >
                  {option.name}
                </li>
              )}
              freeSolo
              renderInput={(params) => (
                <TextField {...params} placeholder={`Search ${title}`} />
              )}
              PaperComponent={(props) => (
                <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
              )}
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
            />
          </Box>
        </div>
        <div className="select_amenity__carousel">
          <Carousel
            responsive={responsiveDialog}
            swipeable={true}
            draggable={false}
            showDots={false}
            ssr={true}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            arrows={true}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {data
              ?.filter((item) => item?.bookable === true)
              .map((item) => {
                return (
                  <label
                    key={item._id}
                    className="slide-item"
                    onClick={() => {
                      setDialog(item);
                    }}
                  >
                    <span className="radio-icon-container">
                      {dialog?._id === item?._id ? (
                        <TickCircle />
                      ) : (
                        <span className="radio-icon"></span>
                      )}
                    </span>
                    <div className="slide-item__image-container">
                      <img src={item.images[0]?.url} />
                    </div>
                    <span className="slide-item__name" title={item.name}>
                      {item.name}
                    </span>
                  </label>
                );
              })}
          </Carousel>
        </div>
      </div>
      {dialog?.hasSubCategories && (
        <div className="select_amenity">
          <div style={{ padding: "0 20px 20px 20px" }}>
            <span className="select_amenity__content-header">
              Select Sub category
            </span>
            <Box position={"relative"} className="box_search">
              <Autocomplete
                value={optionValueSub}
                onChange={(event, newValue) => {
                  if (newValue && newValue.firstName) {
                    setOptionValueSub(newValue.firstName);
                    setTenantId((prev: any) => {
                      return {
                        ...prev,
                        tenantid: newValue._id,
                        // buildingid: newValue.buildings[0]._id,
                      };
                    });
                  } else {
                    setOptionValueSub(newValue);
                  }
                }}
                filterOptions={(options, params) => {
                  const filtered = filter(options, params);

                  return filtered;
                }}
                id="free-solo-dialog-sub-category"
                options={tenantData}
                getOptionLabel={(option) => {
                  if (typeof option === "string") {
                    return option;
                  }
                  if (option.firstName) {
                    return option.firstName;
                  }
                  return option.firstName;
                }}
                selectOnFocus
                handleHomeEndKeys
                renderOption={(props, option) => (
                  <li
                    {...props}
                    style={{ borderBottom: "1px solid #fff" }}
                    className="dialog_li"
                  >
                    {option.firstName}
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
              {/* {!optionValue && <SearchIcon className="search_icon" />} */}
            </Box>
          </div>
        </div>
      )}
      <div className="select_amenity">
        <div style={{ padding: "0 20px 20px 20px" }}>
          <span className="select_amenity__content-header second">
            Select Building
          </span>
          <span className="select_amenity__content-subheader">
            You can search by Building name
          </span>
          <Box position={"relative"} className="box_search">
            <Autocomplete
              value={buildingData}
              onChange={(event, newValue) => {
                if (newValue && newValue.name) {
                  setSelectedBuildingId(newValue?._id);
                  if (newValue?._id) {
                  }
                  setTenantId((prev: any) => {
                    return {
                      ...prev,
                      buildingid: newValue?._id,
                    };
                  });
                } else {
                  setOptionValueBuilding(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                return filtered;
              }}
              id="free-solo-dialog-building"
              options={buildingData}
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
                    {optionValueBuilding?.firstName === option?.firstName ? (
                      <TickCircle />
                    ) : (
                      <span className="radio-icon"></span>
                    )}
                  </span> */}
                  <div
                    className="selected-row"
                    onClick={() => setOptionValueBuilding(option?._id)}
                  >
                    {option?.name}
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
                <TextField {...params} placeholder="Select Building" />
              )}
              PaperComponent={(props) => (
                <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
              )}
            />
            {/* {!optionValueBuilding && <SearchIcon className="search_icon" />} */}
          </Box>
        </div>
      </div>
      <div className="select_amenity">
        <div style={{ padding: "0 20px 20px 20px" }}>
          <span className="select_amenity__content-header second">
            Select Apartment
          </span>
          <span className="select_amenity__content-subheader">
            You can search by Apartment name
          </span>
          <Box position={"relative"} className="box_search">
            <Autocomplete
              value={aprtData ? aprtData : []}
              onChange={(event, newValue) => {
                if (newValue && newValue.name) {
                  setOptionValueApartment(newValue);
                  setTenantId((prev: any) => {
                    return {
                      ...prev,
                      aprtId: newValue._id,
                    };
                  });
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
                  <div
                    className="selected-row"
                    onClick={() => setOptionValueAprt(option?._id)}
                  >
                    {option?.name}
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
                <TextField {...params} placeholder="Select Apartment" />
              )}
              PaperComponent={(props) => (
                <Paper {...props} sx={{ backgroundColor: "#EBEBEB" }} />
              )}
            />
            {/* {!optionValueApartment && <SearchIcon className="search_icon" />} */}
          </Box>
        </div>
      </div>
      <div className="select_amenity rm-border">
        <div style={{ padding: "0 20px 0 20px" }}>
          <span className="select_amenity__content-header second">
            Select Tenant
          </span>
          <span className="select_amenity__content-subheader">
            You can search by Tenant name
          </span>
          <Box position={"relative"} className="box_search">
            <Autocomplete
              value={optionValue}
              onChange={(event, newValue) => {
                if (newValue && newValue.firstName) {
                  setOptionValue(newValue);
                  setTenantId((prev: any) => {
                    return {
                      ...prev,
                      tenantid: newValue._id,
                      // buildingid: newValue.buildings[0]._id,
                    };
                  });
                } else {
                  setOptionValue(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                return filtered;
              }}
              id="free-solo-dialog-tenant"
              options={sortedTenant}
              getOptionLabel={(option) => {
                if (typeof option === "string") {
                  return option;
                }
                if (option.firstName) {
                  return option.firstName;
                }
                return option.firstName;
              }}
              selectOnFocus
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li
                  {...props}
                  key={option?._id}
                  style={{ height: "38px" }}
                  className="dialog_li amenity"
                >
                  <span className="radio-icon-container">
                    {optionValue?.firstName === option?.firstName ? (
                      <TickCircle />
                    ) : (
                      <span className="radio-icon"></span>
                    )}
                  </span>
                  <div
                    className="selected-row"
                    onClick={() => setOptionValue(option)}
                  >
                    <div className="selected-row__image_container">
                      <img src={option?.image?.url} />
                    </div>
                    <div className="selected-row__info">
                      <span className="selected-row__info-name">
                        {option.firstName}
                      </span>
                      <span className="selected-row__info-apartment">
                        Apartment:{" "}
                        <span className="selected-row__info-apartment-number">
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
            {/* {!optionValue && <SearchIcon className="search_icon" />} */}
          </Box>
        </div>
      </div>
      {title?.includes("Maintenance") && (
        <>
          <span className="priority_level">Priority Level</span>
          <Slider
            className="priority_slider"
            aria-label="Restricted values"
            defaultValue={50}
            size={"medium"}
            step={null}
            valueLabelDisplay="auto"
            marks={marks}
            value={period}
            onChange={handlePeriod}
          />
        </>
      )}
      <Button
        variant="contained"
        className={`time_btn ${closeIcon ? "deactive" : ""}`}
        onClick={handleClick}
        // disabled={closeIcon}
      >
        Select time & Date
        <ArrowRight />
      </Button>
    </div>
  );
};

export default FirstPart;
