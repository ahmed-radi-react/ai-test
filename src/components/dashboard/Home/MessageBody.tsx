import { IMessageBody } from "~/types/types";

const MessageBody = ({ title, number, data }: IMessageBody) => {
  return (
    <div className="message">
      <div className="message__header">
        <div className="message__header-text">
          <span className="header">{title}</span>
          <span className="message_number">{number} New Messages</span>
        </div>
        <button className="message__header-button">See All</button>
      </div>
      {data?.map((item, index) => {
        return (
          <div className="message__content" key={index}>
            <div className="message__content-left">
              <div className="image">
                <img src={item.image} alt={item.image} />
              </div>
              <div className="user-info">
                <h3 className="user-info__name">{item.name}</h3>
                <p className="user-info__role">{item.role}</p>
              </div>
            </div>
            <div className="message__content-right">
              <p>Send me all the Properties Assets</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MessageBody;
