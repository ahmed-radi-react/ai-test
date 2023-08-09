import { Button } from "@mui/material";
import { IMessageAlert } from "~/types/types";

const MessageAlert = ({ messagesort, error }: IMessageAlert) => {
  return (
    <div className={`message_alert ${messagesort.style}`}>
      <div className="icon_text">
        <messagesort.icon />
        <div className="message">
          <span className={messagesort.style}>{messagesort.title}</span>
          <span className="message_span">{messagesort.message}</span>
        </div>
      </div>
      {error ? (
        ""
      ) : (
        <div className="btn_div">
          <Button
            variant="contained"
            className={`btn view ${messagesort.style}`}
          >
            {messagesort.style === "delete" || "request" ? "Undo" : "View"}
          </Button>
          <Button variant="contained" className="btn dismiss">
            Dismiss
          </Button>
        </div>
      )}
    </div>
  );
};

export default MessageAlert;
