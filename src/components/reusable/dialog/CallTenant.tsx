import { Button } from "@mui/material";
import { ReactComponent as PhoneIcon } from "@/assets/icons/phoneimage.svg";
import { useContext, useEffect, useState } from "react";
import { tableStaticDataAmenity } from "@/utils/constant";
import { Detail, IReqData } from "~/types/types";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const CallTenant = ({ reqdata }: IReqData) => {
  const [detailData, setDeatilData] = useState<Detail>();

  const value = useContext(ContentContextServiceList);
  useEffect(() => {
    const index = value?.index;
    setDeatilData(tableStaticDataAmenity.find((elem) => elem.id === index));
  }, []);
  const handleClose = () => {
    value?.setOpenContent(0);
  };

  return (
    <div className="callTenant">
      <span className="call_span">Call The Tenant</span>
      <div>
        <img src={reqdata?.owner?.image?.url} alt="image" />
      </div>
      <span>{reqdata?.firstName}</span>
      <span>
        {reqdata?.countryCode}
        {reqdata?.phoneNumber}
      </span>
      <span className="name">{detailData?.tenants}</span>
      <Button variant="contained" className="btn" onClick={handleClose}>
        <PhoneIcon />
        Call
      </Button>
    </div>
  );
};

export default CallTenant;
