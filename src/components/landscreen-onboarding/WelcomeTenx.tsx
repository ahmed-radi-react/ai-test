import { Button, Container } from "@mui/material";
import logo from "@/assets/logo/logo.svg";
import manWelcome from "@/assets/images/manWelcome.png";
import { useNavigate } from "react-router";
import LandScreenHelp from "./LandScreenHelp";

const WelcomeTenx = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/createorganization");
  };
  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <Container className="welcome_tenx">
      <div className="header">
        <img src={logo} alt="logo" />
        <div className="btn_div_login">
          <Button
            variant="contained"
            className="btn login"
            onClick={handleLogin}
          >
            Log in
          </Button>
          <Button
            variant="contained"
            className="btn signup"
            onClick={handleNavigate}
          >
            Sign up
          </Button>
        </div>
      </div>
      <div className="content">
        <div className="info">
          <div>
            <span>Welcome to </span>
            <span>EButler TenX System</span>
          </div>
          <span>
            Reprehenderit ut et nihil voluptatem cupiditate deleniti. Est
            ducimus reprehenderit. Nam voluptas qui cumque sint atque et odio
            perferendis.
          </span>
          <Button
            variant="contained"
            className="try_btn"
            onClick={handleNavigate}
          >
            Try it Now
          </Button>
        </div>
        <div>
          <img src={manWelcome} alt="man image" />
        </div>
      </div>
      <LandScreenHelp />
    </Container>
  );
};

export default WelcomeTenx;
