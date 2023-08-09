import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Dialog,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  NativeSelect,
  PopperPlacementType,
  TextField,
  Tooltip,
} from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import {
  filterParcelStatus,
  filterParcelType,
  handleChangeStatus,
  parcelsStatusses,
} from "@/utils/constant";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import { ReactComponent as MenuCalendar } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TableIcon } from "@/assets/icons/TableIcon.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import moment from "moment";
import Dropdown from "react-multilevel-dropdown";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AllParcelListContent from "~/reusable/dialog/AllParcelListContent";
import { IData, IParcelManagementTable, parcelProps } from "~/types/types";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { ReactComponent as ReNotifiedIcon } from "@/assets/icons/Re-Notified.svg";
import { ReactComponent as ConfirmedIcon } from "@/assets/icons/Confirmed.svg";
import { ReactComponent as CopyIcon } from "@/assets/icons/CopySvg.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/DeleteSvg.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { useLocation, useNavigate } from "react-router-dom";
import CarouselDialog from "~/reusable/dialog/CarouselDialog";
import { columnsParcel } from "@/utils/tableColumn";
import { queryClient } from "../../../main";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";
import { ContentContext } from "@/context/ParcelContext";

const ParcelManagementTable = ({ isDashboard = false }: parcelProps) => {
  const { state } = useLocation();
  const {
    hideMessage,
    setHideMessage,
    handleShowAlert,
    setOpenListTableContent,
    openListTableContent,
    setTableIndex,
    setMessageSort,
    messagesort,
    setIndexRow,
  }: any = useContext(ContentContext);
  const navigate = useNavigate();
  const [parcelData, setParcelData] = useState<IParcelManagementTable[]>([]);
  const [filteredData, setFilteredData] = useState<IParcelManagementTable[]>(
    []
  );
  const handleMenuClick = (
    listIndex: number,
    rowIndex: number,
    index: string
  ) => {
    setTableIndex(rowIndex);
    setOpenListTableContent(listIndex);
    setIndexRow(index);
    setPlacement("right");
  };
  const handleCloseOpenTableListDialog = () => {
    setOpenListTableContent(0);
  };
  const [totalRows, setTotalRows] = useState(0);
  const [services, setServices] = useState<IData[]>([]);
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, setServiceSearch] = useState("");
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };
  const { data, isSuccess, isLoading, refetch } = queryRequest({
    url: `/service-request/parcels?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `requestKey+${currentPage}` + state?.data,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  const [changeData, setChangeData] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      setParcelData(data?.data?.items);
      setFilteredData(data?.data?.items);
      setChangeData(!changeData);
      setServices(data?.data?.items);
      setTotalRows(data?.data?.count);
    }
  }, [isSuccess, data?.data, data?.data?.items]);

  const [sorttable, setSorttable] = useState("All");
  const handleClick = (label: string) => {
    setSorttable(label);
    setFilteredData(
      sortedData.filter((item) => {
        return item.label === label;
      })[0].data
    );
  };
  const [checkedType, setCheckedType] = useState<{
    type: string;
    status: string;
  }>({ type: "", status: "" });
  const [checkedBuilding, setCheckedBuilding] = useState<string[]>([]);
  const [checkedDate, setCheckedDate] = useState(null);
  const handleToggleType = (value: string, filterVal: string) => () => {
    if (value === "type") {
      setCheckedType((prev) => {
        return { ...prev, type: filterVal };
      });
    } else if ((value = "status")) {
      setCheckedType((prev) => {
        return { ...prev, status: filterVal };
      });
    }
  };

  useEffect(() => {
    if (checkedType.type.length && !checkedType.status.length) {
      setFilteredData(
        parcelData.filter((item) => {
          return item.type === checkedType.type;
        })
      );
    }
    if (checkedType.status.length && !checkedType.type.length) {
      setFilteredData(
        parcelData.filter((item) => {
          return item.status === checkedType.status;
        })
      );
    }
    if (checkedType.status.length && checkedType.type.length) {
      setFilteredData(
        parcelData.filter((item) => {
          return (
            item.status === checkedType.status && item.type === checkedType.type
          );
        })
      );
    }
  }, [checkedType]);

  const handleToggleBuilding = (value: string) => () => {
    const currentIndex = checkedBuilding.indexOf(value);
    const newCheckedBuilding = [...checkedBuilding];

    if (currentIndex === -1) {
      newCheckedBuilding.push(value);
    } else {
      newCheckedBuilding.splice(currentIndex, 1);
    }

    setCheckedBuilding(newCheckedBuilding);
  };

  const checkboxStyle = {
    "& .MuiSvgIcon-root": {
      width: "15px",
      height: "15px",
      borderRadius: "4px",
    },
    color: "#A1A1A1",
    borderWidth: "2px",
    padding: "10px",
  };

  const ReNotifyTenant = () => {
    handleShowAlert(
      ReNotifiedIcon,
      "A reminder was sent to the tenant.",
      "Re-Notified",
      "request"
    );
  };
  const ConfirmedParcels = () => {
    handleShowAlert(
      ConfirmedIcon,
      "Parcel delivery has been confirmed",
      "Confirmed",
      "request"
    );
  };
  const handleCopy = (element?: string) => {
    if (element) {
      navigator.clipboard.writeText(element);
    }
    handleShowAlert(CopyIcon, "Parcel link has been Copied!", "Copied", "copy");
  };

  const [selectedRow, setSelectedRow] = useState("");
  const {
    mutate: { mutate: deleteParcelRequest },
  } = mutationRequest({
    url: `/service-request/parcels/${selectedRow}`,
    method: "delete",
    isAuth: true,
  });
  const [deleteLoading, setDeleteLoading] = useState("");
  const handleDeclined = (id: string) => {
    setDeleteLoading(id);
    deleteParcelRequest(
      {
        id,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(["requestKey+10000" + state?.data]);
          handleShowAlert(
            DeleteIcon,
            "Parcel has been declined!",
            "Declined",
            "delete"
          );
          setLoadingStatus("");
        },
      }
    );
  };
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

  const [sortedData, setSortedData] = useState<any[]>([]);
  useEffect(() => {
    const array = parcelData
      ?.map((item) => {
        return item?.type;
      })
      .filter((item) => item !== undefined);

    const result = [...new Set(array)].reduce(
      (
        obj: { id: number; label?: string; data?: IParcelManagementTable[] }[],
        itemobj,
        index
      ) => {
        const sortreqdata = parcelData.filter((item) => {
          return item.type === itemobj;
        });
        obj.push({ id: index + 1, label: itemobj, data: sortreqdata });
        return obj;
      },
      []
    );
    setSortedData([{ id: 0, label: "All", data: parcelData }, ...result]);
  }, [changeData]);

  const [buildingsName, setBuildingsName] = useState<string[]>([]);
  useEffect(() => {
    // Extract unique building names and set them to state
    const buildingNames = [
      ...new Set(filteredData.map((item: any) => item?.building?.name)),
    ];
    setBuildingsName(buildingNames.filter((element) => element !== undefined));
  }, [parcelData, filteredData]);

  const handleSortDate = (label: string) => {
    const sortedDataCopy = [...filteredData];
    setFilteredData(
      sortedDataCopy.sort((date1, date2) => {
        if (label === "Old date") {
          return (
            Date.parse(date1.scheduleDateTo.split("T")[0]) -
            Date.parse(date2.scheduleDateTo.split("T")[0])
          ); // sort by newest to oldest
        } else {
          return (
            Date.parse(date2.scheduleDateTo.split("T")[0]) -
            Date.parse(date1.scheduleDateTo.split("T")[0])
          ); // sort by oldest to newest
        }
      })
    );
  };

  const handleHeaderFilter = (value: any) => {
    let matches = parcelData.filter((object) => {
      return (
        object?.owner?.firstName.toLowerCase().includes(value.toLowerCase()) ||
        (object?.name &&
          object?.name?.toLowerCase().includes(value.toLowerCase())) ||
        (object?.type &&
          object?.type?.toLowerCase().includes(value.toLowerCase())) ||
        object?.owner?.tenantInfo?.apartmentNumber
          ?.toString()
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        object?.building?.name.toLowerCase().includes(value.toLowerCase()) ||
        moment(object?.scheduleDateTo)
          ?.format("ddd, MM YYYY")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        moment(object?.scheduleDateTo)
          ?.format("[At] hh:mm a")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        object?.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(matches);
  };
  const [open, setOpen] = useState(false);
  const [parcelItem, setParcelItem] = useState<
    IParcelManagementTable[] | any
  >();

  const handleOutsideClickSub = (event: MouseEvent | TouchEvent) => {
    if (subRef.current && subRef.current !== event.target) {
      setAnchorElSub(null);
      setRequestid("");
    }
  };
  const [anchorElSub, setAnchorElSub] = useState<
    null | (EventTarget & Element)
  >(null);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const subOpen = Boolean(anchorElSub);
  const subRef = useRef<HTMLDivElement>(null);
  const [requestId, setRequestid] = useState<any>();
  const { mutate } = mutationRequest({
    url: `/service-request/parcels/status`,
    method: "post",
    isAuth: true,
  });

  const [loadingStatus, setLoadingStatus] = useState("");

  const [changeCalendar, setChangeCalendar] = useState(false);
  const handleClickCalendar = () => {
    setChangeCalendar((prev) => !prev);
  };
  const [showTooltip, setShowTooltip] = useState(false);
  if (!isLoading) {
    return (
      <>
        {hideMessage && (
          <div className="content content_alert">
            <MessageAlert messagesort={messagesort} />
          </div>
        )}
        <Container className="parcel_managemnt">
          {!isDashboard && (
            <>
              <BackNavigate title="Parcels" />
              <div className="header">
                <span className="span">Parcels Management</span>
                <Button
                  variant="contained"
                  className="btn"
                  onClick={() => navigate("/parcels/addparcels")}
                >
                  <AddIcon />
                  Add Parcel request
                </Button>
              </div>
              <div className="sortdiv">
                <div className="filter">
                  {sortedData.map((item, index) => {
                    return (
                      <Button
                        variant="contained"
                        key={item.id}
                        className={`sort ${
                          sorttable?.length
                            ? sorttable === item.label
                              ? "activesort"
                              : ""
                            : index === 0
                            ? "activesort"
                            : ""
                        }`}
                        onClick={() => handleClick(item.label)}
                      >
                        <span className="sort_filter_item">
                          {item.label.toLowerCase()}
                        </span>
                        <div>{item.data.length}</div>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </>
          )}
          <Box
            boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            borderRadius="10px"
            className="parcel_managemnt_box"
          >
            <div className="sort" style={{ position: "relative" }}>
              <div className="sort_left_side">
                <div className="search_setting">
                  <FormControl className="formControl">
                    <Input
                      placeholder="Search"
                      className="inputsearch"
                      onChange={(e) => handleHeaderFilter(e.target.value)}
                    />
                    <SearchIcon />
                  </FormControl>

                  <Dropdown
                    title={<SettingIcon />}
                    buttonClassName="button_dropdown_list_multi_levels"
                    menuClassName="menu_dropdown_list_multi_levels"
                    position="right"
                  >
                    <Dropdown.Item>
                      Type
                      <Dropdown.Submenu position="right">
                        <Dropdown.Item className="inner_list">
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                            }}
                          >
                            {filterParcelType.map((value) => {
                              const labelId = `checkbox-list-label-${value}`;
                              return (
                                <ListItem key={value.id} disablePadding>
                                  <ListItemButton
                                    sx={{ padding: "0 10px" }}
                                    role={undefined}
                                    onClick={handleToggleType(
                                      "type",
                                      value.filterVal
                                    )}
                                    dense
                                  >
                                    <Checkbox
                                      edge="start"
                                      checked={
                                        checkedType.type === value.filterVal
                                          ? true
                                          : false
                                      }
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
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                            }}
                          >
                            {buildingsName.map((value) => {
                              const labelId = `checkbox-list-label-${value}`;

                              return (
                                <ListItem key={value} disablePadding>
                                  <ListItemButton
                                    sx={{ padding: "0 10px" }}
                                    role={undefined}
                                    onClick={handleToggleBuilding(value)}
                                    dense
                                  >
                                    <Checkbox
                                      edge="start"
                                      checked={
                                        checkedBuilding.indexOf(value) !== -1
                                      }
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
                                        value[0].toUpperCase() +
                                        value.substring(1)
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
                          <List
                            sx={{
                              width: "100%",
                              bgcolor: "background.paper",
                            }}
                          >
                            {filterParcelStatus.map((value) => {
                              const labelId = `checkbox-list-label-${value}`;

                              return (
                                <ListItem key={value.id} disablePadding>
                                  <ListItemButton
                                    sx={{ padding: "0 10px" }}
                                    role={undefined}
                                    onClick={handleToggleType(
                                      "status",
                                      value.value
                                    )}
                                    dense
                                  >
                                    <Checkbox
                                      edge="start"
                                      checked={
                                        checkedType.status === value.value
                                          ? true
                                          : false
                                      }
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
                </div>
                <div className="sortDiv">
                  <span className="sortspan">Sort by:</span>
                  <Box sx={{ width: 185, position: "relative" }}>
                    <FormControl fullWidth>
                      <SelectIcon className="selecticon" />
                      <NativeSelect
                        defaultValue={"all"}
                        inputProps={{
                          name: "date ",
                          id: "uncontrolled-native",
                        }}
                        onChange={(e) => handleSortDate(e.target.value)}
                      >
                        <option value={"New date"}>
                          Sort Newest to Oldest
                        </option>
                        <option value={"Old date"}>
                          Sort Oldest to Newest
                        </option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
                </div>
              </div>
              <Button
                variant="contained"
                className="btn_calendar"
                onClick={handleClickCalendar}
              >
                {!changeCalendar ? (
                  <>
                    <MenuCalendar />
                    Switch to Calendar view
                  </>
                ) : (
                  <>
                    <TableIcon />
                    Switch to Table view
                  </>
                )}
              </Button>
              {changeCalendar ? (
                <Tooltip
                  title={`Add Request`}
                  arrow
                  // open={showTooltip && row?._id === requestId}
                  className="tooltip_table"
                  // disableInteractive
                  placement="top"
                  // open={true}
                >
                  <div
                    style={{
                      position: "absolute",
                      right: "230px",

                      cursor: "pointer",
                      fill: "black",
                      top: "20px",
                      // opacity: "0.6",
                    }}
                    onClick={() => navigate("/parcels/addparcels")}
                  >
                    <AddIcon
                      style={{
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                </Tooltip>
              ) : null}
            </div>

            <GeneralTable
              columns={columnsParcel}
              totalRows={totalRows}
              rows={services}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              additionalInfo={{
                setRequestid,
                loadingStatus,
                setLoadingStatus,
                handleChangeStatus: handleChangeStatus({
                  data: services,
                  setLoadingStatus,
                  requestId,
                  mutate,
                  setRequestid,
                  refetch,
                }),
                hideMessage,
                setHideMessage,
                changeCalendar,
                requestId,
                handleMenuClick,
                isLoadingServicesReq: isLoading,
                showTooltip,
                setShowTooltip,
                setOpen,
                setParcelItem,
                filteredData,
                setSelectedRow,
                ReNotifyTenant,
                deleteLoading,
                ConfirmedParcels,
                handleDeclined,
              }}
              limitPerPage={limitPerPage}
              changePageLimit={changePageLimit}
              title="parcels"
            />

            {!!openListTableContent && (
              <div className="close" onClick={handleCloseOpenTableListDialog}>
                <Elipse />
                <CloseIcon />
              </div>
            )}
            <Dialog open={!!openListTableContent} className="action">
              <AllParcelListContent />
            </Dialog>
          </Box>

          {!!open && (
            <div className="close" onClick={() => setOpen(false)}>
              <Elipse />
              <CloseIcon />
            </div>
          )}
          {parcelItem && (
            <CarouselDialog
              addedbanner={open}
              data={parcelItem}
              parcel={true}
              onClose={setOpen}
            />
          )}
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default ParcelManagementTable;
