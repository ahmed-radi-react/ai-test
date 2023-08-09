import { ISupportContent } from "~/types/types";

const SupportContent = ({ Icon, title, subtitle, button }: ISupportContent) => {
  return (
    <div className="contact-information">
      <div className="contact-information__icon">{Icon}</div>
      <div className="contact-information__content">
        <h3>{title}</h3>
        <p>{subtitle}</p>
        <button className="contact-information__content-button">
          {button}
        </button>
      </div>
    </div>
  );
};

export default SupportContent;
