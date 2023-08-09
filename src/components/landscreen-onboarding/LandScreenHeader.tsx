import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo/logo.svg";

const LandScreenHeader = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/onboarding");
  };
  const handleNavigateLogin=()=>{
    navigate("/login");
  }
  return (
    <div className="header">
      <div onClick={handleNavigate} className="header_logo_tenx">
        <img src={logo} alt="logo" />
      </div>
      <div onClick={handleNavigateLogin} className="already_member">
        <span>Already Member? </span>
        <span className="login">Log in</span>
      </div>
    </div>
  );
};

export default LandScreenHeader;
