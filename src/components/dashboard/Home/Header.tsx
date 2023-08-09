import { IHeaderHome } from "~/types/types";

const Header = ({ title, subtitle, icon, color }: IHeaderHome) => {
  return (
    <div className="header__container">
      <div
        className="header__container-icon"
        style={{ backgroundColor: `${color}` }}
      >
        {icon}
      </div>
      <div className="header__container-text">
        <h3>{title}</h3>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default Header;
