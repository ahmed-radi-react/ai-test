import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useEffect, useState } from "react";
import { ITenant } from "~/types/types";
import moment from "moment";
import { useNavigate } from "react-router";
interface IDialog {
  setAnchorEl: (value: null | HTMLElement) => void;
  dayTime: string;
}

const AddRequestCalendar = ({ setAnchorEl, dayTime }: IDialog) => {
  const navigate = useNavigate();
  const [apartment, setApartment] = useState("");
  const { data, isSuccess, isLoading } = queryRequest({
    url: `/service/amenity?parentId=6449249d3e4d9445b7087a79&offset=0&limit=10000`,
    method: "get",
    key: "detailKey",
  });
  const { mutate } = mutationRequest({
    url: `/tenant`,
    method: "get",
    isAuth: true,
  });
  const [dialog, setDialog] = useState("");

  const [tenantData, setTenantData] = useState<ITenant[]>([]);
  const [tenantId, setTenantId] = useState({ tenantid: "", buildingid: "" });
  useEffect(() => {
    if (mutate.isSuccess) {
      setTenantData(mutate?.data?.data?.items);
    }
  }, [mutate.isSuccess]);
  const [amenityData, setAmenityData] = useState<
    { name: string; _id: string; parentId: string }[]
  >([]);
  const [amenityId, setAmenityId] = useState<string>("");
  const [subId, setSubId] = useState("");
  useEffect(() => {
    if (isSuccess) {
      setAmenityData(data?.data?.items);
    }
  }, [isSuccess]);
  const hanleClcik = (id: string, parentId?: string) => {
    setAmenityId(id);
    if (parentId) {
      setSubId(parentId);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setDialog(event.target.value as string);
  };
  const handleChangeApartment = (event: SelectChangeEvent) => {
    setApartment(event.target.value as string);
  };
  const handleClickApartmenty = () => {
    mutate.mutate({});
  };
  const { mutate: submitMutate } = mutationRequest({
    url: `/service-request/amenity`,
    method: "post",
    isAuth: true,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitMutate.mutate({
      scheduleDateFrom: moment(dayTime)
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      scheduleDateTo: moment(dayTime)
        .add(1, "hour")
        .utc()
        .format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      description: "string",
      serviceId: amenityId,
      //buildingId:"63a8ce4a0c3461692c165e84",
      buildingId: tenantId.buildingid,
      tenantId: tenantId.tenantid,
      requestedBy: "admin",
      paymentInfo: {
        paymentMethod: "cash",
        amount: 0,
        prePaidAmount: 0,
      },
      images: [],
      timeToServe: "later",
    });
  };
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (dialog.length && apartment.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [dialog, apartment]);
  useEffect(() => {
    if (submitMutate.isSuccess) {
      navigate(-1);
    }
  }, [submitMutate]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="calendar_dialog">
        <div className="add_req_calendar">
          <span>Add Request</span>
          <CloseIcon onClick={() => setAnchorEl(null)} />
        </div>
        <div className="select_divs">
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="select"
            value=""
          >
            <MenuItem value="" className="selesctedfirst">
              <ArrowIcon className="arrow_icon" />
              Amenities
            </MenuItem>
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="select"
            value={dialog}
            onChange={handleChange}
          >
            <MenuItem value="" className="selesctedfirst">
              <ArrowIcon className="arrow_icon" />
              Select Service
            </MenuItem>
            {amenityData?.map((item) => {
              return (
                <MenuItem
                  key={item._id}
                  value={item.name}
                  onClick={() => hanleClcik(item._id, item.parentId)}
                >
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="select"
            value={apartment}
            onChange={handleChangeApartment}
            onClick={handleClickApartmenty}
          >
            <MenuItem value="" className="selesctedfirst">
              <ArrowIcon className="arrow_icon" />
              Select Apartment
            </MenuItem>
            {tenantData?.map((item: any) => {
              return (
                <MenuItem
                  key={item._id}
                  value={item?.tenantInfo?.apartmentNumber}
                  onClick={() =>
                    setTenantId((prev) => {
                      return {
                        ...prev,
                        tenantid: item._id,
                        buildingid: item?.buildings[0]?._id,
                      };
                    })
                  }
                >
                  {item?.tenantInfo?.apartmentNumber}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            className="select"
            value={apartment}
            onChange={handleChangeApartment}
          >
            <MenuItem value="" className="selesctedfirst">
              <ArrowIcon className="arrow_icon" />
              Select Tenant
            </MenuItem>
            {tenantData?.map((item: any) => {
              return (
                <MenuItem
                  key={item._id}
                  value={item?.tenantInfo?.apartmentNumber}
                  onClick={() =>
                    setTenantId((prev) => {
                      return {
                        ...prev,
                        tenantid: item._id,
                        buildingid: item?.buildings[0]?._id,
                      };
                    })
                  }
                >
                  {item?.firstName}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <Button
          variant="contained"
          className={`btn ${disable ? "disable" : ""}`}
          type="submit"
        >
          Add Request
        </Button>
      </div>
    </form>
  );
};

export default AddRequestCalendar;
