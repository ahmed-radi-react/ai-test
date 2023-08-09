import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as BlueLogo } from "@/assets/icons/designLogoBlue.svg";
import { ReactComponent as BlueLogoLogoText } from "@/assets/icons/E-butlerBlueText.svg";
import { ReactComponent as ManLogo } from "@/assets/icons/ManLogoWhite.svg";
import { ReactComponent as GooglePlayBadge } from "@/assets/icons/Google Play Badge.svg";
import { ReactComponent as AppStoreBadge } from "@/assets/icons/App Store Badge.svg";

const OnlyMobileAccessWhite = () => {

  useEffect(() => {
    document.title = 'Mobile Access Only';
  }, []);

  return (
    <div className="page_container_white">
      <div className="logo_container_only_mobile_access">
        <div className="logo_container_only_mobile_access-container">
          <BlueLogo />
          <BlueLogoLogoText />
        </div>
      </div>
      <div className="content_only_mobile_access_white">
        <div className="text_only_mobile_access">
          <h2 className="header">Mobile Access Only</h2>
          <p className="description">
            We apologize for any inconvenience, but your account credentials
            only work <br />
            with our mobile app at this time. <br />
            Please <span>download</span> our mobile app from the app store to
            access your account.
          </p>
          <div>
            <div className="download_section_white">
              <div className="download_logo">
                <Link to="">
                  <AppStoreBadge />
                </Link>
                <Link to="">
                  <GooglePlayBadge />
                </Link>
              </div>
            </div>
            <div className="note_white">
              <p>
                We are continuously working to improve our service and hope to
                offer web access in the near future. In the meantime,
                <br />
                we appreciate your understanding and thank you for using our
                service.
                <br />
                If you have any questions or concerns, please contact our
                customer support team at <span>911</span>
              </p>
            </div>
          </div>
        </div>
        <div className="logo_white_page">
          <ManLogo />
        </div>
      </div>
    </div>
  );
};

export default OnlyMobileAccessWhite;
