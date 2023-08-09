import React, { useEffect } from "react";
import { ReactComponent as HoldIcon } from "@/assets/icons/holdIcon.svg";
import { ReactComponent as SendToApartmentIcon } from "@/assets/icons/SendToApartmentIcon.svg";
import { ReactComponent as WaitingResponseBlueIcon } from "@/assets/icons/WaitingResponseBlueIcon.svg";
import { ReactComponent as NotAvailable } from "@/assets/icons/NotAvailable.svg";
import { ReactComponent as WarningIcon } from "@/assets/icons/warning.svg";
import { ReactComponent as CancelIcon } from "@/assets/icons/status_cancelled_icon.svg";
import { ReactComponent as SendToAprtIcon } from "@/assets/icons/send_to_aprt_icon.svg";
import { ReactComponent as WaitingRespIcon } from "@/assets/icons/waiting_resp_icon.svg";
import { ReactComponent as ConfirmedICon } from "@/assets/icons/confirmedIcon.svg";
import { ReactComponent as CompletedIcon } from "@/assets/icons/completedIcon.svg";
import { ReactComponent as OnGoingIcon } from "@/assets/icons/ongoingIcon.svg";
import { ReactComponent as NoShowIcon } from "@/assets/icons/noshowIcon.svg";
import { ReactComponent as RecheduledIcon } from "@/assets/icons/Reshedule booking icon.svg";

import Dropdown from "react-multilevel-dropdown";
import {
  amenities,
  ifStatusActiveAdminPanel,
  ifStatusActiveTenant,
  ifStatusAddedVisitor,
  ifStatusAssignedBellboy,
  ifStatusAssignedParcelAddByTenant,
  ifStatusAssignedParcelTypeNoPickUp,
  ifStatusAssignedParcelTypePickUp,
  ifStatusAwaitingPickupParcel,
  ifStatusBookedAmenities,
  ifStatusBookedMaintenance,
  ifStatusCompletedVisitor,
  ifStatusConfirmedAmenities,
  ifStatusConfirmedMaintenance,
  ifStatusDeactiveAdminPanel,
  ifStatusDeactiveTenant,
  ifStatusDraftAdminPanel,
  ifStatusDraftTenant,
  ifStatusOffDutyAdminPanel,
  ifStatusOnDutyAdminPanel,
  ifStatusOnGoingAmenities,
  ifStatusOnHoldParcel,
  ifStatusProcessedVisitorTenantPreAllowed,
  ifStatusProcessedVisitorTenantPreNotAllowed,
  ifStatusReassignedParcel,
  ifStatusReceivedParcel,
  ifStatusRegisteredAdminPanel,
  ifStatusRegisteredTenant,
  ifStatusRequestedBellboy,
  ifStatusRequestedVisitorOTPVerificationNo,
  ifStatusRequestedVisitorOTPVerificationYes,
  ifStatusRescheduledAmenities,
  ifStatusRescheduledMaintenance,
  ifStatusScheduledMaintenance,
  ifStatusTenantNotifiedParcel,
  ifStatusTenantNotifiedVisitor,
  ifStatusTenantPickupParcel,
  ifStatusTendToTenantParcel,
  maintenance,
} from "@/utils/constant";
import { IStatus, IStatusIcon } from "~/types/types";

// Conditionally access the target array based on the variable

function Status({ status, showIcon, page, handleChangeStatus }: IStatus) {
  const [targetArray, setTargetArray] = React.useState<any>([]);

  useEffect(() => {
    switch (page) {
      case "parcel":
        switch (status) {
          case "assigned":
            if ("admin added") {
              if ("type packUp") {
                setTargetArray(ifStatusAssignedParcelTypePickUp);
              } else {
                setTargetArray(ifStatusAssignedParcelTypeNoPickUp);
              }
            } else {
              setTargetArray(ifStatusAssignedParcelAddByTenant);
            }
            break;
          case "received":
            setTargetArray(ifStatusReceivedParcel);
            break;
          case "awaiting_pickup":
            if ("admin added type packUp") {
              setTargetArray(ifStatusAwaitingPickupParcel);
            }
            break;
          case "tenant_notified":
            if ("admin added not type packUp") {
              setTargetArray(ifStatusTenantNotifiedParcel);
            }
            break;
          case "reassigned":
            if ("admin added not type packUp") {
              setTargetArray(ifStatusReassignedParcel);
            }
            break;
          case "pending":
            if ("admin added type packUp") {
              setTargetArray(ifStatusOnHoldParcel);
            }
            break;
          case "tenant_pickup":
            if ("admin added type packUp") {
              setTargetArray(ifStatusTenantPickupParcel);
            }
            break;
          case "send_to_tenant":
            if ("admin added type packUp") {
              setTargetArray(ifStatusTendToTenantParcel);
            }
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case `${amenities}`:
        switch (status) {
          case "booked":
            setTargetArray(ifStatusBookedAmenities);
            break;
          case "confirmed":
            setTargetArray(ifStatusConfirmedAmenities);
            break;
          case "rescheduled":
            setTargetArray(ifStatusRescheduledAmenities);
            break;
          case "ongoing":
            setTargetArray(ifStatusOnGoingAmenities);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "other_properties":
        switch (status) {
          case "booked":
            setTargetArray(ifStatusBookedAmenities);
            break;
          case "confirmed":
            setTargetArray(ifStatusConfirmedAmenities);
            break;
          case "rescheduled":
            setTargetArray(ifStatusRescheduledAmenities);
            break;
          case "ongoing":
            setTargetArray(ifStatusOnGoingAmenities);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case `${maintenance}`:
        switch (status) {
          case "booked":
            setTargetArray(ifStatusBookedMaintenance);
            break;
          case "confirmed":
            setTargetArray(ifStatusConfirmedMaintenance);
            break;
          case "rescheduled":
            setTargetArray(ifStatusRescheduledMaintenance);
            break;
          case "scheduled":
            setTargetArray(ifStatusScheduledMaintenance);
            break;
          case "ongoing":
            setTargetArray(ifStatusOnGoingAmenities);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "tenant":
        switch (status) {
          case "draft":
            setTargetArray(ifStatusDraftTenant);
            break;
          case "confirmed":
            setTargetArray(ifStatusConfirmedMaintenance);
            break;
          case "deactive":
            setTargetArray(ifStatusDeactiveTenant);
            break;
          case "active":
            setTargetArray(ifStatusActiveTenant);
            break;
          case "registered":
            setTargetArray(ifStatusRegisteredTenant);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "admin panel":
        switch (status) {
          case "draft":
            setTargetArray(ifStatusDraftAdminPanel);
            break;
          case "deactive":
            setTargetArray(ifStatusDeactiveAdminPanel);
            break;
          case "active":
            setTargetArray(ifStatusActiveAdminPanel);
            break;
          case "registered":
            setTargetArray(ifStatusRegisteredAdminPanel);
            break;
          case "offDuty":
            setTargetArray(ifStatusOffDutyAdminPanel);
            break;
          case "onDuty":
            setTargetArray(ifStatusOnDutyAdminPanel);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "bellboy":
        switch (status) {
          case "requested":
            setTargetArray(ifStatusRequestedBellboy);
            break;
          case "assigned":
            setTargetArray(ifStatusAssignedBellboy);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "valet":
        switch (status) {
          case "requested":
            setTargetArray(ifStatusRequestedBellboy);
            break;
          case "assigned":
            setTargetArray(ifStatusAssignedBellboy);
            break;
          // Add more cases for each array as needed
          default:
            // Handle the case where targetArrayName doesn't match any array name
            setTargetArray([]);
            break;
        }
        break;
      case "visitors":
        if ("tenant create visitor request") {
          switch (status) {
            case "requested":
              if ("OTP verification") {
                setTargetArray(ifStatusRequestedVisitorOTPVerificationYes);
              } else {
                setTargetArray(ifStatusRequestedVisitorOTPVerificationNo);
              }
              break;
            case "processed":
              if ("Has Tenant pre-allowed the visitor?yes") {
                setTargetArray(ifStatusProcessedVisitorTenantPreAllowed);
              } else {
                setTargetArray(ifStatusProcessedVisitorTenantPreNotAllowed);
              }
              break;
            case "tenant_notified":
              setTargetArray(ifStatusTenantNotifiedVisitor);
              break;
            // Add more cases for each array as needed
            default:
              // Handle the case where targetArrayName doesn't match any array name
              setTargetArray([]);
              break;
          }
        } else if ("admin create visitor request") {
          switch (status) {
            case "added":
              setTargetArray(ifStatusAddedVisitor);
              break;
            case "tenant_notified":
              setTargetArray(ifStatusTenantNotifiedVisitor);
              break;
            case "completed":
              setTargetArray(ifStatusCompletedVisitor);
              break;
            // Add more cases for each array as needed
            default:
              // Handle the case where targetArrayName doesn't match any array name
              setTargetArray([]);
              break;
          }
        }
    }
  }, [status]);
  return (
    <>
      <Dropdown
        title={<StatusName status={status} showIcon={showIcon} page={page} />}
        buttonClassName="button_dropdown_list_multi_levels_status"
        menuClassName="menu_dropdown_list_multi_levels_status"
        wrapperClassName="wrapper_dropdown_list_multi_levels_status"
        position="left"
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
          }) => (
            <Dropdown.Item key={id} onClick={() => handleChangeStatus(status)}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  pointerEvents: "none",
                }}
              >
                {" "}
                {((page === amenities ||
                  page === "other_properties" ||
                  page === maintenance) &&
                  showIcon &&
                  ((status === "pending" && <WarningIcon />) ||
                    ((status === "cancelled" || status === "declined") && (
                      <CancelIcon style={{ fill: "" }} />
                    )) ||
                    (status === "booked" && <SendToAprtIcon />) ||
                    (status === "requested" && <WaitingRespIcon />))) ||
                  (status === "confirmed" && <ConfirmedICon />) ||
                  (status === "completed" && <CompletedIcon />) ||
                  (status === "ongoing" && <OnGoingIcon />) ||
                  (status === "no_show" && <NoShowIcon />) ||
                  (status === "rescheduled" && <RecheduledIcon />)}
              </div>

              <span>{title}</span>
            </Dropdown.Item>
          )
        )}
      </Dropdown>
    </>
  );
}

export default Status;

export const StatusName = ({ status, showIcon, page }: IStatusIcon) => {
  return (
    <div
      className={`status_parcel ${status}`}
      style={{
        gap: "14px",
      }}
    >
      {page === "parcel" && showIcon ? (
        ((status === "pending" || status === "awaiting_pickup") && (
          <HoldIcon />
        )) ||
        (status === "rejected" && <NotAvailable />) ||
        ((status === "approved" || status === "send_to_tenant") && (
          <SendToApartmentIcon />
        )) ||
        ((status === "scheduled" || status === "requested") && (
          <WaitingResponseBlueIcon />
        )) ||
        (status === "rescheduled" && <RecheduledIcon />)
      ) : (
        <></>
      )}
      {showIcon && (
        <div>
          {((page === amenities ||
            page === "other_properties" ||
            page === maintenance) &&
            showIcon &&
            ((status === "pending" && <WarningIcon />) ||
              ((status === "cancelled" || status === "declined") && (
                <CancelIcon />
              )) ||
              (status === "booked" && <SendToAprtIcon />) ||
              (status === "requested" && <WaitingRespIcon />))) ||
            (status === "confirmed" && <ConfirmedICon />) ||
            (status === "completed" && <CompletedIcon />) ||
            (status === "ongoing" && <OnGoingIcon />) ||
            (status === "no_show" && <NoShowIcon />) ||
            (status === "rescheduled" && <RecheduledIcon />)}
        </div>
      )}
      <span className={`status ${status}`}>
        {status.replace(/_/g, " ").replace(/(\w)([A-Z])/g, "$1 $2")}
      </span>
    </div>
  );
};
