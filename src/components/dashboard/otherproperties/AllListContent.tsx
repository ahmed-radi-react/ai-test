import { CircularProgress, DialogContent } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { IReqData, ITenant } from "~/types/types";
import BookingDetailsDialog from "~/reusable/dialog/BookingDetailsDialog";
import CallTenant from "~/reusable/dialog/CallTenant";
import MessageTenant from "~/reusable/dialog/MessageTenant";
import RequestDialog from "~/reusable/RequestDialog";
import DeclineDialog from "./DeclineDialog";
import { ContentContext } from "@/context/OtherPropertiesContext";

const AllListContent = () => {
  const [reqdata, setReqData] = useState<IReqData>();
  const [tenantData, setTenantData] = useState<ITenant[]>([]);
  const value = useContext(ContentContext);
  const {
    data: requestData,
    isSuccess,
    isLoading,
  } = queryRequest({
    url: `/service-request/other_properties/${value?.propertyIndex}`,
    method: "get",
    key: value?.indexNumber + "requestKey" + value?.title,
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
    }
  }, [isSuccess]);
  return (
    <DialogContent className="amenity-dialog-maintenance">
      {value?.openContent === 3 ? (
        !isLoading ? (
          <CallTenant reqdata={reqdata} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 2 ? (
        !isLoading ? (
          <BookingDetailsDialog reqdata={reqdata} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 4 ? (
        !isLoading ? (
          <MessageTenant reqdata={reqdata} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 1 ? (
        <RequestDialog
          title={value?.title || ""}
          setMessageSortList={value?.setMessageSortList}
        />
      ) : value?.openContent === 6 ? (
        <DeclineDialog
          reqdata={reqdata}
          setMessageSortList={value?.setMessageSortList}
        />
      ) : (
        <div></div>
      )}
    </DialogContent>
  );
};

export default AllListContent;
