import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { ITenant } from "~/types/types";
import RequestDialog from "../RequestDialog";
import BookingDetailsDialog from "./BookingDetailsDialog";
import CallTenant from "./CallTenant";
import DeclineDialog from "./DeclineDialog";
import MessageTenant from "./MessageTenant";
import {
  ifStatusBookedAmenities,
  ifStatusConfirmedAmenities,
  ifStatusOnGoingAmenities,
  ifStatusRescheduledAmenities,
  maintenance,
} from "@/utils/constant";
import { ContentContextServiceList } from "@/context/ServiceListContext";

interface IAllListContent {
  requestId?: string;
  handleChangeStatus?: (newStatus: string) => void;
}

const AllListContent = ({ requestId, handleChangeStatus }: IAllListContent) => {
  const [reqdata, setReqData] = useState<any>();
  const [tenantData, setTenantData] = useState<ITenant[]>([]);
  const value = useContext(ContentContextServiceList);
  const {
    data: requestData,
    isSuccess,
    isLoading,
  } = queryRequest({
    url: `/service-request/${
      value?.title === "Amenities" ? "amenity" : maintenance
    }/${value?.index ? value?.index : requestId}`,
    method: "get",
    key: value?.index ? value?.index : requestId + "requestKey",
  });
  const { data: tenantdata, isSuccess: successTenant } = queryRequest({
    url: "/tenant",
    method: "get",
    key: "requsetKeytenant",
  });
  useEffect(() => {
    if (successTenant) {
      setTenantData(tenantdata?.data?.items);
    }
  }, [successTenant]);
  useEffect(() => {
    if (isSuccess) {
      setReqData(requestData?.data);
      handleStatus(requestData?.data?.status);
    }
  }, [isSuccess]);

  const handleClose = () => {
    value?.setOpenContent(0);
  };

  const [isListPage, setIsListPage] = useState(true);

  const [targetArray, setTargetArray] = useState<any>([]);

  const handleStatus = (status: string) => {
    switch (status) {
      case "booked":
        setTargetArray(ifStatusBookedAmenities);
        break;
      case "confirmed":
        setTargetArray(ifStatusConfirmedAmenities);
        break;
      case "rescheduled":
        setTargetArray(ifStatusRescheduledAmenities);
        break;
      case "ongoing":
        setTargetArray(ifStatusOnGoingAmenities);
        break;
      // Add more cases for each array as needed
      default:
        // Handle the case where targetArrayName doesn't match any array name
        setTargetArray([]);
        break;
    }
  };

  return (
    <DialogContent className="amenity-dialog-maintenance">
      {value?.openContent === 3 ? (
        !isLoading ? (
          <Dialog open={value?.openContent === 3} onClose={handleClose}>
            <CallTenant reqdata={reqdata} tenantData={tenantData} />
          </Dialog>
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 2 ? (
        !isLoading ? (
          <Dialog open={value?.openContent === 2} onClose={handleClose}>
            <BookingDetailsDialog reqdata={reqdata} tenantData={tenantData} />
          </Dialog>
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 4 ? (
        !isLoading ? (
          <Dialog open={value?.openContent === 4} onClose={handleClose}>
            <MessageTenant reqdata={reqdata} tenantData={tenantData} />
          </Dialog>
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 1 ? (
        <DialogContent>
          <Dialog open={value?.openContent === 1} onClose={handleClose}>
            <RequestDialog
              title={value?.title || ""}
              isListPage={isListPage}
              setMessageSortList={value?.setMessageSortList}
              reqdata={reqdata}
              handleChangeStatus={handleChangeStatus}
              handleCloseDialog={handleClose}
              changeCalendar={value.changeCalendar}
              targetArray={targetArray}
            />
          </Dialog>
        </DialogContent>
      ) : value?.openContent === 6 ? (
        <Dialog open={value?.openContent === 6} onClose={handleClose}>
          <DeclineDialog
            reqdata={reqdata}
            tenantData={tenantData}
            setMessageSortList={value?.setMessageSortList}
            handleChangeStatus={handleChangeStatus}
          />
        </Dialog>
      ) : (
        <div></div>
      )}
    </DialogContent>
  );
};

export default AllListContent;
