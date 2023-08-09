import { Button } from "@mui/material";
import { ReactComponent as CallIcon } from "@/assets/icons/CallIcon.svg";
import { PropsFeedBack } from "~/types/types";

function FeedBackDialog({ feedback }: PropsFeedBack) {
  return (
    <div className="feedback_dialog">
      <div className="feedback_dialog_header">
        <div>Feedback</div>
      </div>
      <div className="feedback_dialog_info">
        <div className="feedback_dialog_info_img">
          <img src={feedback?.url} alt="" />
        </div>
        <div className="feedback_dialog_info_name">
          <span>{feedback?.name}</span>
        </div>
        <div className="feedback_dialog_info_rate">
          <div
            className={feedback?.rate && feedback.rate === 1 ? "selected" : ""}
          >
            <span>1</span>
          </div>
          <div
            className={feedback?.rate && feedback.rate === 2 ? "selected" : ""}
          >
            <span>2</span>
          </div>
          <div
            className={feedback?.rate && feedback.rate === 3 ? "selected" : ""}
          >
            <span>3</span>
          </div>
          <div
            className={feedback?.rate && feedback.rate === 4 ? "selected" : ""}
          >
            <span>4</span>
          </div>
          <div
            className={feedback?.rate && feedback.rate === 5 ? "selected" : ""}
          >
            <span>5</span>
          </div>
        </div>
        <div className="feedback_dialog_info_bottom">
          {feedback?.rate && feedback.rate <= 1 ? (
            <span>Extremely dissatisfied</span>
          ) : feedback?.rate && feedback.rate <= 4 ? (
            <span>Satisfied</span>
          ) : (
            <span>Extremely Satisfied</span>
          )}
        </div>
      </div>
      {feedback?.notes ? (
        <div className="feedback_dialog_feedback">
          <div className="feedback_dialog_feedback_header">
            <span>The Tenant also says</span>
            <span>Replay</span>
          </div>
          <div className="feedback_dialog_feedback_bottom">
            <span>{feedback?.notes}</span>
          </div>
        </div>
      ) : (
        <div className="feedback_dialog_feedback">
          <div className="feedback_dialog_feedback_header">
            <span>The Tenant not providing any txt feedback</span>
          </div>
          <div className="feedback_dialog_feedback_bottom">
            <button className="replay_button">Replay to his Rate</button>
          </div>
        </div>
      )}
      <div className="feedback_dialog_call">
        <Button variant="contained" className="btn">
          <CallIcon />
          <span className="call">Call</span>
        </Button>
      </div>
    </div>
  );
}

export default FeedBackDialog;
