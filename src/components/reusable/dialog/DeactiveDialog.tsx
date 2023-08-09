import { Button } from "@mui/material";
import { useContext } from "react";
import deactiveImage from "@/assets/images/deactiveImage.png";
import { ReactComponent as DeactiveSvg } from "@/assets/icons/deactiveSvg.svg";
import { mutationRequest } from "@/requests-body/queries";
import { IDeactiveDialog } from "~/types/types";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const DeactiveDialog = ({ title, dataInfo }: IDeactiveDialog) => {
  const value = useContext(ContentContextServiceList);
  const { mutate } = mutationRequest({
    url: `/${value?.url}/${dataInfo?._id}`,
    method: "PUT",
    isAuth: true,
  });
  const handleDeactiveCancel = () => {
    value?.setOpenContent(0);
  };
  const handleDeactive = () => {
    if (value?.setDeactive) {
      value?.setDeactive(value?.amenityId);
    }
    value?.setOpenContent(0);
    if (value?.setHideMessage) {
      value?.setHideMessage(true);
    }
    if (value?.setMessageSort) {
      value?.setMessageSort({
        icon: DeactiveSvg,
        message: `${title} link has been Deleted!`,
        title: "Deactivated",
        style: "deactive",
      });
      setTimeout(() => {
        if (value?.setHideMessage) {
          value?.setHideMessage(false);
        }
      }, 3000);
    }
    mutate.mutate({ ...dataInfo, status: "deactive" });
  };
  const deactive = () => {
    value?.setOpenContent(0);
  };
  return (
    <div className="deactive_amenitie">
      <img src={deactiveImage} alt="deactive image" />
      <span className="deactive_span">Deactivate This {title}?</span>
      <div className="info_div">
        <span>You are about to Deactivate</span>
        <span>{dataInfo && dataInfo.name}</span>
      </div>
      <div className="btn">
        <Button
          variant="contained"
          className="deactive_btn"
          onClick={handleDeactive}
        >
          Deactive
        </Button>
        <Button
          variant="contained"
          className="cancel_btn"
          onClick={handleDeactiveCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeactiveDialog;
