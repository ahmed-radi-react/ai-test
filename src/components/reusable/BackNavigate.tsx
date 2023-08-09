import { useNavigate } from "react-router";
import { ReactComponent as BackSvg } from "@/assets/icons/backSvg.svg";
import { IBackNavigate } from "~/types/types";

const BackNavigate = ({ title, setSetting }: IBackNavigate) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (setSetting) {
      setSetting(true);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="back_navigate">
      <div onClick={handleNavigate} className="back_div">
        <BackSvg />
        <span>Back to {title}</span>
      </div>
    </div>
  );
};

export default BackNavigate;
