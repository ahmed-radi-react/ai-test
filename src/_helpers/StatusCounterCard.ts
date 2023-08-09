import { IStatusMappings, IApi } from "~/types/types";
import { IOverview } from "@/utils/constant";

const statusMappings: IStatusMappings = {
  "Total Task": undefined,
  "In progress": "pending",
  "Completed Task": "completed",
  Assigned: "assigned",
  "Awaiting Pickup": "awaiting_pickup",
  "Tenant Notified": "tenant_notified",
  Rejected: "rejected",
  "Send To Tenant": "send_to_tenant",
  Reassigned: "reassigned",
  Feedbacks: "feedbacks",
};

export function StatusCounterCard({
  prev,
  data,
}: {
  prev: IOverview[];
  data: IApi;
}) {
  return prev.map((item: IOverview) => {
    const amenitiesType: string | undefined = item.amenitiesType;
    const status = amenitiesType ? statusMappings[amenitiesType] : undefined;
    if (status) {
      item.taskNumber = data?.data?.items?.filter((val: { status: string }) => {
        return val.status === status;
      }).length;
      if (status === "feedbacks") {
        item.taskNumber = data?.data?.items?.filter(
          (val: { ownerFeedBack: any }) => {
            return val.ownerFeedBack;
          }
        ).length;
      }
    } else {
      item.taskNumber = Number(data?.data?.count);
    }
    return item;
  });
}
