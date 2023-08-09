import { useState } from "react";
import SigninPassword from "./SigninPassword";
const SignIn = () => {
  const [emailVal, setEmailVal] = useState("");
  // const handleClick = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   if (!emailValid) {
  //     setNext(true);
  //   }
  // };
  const emailhandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailVal(e.target.value);
    localStorage.setItem("email", e.target.value);
    // if (regexp.test(e.target.value)) {
    //   setEmailValid(false);
    // } else {
    //   setEmailValid(true);
    // }
  };
  return (
    <div className="signin">
      {/* <img src={ebutlerLogo} alt="ebutler-logo" className="ebutlerLogo" /> */}
      {
      // !next ? (
      //   <SigninEmail
      //     handleClick={handleClick}
      //     emailValid={emailValid}
      //     emailVal={emailVal}
      //     emailhandleChange={emailhandleChange}
      //   />
      // ) :
      (
        <SigninPassword
          emailVal={emailVal}
          emailhandleChange={emailhandleChange}
        />
      )}
    </div>
  );
};

export default SignIn;
