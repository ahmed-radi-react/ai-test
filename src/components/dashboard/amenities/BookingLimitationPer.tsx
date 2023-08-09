import { FormControl, Input, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { ReactComponent as SelectIcon } from "@/assets/icons/selescticon.svg";
import { TBookingLimitationProps } from "~/types/types";

export const BookingLimitationPer: FC<TBookingLimitationProps> = ({
  handleChange,
  count,
  maximumBookingPer,
  handleSelect,
}) => {
  return (
    <div className="selectes_div_time">
      <Input
        placeholder="count"
        type="number"
        className="count_div"
        inputProps={{ maxLength: 3 }}
        onChange={(e) => handleChange(e, "count")}
        value={count ? count : ""}
      />
      <span className="timeSpan">Times per</span>
      <FormControl className="select_times">
        <Select
          defaultValue={maximumBookingPer ? maximumBookingPer : "month"}
          inputProps={{
            name: "age",
          }}
          IconComponent={(props) => <SelectIcon {...props} />}
          name="select"
          onChange={handleSelect}
        >
          <MenuItem value={"month"}> Month</MenuItem>
          <MenuItem value={"day"}> Day</MenuItem>
          <MenuItem value={"week"}> Week</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
