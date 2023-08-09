import { Dispatch, SetStateAction } from "react";
import { IValetData, TEachService } from "~/types/types";
import moment from "moment";

export const SortbyNewestFirst = (
  data: { scheduleDateFrom: string }[],
  setData:
    | Dispatch<React.SetStateAction<{ scheduleDateFrom: string }[]>>
    | Dispatch<SetStateAction<IValetData[]>>
    | Dispatch<React.SetStateAction<TEachService[]>>
) => {
  let dataSort = [...data];
  dataSort.sort((a, b) => {
    return (
      new Date(a.scheduleDateFrom).getTime() -
      new Date(b.scheduleDateFrom).getTime()
    );
  });
  setData(dataSort as []);
};

export const SortbyOldestFirst = (
  data: { scheduleDateFrom: string }[],
  setData:
    | Dispatch<React.SetStateAction<{ scheduleDateFrom: string }[]>>
    | Dispatch<SetStateAction<IValetData[]>>
    | Dispatch<React.SetStateAction<TEachService[]>>
) => {
  let dataSort = [...data];
  dataSort.sort((a, b) => {
    return (
      new Date(b.scheduleDateFrom).getTime() -
      new Date(a.scheduleDateFrom).getTime()
    );
  });
  setData(dataSort as []);
};
export function isEmail(text: string) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(text);
}
export function isUnderage(dateString: any) {
  var birthdate = moment(dateString);
  var today = moment();
  var minDate = today.subtract(18, "years");
  return birthdate.isAfter(minDate);
}
export const selectDateTime = (fromTime: string, toTime: string) => {
  const fromHour = parseInt(fromTime.split(":")[0]);
  const toHour = parseInt(toTime.split(":")[0]);

  if (fromHour === 0 && toHour === 23) {
    return "All Day";
  } else if (fromHour === 12 && toHour === 18) {
    return "Morning";
  } else if (fromHour === 18 && toHour === 0) {
    return "Evening";
  }
  return "Unknown";
};
