import { Box, Button, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import infoIcon from "@/assets/icons/info.svg";
import { mutationRequest } from "@/requests-body/queries";
import { getCookie, setCookie } from "@/utils/cookies";
import { ReactComponent as EmailIcon } from "@/assets/icons/smsLogin.svg";
import { ReactComponent as PasswordIcon } from "@/assets/icons/lock.svg";
import ebutlerLogo from "@/assets/logo/volanteLogo.png";
import { regexp } from "@/utils/regexp";
import { IEmailVal } from "~/types/types";

const SigninPassword = ({ emailVal, emailhandleChange }: IEmailVal) => {
  const { mutate } = mutationRequest({
    url: "/auth/login",
    method: "post",
  });
  const { mutate: meMutate } = mutationRequest({
    url: "/auth/me",
    method: "get",
    isAuth: true,
  });
  const navigate = useNavigate();
  const [passValid, setPassValid] = useState(true);
  const [passVal, setPassVal] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [role, setRole] = useState<string>("");
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (regexp.test(emailVal)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    if (passValid && emailValid) {
      mutate.mutate({
        login: emailVal,
        password: passVal,
        organizationId: "63a8b4cfaf1b0c19ca045a06",
      });
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setPassVal(value);
    setPassValid(value.length > 4);
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  useEffect(() => {
    if (mutate.isSuccess) {
      setCookie("token", mutate?.data?.data?.accessToken);
    }
  }, [mutate, role]);

  useEffect(() => {
    if (mutate.isSuccess) {
      meMutate.mutate({});
    }
  }, [mutate.isSuccess]);
  useEffect(() => {
    if (meMutate.isSuccess) {
      if (meMutate?.data?.data?.role?.name === "Organization Admin") {
        navigate("/home");
      } else {
        navigate("/onlymobileaccess");
      }
    }
  }, [meMutate.isSuccess]);

  return (
    <div className="password">
      <form onSubmit={handleSubmit} className="signindiv">
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={547}
          justifyContent={"center"}
          margin="auto"
          borderRadius="6px"
          boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
          paddingLeft="13px"
          paddingRight="15px"
          paddingBottom="15px"
          className="loginbox"
        >
          <div className="logo_container">
            <img src={ebutlerLogo} alt="ebutler-logo" className="ebutlerLogo" />
          </div>
          <div className="login_text">
            <h3 className="signinheading">Welcome Back</h3>
            <p className="signinpara">
              please enter your email address and password
            </p>
          </div>
          {mutate.isError && (
            <div className="errordiv" style={{ marginBottom: "3px" }}>
              <p className="errorspan">Your password or email not correct</p>
            </div>
          )}
          <div className="input-content">
            <div
              className={`input_container ${!emailValid ? "errorInput" : ""}`}
            >
              <span className="input_container__icon">
                <EmailIcon />
              </span>
              <TextField
                error={emailValid}
                id="filled-error-email"
                variant="filled"
                placeholder="Email"
                onChange={emailhandleChange}
                className={`emailinput`}
                name="emailVal"
                value={emailVal}
              />
            </div>
            {!emailValid && (
              <div className="errordiv">
                <img src={infoIcon} alt="info icon" />
                <span className="errorspan">
                  Couldn’t find you Admin Account
                </span>
              </div>
            )}
          </div>
          <div className="input-content">
            <div
              className={`input_container ${!passValid ? "errorInput" : ""}`}
            >
              <span className="input_container__icon">
                <PasswordIcon />
              </span>
              <TextField
                id="filled-error-password"
                variant="filled"
                placeholder="Password"
                onChange={handleChange}
                className={passValid ? "errorInput" : ""}
                value={passVal}
                name="passVal"
                type="password"
              />
            </div>
            {!passValid && (
              <div className="errordiv">
                <img src={infoIcon} alt="info icon" />
                <span className="errorspan pass">
                  Couldn’t login to your Admin Account
                </span>
              </div>
            )}
          </div>
          <Button
            type="submit"
            variant="contained"
            className={`btn-signin login ${
              !regexp.test(emailVal) || !passValid ? "disable" : ""
              // passValid ? "disable" : !passVal.length ? "empty" : ""
            }`}
          >
            {mutate.isLoading
              ? "loading..."
              : meMutate.isLoading
              ? "Check role..."
              : "Login"}
          </Button>
          <p
            className="forgetPassword"
            style={!regexp.test(emailVal) ? { pointerEvents: "none" } : {}}
          >
            <Link to="/forget-password" className="forgetPass">
              Forgot your password?
            </Link>
          </p>
        </Box>
      </form>
    </div>
  );
};

export default SigninPassword;
