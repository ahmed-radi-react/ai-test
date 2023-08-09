import { CircularProgress, DialogContent } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { ITenant } from "~/types/types";
import DeleteDialog from "./DeleteDialog";
import DeactiveDialog from "./DeactiveDialog";
import ChangeStatus from "./ChangeStatus";
import Rent from "./Rent";
import MessageTenant from "./MessageTenant";
import PropertyDetails from "./PropertyDetails";
import { maintenance } from "@/utils/constant";
import { ContentContext } from "@/context/OtherPropertiesContext";

const OtherPropertiesContent = () => {
  const [propertiesData, setPropertiesData] = useState<ITenant[]>([]);
  const value = useContext(ContentContext);

  const {
    data: requestData,
    isSuccess,
    isLoading,
  } = queryRequest({
    url: `/service-request/${
      value?.title === "Amenities" ? "amenity" : maintenance
    }/${value?.tableIndex}`,
    method: "get",
    key: value?.tableIndex + "requestKey",
  });
  const { data: propertiesApiData, isSuccess: successTenant } = queryRequest({
    url: "/tenant",
    method: "get",
    key: "requsetKeytenant",
  });
  useEffect(() => {
    if (successTenant) {
      setPropertiesData(propertiesApiData?.data?.items);
    }
  }, [successTenant]);

  return (
    <DialogContent className="dialog_content">
      {value?.openContent === 1 ? (
        !isLoading ? (
          <Rent />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 2 ? (
        !isLoading ? (
          <ChangeStatus />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 3 ? (
        !isLoading ? (
          <DeactiveDialog title={"Property"} url={"property"} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 4 ? (
        !isLoading ? (
          <DeleteDialog title={"Maintenance"} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 5 ? (
        !isLoading ? (
          <PropertyDetails />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openContent === 6 ? (
        !isLoading ? (
          <MessageTenant reqdata={undefined} />
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : (
        <div></div>
      )}
    </DialogContent>
  );
};

export default OtherPropertiesContent;
