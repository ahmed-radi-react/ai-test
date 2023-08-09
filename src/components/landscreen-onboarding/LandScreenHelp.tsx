import messageAnything from "@/assets/images/messageAnything.png";
import { ReactComponent as SentMessage } from "@/assets/icons/sentMessage.svg";
const LandScreenHelp = () => {
  return (
    <div className="help">
      <img
        src={messageAnything}
        alt="messageAnything"
        className="message_help"
      />
      <span className="span_help">We are here if you need anything</span>
      <SentMessage className="svg_help" />
    </div>
  );
};

export default LandScreenHelp;
