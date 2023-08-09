import { Box, Button, TextField } from "@mui/material";
import infoIcon from "@/assets/icons/info.svg";
import ebutlerLogo from "@/assets/logo/volanteLogo.png";
import { ReactComponent as EmailIcon } from "@/assets/icons/smsLogin.svg";
import { ReactComponent as PasswordIcon } from "@/assets/icons/lock.svg";
import { INext } from "~/types/types";

const SigninEmail = ({
  handleClick,
  emailValid,
  emailVal,
  emailhandleChange,
}: INext) => {
  return (
    <form className="signindiv" onSubmit={handleClick}>
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
        <img src={ebutlerLogo} alt="ebutler-logo" className="ebutlerLogo" />
        {/* <span className="emailspan"> Enter your Email</span> */}
        <div className={`input_container ${emailValid ? "errorInput" : ""}`}>
          <span className="input_container__icon">
            <EmailIcon />
          </span>
          <TextField
            error={emailValid}
            id="filled-error"
            variant="filled"
            placeholder="Email"
            onChange={emailhandleChange}
            className={`emailinput`}
            name="emailVal"
            value={emailVal}
          />
        </div>
        {emailValid && (
          <div className="errordiv">
            <img src={infoIcon} alt="info icon" />
            <span className="errorspan">Couldn’t find you Admin Account</span>
          </div>
        )}
        <div className={`input_container ${emailValid ? "errorInput" : ""}`}>
          <span className="input_container__icon">
            <PasswordIcon />
          </span>
          <TextField
            error={emailValid}
            id="filled-error"
            variant="filled"
            placeholder="Email"
            onChange={emailhandleChange}
            className={`emailinput`}
            name="emailVal"
            value={emailVal}
          />
        </div>
        <Button
          type="submit"
          variant="contained"
          disabled={emailValid || !emailVal.length}
          className={`btn-signin ${
            emailValid ? "disable" : !emailVal.length ? "empty" : ""
          }`}
        >
          Next
        </Button>
      </Box>
    </form>
  );
};

export default SigninEmail;
