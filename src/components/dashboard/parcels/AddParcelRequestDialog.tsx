//@ts-ignore
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import { useState } from "react";
import { parcelreqDialogDate } from "@/utils/constant";
import { Button } from "@mui/material";
import moment from "moment";

const AddParcelRequestDialog = () => {
  const [sorttable, setSorttable] = useState("All day");
  const [date, setDate] = useState([]);
  const handleClick = (label: string) => {
    setSorttable(label);
  };

  return (
    <div className="addparcel_request_dialog">
      <span className="title">Add Reminder for this Parcel</span>
      <span className="date_span">Select the date</span>
      <ReactWeeklyDayPicker
        secondLineFormat={" D"}
        daysCount={7}
        className="weeklypicker"
        startDay={new Date()}
        selectedDays={["22 June 2017", ...date]}
        multipleDaySelect={false}
        selectDay={(date: []) => {
          setDate(date);
        }}
      />
      <span className="time_span">Select the time</span>
      <div className="time_hour_div">
        {parcelreqDialogDate.map((item, index) => {
          return (
            <div
              key={item.id}
              className={`date_time date_time${item.id} ${
                sorttable === item.label ? "activesort" : ""
              }`}
              onClick={() => handleClick(item.label)}
            >
              <item.Icon />
              <span>{item.label}</span>
            </div>
          );
        })}
      </div>
      <div className="selected_date">
        <span>You Reminder will notify you </span>
        <span>
          On{" "}
          {moment(...date)
            .format("D ddd")
            .toUpperCase()}
          , at {sorttable}.
        </span>
      </div>
      <div className="btn_div">
        <Button variant="contained" className="btn">
          Add Reminder
        </Button>
        <Button variant="contained" className="btn">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddParcelRequestDialog;
