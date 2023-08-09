import { Button, Dialog, DialogContent, TextField } from "@mui/material";
import { styled, Switch } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useState } from "react";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ReactComponent as VectorRight } from "@/assets/icons/VectorRight.svg";
import { ReactComponent as VectorLeft } from "@/assets/icons/VectorLeft.svg";
import { IAccount } from "~/types/types";

const Account = ({ setDate, date }: IAccount) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(null);
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleClick = () => {
    setOpenDialog(true);
  };
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 40,
    height: 20,
    border: "1px solid #DDDDDD",
    padding: 0,
    display: "flex",
    borderRadius: 10,
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 35,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: 20,
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 15,
      height: 15,
      borderRadius: 10,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
      backgroundColor: "#34C759",
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
      boxSizing: "border-box",
    },
  }));
  return (
    <div className="acount_add_tenant">
      <div className="divs">
        <div>
          <span className="first_span">Activation Date</span>
          <span className="second_span">
            Default: <i>Instance</i>{" "}
          </span>
        </div>
        <Button variant="contained" className="btn date" onClick={handleClick}>
          Change Date
        </Button>
      </div>
      <div>
        <div className="divs second">
          <div>
            <span className="first_span">Enable Wallet</span>
            <span className="second_span">
              by enabling wallet, the user can add his money to the app and can
              use them to buy packages or bookings.
            </span>
          </div>
          <AntSwitch
            defaultChecked
            inputProps={{ "aria-label": "ant design" }}
            name="active_input"
          />
        </div>
      </div>
      <div className="divs">
        <div>
          <span className="first_span">Language</span>
          <span className="language second_span">English </span>
        </div>
        <Button variant="contained" className="btn change">
          Change
        </Button>
      </div>
      <Dialog open={openDialog} onClose={handleClose} className="tenant_dialog">
        <DialogContent>
          <VectorRight className="icon_right" />
          <VectorLeft className="icon_left" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              onChange={setDate}
              renderInput={() => <TextField />}
              value={date}
              disablePast
              showDaysOutsideCurrentMonth
            />
          </LocalizationProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
