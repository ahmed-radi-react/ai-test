import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
} from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { handleChangeStatus, propertySort } from "@/utils/constant";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import BackNavigate from "~/reusable/BackNavigate";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { IPropertyRequestProp, IPropertyRequestTable } from "~/types/types";
import { ReactComponent as CopyIcon } from "@/assets/icons/CopySvg.svg";
import MessageAlert from "~/reusable/MessageAlert";
import AllListContent from "../AllListContent";
import { columnsOtherProperties } from "@/utils/tableColumn";
import TableSort from "./TableSort";
import { ContentContext } from "@/context/OtherPropertiesContext";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";

const OtherPropertiesTableRequest = ({
  isDashboard = false,
}: IPropertyRequestProp) => {
  const {
    setOpenContent,
    handleShowAlert,
    openContent,
    hideMessage,
    messagesort,
    setPropertyIndex,
    setIndexNumber,
  }: any = useContext(ContentContext);
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, _] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };
  const {
    data: otherPropertiesReq,
    isSuccess,
    isLoading,
    refetch,
  } = queryRequest({
    url: `/service-request/other_properties?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `other_propertyKey + ${currentPage}`,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  // const { setOpenContent, handleShowAlert,  openContent, hideMessage, messagesort, setPropertyIndex, setIndexNumber } = useContext<Partial<ContextType | null>>(ContentContext);
  const [propertData, setpropertData] = useState<IPropertyRequestTable[]>([]);
  const [filteredData, setFilteredData] = useState<IPropertyRequestTable[]>([]);
  const handleMenuClick = (listIndex: number, rowIndex: number) => {
    if (listIndex === 5) {
      navigator.clipboard.writeText("");
      handleShowAlert(
        CopyIcon,
        "Property link has been Copied!",
        "Copied",
        "copy"
      );
    } else {
      setIndexNumber(rowIndex);
      setOpenContent(listIndex);
    }
  };
  const handleCloseOpenTableListDialog = () => {
    setOpenContent(0);
  };

  useEffect(() => {
    if (isSuccess) {
      setpropertData(otherPropertiesReq?.data?.items);
      setFilteredData(otherPropertiesReq?.data?.items);
      setTotalRows(otherPropertiesReq?.data?.count);
    }
  }, [isSuccess]);
  const [openparcelreq, setOpenparcelreq] = useState(false);
  const [sorttable, setSorttable] = useState("All");
  const handleClick = (label: string) => {
    setSorttable(label);
    // setFilteredData(
    //   propertData.filter((item) => {
    //     return label === "All" ? true : item.status === label;
    //   })
    // );
  };
  const handleAddRequest = () => {
    setOpenparcelreq(true);
  };
  const handleClose = () => {
    setOpenparcelreq(false);
  };
  const [checkedType, setCheckedType] = useState<string[]>([]);
  const [checkedBuilding, setCheckedBuilding] = useState<string[]>([]);
  const [checkedDate, setCheckedDate] = useState(null);
  const [checkedStatus, setCheckedStatus] = useState<string[]>([]);

  // const handleToggleBuilding = (value: string) => () => {
  //   const currentIndex = checkedBuilding.indexOf(value);
  //   const newCheckedBuilding = [...checkedBuilding];

  //   if (currentIndex === -1) {
  //     newCheckedBuilding.push(value);
  //   } else {
  //     newCheckedBuilding.splice(currentIndex, 1);
  //   }

  //   setCheckedBuilding(newCheckedBuilding);
  // };
  // const handleToggleStatus = (value: string) => () => {
  //   const currentIndex = checkedStatus.indexOf(value);
  //   const newCheckedStatus = [...checkedStatus];

  //   if (currentIndex === -1) {
  //     newCheckedStatus.push(value);
  //   } else {
  //     newCheckedStatus.splice(currentIndex, 1);
  //   }

  //   setCheckedStatus(newCheckedStatus);
  // };
  // const filteredDataList = () => {
  //   const filteredData = propertData?.filter((item) => {
  //     return (
  //       (checkedDate &&
  //         moment(new Date(Date.parse(checkedDate))).format("YYYY-MM-DD") ===
  //           item?.scheduleDateTo.split("T")[0]) ||
  //       (checkedStatus.length && checkedStatus.includes(item.status))
  //     );
  //   });
  //   if (filteredData.length) {
  //     // setFilteredData(filteredData);
  //   } else {
  //     // propertData.length && setFilteredData(propertData);
  //   }
  // };
  // useEffect(() => {
  //   filteredDataList();
  // }, [checkedType, checkedBuilding, checkedStatus, checkedDate]);

  const handleHeaderFilter = (value: any) => {
    let matches = propertData.filter((object) => {
      return (
        (object?.owner?.firstName &&
          object?.owner?.firstName
            .toLowerCase()
            .includes(value.toLowerCase())) ||
        (object?.building &&
          object?.building.toLowerCase().includes(value.toLowerCase())) ||
        // object?.facilities.some(facility => facility.toLowerCase().includes(value.toLowerCase())) ||
        object?.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(matches);
  };
  const handleSortDate = (label: string) => {
    const sortedDataCopy = [...filteredData];
    setFilteredData(
      sortedDataCopy.sort((date1, date2): any => {
        if (date1.scheduleDateTo && date2.scheduleDateTo) {
          if (label === "New date") {
            return (
              Date.parse(date1.scheduleDateTo.split("T")[0]) -
              Date.parse(date2.scheduleDateTo.split("T")[0])
            );
          } else {
            return (
              Date.parse(date2.scheduleDateTo.split("T")[0]) -
              Date.parse(date1.scheduleDateTo.split("T")[0])
            );
          }
        }
      })
    );
  };

  const [requestId, setRequestId] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState("");
  const { mutate } = mutationRequest({
    url: "/service-request/other_properties/status",
    method: "post",
    isAuth: true,
  });

  if (!isLoading) {
    return (
      <>
        {hideMessage && (
          <div className="content content_alert">
            <MessageAlert messagesort={messagesort} />
          </div>
        )}
        <Container
          className={`property_managemnt ${isDashboard ? "r-padding" : ""}`}
        >
          {!isDashboard && (
            <>
              <BackNavigate title="Other Properties" />
              <div className="header">
                <span className="span">Properties Requests</span>
                <div className="btn_container">
                  <Button
                    variant="contained"
                    className="btn request"
                    onClick={handleAddRequest}
                  >
                    <AddIcon />
                    Add Property Request
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
            </>
          )}
          <Box
            boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            borderRadius="10px"
          >
            {!isDashboard && (
              <TableSort
                setCheckedDate={setCheckedDate}
                checkedDate={checkedDate}
                checkedType={checkedType}
                setCheckedType={setCheckedType}
                handleHeaderFilter={handleHeaderFilter}
                handleSortDate={handleSortDate}
              />
            )}

            <GeneralTable
              columns={columnsOtherProperties}
              totalRows={totalRows as number}
              rows={propertData}
              currentPage={currentPage as number}
              handlePageChange={
                handlePageChange as (event: any, page: number) => void
              }
              additionalInfo={{
                loadingStatus,
                setLoadingStatus,
                handleChangeStatus: handleChangeStatus({
                  data: propertData,
                  setLoadingStatus,
                  requestId,
                  mutate,
                  setRequestid: setRequestId,
                  refetch,
                }),
                hideMessage,
                requestId,
                handleMenuClick,
                isLoadingServicesReq: isLoading as boolean,
                setRequestid: setRequestId,
                setPropertyIndex,
              }}
              limitPerPage={limitPerPage}
              changePageLimit={changePageLimit}
              title="other_properties"
            />
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
              <DialogContent>{/* <AddParcelRequestDialog /> */}</DialogContent>
            </Dialog>
            {!!openContent && (
              <div className="close" onClick={handleCloseOpenTableListDialog}>
                <Elipse />
                <CloseIcon />
              </div>
            )}
            <Dialog open={!!openContent} className="action">
              <AllListContent />
            </Dialog>
          </Box>
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};
export default OtherPropertiesTableRequest;
