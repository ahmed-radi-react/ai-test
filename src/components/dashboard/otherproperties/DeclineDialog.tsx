import { Button } from "@mui/material";
import moment from "moment";
import { useContext, useEffect } from "react";
import { ReactComponent as DeleteIcon } from "@/assets/icons/deletebooking.svg";
import { ReactComponent as EditIcon } from "@/assets/icons/editbooking.svg";
import { IReqData } from "~/types/types";
import { ReactComponent as DeleteSvg } from "@/assets/icons/DeleteSvg.svg";
import { mutationRequest } from "@/requests-body/queries";
import { ContentContext } from "@/context/OtherPropertiesContext";

const DeclineDialog = ({
  reqdata,
}: IReqData) => {
  const { setOpenContent, handleShowAlert }: any = useContext(ContentContext);
  const { mutate } = mutationRequest({
    url: "/service-request/other_properties/status",
    method: "post",
    isAuth: true,
  });
  const handleClose = () => {
    setOpenContent(0);
  };
  const handleDelete = () => {
    mutate.mutate({ requestId: reqdata?._id, status: "declined" });
    if (mutate.isSuccess) {
      handleClose();
    }
  };
  useEffect(() => {
    if (mutate.isSuccess) {
      handleShowAlert({
        icon: DeleteSvg,
        message: "Amenity link has been declined!",
        title: "Declined",
        style: "delete declined",
      });
      setOpenContent(0);
    }
  }, [mutate.isError, mutate.isSuccess]);
  return (
    <div className="booking_details">
      <div className="header">
        <span>Confirm Decline Booking</span>
      </div>
      <div className="img_name">
        <div className="img_div">
          <img src={reqdata?.organization?.image.url} alt="image" />
        </div>
        <div className="info_div_span">
          <span>{reqdata?.owner?.firstName}</span>
          <span>Apartment {reqdata?.owner?.tenantInfo?.apartmentNumber}</span>
        </div>
      </div>
      <div className="content_info">
        <div className="data_tenant">
          <span>{reqdata?.service?.name}</span>
          <span className="time">
            {reqdata &&
              `${moment(reqdata?.scheduleDateFrom).format("HH:mm")} to ${moment(
                reqdata?.scheduleDateTo
              ).format("HH:mm")}`}
          </span>
        </div>
        <div className="edit_div">
          <div className="icondiv">
            <EditIcon />
            <DeleteIcon />
          </div>
        </div>
      </div>
      <div className="btn_div decline_div">
        <Button
          variant="contained"
          className="btn_decline"
          onClick={handleDelete}
        >
          Decline
        </Button>
        <Button
          variant="contained"
          className="btn_cancel"
          onClick={handleClose}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default DeclineDialog;
