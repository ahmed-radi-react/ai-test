import {
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import {
  timeWeekDay,
  times,
  timesHalf,
  timesTwoHourOdd,
  timesTwoHourEven,
  timeAvailable,
} from "@/utils/constant";
import { ReactComponent as CheckBtn } from "@/assets/icons/checkbtn.svg";
import { ITimeAvailability, TimeSlot, AvailableDate } from "../types/types";
import { useEffect, useState } from "react";
import { ReactComponent as SelectIcon } from "@/assets/icons/selescticon.svg";
import { ReactComponent as DeleteIcon } from "@/assets/icons/delete_time.svg";
import MakeActive from "./MakeActive";

const TimeAvailability = ({
  el,
  setAvailabiliySlot,
  availabilitySlots,
  setAllowMultipleSlots,
  allowMultipleSlots,
}: ITimeAvailability) => {
  const [time, setTime] = useState("1");
  const [hour, setHour] = useState("1");

  type Tb = {
    [key: string]: TimeSlot[];
  };

  const handleChange = (event: SelectChangeEvent) => {
    const added_value = event.target.value;
    const current_time = times.find((v) => v.id === +hour)?.from || "7:00";

    if (!(time === "17")) {
      setTime(added_value);
    }
    if (!isChecked) {
      if (added_value === "1") {
        const changedTime = times.slice(+hour - 1, times.length);
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...changedTime],
            time: added_value,
          },
        }));
      } else if (added_value === "1.5") {
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...timesHalf[current_time]],
            time: added_value,
          },
        }));
      } else {
        const changedTime =
          +hour % 2 === 0
            ? timesTwoHourEven.filter((v) => v.id >= Math.ceil(+hour / 2))
            : timesTwoHourOdd.filter((v) => v.id >= Math.ceil(+hour / 2));
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...changedTime],
            time: added_value,
          },
        }));
      }
    } else {
      if (added_value === "1") {
        const changedTime = times.slice(+hour - 1, times.length);
        setAvailable((prev) => ({
          SUN: { state: changedTime, hour, time: added_value },
          MON: { state: changedTime, hour, time: added_value },
          TUE: { state: changedTime, hour, time: added_value },
          WED: { state: changedTime, hour, time: added_value },
          THU: { state: changedTime, hour, time: added_value },
          FRI: { state: changedTime, hour, time: added_value },
          SAT: { state: changedTime, hour, time: added_value },
        }));
      } else if (added_value === "1.5") {
        setAvailable((prev) => ({
          SUN: { state: timesHalf[current_time], hour, time: added_value },
          MON: { state: timesHalf[current_time], hour, time: added_value },
          TUE: { state: timesHalf[current_time], hour, time: added_value },
          WED: { state: timesHalf[current_time], hour, time: added_value },
          THU: { state: timesHalf[current_time], hour, time: added_value },
          FRI: { state: timesHalf[current_time], hour, time: added_value },
          SAT: { state: timesHalf[current_time], hour, time: added_value },
        }));
      } else {
        const changedTime =
          +hour % 2 === 0
            ? timesTwoHourEven.filter((v) => v.id >= Math.ceil(+hour / 2))
            : timesTwoHourOdd.filter((v) => v.id >= Math.ceil(+hour / 2));
        setAvailable((prev) => ({
          SUN: { state: changedTime, hour, time: added_value },
          MON: { state: changedTime, hour, time: added_value },
          TUE: { state: changedTime, hour, time: added_value },
          WED: { state: changedTime, hour, time: added_value },
          THU: { state: changedTime, hour, time: added_value },
          FRI: { state: changedTime, hour, time: added_value },
          SAT: { state: changedTime, hour, time: added_value },
        }));
      }
    }
  };

  const handleChangeHours = (event: SelectChangeEvent) => {
    setHour(event.target.value + "");
    const current_jam =
      times.find((v) => v.id === +event.target.value)?.from || "7:00";

    if (!isChecked) {
      if (time === "1") {
        const changeTime = times.slice(+event.target.value - 1, times.length);
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...changeTime],
            hour: event.target.value,
          },
        }));
        timesHalf;
      } else if (time === "1.5") {
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...timesHalf[current_jam]],
            hour: event.target.value,
          },
        }));
      } else {
        const changedTime =
          +event.target.value % 2 === 0
            ? timesTwoHourEven.filter(
                (v) => v.id >= Math.ceil(+event.target.value / 2)
              )
            : timesTwoHourOdd.filter(
                (v) => v.id >= Math.ceil(+event.target.value / 2)
              );
        setAvailable((prev) => ({
          ...prev,
          [active]: {
            ...prev[active],
            state: [...changedTime],
            hour: event.target.value,
          },
        }));
      }
    } else {
      if (time === "1") {
        const changeTime = times.slice(+event.target.value - 1, times.length);
        setAvailable((prev) => ({
          SUN: { state: changeTime, hour: event.target.value, time },
          MON: { state: changeTime, hour: event.target.value, time },
          TUE: { state: changeTime, hour: event.target.value, time },
          WED: { state: changeTime, hour: event.target.value, time },
          THU: { state: changeTime, hour: event.target.value, time },
          FRI: { state: changeTime, hour: event.target.value, time },
          SAT: { state: changeTime, hour: event.target.value, time },
        }));
        timesHalf;
      } else if (time === "1.5") {
        setAvailable((prev) => ({
          SUN: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          MON: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          TUE: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          WED: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          THU: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          FRI: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
          SAT: {
            state: timesHalf[current_jam],
            hour: event.target.value,
            time,
          },
        }));
      } else {
        const changedTime =
          +event.target.value % 2 === 0
            ? timesTwoHourEven.filter(
                (v) => v.id >= Math.ceil(+event.target.value / 2)
              )
            : timesTwoHourOdd.filter(
                (v) => v.id >= Math.ceil(+event.target.value / 2)
              );
        setAvailable((prev) => ({
          SUN: { state: changedTime, hour: event.target.value, time },
          MON: { state: changedTime, hour: event.target.value, time },
          TUE: { state: changedTime, hour: event.target.value, time },
          WED: { state: changedTime, hour: event.target.value, time },
          THU: { state: changedTime, hour: event.target.value, time },
          FRI: { state: changedTime, hour: event.target.value, time },
          SAT: { state: changedTime, hour: event.target.value, time },
        }));
      }
    }
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckedSlot = () => {
    setIsChecked(!isChecked);
    setAvailable((prev) => {
      return {
        SUN: { state: available[active]?.state, hour, time },
        MON: { state: available[active]?.state, hour, time },
        TUE: { state: available[active]?.state, hour, time },
        WED: { state: available[active]?.state, hour, time },
        THU: { state: available[active]?.state, hour, time },
        FRI: { state: available[active]?.state, hour, time },
        SAT: { state: available[active]?.state, hour, time },
      };
    });
  };
  const [available, setAvailable] = useState<AvailableDate>(timeAvailable);

  useEffect(() => {
    const locationState = availabilitySlots?.reduce(
      (acc: any, val: any) => {
        if (val.day === "SUN") {
          acc[val?.day] = {
            state: [
              ...acc["SUN"]?.state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "MON") {
          acc[val?.day] = {
            state: [
              ...acc["MON"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "TUE") {
          acc[val?.day] = {
            state: [
              ...acc["TUE"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "WED") {
          acc[val?.day] = {
            state: [
              ...acc["WED"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "THU") {
          acc[val?.day] = {
            state: [
              ...acc["THU"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "FRI") {
          acc[val?.day] = {
            state: [
              ...acc["FRI"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        } else if (val.day === "SAT") {
          acc[val?.day] = {
            state: [
              ...acc["SAT"].state,
              { id: val.id, from: val.from, to: val.to },
            ],
            hour: val.hour,
            time: val.time,
          };
        }
        return acc;
      },
      {
        SUN: { state: [], hour: "", time: "" },
        MON: { state: [], hour: "", time: "" },
        TUE: { state: [], hour: "", time: "" },
        WED: { state: [], hour: "", time: "" },
        THU: { state: [], hour: "", time: "" },
        FRI: { state: [], hour: "", time: "" },
        SAT: { state: [], hour: "", time: "" },
      }
    );

    setAvailable((prev) => {
      return availabilitySlots ? locationState : timeAvailable;
    });
  }, []);

  const changeDate = (available: AvailableDate) => {
    const newTime: {
      from: string;
      to: string;
      day: string;
      hour: string;
      time: string;
      id: number;
    }[] = Object.entries(available).flatMap(([day, times]) => {
      return times?.state.map((val) => ({
        from: val.from,
        to: val.to,
        day,
        hour: times.hour,
        time: times.time,
        id: val.id,
      }));
    });

    if (el !== 0) {
      setAvailabiliySlot((prev) => {
        const copyData = [...prev];
        copyData[el - 1] = newTime;
        return copyData;
      });
    } else {
      setAvailabiliySlot(newTime);
    }
  };

  const handleDeleteTime = (idx: number) => {
    let newData: AvailableDate;

    if (isChecked) {
      newData = {
        // ...available,
        // [active]: {
        //   ...available[active],
        //   state: available[active]?.state.filter((item) => item.id !== idx),
        // },
        SUN: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        MON: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        TUE: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        WED: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        THU: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        FRI: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
        SAT: {
          state: available[active]?.state.filter((item) => item.id !== idx),
          hour,
          time,
        },
      };
    } else {
      newData = {
        ...available,
        [active]: {
          ...available[active],
          state: available[active]?.state.filter((item) => item.id !== idx),
        },
      };
    }

    setAvailable(newData);
    changeDate(newData);
  };

  useEffect(() => {
    changeDate(available);
  }, [available]);
  const handleSelectedWeekDay = (weekDay: string) => {
    setActive(weekDay);
    const newData = { ...available, [active]: available[active] };
    setAvailable(newData);
    changeDate(newData);
    const time = available[weekDay].time;
    const hour = available[weekDay].hour;
    setHour(hour);
    setTime(time);
  };
  const [active, setActive] = useState("SUN");

  return (
    <div className="timeAvailability">
      <span className="time_span">Time Availability</span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          position: "relative",
        }}
      >
        <span className="time_select_span">Set availability for each day</span>
        <Tooltip
          title={`Allow Multiple Slots`}
          arrow
          className="tooltip"
          // disableInteractive
          placement="top"
        >
          <div>
            <MakeActive
              width={40}
              height={20}
              bullerWidth={16}
              bullerHeight={16}
              translate={"translateX(20px)"}
              title1={allowMultipleSlots ? "On" : "Off"}
              setActive={setAllowMultipleSlots}
              active={allowMultipleSlots}
            />
          </div>
        </Tooltip>
      </div>
      <div className="time_form_slots">
        <div className="formcontrollabel">
          <FormControlLabel
            key={"1"}
            control={
              <Checkbox
                className="checkbox"
                icon={<div className="checkincon"></div>}
                onChange={handleCheckedSlot}
                checkedIcon={
                  <div className="checked">
                    <CheckBtn />
                  </div>
                }
                name={"All"}
                checked={isChecked}
              />
            }
            label={""}
            labelPlacement="top"
          />
          {timeWeekDay.map((item) => {
            return (
              <div
                key={item.id}
                className={`time_week ${
                  active === item.label ? "selected" : ""
                } ${isChecked && "selected"}`}
                onClick={() => handleSelectedWeekDay(item.label)}
              >
                <span className="time_labels">{item.label}</span>
              </div>
            );
          })}
        </div>

        <div className="slot_div">
          <div>
            <div className="times">
              <span>Starts at</span>
              <FormControl sx={{ m: 1, minWidth: 82, padding: 0 }}>
                <Select
                  value={hour}
                  onChange={handleChangeHours}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="select_time"
                  IconComponent={(props) => <SelectIcon {...props} />}
                >
                  {time === "1.5" || time === "2"
                    ? times.slice(0, times.length - 1).map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.from}
                          </MenuItem>
                        );
                      })
                    : times.map((item) => {
                        return (
                          <MenuItem value={item.id} key={item.id}>
                            {item.from}
                          </MenuItem>
                        );
                      })}
                </Select>
              </FormControl>
              <span>with </span>
              <FormControl sx={{ m: 1, minWidth: 87, padding: 0 }}>
                <Select
                  value={time}
                  onChange={handleChange}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="select_time"
                  IconComponent={(props) => <SelectIcon {...props} />}
                >
                  <MenuItem value={"1"}>1 hour</MenuItem>
                  {hour !== "16" && <MenuItem value={"1.5"}>1.5 hour</MenuItem>}
                  {hour !== "16" && <MenuItem value={"2"}>2 hour</MenuItem>}
                </Select>
              </FormControl>
              <span>slots</span>
            </div>
            <div></div>
          </div>

          <div className="times_select_divs">
            {active &&
              available[active]?.state?.map((item) => {
                return (
                  <div className="selected_time_pick" key={item.id}>
                    <div className="time_to">{item.from}</div>
                    <span>to</span>
                    <div className="time_to">{item.to}</div>
                    <div
                      className="delete_time"
                      onClick={() => handleDeleteTime(item.id)}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeAvailability;
