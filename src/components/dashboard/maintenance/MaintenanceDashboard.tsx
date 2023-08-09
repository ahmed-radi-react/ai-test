import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogContent,
} from "@mui/material";
import {
  handleChangeStatus,
  maintenance,
  maintenanceOverview,
} from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { ReactComponent as SettingAddIcon } from "@/assets/icons/settingIcon.svg";
import RequestDialog from "~/reusable/RequestDialog";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { ReactComponent as CopySvg } from "@/assets/icons/CopySvg.svg";

import MessageAlert from "~/reusable/MessageAlert";
import { IFeedBack, ISortedData, IsetSetting } from "~/types/types";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";
import { SortHeader } from "~/reusable/RequestListComponents/SortHeader";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";
import { columnsMaintenance } from "@/utils/tableColumn";
import FeedBackDialog from "~/reusable/dialog/FeedBackDialog";
import { ContentContextServiceList } from "@/context/ServiceListContext";
import AllAmenityListContent from "~/reusable/dialog/AllListContent";
import CarouselChunk from "~/reusable/RequestListComponents/CarouselChunk";

const MaintenanceDashboard = ({
  setSetting,
  isOnlyList,
  setMaintenanceDataForParent,
}: IsetSetting) => {
  const [maintenanceData, setMaintenanceData] = useState<any>();
  const {
    setOpenContent,
    openContent,
    setHideMessage,
    hideMessage,
    setMessageSort: setMessageSortList,
    messagesort: messagesortList,
    setTitle,
    setIndex,
    index,
    setChangeCalendar,
    changeCalendar,
    sorttable,
    setSorttable,
  }: any = useContext(ContentContextServiceList);
  const [services, setServices] = useState<any[]>([]);
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, setServiceSearch] = useState("");
  const [error, setError] = useState(false);
  const [openReq, setOpenReq] = useState(false);
  const [hideMessageReq, setHideMessageReq] = useState(false);
  const navigate = useNavigate();
  const [maintenanceOverViewReq, setMaintenanceOverViewReq] =
    useState(maintenanceOverview);
  const [totalRows, setTotalRows] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };

  const { data, isSuccess, isLoading } = queryRequest({
    url: `/service/${maintenance}?parentId=63b41be442916b799adf2ac7&offset=0&limit=100`,
    method: "get",
    key: "maintenancekey",
  });
  const {
    data: maintenanceReq,
    isSuccess: maintenanceReqIsSuccess,
    isLoading: isLoadingServicesReq,
    refetch,
  } = queryRequest({
    url: `/service-request/${maintenance}?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `requestMaintenanceKey+${currentPage}`,
    cb: setServices,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  const handleClick = () => {
    setSetting && setSetting(false);
  };
  useEffect(() => {
    if (isSuccess) {
      setMaintenanceData(data.data);
      setMaintenanceDataForParent && setMaintenanceDataForParent(data.data);
    }
  }, [data]);
  useEffect(() => {
    if (maintenanceReqIsSuccess) {
      setMaintenanceOverViewReq((prev) =>
        StatusCounterCard({
          prev,
          data: maintenanceReq,
        })
      );
      setTotalRows(maintenanceReq.data.count);
    }
  }, [maintenanceReqIsSuccess]);

  const [message, setMessage] = useState("");
  const handleClickCalendar = () => {
    setChangeCalendar((prev: boolean) => !prev);
  };
  const [checkedDate, setCheckedDate] = useState(null);
  const [requestId, setRequestid] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState("");
  const { mutate } = mutationRequest({
    url: `/service-request/maintenance/status`,
    method: "post",
    isAuth: true,
  });

  const handleMenuClick = (index: number) => {
    if (index === 5) {
      setHideMessage(true);
      setMessageSortList({
        icon: CopySvg,
        message: "Amenity link has been Copied!",
        title: "Copied",
        style: "copy",
      });
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
      return;
    } else if (index !== 6) {
      setOpenContent(index);
    } else {
      setOpenContent(index);
    }
  };
  const [showTooltipFeedBack, setShowTooltipFeedBack] = useState(false);
  const [feedBackOpen, setFeedBackOpen] = useState(false);
  const [selectedFeedBack, setSelectedFeedBack] = useState<IFeedBack>();
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    setTitle("Maintenance");
  }, []);

  const [sortedData, setSortedData] = useState<ISortedData[]>([]);
  const handleClickCarousle = (label: string) => {
    setSorttable(label);
    if (label === "All") {
      setServices(maintenanceReq?.data?.items);
    } else {
      setServices(
        sortedData.filter((item) => {
          return item.label === label;
        })[0].data
      );
    }
  };
  useEffect(() => {
    if (maintenanceReqIsSuccess) {
      const array = maintenanceReq.data.items?.map((item: any) => {
        return { name: item.service.name, idx: item.service._id };
      });

      const result = [...new Set(array)].reduce(
        (
          acc: {
            id: number;
            label: string;
            data: any;
            image: string;
            idx: string;
          }[],
          itemobj: any,
          index
        ) => {
          if (acc.some((item) => item.idx === itemobj?.idx)) {
            return acc;
          }

          const sortreqdata = maintenanceReq.data.items?.filter((item: any) => {
            return item.service.name === itemobj?.name;
          });
          acc.push({
            id: index + 1,
            label: itemobj?.name,
            idx: itemobj?.idx,
            data: sortreqdata,
            image: data?.data?.items
              .filter((item: { bookable: boolean }) => item.bookable === true)
              .filter((item: { _id: string }) => item._id === itemobj?.idx)[0]
              ?.images[0]?.url,
          });
          return acc;
        },
        []
      );
      setSortedData([
        {
          id: 0,
          label: "All",
          data: [],
        },
        ...result,
      ]);
    }
  }, [maintenanceReqIsSuccess]);
  const handleCloseReq = () => {
    setOpenReq(false);
  };
  if (!isLoading) {
    return (
      <>
        {hideMessageReq && (
          <div className="content content_alert">
            <MessageAlert
              messagesort={
                error
                  ? {
                      icon: Canceled,
                      message: message,
                      title: "Canceled",
                      style: "delete amenReq",
                    }
                  : {
                      icon: DoneSvg,
                      message: "Request has been added Successfully",
                      title: "Done",
                      style: "request reqamen",
                    }
              }
            />
          </div>
        )}
        <Container
          className={`maintenance ${isOnlyList ? "maitenanceList" : ""}`}
        >
          {isOnlyList ? (
            <></>
          ) : (
            <>
              <div className="maintenance_header">
                <span className="header_span">Maintenance</span>
                <div className="btn">
                  <Button
                    variant="contained"
                    className="setting_btn"
                    onClick={handleClick}
                  >
                    <SettingsIcon />
                    Setting
                  </Button>
                  <Button
                    onClick={() => setOpenReq(true)}
                    variant="contained"
                    className="add_btn"
                  >
                    <AddIcon />
                    Add Maintenance Request
                  </Button>
                  <Button
                    onClick={() => navigate("addmaintenance")}
                    variant="contained"
                    className="setting_add_btn"
                  >
                    <SettingAddIcon />
                    Add New Maintenance
                  </Button>
                </div>
              </div>
              <Overview title={"Maintenance"} data={maintenanceOverViewReq} />
            </>
          )}
          <Container
            className={`requestlist_container ${
              isOnlyList ? "" : "req_dashboard"
            }`}
          >
            <Box
              boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
              borderRadius="10px"
              className="box_calendar"
            >
              {isOnlyList ? (
                <CarouselChunk
                  title={"Maintenance"}
                  sorttable={sorttable}
                  dashboard={false}
                  sortedData={sortedData}
                  setSorttable={setSorttable}
                  handleClick={handleClickCarousle}
                />
              ) : null}
              <SortHeader
                changeCalendar={changeCalendar}
                url={maintenance}
                handleClickCalendar={handleClickCalendar}
                setOpenReq={setOpenReq}
                title={maintenance}
                setCheckedDate={setCheckedDate}
                checkedDate={checkedDate}
                servicedData={services}
                setServicesData={setServices}
                setSearchValue={setServiceSearch}
              />
              <GeneralTable
                columns={columnsMaintenance}
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
                    key: `requestMaintenanceKey+${currentPage}`,
                    refetch,
                  }),
                  hideMessage,
                  setHideMessage,
                  changeCalendar,
                  requestId,
                  handleMenuClick,
                  openContent,
                  setOpenContent,
                  isLoadingServicesReq,
                  showTooltipFeedBack,
                  setShowTooltipFeedBack,
                  setFeedBackOpen,
                  setSelectedFeedBack,
                  setIndex,
                  index,
                  showTooltip,
                  setShowTooltip,
                  contextTitle: "Maintenance",
                }}
                limitPerPage={limitPerPage}
                changePageLimit={changePageLimit}
                title="amenity"
              />
            </Box>
          </Container>

          {!!openReq && (
            <div className="close" onClick={handleCloseReq}>
              <Elipse />
              <CloseIcon />
            </div>
          )}
          <Dialog
            open={openReq}
            onClose={handleCloseReq}
            className="dialog_request"
          >
            <DialogContent>
              <RequestDialog
                title={"Maintenance"}
                data={maintenanceData?.items}
                url={maintenance}
                setOpenReq={setOpenReq}
                setHideMessageReq={setHideMessageReq}
                setError={setError}
                setMessage={setMessage}
                handleCloseDialog={handleCloseReq}
              />
            </DialogContent>
          </Dialog>
          <Dialog open={feedBackOpen} onClose={() => setFeedBackOpen(false)}>
            <DialogContent>
              <FeedBackDialog feedback={selectedFeedBack} />
            </DialogContent>
          </Dialog>

          <Dialog
            open={!!openContent}
            //onClose={() => handleClose(false)}
            className="action"
          >
            <AllAmenityListContent
              requestId={requestId}
              handleChangeStatus={handleChangeStatus({
                data: services,
                setLoadingStatus,
                requestId,
                mutate,
                setRequestid,
                key: `requestMaintenanceKey+${currentPage}`,
              })}
            />
          </Dialog>
          {hideMessage && <MessageAlert messagesort={messagesortList} />}
        </Container>
      </>
    );
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default MaintenanceDashboard;
