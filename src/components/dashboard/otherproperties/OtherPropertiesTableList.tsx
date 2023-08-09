import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import {
  availablePropertyDropDown,
  notavailableProperyDropDown,
  propertySort,
} from "@/utils/constant";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as HoldIcon } from "@/assets/icons/holdProperty.svg";
import { queryRequest } from "@/requests-body/queries";
import moment from "moment";
import Dropdown from "react-multilevel-dropdown";
import MessageAlert from "~/reusable/MessageAlert";
import OtherPropertiesContent from "~/reusable/dialog/OtherPropertiesContent";
import { ReactComponent as OtherPropertiesIcon } from "@/assets/icons/OtherPropertiesIconWhite.svg";
import { useNavigate } from "react-router-dom";
import TableSort from "./propertyTable/TableSort";
import { ReactComponent as NotAvailable } from "@/assets/icons/NotAvailable.svg";
import { ReactComponent as SendToApartmentIcon } from "@/assets/icons/SendToApartmentIcon.svg";
import { ReactComponent as WaitingResponseBlueIcon } from "@/assets/icons/WaitingResponseBlueIcon.svg";
import { columnsOther } from "@/utils/tableColumn";
import { IPropertyListTable } from "~/types/types";
import { ContentContext } from "@/context/OtherPropertiesContext";

const OtherPropertiesRequest = () => {
  const [parcelData, setParcelData] = useState<IPropertyListTable[]>([]);
  const [filteredData, setFilteredData] = useState<IPropertyListTable[]>([]);
  const {
    setOpenContent,
    setTableIndex,
    openContent,
    hideMessage,
    messagesort,
  } = useContext<any>(ContentContext);
  // const { setOpenContent, setTableIndex, openContent, hideMessage, messagesort } = useContext<Partial<ContextType | null>>(ContentContext);
  const handleMenuClick = (listIndex: number, rowIndex: number) => {
    setTableIndex(rowIndex);
    setOpenContent(listIndex);
  };
  const handleCloseOpenTableListDialog = () => {
    setOpenContent(0);
  };

  const { data, isSuccess, isLoading } = queryRequest({
    url: `/service/other_properties?offset=0&limit=10000`,
    method: "get",
    key: "requestKey",
  });
  useEffect(() => {
    if (isSuccess) {
      setParcelData(data?.data?.items);
      setFilteredData(data?.data?.items);
    }
  }, [isSuccess, data?.data]);
  const [openparcelreq, setOpenparcelreq] = useState(false);

  const [sorttable, setSorttable] = useState("All");
  const handleClick = (label: string) => {
    setSorttable(label);
    setFilteredData(
      parcelData?.filter((item) => {
        return label === "All" ? true : item.status === label;
      })
    );
  };
  const handleAddRequest = () => {
    setOpenparcelreq(true);
  };
  const handleClose = () => {
    setOpenparcelreq(false);
  };
  const [checkedType, setCheckedType] = useState<string[]>([]);
  const [checkedBuilding, setCheckedBuilding] = useState<string[]>([]);
  const [checkedDate, setCheckedDate] = useState(null); // date picker
  const [checkedStatus, setCheckedStatus] = useState<string[]>([]);
  const handleToggleType = (value: string) => () => {
    const currentIndex = checkedType.indexOf(value);
    const newCheckedType = [...checkedType];

    if (currentIndex === -1) {
      newCheckedType.push(value);
    } else {
      newCheckedType.splice(currentIndex, 1);
    }

    setCheckedType(newCheckedType);
  };
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
  const handleToggleStatus = (value: string) => () => {
    const currentIndex = checkedStatus.indexOf(value);
    const newCheckedStatus = [...checkedStatus];

    if (currentIndex === -1) {
      newCheckedStatus.push(value);
    } else {
      newCheckedStatus.splice(currentIndex, 1);
    }

    setCheckedStatus(newCheckedStatus);
  };

  const filteredDataList = () => {
    const filteredData = parcelData?.filter((item) => {
      return (
        (checkedDate &&
          moment(new Date(Date.parse(checkedDate))).format("YYYY-MM-DD") ===
            item?.createdAt?.split("T")[0]) ||
        (checkedStatus.length && checkedStatus.includes(item.status))
      );
    });
    if (filteredData.length) {
      setFilteredData(filteredData);
    } else {
      parcelData?.length && setFilteredData(parcelData);
    }
  };
  useEffect(() => {
    filteredDataList();
  }, [checkedType, checkedBuilding, checkedStatus, checkedDate]);
  // const handleCopy = (element?: string) => {
  //   if (element) {
  //     navigator.clipboard.writeText(element);
  //   }
  //   handleShowAlert(CopyIcon, "Parcel link has been Copied!", "Copied", "copy");
  // };
  const navigate = useNavigate();

  const handleSortDate = (label: string) => {
    const sortedDataCopy = [...filteredData];
    setFilteredData(
      sortedDataCopy.sort((date1, date2) => {
        if (label === "Old date") {
          return (
            Date.parse(date1?.createdAt.split("T")[0]) -
            Date.parse(date2?.createdAt.split("T")[0])
          );
        } else {
          return (
            Date.parse(date2?.createdAt.split("T")[0]) -
            Date.parse(date1?.createdAt.split("T")[0])
          );
        }
      })
    );
  };

  const handleHeaderFilter = (value: any) => {
    let matches = parcelData.filter((object) => {
      return (
        (object?.name &&
          object?.name.toLowerCase().includes(value.toLowerCase())) ||
        (object?.building &&
          object?.building.toLowerCase().includes(value.toLowerCase())) ||
        object?.facilities.some((facility) =>
          facility.toLowerCase().includes(value.toLowerCase())
        ) ||
        object?.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(matches);
  };

  if (!isLoading) {
    return (
      <>
        {hideMessage && (
          <div className="content content_alert">
            <MessageAlert messagesort={messagesort} />
          </div>
        )}
        <Container className="property_managemnt">
          <BackNavigate title="Properties" />
          <div className="header">
            <span className="span">Properties list </span>
            <div className="btn_container">
              <Button
                variant="contained"
                className="btn request"
                onClick={handleAddRequest}
              >
                <AddIcon />
                Add Property Request
              </Button>
              <Button
                variant="contained"
                className="btn add"
                onClick={() => navigate("/otherproperties/addotherproperties")}
              >
                <OtherPropertiesIcon />
                Add New Property
              </Button>
            </div>
          </div>
          <div className="sortdiv">
            <div className="filter">
              {propertySort.map((item, index) => {
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
                    <span className="sort_filter_item">{item.label}</span>
                    <div>{item.count}</div>
                  </Button>
                );
              })}
            </div>
          </div>
          <Box
            boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            borderRadius="10px"
          >
            <TableContainer className="table">
              <TableSort
                setCheckedDate={setCheckedDate}
                checkedDate={checkedDate}
                checkedType={checkedType}
                setCheckedType={setCheckedType}
                handleHeaderFilter={handleHeaderFilter}
                handleSortDate={handleSortDate}
              />
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    {columnsOther.map((col, index) => (
                      <TableCell key={index} align={col.align || "center"}>
                        {col.headerName}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredData?.map((row, index) => {
                    return (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>
                          <div className="imageDiv">
                            <img
                              src={row?.images[0]?.url || row?.icon?.url}
                              alt="image"
                              className="property"
                            />
                            <div className="info">
                              <span className="tenant">{row?.name}</span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="building_table">
                            <span className="name">{row?.building}</span>
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="facility">
                            {row?.facilities?.map((item, id) => {
                              return <span key={id}>{item}</span>;
                            })}
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ position: "relative" }}
                        >
                          <div className={`status_property ${row.status}`}>
                            {row?.status === "hold" ? (
                              <HoldIcon className="status_property__svg" />
                            ) : row?.status === "active" ? (
                              <SendToApartmentIcon className="status_property__svg" />
                            ) : row?.status === "scheduled" ? (
                              <WaitingResponseBlueIcon className="status_property__svg" />
                            ) : row?.status === "rejected" ? (
                              <NotAvailable className="status_property__svg" />
                            ) : (
                              <></>
                            )}
                            <span className={`status ${row.status}`}>
                              {row.status?.replace(/([a-z])([A-Z])/g, "$1 $2")}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ position: "relative" }}
                        >
                          <div className="action">
                            <div className="arrow_container">
                              <Dropdown
                                title={<Arrow />}
                                buttonClassName="button_dropdown_list_multi_levels"
                                menuClassName="menu_dropdown_list_multi_levels"
                                wrapperClassName="wrapper_dropdown_list_multi_levels"
                                position="left"
                              >
                                {row?.status === "hold" ||
                                row?.status === "available" ? (
                                  <>
                                    {availablePropertyDropDown.map(
                                      (item, index) => {
                                        return (
                                          <Dropdown.Item
                                            key={index}
                                            onClick={() =>
                                              handleMenuClick(
                                                item.id,
                                                index + 1
                                              )
                                            }
                                          >
                                            {item.label}
                                          </Dropdown.Item>
                                        );
                                      }
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {notavailableProperyDropDown.map(
                                      (item, index) => {
                                        return (
                                          <Dropdown.Item
                                            key={index}
                                            onClick={() =>
                                              handleMenuClick(
                                                item.id,
                                                index + 1
                                              )
                                            }
                                          >
                                            {item.label}
                                          </Dropdown.Item>
                                        );
                                      }
                                    )}
                                  </>
                                )}
                              </Dropdown>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>

            {!!openparcelreq && (
              <div className="close" onClick={handleClose}>
                <Elipse />
                <CloseIcon />
              </div>
            )}
            <Dialog
              open={openparcelreq}
              onClose={handleClose}
              className="action"
            >
              <DialogContent>{/* <AllAmenityListContent /> */}</DialogContent>
            </Dialog>

            {/*  */}
            {!!openContent && (
              <div className="close" onClick={handleCloseOpenTableListDialog}>
                <Elipse />
                <CloseIcon />
              </div>
            )}
            <Dialog open={!!openContent} className="action">
              <OtherPropertiesContent />
            </Dialog>
            {/*  */}
          </Box>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default OtherPropertiesRequest;
