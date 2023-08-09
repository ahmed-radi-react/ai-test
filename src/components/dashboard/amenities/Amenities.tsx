import { Box, Button, Dialog, DialogContent } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settingsicon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { ReactComponent as CopySvg } from "@/assets/icons/CopySvg.svg";

import { Link, useNavigate } from "react-router-dom";
import {
  amenitiesOverview,
  handleChangeStatus,
  IOverview,
} from "@/utils/constant";
import Overview from "~/reusable/Overview";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useContext, useEffect, useState } from "react";
import { ReactComponent as AmenitiesSvg } from "@/assets/icons/amenities.svg";
import RequestDialog from "~/reusable/RequestDialog";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { IsetSetting, ISortedData } from "~/types/types";
import { StatusCounterCard } from "@/_helpers/StatusCounterCard";
import GeneralTable from "~/reusable/GeneralTable";
import { columnsAmenities } from "@/utils/tableColumn";
import useControlPagination from "@/hooks/useControlPagination";
import { SortHeader } from "~/reusable/RequestListComponents/SortHeader";
import CarouselChunk from "~/reusable/RequestListComponents/CarouselChunk";
import { ContentContextServiceList } from "@/context/ServiceListContext";
import AllAmenityListContent from "~/reusable/dialog/AllListContent";

const Amenities = ({
  setSetting,
  isOnlyList,
  setAmenitiesDataForParent,
}: IsetSetting) => {
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
    setSorttable,
    sorttable,
    setChangeCalendar,
    changeCalendar,
  }: any = useContext(ContentContextServiceList);
  const [amenitiesData, setAmenitiesData] = useState<any>();
  const navigate = useNavigate();
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, setServiceSearch] = useState("");
  const [requestId, setRequestid] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState("");
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };

  useEffect(() => {
    setTitle("Amenities");
  }, []);

  const { data, isSuccess } = queryRequest({
    url: `/service/amenity?offset=0&limit=25`,
    method: "get",
    key: `amenitieskeyreq`,
  });

  const {
    data: amenitiesReq,
    isSuccess: amenitiesReqIsSuccess,
    isLoading: isLoadingServicesReq,
    refetch,
  } = queryRequest({
    url: `/service-request/amenity?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `requestAmenityKey+${currentPage}`,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  const [amenitiesOverViewReq, setAmenitiesOverViewReq] =
    useState(amenitiesOverview);
  const [services, setServices] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [sortedData, setSortedData] = useState<ISortedData[]>([]);
  const handleClick = () => {
    setSetting && setSetting(false);
  };
  useEffect(() => {
    if (amenitiesReqIsSuccess) {
      const array = amenitiesReq.data.items?.map((item: any) => {
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

          const sortreqdata = amenitiesReq.data.items?.filter((item: any) => {
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
  }, [amenitiesReqIsSuccess, , amenitiesReq?.data?.items?.length]);
  const handleClickCarousle = (label: string) => {
    setSorttable(label);
    if (label === "All") {
      setServices(amenitiesReq?.data?.items);
    } else {
      setServices(
        sortedData.filter((item) => {
          return item.label === label;
        })[0].data
      );
    }
  };

  useEffect(() => {
    if (amenitiesReqIsSuccess) {
      setAmenitiesOverViewReq((prev: IOverview[]) =>
        StatusCounterCard({
          prev,
          data: data,
        })
      );
      setServices(amenitiesReq.data.items);
      setTotalRows(amenitiesReq.data.count);
    }
  }, [amenitiesReqIsSuccess, amenitiesReq]);

  useEffect(() => {
    if (isSuccess) {
      setAmenitiesData(data?.data);
      setAmenitiesDataForParent && setAmenitiesDataForParent(data?.data);
    }
  }, [isSuccess]);
  const [openReq, setOpenReq] = useState(false);
  const handleOpen = () => {
    setOpenReq(true);
  };

  const [hideMessageReq, setHideMessageReq] = useState(false);
  const [error, setError] = useState(false);
  const { mutate } = mutationRequest({
    url: `/service-request/amenity/status`,
    method: "post",
    isAuth: true,
  });
  const [message, setMessage] = useState("");
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
  const handleClickCalendar = () => {
    setChangeCalendar((prev: boolean) => !prev);
  };
  const [checkedDate, setCheckedDate] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const handleCloseReq = () => {
    setOpenReq(false);
  };

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
        className={`amenities ${isOnlyList ? "amenitiesreqlist" : ""} `}
      >
        {!isOnlyList ? (
          <>
            <div className="amenities_header" id="print">
              <span className="header_span">Amenities</span>
              <div className="btn">
                <Button
                  variant="contained"
                  className="setting_btn"
                  onClick={handleClick}
                >
                  <SettingsIcon />
                  Setting
                </Button>
                <Link to="" />
                <Button
                  variant="contained"
                  className="add_btn"
                  onClick={handleOpen}
                >
                  <AddIcon />
                  Add Amenities Request
                </Button>
                <Button
                  variant="contained"
                  className="_add_amenity"
                  onClick={() => navigate("addamenity")}
                >
                  <AmenitiesSvg />
                  Add New Amenities
                </Button>
              </div>
            </div>
            <Overview title={"Amenities"} data={amenitiesOverViewReq} />
          </>
        ) : null}
        <Container
          className={`requestlist_container ${
            isOnlyList ? "" : "req_dashboard"
          }`}
        >
          <CarouselChunk
            title={"Amenities"}
            sorttable={sorttable}
            dashboard={true}
            sortedData={sortedData}
            setSorttable={setSorttable}
            handleClick={handleClickCarousle}
          />
          <Box
            boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            borderRadius="10px"
            className="box_calendar"
          >
            <SortHeader
              changeCalendar={changeCalendar}
              url={"amenity"}
              handleClickCalendar={handleClickCalendar}
              setOpenReq={setOpenReq}
              title={"amenity"}
              setCheckedDate={setCheckedDate}
              checkedDate={checkedDate}
              servicedData={services}
              setServicesData={setServices}
              setSearchValue={setServiceSearch}
            />
            <GeneralTable
              columns={columnsAmenities}
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
                  key: `requestAmenityKey+${currentPage}`,
                }),
                setHideMessage,
                hideMessage,
                changeCalendar,
                requestId,
                handleMenuClick,
                openContent,
                setOpenContent,
                isLoadingServicesReq,
                setIndex,
                index,
                showTooltip,
                setShowTooltip,
                contextTitle: "Amenities",
              }}
              title="amenity"
              limitPerPage={limitPerPage}
              changePageLimit={changePageLimit}
            />
          </Box>
        </Container>

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
              key: `requestAmenityKey+${currentPage}`,
            })}
          />
        </Dialog>
        {!!openReq && (
          <div className="close" onClick={handleCloseReq}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog
          open={openReq}
          className="dialog_request"
          onClose={handleCloseReq}
        >
          <DialogContent>
            <RequestDialog
              data={amenitiesData?.items}
              title={"Amenities"}
              url={"amenity"}
              setOpenReq={setOpenReq}
              setHideMessageReq={setHideMessageReq}
              setError={setError}
              isListPage={!true}
              setMessage={setMessage}
              handleCloseDialog={handleCloseReq}
            />
          </DialogContent>
        </Dialog>

        {hideMessage && <MessageAlert messagesort={messagesortList} />}
      </Container>
    </>
  );
};

export default Amenities;
