import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import volanteLogo from "@/assets/logo/volanteLogo.png";
import userImage from "@/assets/images/user.png";
import { mutationRequest } from "@/requests-body/queries";
import { IForgotPass } from "~/types/types";
import { useNavigate } from "react-router-dom";

const ForgetPassword = ({ setNext }: IForgotPass) => {
  const [value, setValue] = React.useState("Email");
  const navigate = useNavigate();
  const { mutate } = mutationRequest({
    url: "/auth/password/reset",
    method: "post",
  });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  const emailVal = localStorage.getItem("email");
  const handleClick = () => {
    setResetPass((prev) => {
      return { ...prev, open: true };
    });
    mutate.mutate({
      email: emailVal,
      organizationId: "63a8b4cfaf1b0c19ca045a06",
    });
  };
  const [resetPass, setResetPass] = useState({ open: false, txt: "" });
  const handleClose = () => {
    if (mutate.isError) {
      navigate("/login");
    }
    if (mutate.isSuccess) {
      setResetPass((prev) => {
        return { ...prev, open: false };
      });
      setNext(true);
    }
  };
  useEffect(() => {
    if (mutate.isSuccess) {
      setResetPass({
        open: true,
        txt: "Password Re-set link is sent to your" + " " + value,
      });
    }
    if (mutate.isError) {
      setResetPass({ open: true, txt: "Something went wrong" });
    }
  }, [mutate.isSuccess, mutate.isError]);
  return (
    <div className="setpassword">
      <img src={volanteLogo} alt="ebutler-logo" className="volante" />
      <Box
        display="flex"
        flexDirection={"column"}
        maxWidth={518}
        justifyContent={"center"}
        margin="auto"
        borderRadius="6px"
        boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
        paddingLeft="13px"
        paddingRight="13px"
        paddingBottom="13px"
        height="317px"
      >
        <span className="findAcount">Find Your Account</span>
        <span className="questionspan">
          How do you want to receive the code to reset your password?
        </span>
        <div className="radiogroupdiv">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              defaultValue="Email"
            >
              <FormControlLabel
                value="Email"
                control={<Radio size="small" />}
                label={`Send code via email ${emailVal}`}
                className="emailcheck"
              />
              <FormControlLabel
                value="Phone"
                control={<Radio size="small" />}
                label="Send code via Phone +923405932699"
                className="phonecheck"
              />
            </RadioGroup>
          </FormControl>
          <div className="userdiv">
            <img src={userImage} alt="user image" />
            <span className="username">User</span>
          </div>
        </div>
        <Button
          variant="contained"
          className="continuebtn"
          onClick={handleClick}
        >
          Continue
        </Button>
        <Dialog open={resetPass.open} onClose={handleClose}>
          <DialogContent>
            <div className="reset_link">
              {!mutate.isLoading ? (
                <span>{resetPass.txt}</span>
              ) : (
                <span>Loading...</span>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </Box>
    </div>
  );
};

export default ForgetPassword;
