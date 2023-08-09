import {
  Container,
  Box,
  FormControl,
  Input,
  MenuItem,
  Select,
  List,
  ListItem,
  ListItemButton,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { testingColumnsBuilding } from "@/utils/tableColumn";
import { TEachService } from "~/types/types";
import { queryRequest } from "@/requests-body/queries";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";
import nodata from "@/assets/icons/nodata.png";
import BackNavigate from "~/reusable/BackNavigate";
import Dropdown from "react-multilevel-dropdown";
import {
  checkboxStyle,
  filterParcelStatus,
  filterParcelType,
} from "@/utils/constant";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useLocation } from "react-router-dom";
import SkeltonLoad from "~/reusable/loader/SkeltonLoad";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";

const BuildingRequests = () => {
  const [totalRows, setTotalRows] = useState(0);
  const { currentPage, handlePageChange } = useControlPagination();
  const [searchVal, setSearchVal] = useState("");
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };

  const location = useLocation();
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);
  const [servicedData, setServicesData] = useState<TEachService[]>([]);
  const success = (data: []) => {
    setServicesData(data);
  };
  const {
    data,
    isLoading: isLoadingServicesReq,
    isSuccess,
    refetch,
  } = queryRequest({
    url: `/service-request/general?buildingId=${
      location.state
    }&offset=${currentPage}&limit=${limitPerPage}${
      searchVal.length && `&searchKey=${searchVal}`
    }`,
    method: "get",
    key: `generalkeyreq + buildings` + location.state + searchVal,
    cb: success,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);

  useEffect(() => {
    if (isSuccess) {
      setTotalRows(data.data.count);
    }
  }, [isSuccess]);

  const [buildingsName, setBuildingsName] = useState<string[]>([]);

  useEffect(() => {
    const buildingNames = [
      ...new Set(servicedData?.map((item: any) => item?.building?.name)),
    ];
    setBuildingsName(buildingNames?.filter((element) => element !== undefined));
  }, [servicedData]);

  const [checkedDate, setCheckedDate] = useState(null);
  return (
    <Container className="requestlist_container">
      <div className="header_table_page">
        <BackNavigate title={"Buildinglist"} />
        <div className="requestlist">
          <div className="request_header">
            <span>Building List Requests</span>
          </div>
        </div>
      </div>

      <Box
        boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
        borderRadius="10px"
        className="box_calendar"
        marginTop="30px"
      >
        <div className="sort_header_building">
          <div className="sort_building">
            <FormControl className="formControl_building">
              <Input
                placeholder="Search"
                className="inputsearch"
                onChange={(e) => {
                  time = setTimeout(() => {
                    setSearchVal(e.target.value);
                  }, 3000);
                }}
              />
              <SearchIcon />
            </FormControl>
            <Dropdown
              title={<SettingIcon />}
              buttonClassName="button_dropdown_list_multi_levels_home"
              menuClassName="menu_dropdown_list_multi_levels_home"
              position="right"
            >
              <Dropdown.Item>
                Type
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list">
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                      {filterParcelType.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                          <ListItem key={value.id} disablePadding>
                            <ListItemButton
                              sx={{ padding: "0 10px" }}
                              role={undefined}
                              // onClick={handleToggleType(
                              //   "type",
                              //   value.filterVal
                              // )}
                              dense
                            >
                              <Checkbox
                                edge="start"
                                // checked={
                                //   checkedType.type === value.filterVal
                                //     ? true
                                //     : false
                                // }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                                sx={checkboxStyle}
                              />

                              <ListItemText
                                id={labelId}
                                primary={`${value.label}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>

              <Dropdown.Item>
                Building
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list">
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                      {buildingsName?.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem key={value} disablePadding>
                            <ListItemButton
                              sx={{ padding: "0 10px" }}
                              role={undefined}
                              // onClick={handleToggleBuilding(value)}
                              dense
                            >
                              <Checkbox
                                edge="start"
                                // checked={
                                //   checkedBuilding.indexOf(value) !== -1
                                // }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                                sx={checkboxStyle}
                              />

                              <ListItemText
                                id={labelId}
                                primary={`Building ${
                                  value[0].toUpperCase() + value.substring(1)
                                }`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                    {/*  */}
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>

              <Dropdown.Item>
                Date
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list date">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <StaticDatePicker
                        displayStaticWrapperAs="desktop"
                        onChange={setCheckedDate}
                        renderInput={() => <TextField />}
                        value={checkedDate}
                        disablePast
                        showDaysOutsideCurrentMonth
                      />
                    </LocalizationProvider>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>

              <Dropdown.Item>
                Status
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list">
                    {/*  */}
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                      {filterParcelStatus.map((value) => {
                        const labelId = `checkbox-list-label-${value}`;

                        return (
                          <ListItem key={value.id} disablePadding>
                            <ListItemButton
                              sx={{ padding: "0 10px" }}
                              role={undefined}
                              // onClick={handleToggleType(
                              //   "status",
                              //   value.value
                              // )}
                              dense
                            >
                              <Checkbox
                                edge="start"
                                // checked={
                                //   checkedType.status === value.value
                                //     ? true
                                //     : false
                                // }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                                sx={checkboxStyle}
                              />

                              <Box
                                sx={{
                                  marginRight: "10px",
                                  lineHeight: "10px",
                                }}
                              >
                                {<value.icon />}
                              </Box>
                              <ListItemText
                                id={labelId}
                                primary={`${value.label}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                    {/*  */}
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
            </Dropdown>
            <div className="sortDiv">
              <span className="sortspan">Sort by:</span>
              <Box sx={{ width: 67, position: "relative" }}>
                <FormControl fullWidth>
                  <SelectIcon className="selecticon" />
                  <Select
                    defaultValue={10}
                    inputProps={{
                      name: "date ",
                      id: "uncontrolled-native",
                    }}
                    //onClick={(event) => handleCheck(event, row.id)}
                  >
                    <MenuItem value={10}>Date</MenuItem>
                    <MenuItem value={20}>Date</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        </div>
        {!isLoadingServicesReq ? (
          servicedData.length >= 1 ? (
            <GeneralTable
              columns={testingColumnsBuilding}
              totalRows={totalRows}
              rows={servicedData}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              additionalInfo={{
                isLoadingServicesReq,
              }}
              limitPerPage={limitPerPage}
              changePageLimit={changePageLimit}
              title="building"
            />
          ) : (
            <div className="no_data building_data">
              <img src={nodata} alt="no data" />
            </div>
          )
        ) : (
          <SkeltonLoad />
        )}
      </Box>
    </Container>
  );
};
export default BuildingRequests;
