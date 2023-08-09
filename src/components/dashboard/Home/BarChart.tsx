import ProgressBar from "@ramonak/react-progress-bar";
import { IBarChart } from "~/types/types";

const BarChart = ({
  title,
  number,
  mainColor,
  bgColor,
  maxCompleteNumber,
}: IBarChart) => {
  return (
    <div className="info__analytics-bar">
      <div className="info__analytics-bar-item">
        <span className="title">{title}</span>
        <span style={{ color: `${mainColor}` }}>
          {parseInt(number).toLocaleString("en-US")}
        </span>
      </div>
      <ProgressBar
        completed={number}
        maxCompleted={maxCompleteNumber}
        bgColor={mainColor}
        height="8px"
        borderRadius="71px"
        isLabelVisible={false}
        baseBgColor={bgColor}
        labelColor=""
      />
    </div>
  );
};

export default BarChart;
