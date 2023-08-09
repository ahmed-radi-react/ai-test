import { Button, Dialog, DialogContent } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
import warningImage from "@/assets/icons/warning.png";
import { removeCookie } from "@/utils/cookies";
import { useNavigate } from "react-router-dom";
interface ILogout {
  openLogout: boolean;
  setOpenLogout: Dispatch<SetStateAction<boolean>>;
}
const LogoutDialog = ({ openLogout, setOpenLogout }: ILogout) => {
  const navigate=useNavigate();
  const handleLogOut = () => {
    removeCookie("token");
    navigate("/onboarding");
  };
  return (
    <Dialog
      open={openLogout}
      className="dialog_logout"
      onClose={() => setOpenLogout(false)}
    >
      <DialogContent>
        <div className="logout_content">
          <div>
            <img src={warningImage} alt="warningImage" />
          </div>
          <span className="header_log">Sign out </span>
          <span className="info_log">Are  you sure you would like to sign out of your account?</span>
          <div className="logout_btn">
            <Button variant="contained" className="cancel_btn" onClick={()=>setOpenLogout(false)}>Cancel</Button>
            <Button variant="contained" className="out_btn" onClick={handleLogOut}>Sign out</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
