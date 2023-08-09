import { useState } from "react";
import ForgetPassword from "./ForgetPassword";
import SetPassword from "./SetPassword";

const ResetPassword = () => {
  const [next, setNext] = useState(false);
  return (
    <div>{!next ? <ForgetPassword setNext={setNext} /> : <SetPassword />}</div>
  );
};

export default ResetPassword;
