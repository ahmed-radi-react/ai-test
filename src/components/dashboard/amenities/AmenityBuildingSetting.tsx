import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Input,
  Radio,
  RadioGroup,
} from "@mui/material";
import { amenitySetting, radioStyle } from "@/utils/constant";
import { ReactComponent as Checkbtn } from "@/assets/icons/checkbtn.svg";
import { useEffect, useState } from "react";
import { IAmenityBuildingSetting } from "~/types/types";
import { BookingLimitationPer } from "./BookingLimitationPer";

const AmenityBuildingSetting = ({
  setValid,
  count,
  valid,
  setCount,
  handleSelect,
  buidlingData,
  slotsDataBuilding,
  setSlotsDataBuilding,
  addService,
  setSettingBookableAndPayment,
  bookable,
  requireManualApproval,
  bookingLimitationPerAprt,
  bookingLimitationPerTenant,
  requirePeyment,
  maximumBookingPer,
  capacity,
  setCapacity,
  setMaximumBookingFor,
}: IAmenityBuildingSetting) => {
  const [settingData, setSettingData] = useState<string[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const handleBuilding = (_id: string, day?: string) => {
    if (day === "all" && _id === "1") {
      if (!allChecked) {
        const idsToAdd = buidlingData.map((el) => el._id);
        setSlotsDataBuilding(idsToAdd);
        setAllChecked(true);
      } else {
        setSlotsDataBuilding([]);
        setAllChecked(false);
      }
    } else if (day) {
      if (slotsDataBuilding.includes(_id)) {
        setSlotsDataBuilding((prev) => prev.filter((el) => el !== _id));
      } else {
        setSlotsDataBuilding((prev) => [...prev, _id]);
      }
    }
  };
  const handleSetting = (day: string) => {
    if (settingData.includes(day)) {
      setSettingData((prev) => prev.filter((el) => el !== day));
    } else {
      setSettingData((prev) => [...prev, day]);
    }
  };

  const handleChange = (event: any, label: string) => {
    const value = event.target.value;
    if (value <= 0 && value.length !== 0) {
      setValid((prev) => {
        return {
          ...prev,
          count: "Value must be greater than zero!",
          capacity: "Value must be greater than zero!",
        };
      });
    } else if (value > 1000) {
      setValid((prev) => {
        return {
          ...prev,
          count: "Value must be small than 1000!",
          capacity: "Value must be small than 1000!",
        };
      });
    } else {
      setValid((prev) => {
        return { ...prev, count: "", capacity: "" };
      });
      if (setCount && label === "count") {
        setCount(value);
      }
      if (setCapacity && label === "capacity") {
        setCapacity(value);
      }
    }
  };

  const [value, setValue] = useState<
    {
      value: string;
      label: string;
      radio: any;
      id: number;
    }[]
  >([
    {
      value: "bookinglimitationAprt",
      label: "Booking Limitation per Apartment",
      id: 1,
      radio: <Radio sx={radioStyle} />,
    },
    {
      value: "bookinglimitationTenant",
      label: "Booking Limitation per Tenant",
      id: 2,
      radio: <Radio sx={radioStyle} />,
    },
  ]);
  const [radioValue, setRadioValue] = useState("");
  useEffect(() => {
    if (bookingLimitationPerTenant) {
      setRadioValue("bookinglimitationTenant");
    } else if (bookingLimitationPerAprt) {
      setRadioValue("bookinglimitationAprt");
    }
  }, [bookingLimitationPerTenant, bookingLimitationPerAprt]);
  const handleChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
    if ((event.target as HTMLInputElement).value === "bookinglimitationAprt") {
      setSettingBookableAndPayment((prev) => {
        return {
          ...prev,
          bookingLimitationPerAprt: !bookingLimitationPerAprt,
          bookingLimitationPerTenant: false,
        };
      });
      setMaximumBookingFor("apartment");
    } else {
      setSettingBookableAndPayment((prev) => {
        return {
          ...prev,
          bookingLimitationPerTenant: !bookingLimitationPerTenant,
          bookingLimitationPerAprt: false,
        };
      });
      setMaximumBookingFor("tenant");
    }
  };

  return (
    <div className="building_setting_ammenity">
      <span className="header_assign_span">Assigned Building</span>
      <span className="info_building">
        Lorem ipsum dolor sit amet consectetur. Dui euismod.
      </span>

      <div className="building_assigned building_check">
        <FormControlLabel
          // value="top"
          control={
            <Checkbox
              className="checkbox "
              icon={<div className="checkincon"></div>}
              checkedIcon={
                <div className="checked">
                  <Checkbtn />
                </div>
              }
              onChange={() => {
                handleBuilding("1", "all");
              }}
            />
          }
          label={"Select All"}
          labelPlacement="end"
        />
        {buidlingData?.map((item, index) => {
          return (
            <div key={index} className="">
              <FormControlLabel
                // value="top"
                control={
                  <Checkbox
                    className="checkbox "
                    icon={<div className="checkincon"></div>}
                    checkedIcon={
                      <div className="checked">
                        <Checkbtn />
                      </div>
                    }
                    onChange={() => {
                      handleBuilding(item._id, item.name);
                    }}
                    checked={slotsDataBuilding.includes(item._id)}
                  />
                }
                label={item.name}
                labelPlacement="end"
              />
            </div>
          );
        })}
      </div>
      <div className="setting_amenity">
        <span className="header_assign_span">Amenity setting</span>
        <div className="building_assigned setting">
          {amenitySetting.map((item, index) => {
            return (
              <div
                key={index}
                className={`checkbox checklabel${index} ${
                  index === 0 && addService.length >= 1 && "bookable"
                }`}
              >
                <FormControlLabel
                  // value="top"
                  control={
                    <Checkbox
                      checked={
                        (item?.name === "bookable" && bookable) ||
                        (item?.name === "manualapproval" &&
                          requireManualApproval) ||
                        (item?.name === "bookinglimitationTenant" &&
                          bookingLimitationPerTenant) ||
                        (item?.name === "requirepayment" && requirePeyment)
                      }
                      className="checkbox"
                      icon={<div className="checkincon"></div>}
                      checkedIcon={
                        <div className="checked">
                          <Checkbtn />
                        </div>
                      }
                      name={`amenity${item.id}`}
                      onChange={() => {
                        handleSetting(item.name);
                        setSettingBookableAndPayment((prev) => {
                          if (item?.name === "bookable") {
                            return { ...prev, bookable: !bookable };
                          } else if (item?.name === "manualapproval") {
                            return {
                              ...prev,
                              requireManualApproval: !requireManualApproval,
                            };
                          } else if (item?.name === "requirepayment") {
                            return {
                              ...prev,
                              requirePeyment: !requirePeyment,
                            };
                          }
                          return { ...prev };
                        });
                      }}
                    />
                  }
                  label={item.label}
                  labelPlacement="end"
                />
              </div>
            );
          })}
          <FormControl
            sx={{
              marginLeft: "-2px",
            }}
          >
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={radioValue}
              onChange={handleChangeRadio}
              sx={{
                display: "flex",
                gap: "5px",
              }}
            >
              {value.map(({ value, radio, label, id }) => {
                return (
                  <div key={id}>
                    <FormControlLabel
                      value={value}
                      control={radio}
                      label={label}
                    />
                    {radioValue === value ? (
                      <BookingLimitationPer
                        maximumBookingPer={maximumBookingPer}
                        count={count}
                        handleChange={handleChange}
                        handleSelect={handleSelect}
                      />
                    ) : null}
                  </div>
                );
              })}
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <span className="valid_div">{valid.count}</span>
      <div className="selectes_div_time">
        <Input
          placeholder="capacity"
          type="number"
          className="count_div"
          inputProps={{ maxLength: 3 }}
          onChange={(e) => handleChange(e, "capacity")}
          value={capacity ? capacity : ""}
        />
      </div>
    </div>
  );
};

export default AmenityBuildingSetting;
