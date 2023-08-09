import { useEffect, useState } from "react";
import {
  IBellboyReqData,
  IData,
  IEvent,
  IParcelManagementTable,
  IValetData,
} from "~/types/types";

interface IService {
  name: string;
  icon?: { url?: string };
}

export const useCalendarChange = (
  reqData:
    | IData[]
    | IBellboyReqData[]
    | IParcelManagementTable[]
    | IValetData[]
    | {
        scheduleDateFrom: string;
        _id: string;
        service: IService;
        scheduleDateTo: string;
        code: any;
        owner: any;
        flow: string;
        status: string | undefined;
        building: any;
      }[]
): { myEvents: IEvent[] } => {
  const [myEvents, setEvents] = useState<IEvent[]>([]);
  useEffect(() => {
    setEvents(
      reqData?.map(
        ({
          scheduleDateFrom,
          _id,
          service,
          scheduleDateTo,
          code,
          owner,
          flow,
          status,
          building,
        }) => ({
          color:
            status === "cancelled"
              ? "#f4e5e5"
              : status === "declined"
              ? "#f4e5e5"
              : status === "requested"
              ? "#e1f4ff"
              : status === "completed"
              ? "#cdfbd8"
              : status === "ongoing"
              ? "rgba(189, 220, 51, 0.1)"
              : status === "confirmed"
              ? "#cdfbd8"
              : status === "rescheduled"
              ? "#cdfbd8"
              : status === "booked"
              ? "#cdfbd8"
              : "#f2f9fe",
          start: scheduleDateFrom,
          // end: scheduleDateTo,
          id: _id,
          title: service?.name,
          code: code,
          tenant: owner?.firstName,
          apartment: owner?.tenantInfo?.apartmentNumber,
          service: flow,
          status: status,
          //@ts-ignore
          image: service?.icon?.url,
          tenantImage: owner?.image?.url,
          tenantName: owner?.firstName,
          building: building?.name,
          textColor:
            status === "cancelled"
              ? "#c21616"
              : status === "declined"
              ? "#c21616"
              : status === "requested"
              ? "#0489d4"
              : status === "completed"
              ? "#078e29"
              : status === "ongoing"
              ? "rgb(188, 224, 27)"
              : status === "confirmed"
              ? "#078e29"
              : status === "rescheduled"
              ? "#078e29"
              : status === "booked"
              ? "#078e29"
              : "#2ca8ff",
        })
      )
    );
  }, [reqData?.length]);

  return {
    myEvents,
  };
};
