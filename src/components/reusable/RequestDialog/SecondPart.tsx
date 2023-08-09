import { Button, FormControl, SelectChangeEvent } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { ReactComponent as CalendarRequest } from "@/assets/icons/calendarRequest.svg";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import ReactWeeklyDayPicker from "react-weekly-day-picker";
import moment from "moment";
import "react-multi-carousel/lib/styles.css";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { IDataReq, TSecondStepProps } from "~/types/types";
import { amenities, maintenance, maintenancePeriod } from "@/utils/constant";
import { StatusName } from "../Status";

const SecondPart: FC<TSecondStepProps> = ({
  title,
  selectTime,
  setSelectTime,
  dialog,
  selectedDay,
  setSelectedDay,
  handleClose,
  optionValueApartment,
  optionValue,
  selectMorning,
  setSelectMorning,
  reqdata,
  changeCalendar,
  targetArray,
  handleChangeStatus,
  handleCloseDialog,
}) => {
  const navigate = useNavigate();
  const [maintenanceTime, setMaintenanceTime] = useState("");
  const [maintenanceSelect, setMaintenanceSelect] = useState({
    name: "",
    id: "",
  });

  const { data: available, isSuccess: availableSuccess } = queryRequest({
    url: "/service?offset=0&limit=10000",
    method: "get",
    key: "available",
  });

  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${maintenanceSelect.id}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const { data: recheduledDataReq, isSuccess: recheduledDataSuccess } =
    queryRequest({
      url: `/service/amenity/${
        reqdata?.service?._id?.length ? reqdata?.service?._id : ""
      }`,
      method: "get",
      key: `recheduledData+${reqdata?._id}`,
    });

  const [recheduledData, setRecheduledData] = useState([]);
  useEffect(() => {
    if (recheduledDataSuccess) {
      setRecheduledData(recheduledDataReq?.data?.availabilitySlots);
    }
    if (changeCalendar && title === "Amenities") {
      setSelectMorning((prev) => {
        return {
          ...prev,
          id: 10,
          from: moment.utc(reqdata?.scheduleDateFrom).format("H:mm"),
          to: moment.utc(reqdata?.scheduleDateTo).format("H:mm"),
        };
      });
      setSelectedDay((prev) => [
        moment(reqdata?.scheduleDateFrom).format("YYYY-MM-DDTHH:mm:ssZ"),
      ]);
    } else if (changeCalendar) {
      const fromHour = moment.utc(reqdata?.scheduleDateFrom).hours();
      const toHour = moment.utc(reqdata?.scheduleDateTo).hours();

      setSelectedDay((prev) => [
        moment(reqdata?.scheduleDateFrom).format("YYYY-MM-DDTHH:mm:ssZ"),
      ]);
      setMaintenanceTime(() => {
        if (fromHour === 0 && toHour === 23) {
          return "All day";
        } else if (fromHour === 12 && toHour === 18) {
          return "Morning";
        } else if (fromHour === 18 && toHour === 0) {
          return "Evening";
        }

        // Return 'Unknown' if the time does not match any time
        return "Unknown";
      });
    }
  }, [recheduledDataSuccess, reqdata?.service?._id.length]);

  const [availableTime, setAvailableTime] = useState<
    { from: string; to: string }[]
  >([]);
  useEffect(() => {
    if (availableSuccess) {
      if ((title = "Maintenance")) {
        setAvailableTime(
          available?.data?.items?.filter((item: { flow: string }) => {
            return item.flow === maintenance;
          })[0]?.availabilitySlots
        );
      } else {
        setAvailableTime(
          available?.data?.items?.filter((item: { flow: string }) => {
            return item.flow === "amenity";
          })[0]?.availabilitySlots
        );
      }
    }
  }, [availableSuccess]);

  // const [selectMorning, setSelectMorning] = useState<{
  //   id: number;
  //   from: string;
  //   to: string;
  // }>(reqdata ? { id: 0, from: reqdata.scheduleDateFrom.slice(11, 16), to: reqdata.scheduleDateTo.slice(11, 16) } : { id: 0, from: "", to: "" });
  const [selectEvening, setSelectEvening] = useState<{
    id: number;
    from: string;
    to: string;
  }>({ id: 0, from: "", to: "" });
  const [activeTimeButtonForm, setActiveTimeButtonForm] =
    useState<boolean>(true);
  const [amenityId, setAmenityId] = useState<string>("");
  const [subId, setSubId] = useState("");

  const [subData, setSubData] = useState<{ _id: string; name: string }[]>([]);
  const { mutate: subCategoryMutate } = mutationRequest({
    url: `/service/${maintenance}?parentId=${subId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [closeIcon, setCloseIcon] = useState(true);

  const handleChange = (event: SelectChangeEvent) => {
    subCategoryMutate.mutate({});
  };
  useEffect(() => {
    if (subCategoryMutate.isSuccess) {
      setSubData(subCategoryMutate?.data?.data?.items);
    }
  }, [subCategoryMutate.isSuccess]);
  const handleClick = () => {
    setSelectTime(!selectTime);
  };

  const handleActiveClickMorning = (id: number, from: string, to: string) => {
    setSelectMorning((prev) => {
      return { ...prev, id: id, from: from, to: to };
    });
  };
  const handleActiveClickEvening = (id: number, from: string, to: string) => {
    setSelectEvening((prev) => {
      return { ...prev, id: id, from: from, to: to };
    });
  };
  // const [optionValue, setOptionValue] = useState<any | null>(null);

  useEffect(() => {
    if (optionValue && dialog) {
      setCloseIcon(false);
    } else {
      setCloseIcon(true);
    }
  }, [optionValue, dialog]);

  useEffect(() => {
    if ((selectedDay && selectMorning.from.length) || maintenanceTime) {
      setActiveTimeButtonForm(false);
    } else {
      setActiveTimeButtonForm(true);
    }
  }, [selectedDay, selectMorning, maintenanceTime]);

  useEffect(() => {
    if (maintenanceSelect.id.length) {
      apartmentTenant.mutate({});
    }
  }, [maintenanceSelect.id]);

  useEffect(() => {
    if (title === "Maintenance") {
      /*Maintenance active button*/
      if (optionValue) {
        setCloseIcon(false);
      } else {
        setCloseIcon(true);
      }
    } else {
      /*Amenities active button*/
      if (dialog && optionValue) {
        setCloseIcon(false);
      } else {
        setCloseIcon(true);
      }
    }
  }, [dialog, optionValue]);

  return (
    <FormControl className="formcontrol_time">
      {title === "Amenities" && (
        <div className="tenant-details">
          <div className="tenant-container">
            <div className="image-container">
              <img
                src={dialog ? dialog?.icon?.url : reqdata?.service?.icon?.url}
              />
              <img
                src={
                  optionValue
                    ? optionValue?.image?.url
                    : reqdata?.owner.image?.url
                }
                className="user-image"
              />
            </div>
            <div className="tenant-info">
              <span className="tenant-info__name" title={dialog?.name}>
                {reqdata ? reqdata?.service?.name : dialog?.name}
              </span>
              <div className="tenant-info__date">
                <span className="tenant-name" title={optionValue?.firstName}>
                  {reqdata ? reqdata?.owner?.firstName : optionValue?.firstName}
                </span>
                <span className="tenant-apartment">
                  Apart
                  <span className="tenant-apartment__number">
                    {/* {optionValue?.tenantInfo?.apartmentNumber} */}
                    {reqdata
                      ? reqdata?.owner?.tenantInfo?.apartmentNumber
                      : optionValueApartment?.name}
                  </span>
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="contained"
            className="edit-button"
            onClick={handleClick}
          >
            Edit
          </Button>
        </div>
      )}
      <div>
        <div
          className={`select-date-header ${
            title === "Amenities" ? "amenity" : ""
          }`}
        >
          <span
            className={`selesct_span ${title === "Amenities" ? "amenity" : ""}`}
          >
            Select your preferred date
          </span>
          {title === "Amenities" && (
            <span onClick={() => navigate("/")} className="open-calender">
              <CalendarRequest />
              Open Calendar
            </span>
          )}
        </div>
        <ReactWeeklyDayPicker
          className="weeklypicker"
          secondLineFormat={" D"}
          daysCount={7}
          // startDay={selectedDay ? selectedDay[0] : new Date()}
          selectedDays={selectedDay}
          multipleDaySelect={false}
          selectDay={function (day: any) {
            return setSelectedDay(day);
          }}
        />
        <span className="pickmorning">Pick from available slots</span>
        {location.pathname.includes("ameniti") ? (
          <div>
            <div>
              <span className="morningTime">Morning</span>
              <div className="morningDiv">
                {recheduledData?.length ? (
                  <>
                    {" "}
                    {recheduledData
                      .filter(
                        (item: any) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item: any, index) => {
                        if (
                          +item?.from.split(":")[0] > 6 &&
                          +item?.from.split(":")[0] < 12
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item?.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item?.from,
                                  item?.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                ) : (
                  <>
                    {" "}
                    {dialog?.availabilitySlots
                      .filter(
                        (item) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item, index) => {
                        if (
                          +item?.from.split(":")[0] > 6 &&
                          +item?.from.split(":")[0] < 12
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item.from,
                                  item.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                )}

                {/* {availableTime?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`morning_time ${selectMorning.id === index + 1 ? "select_morning" : ""
                    }`}
                  onClick={() =>
                    handleActiveClickMorning(index + 1, item.from, item.to)
                  }
                >
                  {item?.from + "-" + item?.to}
                </div>
              );
            })} */}
              </div>
            </div>
            <div>
              <span className="morningTime">Afternoon</span>
              <div className="morningDiv">
                {recheduledData?.length ? (
                  <>
                    {recheduledData
                      .filter(
                        (item: any) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item: any, index) => {
                        if (
                          +item?.from.split(":")[0] > 12 &&
                          +item?.from.split(":")[0] < 18
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item.from,
                                  item.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                ) : (
                  <>
                    {dialog?.availabilitySlots
                      .filter(
                        (item) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item, index) => {
                        if (
                          +item?.from.split(":")[0] > 12 &&
                          +item?.from.split(":")[0] < 18
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item.from,
                                  item.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                )}

                {/* {availableTime?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`morning_time ${selectMorning.id === index + 1 ? "select_morning" : ""
                    }`}
                  onClick={() =>
                    handleActiveClickMorning(index + 1, item.from, item.to)
                  }
                >
                  {item?.from + "-" + item?.to}
                </div>
              );
            })} */}
              </div>
            </div>
            <div>
              <span className="morningTime">Evening</span>
              {/* <div className="morningDiv">
            {dialog?.availabilitySlots.filter((item) => item.day === moment(selectedDay[0]).format('ddd').toUpperCase()).map((item, index) => {
              return <div
                key={index}
                className={`morning_time ${selectMorning.from === item.from ? "select_morning" : ""
                  }`}
                onClick={() =>
                  handleActiveClickMorning(index + 1, item.from, item.to)
                }
              >
                {item?.from + "-" + item?.to}
              </div>
            })}
          </div> */}
              <div className="morningDiv">
                {recheduledData?.length ? (
                  <>
                    {" "}
                    {recheduledData
                      .filter(
                        (item: any) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item: any, index: any) => {
                        if (
                          +item?.from.split(":")[0] >= 6 &&
                          +item?.from.split(":")[0] >= 18
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item.from,
                                  item.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                ) : (
                  <>
                    {dialog?.availabilitySlots
                      .filter(
                        (item) =>
                          item.day ===
                          moment(selectedDay[0]).format("ddd").toUpperCase()
                      )
                      .map((item, index) => {
                        if (
                          +item?.from.split(":")[0] >= 6 &&
                          +item?.from.split(":")[0] >= 18
                        ) {
                          return (
                            <div
                              key={index}
                              className={`morning_time ${
                                selectMorning.from === item.from
                                  ? "select_morning"
                                  : ""
                              }`}
                              onClick={() =>
                                handleActiveClickMorning(
                                  index + 1,
                                  item.from,
                                  item.to
                                )
                              }
                            >
                              {item?.from + "-" + item?.to}
                            </div>
                          );
                        }
                      })}
                  </>
                )}
                {/* {dialog?.availabilitySlots
                  .filter(
                    (item) =>
                      item.day ===
                      moment(selectedDay[0]).format("ddd").toUpperCase()
                  )
                  .map((item, index) => {
                    if (
                      +item?.from.split(":")[0] >= 6 &&
                      +item?.from.split(":")[0] >= 18
                    ) {
                      return (
                        <div
                          key={index}
                          className={`morning_time ${
                            selectMorning.from === item.from
                              ? "select_morning"
                              : ""
                          }`}
                          onClick={() =>
                            handleActiveClickMorning(
                              index + 1,
                              item.from,
                              item.to
                            )
                          }
                        >
                          {item?.from + "-" + item?.to}
                        </div>
                      );
                    }
                  })} */}
                {/* {availableTime?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`morning_time ${selectMorning.id === index + 1 ? "select_morning" : ""
                    }`}
                  onClick={() =>
                    handleActiveClickMorning(index + 1, item.from, item.to)
                  }
                >
                  {item?.from + "-" + item?.to}
                </div>
              );
            })} */}
              </div>
            </div>
          </div>
        ) : (
          <div className="maintenance_time_period">
            {maintenancePeriod.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setMaintenanceTime(item.label);

                    setActiveTimeButtonForm(true);
                    setSelectMorning((prev) => {
                      if (item.label === "All day") {
                        return { id: item.id, from: "7:00", to: "23:59" };
                      } else if (item.label === "Morning") {
                        return { id: item.id, from: "12:00", to: "18:00" };
                      } else if (item.label === "Evening") {
                        return { id: item.id, from: "18:00", to: "00:00" };
                      }
                      return { ...prev };
                    });
                  }}
                  className={`${`period${item.id}`} ${
                    maintenanceTime === item.label ? "select_morning" : ""
                  }`}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
        <div>
          <Button
            variant="contained"
            className={`addRequestbtn ${!selectedDay ? "deactiev" : ""}`}
            onClick={handleClose}
            disabled={!selectedDay}
          >
            Add Request
          </Button>
          <Button
            variant="contained"
            className={`addRequestbtn ${!selectedDay ? "deactiev" : ""}`}
            onClick={handleClose}
            disabled={!selectedDay}
          >
            Add Request
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            className={`addRequestbtn ${!selectedDay ? "deactiev" : ""}`}
            onClick={handleClose}
            disabled={!selectedDay}
          >
            Add Request
          </Button>
        </div>
      </div> */}
      {changeCalendar && title === "Amenities" ? (
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <div
            className="pickmorning"
            style={{
              paddingTop: "15px",
            }}
          >
            Change status
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "15px",
            }}
          >
            {targetArray?.map(
              ({
                id,
                status,
                title,
              }: {
                id: number;
                status: string;
                title: string;
              }) => {
                return (
                  <div
                    className={`status ${status}`}
                    style={{
                      cursor: "pointer",
                    }}
                    key={id}
                    onClick={() => {
                      handleChangeStatus && handleChangeStatus(status);
                      handleCloseDialog && handleCloseDialog();
                    }}
                  >
                    <StatusName
                      status={status}
                      page={`${amenities}`}
                      showIcon={true}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : null}
      {changeCalendar && title === "Maintenance" ? (
        <div
          style={{
            marginBottom: "30px",
          }}
        >
          <div
            className="pickmorning"
            style={{
              paddingTop: "15px",
            }}
          >
            Change status
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "15px",
              marginBottom: "30px",
            }}
          >
            {targetArray?.map(
              ({
                id,
                status,
                title,
              }: {
                id: number;
                status: string;
                title: string;
              }) => {
                return (
                  <div
                    className={`status ${status}`}
                    style={{
                      cursor: "pointer",
                    }}
                    key={id}
                    onClick={() => {
                      handleChangeStatus && handleChangeStatus(status);
                      handleCloseDialog && handleCloseDialog();
                    }}
                  >
                    <StatusName
                      status={status}
                      page={maintenance}
                      showIcon={true}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      ) : null}
      {changeCalendar ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            className={`changeCalendarReqBtn_add ${
              !selectedDay.length ? "deactiev" : ""
            }`}
            onClick={handleClose}
            disabled={!selectedDay.length}
          >
            Reschedule Request
          </Button>
          <Button
            variant="contained"
            className={`changeCalendarReqBtn_dec`}
            onClick={() => {
              handleChangeStatus && handleChangeStatus("declined");
              handleCloseDialog && handleCloseDialog();
            }}
            // disabled={!selectedDay}
          >
            Decline Request
          </Button>
        </div>
      ) : (
        <Button
          variant="contained"
          className={`addRequestbtn ${!selectedDay.length ? "deactiev" : ""}`}
          onClick={handleClose}
          disabled={!selectedDay.length}
        >
          {recheduledData?.length ? "Reschedule Request" : "Add Request"}
        </Button>
      )}
    </FormControl>
  );
};

export default SecondPart;
