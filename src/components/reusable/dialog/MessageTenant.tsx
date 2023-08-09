import { Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import { useContext } from "react";
import { IReqData } from "~/types/types";
import { ReactComponent as MessageIcon } from "@/assets/icons/message.svg";
import { ContentContextServiceList } from "@/context/ServiceListContext";

const MessageTenant = ({ reqdata }: IReqData) => {
  const value = useContext(ContentContextServiceList);
  const handleClose = () => {
    value?.setOpenContent(0);
  };
  return (
    <div className="message_tenant">
      <span className="message_span">Message The Tenant</span>
      <div className="img_div">
        <img src={reqdata?.owner?.image?.url} alt="image" />
      </div>
      <span className="name"> {reqdata?.firstName}</span>
      <span className="people">Apartment {reqdata?.apartment?.name}</span>
      <Textarea placeholder="Write Your message.." className="textarea" />
      <Button className="btn" onClick={handleClose}>
        <MessageIcon />
        Message
      </Button>
    </div>
  );
};

export default MessageTenant;
