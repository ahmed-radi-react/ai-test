import { Button, Input } from "@mui/material";
import image from "@/assets/images/amenities2.png";
import { ReactComponent as DownIcon } from "@/assets/icons/downArrow.svg";
import { IShare } from "~/types/types";

const ShareDialog = ({ dataInfo }: IShare) => {
  return (
    <div className="share_amenitie">
      <span className="share_span">
        Share <b>{dataInfo?.name}</b> with others to view and edit
      </span>
      <div className="invite_div">
        <Input placeholder="Write emails" className="input" />
        <Button variant="contained" className="btn_invite">
          Send Invite
        </Button>
      </div>
      <div className="position_info_div">
        <div className="info_div">
          <div className="img_div">
            <img src={image} alt="image" />
          </div>
          <div className="info">
            <span className="name">Brad Pike</span>
            <span className="email">b rad@email.com</span>
          </div>
        </div>
        <span className="position">Owner</span>
      </div>
      <div className="share_link_div">
        <span>Share a link to </span>
        <span>edit</span>
        <DownIcon />
        <span>Copylink</span>
      </div>
    </div>
  );
};

export default ShareDialog;
