import { Button, DialogContent, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import volanteLogo from "@/assets/logo/volanteLogo.png";
import { Dialog } from "@mui/material";
import { ITarget } from "~/types/types";
import { mutationRequest } from "@/requests-body/queries";

const SetPassword = () => {
  const { mutate } = mutationRequest({
    url: "/auth/password/update",
    method: "post",
  });
  const emailVal = localStorage.getItem("email");
  const [resetPass, setResetPass] = useState(false);
  const [inputValues, setInputValue] = useState({
    email: emailVal,
    pass: "",
    repass: "",
  });
  const [validValue, setValidValue] = useState({
    email: false,
    pass: false,
    repass: false,
  });
  const handleChange = ({ target: { value, name } }: ITarget) => {
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };
  const handleClose = () => {
    setResetPass(false);
  };
  const handleClickOpen = () => {
    // setResetPass(true);
    mutate.mutate({
      passwordToken: "string",
      password: "string",
    });
  };
  return (
    <div className="setpassword">
      <img src={volanteLogo} alt="ebutler-logo" className="volante" />
      <form className="passwordForm">
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={518}
          justifyContent={"center"}
          margin="auto"
          borderRadius="6px"
          boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
          paddingLeft="13px"
          paddingRight="15px"
          paddingBottom="15px"
        >
          <div className="inputs">
            <div className="textfield">
              <span>Email:</span>
              <TextField
                id="filled-error"
                variant="filled"
                placeholder="umairabdullah1999@gmail.com"
                onChange={handleChange}
                value={emailVal}
                name="email"
                error={validValue.email}
              />
            </div>
            <div className="textfield">
              <span>New Password:</span>
              <TextField
                id="filled-error"
                variant="filled"
                placeholder="Enter your Password"
                onChange={handleChange}
                value={inputValues.pass}
                name="pass"
                error={validValue.pass}
                type="password"
              />
            </div>
            <div className="textfield">
              <span>Re-Enter:</span>
              <TextField
                id="filled-error"
                variant="filled"
                placeholder="Re-Enter your Password"
                onChange={handleChange}
                value={inputValues.repass}
                name="repass"
                error={validValue.repass}
                type="password"
              />
            </div>
          </div>
          <Button
            variant="contained"
            className="confirmbtn"
            disabled={
              inputValues.pass !== inputValues.repass ||
              !inputValues.pass.length
            }
            onClick={handleClickOpen}
          >
            Confirm
          </Button>
          <Dialog open={resetPass} onClose={handleClose}>
            <DialogContent>
              <div className="reset_link">
                <span>Password Reset Sucessfull</span>
              </div>{" "}
            </DialogContent>
          </Dialog>
        </Box>
      </form>
    </div>
  );
};

export default SetPassword;
