import { ReactComponent as WhiteLogo } from "@/assets/icons/designLogoWhite.svg";
import { ReactComponent as WhiteLogoText } from "@/assets/icons/E-butlerWhiteText.svg";
import { ReactComponent as ManLogo } from "@/assets/icons/ManLogo.svg";
import { ReactComponent as GooglePlayBadge } from "@/assets/icons/Google Play Badge.svg";
import { ReactComponent as AppStoreBadge } from "@/assets/icons/App Store Badge.svg";
import { Link } from "react-router-dom";

const OnlyMobileAccessBlue = () => {
  return (
    <div className="page_container">
      <div className="logo_container_only_mobile_access">
        <div className="logo_container_only_mobile_access-container">
          <WhiteLogo />
          <WhiteLogoText />
        </div>
      </div>
      <div className="content_only_mobile_access">
        <div className="logo">
          <ManLogo />
        </div>
        <div className="text_only_mobile_access">
          <h2 className="header">Mobile Access Only</h2>
          <p className="description">
            Your account credentials only work with our mobile app. Please
            download our app to access your account.
          </p>
          <p className="access">
            Thank you for understanding. <br />
            For assistance, contact <span>call 911</span>
          </p>
        </div>
        <div>
          <div className="download_section">
            <p className="text">Download App from </p>
            <div className="download_logo">
              <Link to="">
                <AppStoreBadge />
              </Link>
              <Link to="">
                <GooglePlayBadge />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlyMobileAccessBlue;
