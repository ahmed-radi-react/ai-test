import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  createFilterOptions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { accordionStyle, selectStyleParcel } from "@/utils/constant";
import ProgressBar from "~/reusable/ProgressBar";
import { ReactComponent as TenantInformationIcon } from "@/assets/icons/ParcelsTenantInformationIcon.svg";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ITenantInfo } from "~/types/types";
import { mutationRequest } from "@/requests-body/queries";

const TenantInformation = ({
  mutateApartment,
  expanded,
  setTenantId,
  optionTenant,
  setExpanded,
  setOptionApartment,
  sectionComplete,
  accordionThree,
  optionApartment,
  setOptionTenant,
  setOptionReceivedBy,
  building,
}: ITenantInfo) => {
  const [apartamentId, setApartamentId] = useState("");
  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${optionTenant}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });
  const { mutate: tenantData } = mutationRequest({
    url: `/tenant?buildingId=${optionTenant}&apartmentId=${apartamentId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [aprtData, setAprtData] = useState<any>([]);
  const [tenantDataReq, setTenantDataReq] = useState<any>([]);

  const [isSuccessApartment, setIsSuccessApartment] = useState(
    apartmentTenant?.isSuccess
  );

  const [isTenantSucces, setIsTenantSucces] = useState(tenantData?.isSuccess);

  useEffect(() => {
    if (isSuccessApartment) {
      setAprtData(apartmentTenant?.data?.data?.items);
    }
  }, [isSuccessApartment]);

  useEffect(() => {
    if (isTenantSucces) {
      setAprtData(apartmentTenant?.data?.data?.items);
    }
  }, [isTenantSucces]);

  useEffect(() => {
    setIsTenantSucces(tenantData?.data?.data);
  }, [tenantData]);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleChangeSelectTenant = (event: SelectChangeEvent<string>) => {
    setOptionTenant(event.target.value);
    mutateApartment.mutate({});
  };
  const handleChangeSelectReceivedBy = (event: SelectChangeEvent<string>) => {
    setOptionReceivedBy(event.target.value);
  };
  const [optionValue, setOptionValue] = useState("");
  const filter = createFilterOptions<any>();
  useEffect(() => {
    if (optionTenant.length) {
      apartmentTenant.mutate({});
    }
  }, [optionTenant]);

  useEffect(() => {
    if (optionTenant.length && apartamentId.length) {
      tenantData.mutate({});
    }
  }, [optionTenant, apartamentId]);

  const handleChangeApartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptionValue(e.target.value);
  };

  const [apartamentFlag, setApartamentFlag] = useState(true);
  const [tenantFlag, setTenantFlag] = useState(true);

  const [apartamentValue, setApartamentValue] = useState("Select Aprt");
  const [tenantValue, setTenantValue] = useState("");
  useEffect(() => {
    setIsSuccessApartment(apartmentTenant.isSuccess);
  }, [apartmentTenant]);
  useEffect(() => {
    // setTenantDataReq(
    //   tenantData?.data?.data?.items?.filter(
    //     (item: { status: string }) => item.status === "active"
    //   )
    // );
    setTenantDataReq(tenantData?.data?.data?.items);
  }, [tenantData.isSuccess]);

  return (
    <Accordion
      expanded={expanded === "panel3"}
      sx={accordionStyle}
      onChange={handleChange("panel3")}
    >
      <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
        <Box sx={{ width: "33%", flexShrink: 0 }} className="accordion_header">
          <TenantInformationIcon />
          <p>Tenant Information</p>
        </Box>
        {sectionComplete.stepThree ? (
          <SectionComplete className="complete_circle" />
        ) : accordionThree.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={3} completed={accordionThree.length} />
        )}{" "}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content">
          <Box className="accordion_content__right">
            <Box className="accordion_content__form">
              <Box className="accordion_content__right-info">
                <Select
                  labelId="select-option-label4"
                  id="select-option-2"
                  value={optionTenant ? optionTenant : "defaultValue"}
                  placeholder="Parcels Type"
                  className={`accordion_content__form-select full-with ${
                    !optionTenant && "defaultValue"
                  }`}
                  sx={selectStyleParcel}
                  onChange={handleChangeSelectTenant}
                  renderValue={(optionTenant: string) => {
                    return optionTenant === "defaultValue" ? (
                      <span className="selesct_span_d">Select Building</span>
                    ) : (
                      building.find(
                        ({ _id }: { _id: string }) => _id === optionTenant
                      )?.name
                    );
                  }}
                >
                  <MenuItem value="defaultValue" disabled>
                    Select Building
                  </MenuItem>
                  {building?.map(
                    ({ _id, name }: { _id: string; name: string }) => {
                      return (
                        <MenuItem key={_id} value={_id}>
                          {name}
                        </MenuItem>
                      );
                    }
                  )}
                </Select>
              </Box>
              <Box className="accordion_content__right-info">
                <Box
                  position={"relative"}
                  className="box_search"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Autocomplete
                    value={apartamentValue}
                    onChange={(event, newValue: any) => {
                      // setShowError((prev) => (prev = false));

                      if (newValue) {
                        setApartamentValue(newValue);
                        setOptionApartment(newValue?.name);
                        setApartamentId(newValue?._id);
                      } else {
                        // setShowError((prev) => (prev = false));
                        setOptionApartment(newValue);
                      }
                    }}
                    filterOptions={(options: any[], params) => {
                      const filtered = filter(options, params);
                      // setShowError((prev) => (prev = false));
                      if (params.inputValue !== "") {
                      }
                      if (filtered.length === 0) {
                        // setShowError((prev) => (prev = true));
                      }
                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={aprtData}
                    getOptionLabel={(option) => {
                      // if (typeof option === "string") {
                      //   return option;
                      // }
                      // if (option.firstName) {
                      //   return option.firstName;
                      // }
                      return option === "Select Aprt" ? "" : option?.name;
                    }}
                    selectOnFocus
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        style={{ borderBottom: "1px solid #cecece" }}
                        className="dialog_li"
                      >
                        {option === "Select Aprt" ? "sd" : option?.name}
                      </li>
                    )}
                    freeSolo
                    sx={{
                      width: "100%",
                      "& .MuiAutocomplete-inputRoot": {
                        backgroundColor: "#ffffff",
                        height: "37px",
                        fontWeight: "600",
                        fontSize: "12px",
                        borderRadius: "6px",
                        width: "100%",
                        color: "#000",
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
                    onMouseLeave={() => {
                      setApartamentFlag(true);
                    }}
                    onMouseEnter={() => {
                      if (apartamentValue === "") {
                        setApartamentFlag(true);
                      } else {
                        setApartamentFlag(false);
                      }
                    }}
                    disableClearable={apartamentFlag}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        placeholder="Search Apartment"
                        onChange={handleChangeApartment}
                        value={optionValue}
                      />
                    )}
                    PaperComponent={(props) => (
                      <Paper {...props} sx={{ backgroundColor: "#ffffff" }} />
                    )}
                  />
                  {!optionValue.length && (
                    <SearchIcon className="search_icon" />
                  )}
                </Box>
              </Box>
              <Box className="accordion_content__right-info">
                <Box
                  position={"relative"}
                  className="box_search"
                  style={{ width: "100%", height: "100%" }}
                >
                  <Autocomplete
                    value={tenantValue}
                    onChange={(event, newValue: any) => {
                      // setShowError((prev) => (prev = false));
                      if (newValue && newValue?.firstName) {
                        setOptionApartment(newValue?.firstName);
                        setTenantId((prev: any) => {
                          return {
                            ...prev,
                            tenantid: newValue?._id,
                            buildingid: newValue?.apartment?.building?._id,
                          };
                        });
                      } else {
                        // setShowError((prev) => (prev = false));
                        setOptionApartment(newValue);
                      }
                    }}
                    filterOptions={(options: any[], params) => {
                      if (options.length && params) {
                      }
                      const filtered = filter(options, params);
                      // setShowError((prev) => (prev = false));
                      if (params.inputValue !== "") {
                      }
                      if (filtered.length === 0) {
                        // setShowError((prev) => (prev = true));
                      }
                      return filtered;
                    }}
                    id="free-solo-dialog-demo"
                    options={tenantDataReq || [{ firstName: "" }]}
                    getOptionLabel={(option) => {
                      if (typeof option === "string") {
                        return option;
                      }
                      if (option?.firstName) {
                        return option?.firstName;
                      }
                      return option?.firstName;
                    }}
                    selectOnFocus
                    handleHomeEndKeys
                    renderOption={(props, option) => (
                      <li
                        key={option?._id}
                        {...props}
                        style={{ borderBottom: "1px solid #cecece" }}
                        className="dialog_li"
                      >
                        {option?.firstName}
                      </li>
                    )}
                    freeSolo
                    sx={{
                      width: "100%",
                      "& .MuiAutocomplete-inputRoot": {
                        backgroundColor: "#ffffff",
                        height: "37px",
                        fontWeight: "600",
                        fontSize: "12px",
                        borderRadius: "6px",
                        width: "100%",
                        color: "#000",
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
                    onMouseLeave={() => {
                      setTenantFlag(true);
                    }}
                    onMouseEnter={() => {
                      if (apartamentValue === "") {
                        setTenantFlag(true);
                      } else {
                        setTenantFlag(false);
                      }
                    }}
                    disableClearable={tenantFlag}
                    renderInput={(params) => (
                      <TextField
                        onFocus={() => setTenantFlag(false)}
                        onBlur={() => setTenantFlag(true)}
                        onChange={(e) => setTenantValue(e.target.value)}
                        {...params}
                        placeholder="Search Tenant"
                      />
                    )}
                    PaperComponent={(props) => (
                      <Paper {...props} sx={{ backgroundColor: "#ffffff" }} />
                    )}
                  />
                  {!optionApartment && tenantFlag && (
                    <SearchIcon className="search_icon" />
                  )}
                </Box>
              </Box>

              {/* <Box className="accordion_content__right-info">
                <Select
                  labelId="select-option-label5"
                  id="select-option-3"
                  value={optionReceivedBy ? optionReceivedBy : "defaultValue"}
                  placeholder="Parcels Type"
                  className="accordion_content__form-select full-with"
                  sx={selectStyleParcel}
                  onChange={handleChangeSelectReceivedBy}
                >
                  <MenuItem value="defaultValue" disabled>
                    Received by
                  </MenuItem>
                  {tenantData?.map((item) => {
                    return (
                      <MenuItem
                        key={item._id}
                        value={item?.firstName}
                        onClick={() =>
                          setTenantId((prev) => {
                            return {
                              ...prev,
                              recidentId: item._id as string,
                            };
                          })
                        }
                      >
                        {item?.firstName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default TenantInformation;
