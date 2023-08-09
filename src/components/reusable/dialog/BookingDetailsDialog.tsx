import { useContext } from "react";
import { ReactComponent as DeleteIcon } from "@/assets/icons/deletebooking.svg";
import { ReactComponent as EditIcon } from "@/assets/icons/editbooking.svg";
import { Button } from "@mui/material";
import { IReqData } from "~/types/types";
import moment from "moment";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const BookingDetailsDialog = ({ reqdata }: IReqData) => {
  const value = useContext(ContentContextServiceList);
  const handleClose = () => {
    value?.setOpenContent(0);
  };
  return (
    <div className="booking_details">
      <div className="header">
        <span>Booking Details</span>
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
      <div className="btn_div">
        <Button variant="contained" className="btn" onClick={handleClose}>
          Reschedule
        </Button>
      </div>
    </div>
  );
};

export default BookingDetailsDialog;
