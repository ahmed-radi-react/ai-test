import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import { useEffect } from "react";
import { useContext, useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import { ITenant } from "~/types/types";
import CallTenant from "./CallTenant";
import MessageTenant from "./MessageTenant";
import { ContentContext } from "@/context/ParcelContext";

const AllListContent = () => {
  const [reqdata, setReqData] = useState<any>();
  const [tenantData, setTenantData] = useState<ITenant[]>([]);
  const value = useContext(ContentContext);

  const { data, isSuccess, isLoading } = queryRequest({
    url: `/tenant/${value?.indexRow}`,
    method: "get",
    key: value?.indexRow + "requestKey",
  });
  useEffect(() => {
    if (isSuccess) {
      setReqData(data?.data);
    }
  }, [isSuccess, data?.data]);

  const handleClose = () => {
    value?.setOpenListTableContent && value?.setOpenListTableContent(0);
  };
  return (
    <DialogContent className="amenity-dialog-maintenance">
      {value?.openListTableContent === 3 ? (
        !isLoading ? (
          <Dialog
            open={value?.openListTableContent === 3}
            onClose={handleClose}
          >
            <CallTenant reqdata={reqdata} tenantData={tenantData} />
          </Dialog>
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : value?.openListTableContent === 4 ? (
        !isLoading ? (
          <Dialog
            open={value?.openListTableContent === 4}
            onClose={handleClose}
          >
            <MessageTenant reqdata={reqdata} tenantData={tenantData} />
          </Dialog>
        ) : (
          <CircularProgress disableShrink className="circle" />
        )
      ) : (
        <div></div>
      )}
    </DialogContent>
  );
};

export default AllListContent;
