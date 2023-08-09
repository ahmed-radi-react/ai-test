import { Button, Input } from "@mui/material";
import { useEffect, useState } from "react";
import { IReNotifyTenantDialog, RenotifyTenantUsingOTP } from "~/types/types";
import { ReactComponent as ReNotifiedIcon } from "@/assets/icons/Re-Notified.svg";
import { ReactComponent as PhoneIcon } from "@/assets/icons/PhoneIcon.svg";
import { ReactComponent as EmailIconGrey } from "@/assets/icons/emailIconGrey.svg";
import { ReactComponent as SuccessIconGreen } from "@/assets/icons/SuccessIconGreen.svg";
import { mutationRequest } from "@/requests-body/queries";
import { queryClient } from "../../../main";

function VisitorReNotifyTenant({
  handleShowAlert,
  handleCloseTableListDialog,
  searchVal,
  sorttable,
  visitorOTP: visitorOTPDashboard,
  setVisitorOTP: setVisitorOTPDashboard,
}: IReNotifyTenantDialog) {
  const [disable, setDisable] = useState(false);
  const [VisitorOTP, setVisitorOTP] = useState(visitorOTPDashboard ?? "");
  const [error, setError] = useState(false);
  const [errorOTP, setErrorOTP] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const [isCorrectOTP, setIsCorrectOTP] = useState(false);
  const [visitorsData, setVisitorsData] = useState<RenotifyTenantUsingOTP[]>(
    []
  );
  const { mutate: mutateOtp } = mutationRequest({
    url: `/service-request/visitor?visitorOtp=${VisitorOTP}`,
    method: "get",
    isAuth: true,
  });
  const { mutate } = mutationRequest({
    url: "/service-request/visitor/confirm/otp",
    method: "post",
    isAuth: true,
  });
  const { mutate: renotifyTenant } = mutationRequest({
    url: "/service-request/visitor/confirm/tenant",
    method: "post",
    isAuth: true,
  });
  const { mutate: VisitorStatus } = mutationRequest({
    url: "/service-request/visitor/status",
    method: "post",
    isAuth: true,
  });

  useEffect(() => {
    if (VisitorOTP?.length === 6 && visitorsData?.length !== 0 || visitorOTPDashboard) {
      mutate.mutate(
        {
          flow: "visitor",
          otp: VisitorOTP ?? visitorOTPDashboard,
          tenantAction: "allow",
          serviceRequestId: visitorsData[0]?._id,
        },
        {
          onSuccess: (data) => {
            setIsCorrectOTP(true);
            setVisitorOTPDashboard && setVisitorOTPDashboard("")
            setVisitorOTP("")
          },
          onError: (error) => {
            setErrorOTP(true);
            setIsCorrectOTP(false);
          },
        }
      );
    }
  }, [VisitorOTP, visitorsData, visitorOTPDashboard]);

  useEffect(() => {
    if (VisitorOTP?.length === 6 || visitorOTPDashboard?.length === 6) {
      setError(false);
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [VisitorOTP, visitorOTPDashboard]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    renotifyTenant.mutate(
      {
        flow: "visitor",
        otp: VisitorOTP,
        tenantAction: "allow",
        serviceRequestId: visitorsData[0]?._id,
      },
      {
        onSuccess: (data) => {
          handleShowAlert(
            ReNotifiedIcon,
            "A reminder was sent to the tenant.",
            "Re-Notified",
            "request"
          );
          handleCloseTableListDialog();
          VisitorStatus.mutate(
            {
              status: "tenant_notified",
              requestId: visitorsData[0]?._id,
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries([
                  "requestKey" + searchVal + sorttable,
                ]);
                setVisitorOTPDashboard && setVisitorOTPDashboard("")
                setVisitorOTP("")
                console.log('aaaaaaaaaaaaaaaaaaaaa')
              },
              onError: (error) => {
                console.log("error", error);
              },
            }
          );
        },
        onError: (error) => {
          console.log("error", error);
        },
      }
    );
  };
  const handleChange = (e: any) => {
    const noChart = /[a-zA-Z]/.test(e.target.value);
    if (!noChart) {
      setVisitorOTP(e.target.value);
    }
    if (VisitorOTP.length > 6) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleClick = () => {
    mutateOtp.mutate({});
  };
  useEffect(() => {
    if (mutateOtp.isSuccess && mutateOtp.data?.data?.items.length) {
      setNextStep(true);
      setVisitorsData(mutateOtp.data?.data?.items);
    } else {
      setErrorOTP(false);
    }
    if (!mutateOtp.data?.data?.items.length && VisitorOTP) {
      setErrorOTP(true);
    }
  }, [mutateOtp.isSuccess]);

  console.log('visitorOTPDashboard', visitorOTPDashboard)
  console.log('VisitorOTP', VisitorOTP)

  return (
    <form className="visitor_dialog_renotify" onSubmit={(e) => handleSubmit(e)}>
      <p className="p-20">Verify Visitor</p>
      {!nextStep ? (
        <>
          <span>Enter OTP</span>
          <Input
            placeholder="Visitor Name"
            className="visitor_otp_input"
            value={VisitorOTP ?? visitorOTPDashboard}
            onChange={handleChange}
            autoFocus
          />
          {error && (
            <span className="error">OTP must be equal to 6 digits</span>
          )}
          {errorOTP && <span className="error">Please enter correct OTP</span>}
          <div className="btn_container">
            <Button
              className={`visitor_btn renotify_tenant ${
                disable ? "notify" : ""
              }`}
              // type="submit"
              onClick={handleClick}
            >
              Verify and Notify Tenant
            </Button>
          </div>
        </>
      ) : (
        <div>
          <div className="re_notify_congrats">
            <SuccessIconGreen />
            <span>Verified Successfully </span>
          </div>
          <div className="tenant_data_otp">
            <div className="tenant_data_otp__data">
              <span className="tenant_data_otp__data-header">Main Visitor</span>
              <span className="tenant_data_otp__data-name">
                {visitorsData[0]?.visitorName}
              </span>
              <div className="otp-tenant-details">
                <div className="otp-tenant-details__content">
                  <div className="otp-tenant-phone">
                    <PhoneIcon />
                    <span className="otp-tenant-phone__number">
                      {visitorsData[0]?.visitorPhoneNumber}
                    </span>
                  </div>
                  <div className="otp-tenant-visitor">
                    <span>{visitorsData[0]?.numberOfVisitors}</span> visitor
                  </div>
                </div>
                <div className="otp-tenant-details__email">
                  <EmailIconGrey />
                  <span>
                    {visitorsData[0]?.visitorEmail
                      ? visitorsData[0]?.visitorEmail
                      : "No email provide"}
                  </span>
                </div>
              </div>
            </div>
            <div className="tenant_data_otp__data">
              <span className="visitor-otp-header">
                The visitor is coming under request from{" "}
              </span>
              <div className="visitor-otp__data">
                <div className="visitor-otp__data-image">
                  <img
                    src={visitorsData[0]?.owner?.image?.url}
                    alt={visitorsData[0]?.owner?.image?.alt}
                  />
                </div>
                <div className="visitor-otp__data-details">
                  <span className="visitor-details-name">
                    {visitorsData[0]?.owner?.firstName}
                  </span>
                  <div className="visitor-details-building">
                    <div>
                      Building Number{" "}
                      <span>{visitorsData[0]?.buildingNumber}</span> - Apartment{" "}
                      <span>{visitorsData[0]?.apartmentNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="btn_container">
            <Button
              className={`visitor_btn renotify_tenant ${
                disable ? "notify" : ""
              }`}
              type="submit"
              // onClick={handleClick}
            >
              {renotifyTenant.isLoading ? "loading..." : "Notify Tenant"}
            </Button>
          </div> */}
        </div>
      )}
    </form>
  );
}

export default VisitorReNotifyTenant;
