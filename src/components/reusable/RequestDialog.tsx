import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "@/assets/icons/arrowleft.svg";
import { ReactComponent as AmenityRequestIcon } from "@/assets/icons/AmenityRequest.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/Close-Icon.svg";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { IDataReq, IRequestDialog, ITenant } from "~/types/types";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import "react-multi-carousel/lib/styles.css";
import FirstPart from "./RequestDialog/FirstPart";
import SecondPart from "./RequestDialog/SecondPart";
import moment from "moment";
import { queryClient } from "../../main";
import { maintenance } from "@/utils/constant";
const RequestDialog = ({
  title,
  setOpen,
  setOpenReq,
  setMessageSort,
  setHideMessage,
  setHideMessageReq,
  data,
  setError,
  isListPage,
  setMessage,
  reqdata,
  handleChangeStatus,
  handleCloseDialog,
  changeCalendar,
  targetArray,
}: IRequestDialog) => {
  const [mesError, setMesError] = useState("");
  const [maintenanceSelect, setMaintenanceSelect] = useState({
    name: "",
    id: "",
  });

  const [selectTime, setSelectTime] = useState(false);

  const [activeTimeButtonForm, setActiveTimeButtonForm] =
    useState<boolean>(true);
  const [dialog, setDialog] = useState<IDataReq | null>(null);
  const [subId, setSubId] = useState("");
  const hanleClcik = (id: string, parentId?: string) => {
    if (parentId) {
      setSubId(parentId);
    }
  };
  const [selectMorning, setSelectMorning] = useState<{
    id: number;
    from: string;
    to: string;
  }>(
    reqdata
      ? {
          id: 0,
          from: reqdata.scheduleDateFrom.slice(11, 16),
          to: reqdata.scheduleDateTo.slice(11, 16),
        }
      : { id: 0, from: "", to: "" }
  );

  const [subData, setSubData] = useState<{ _id: string; name: string }[]>([]);
  const { mutate: subCategoryMutate } = mutationRequest({
    url: `/service/${maintenance}?parentId=${subId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [closeIcon, setCloseIcon] = useState(true);
  const [selectedDay, setSelectedDay] = useState<string[]>([]);
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

  const [optionValue, setOptionValue] = useState<any | null>(null);

  useEffect(() => {
    if (optionValue && dialog) {
      setCloseIcon(false);
    } else {
      setCloseIcon(true);
    }
  }, [optionValue, dialog]);

  useEffect(() => {
    if (selectedDay && selectMorning) {
      setActiveTimeButtonForm(false);
    } else {
      setActiveTimeButtonForm(true);
    }
  }, [selectedDay, selectMorning]);

  const handleMaintenanceChange = (event: SelectChangeEvent) => {
    setMaintenanceSelect((prev) => {
      return { ...prev, name: event.target.value };
    });
  };

  const [apartment, setApartment] = useState("");
  const handleChangeApartment = (event: SelectChangeEvent) => {
    setApartment(event.target.value as string);
  };
  const handleChangeBuilding = (id: string) => {
    setMaintenanceSelect((prev) => {
      return { ...prev, id: id };
    });
  };
  const { mutate: addMaintenanceMutate } = mutationRequest({
    url: `/service-request/${maintenance}`,
    method: "post",
    isAuth: true,
  });

  const [tenantId, setTenantId] = useState({
    tenantid: "",
    buildingid: "",
    aprtId: "",
  });
  const { mutate: tenantDataReq } = mutationRequest({
    url: `/tenant?buildingId=${tenantId.buildingid}&apartmentId=${tenantId.aprtId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  const [sortedTenant, setSortedTenant] = useState<any>([]);

  useEffect(() => {
    tenantDataReq.mutate({});
  }, [tenantId.aprtId]);
  useEffect(() => {
    if (tenantDataReq.isSuccess) {
      setSortedTenant(
        tenantDataReq?.data?.data?.items ? tenantDataReq?.data?.data?.items : []
      );
    }
  }, [tenantDataReq.isSuccess]);

  const [period, setPeriod] = useState(0);

  const [aprtData, setAprtData] = useState<any>();
  const [selectedBuildingId, setSelectedBuildingId] = useState("");
  const {
    data: building,
    isSuccess: isBuildingSuccess,
    isLoading: isBuildingLoading,
  } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });
  const [buildingData, setBuildingData] = useState<any>([]);

  useEffect(() => {
    if (isBuildingSuccess) {
      setBuildingData(building?.data?.items);
    }
  }, [isBuildingSuccess]);
  const { mutate: apartmentTenant } = mutationRequest({
    url: `/apartment?buildingId=${selectedBuildingId}&offset=0&limit=10000`,
    method: "get",
    isAuth: true,
  });

  useEffect(() => {
    if (selectedBuildingId.length) {
      apartmentTenant.mutate({});
    }
  }, [selectedBuildingId]);

  useEffect(() => {
    if (apartmentTenant.isSuccess) {
      setAprtData(
        apartmentTenant?.data?.data?.items
          ? apartmentTenant?.data?.data?.items
          : []
      );
    }
  }, [apartmentTenant.isSuccess]);

  const { mutate: recheduledReq } = mutationRequest({
    url: `/service-request/general/reschedule`,
    method: "post",
    isAuth: true,
  });

  const handleClose = useCallback(() => {
    if (isListPage) {
      recheduledReq.mutate({
        requestId: reqdata?._id,
        scheduleDateFrom:
          moment(selectedDay[0]).format("YYYY-MM-DDT") +
          moment()
            .hour(+selectMorning.from.split(":")[0])
            .minute(+selectMorning.from.split(":")[1])
            .second(0)
            .millisecond(0)
            .format("HH:mm:ss.SSS[Z]"),
        scheduleDateTo:
          moment(selectedDay[0]).format("YYYY-MM-DDT") +
          moment()
            .hour(+selectMorning.to.split(":")[0])
            .minute(+selectMorning.to.split(":")[1])
            .second(0)
            .millisecond(0)
            .format("HH:mm:ss.SSS[Z]"),
      });
      handleChangeStatus && handleChangeStatus("rescheduled");
    } else {
      if (title === "Maintenance") {
        addMaintenanceMutate.mutate(
          {
            scheduleDateFrom:
              moment(selectedDay[0]).format("YYYY-MM-DDT") +
              moment()
                .hour(+selectMorning.from.split(":")[0])
                .minute(+selectMorning.from.split(":")[1])
                .second(0)
                .millisecond(0)
                .format("HH:mm:ss.SSS[Z]"),
            scheduleDateTo:
              moment(selectedDay[0]).format("YYYY-MM-DDT") +
              moment()
                .hour(+selectMorning.to.split(":")[0])
                .minute(+selectMorning.to.split(":")[1])
                .second(0)
                .millisecond(0)
                .format("HH:mm:ss.SSS[Z]"),
            severityLevel:
              period === 0 ? "low" : period === 50 ? "medium" : "high",
            voiceNote: {
              url: "string",
              length: 0,
            },
            description: "string",
            serviceId: dialog?._id,
            buildingId: tenantId.buildingid,
            tenantId: tenantId.tenantid,
            requestedBy: "admin",
            paymentInfo: {
              paymentMethod: "cash",
              amount: 0,
              prePaidAmount: 0,
            },
            actorId: "",
            images: [],
            timeToServe: "later",
          },
          {
            onSuccess: () => {
              // Refetch data after the mutation is successful
              queryClient.invalidateQueries(["maintenancerequestKey"]);
            },
          }
        );
      } else {
        mutate.mutate(
          {
            scheduleDateFrom:
              moment(selectedDay[0]).format("YYYY-MM-DDT") +
              moment()
                .hour(+selectMorning.from.split(":")[0])
                .minute(+selectMorning.from.split(":")[1])
                .second(0)
                .millisecond(0)
                .format("HH:mm:ss.SSS[Z]"),
            scheduleDateTo:
              moment(selectedDay[0]).format("YYYY-MM-DDT") +
              moment()
                .hour(+selectMorning.to.split(":")[0])
                .minute(+selectMorning.to.split(":")[1])
                .second(0)
                .millisecond(0)
                .format("HH:mm:ss.SSS[Z]"),
            description: reqdata?.description ? reqdata?.description : "string",
            serviceId: reqdata?._id.length ? reqdata?._id : dialog?._id,
            //buildingId:"63a8ce4a0c3461692c165e84",
            buildingId: tenantId.buildingid,
            tenantId: tenantId.tenantid,
            requestedBy: "admin",
            paymentInfo: {
              paymentMethod: "cash",
              amount: 0,
              prePaidAmount: 0,
            },
            images: [],
            timeToServe: "later",
          },
          {
            onSuccess: () => {
              // Refetch data after the mutation is successful
              queryClient.invalidateQueries(["amenityrequestKey"]);
            },
          }
        );
      }
    }
    handleCloseDialog && handleCloseDialog();
  }, [
    moment,
    selectedDay,
    selectMorning,
    title,
    addMaintenanceMutate,
    dialog?._id,
    tenantId.buildingid,
    tenantId.tenantid,
    period,
  ]);
  const { mutate } = mutationRequest({
    url: "/service-request/amenity",
    method: "post",
    isAuth: true,
  });
  useEffect(() => {
    if (setOpenReq) {
      if ((mutate.isSuccess || addMaintenanceMutate.isSuccess) && setError) {
        setOpenReq(false);
        setError(false);
        if (setHideMessageReq) {
          setHideMessageReq(true);
        }

        setTimeout(() => {
          if (setHideMessageReq) {
            setHideMessageReq(false);
          }
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
      if (mutate.isError || addMaintenanceMutate.isError) {
        if (setError) {
          setOpenReq(false);
          setError(true);
          if (setHideMessageReq && setMessage) {
            setHideMessageReq(true);
            setMessage((mutate.error as { message: string })?.message);
          }
        }
        setTimeout(() => {
          if (setHideMessageReq) {
            setHideMessageReq(false);
          }
        }, 3000);
        setMesError((mutate.error as { message: string })?.message);
      }
    }
    if (setOpen) {
      if (mutate.isSuccess || addMaintenanceMutate.isSuccess) {
        setOpen(false);
        if (setHideMessage) {
          setHideMessage(true);
          if (setMessageSort) {
            setMessageSort({
              icon: DoneSvg,
              message: "Request has been added Successfully",
              title: "Done",
              style: "request",
            });
          }
        }

        setTimeout(() => {
          if (setHideMessage) {
            setHideMessage(false);
          }
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
      if (mutate.isError || addMaintenanceMutate.isError) {
        setOpen(false);
        if (setHideMessage) {
          setHideMessage(true);
          setMesError((mutate.error as { message: string })?.message);
          if (setMessageSort) {
            setMessageSort({
              icon: Canceled,
              message: mesError,
              title: "Canceled",
              style: "delete ",
            });
          }
        }

        setTimeout(() => {
          if (setHideMessage) {
            setHideMessage(false);
          }
        }, 3000);
      }
    }
  }, [
    mutate.isSuccess,
    mutate.isError,
    addMaintenanceMutate.isSuccess,
    addMaintenanceMutate.isError,
  ]);
  const [optionValueApartment, setOptionValueApartment] = useState<any | null>(
    null
  );
  // const [optionValueApartment, setOptionValueApartment] = useState<IApartments | null>({name: ""});

  /** Maintenance Request select time */
  const [selectedRange, setSelectedRange] = useState<string>("");
  /** Maintenance Request select time */

  return (
    <div className="amenitie_request">
      <div style={{ width: "100%" }}>
        {title === "Maintenance" && selectTime && (
          <ArrowLeft className="arrow_left" onClick={handleClick} />
        )}
        {title === "Maintenance" && (
          <span className="span_request">{"Maintenance"} Request</span>
        )}
        {title === "Amenities" && (
          <div className="amenity_header">
            <div className="amenity_header__content">
              <AmenityRequestIcon className="amenity_header__content__icon" />
              <span className="amenity_header__content-header">
                Amenities Request
              </span>
            </div>
            {!reqdata ? (
              <div
                onClick={() => {
                  setOpenReq && setOpenReq(false);
                  handleCloseDialog && handleCloseDialog();
                }}
              >
                <CloseIcon style={{ cursor: "pointer" }} />
              </div>
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
      {!selectTime && !isListPage ? (
        <FirstPart
          data={data}
          title={title}
          dialog={dialog}
          period={period}
          setOpen={setOpen}
          setError={setError}
          setDialog={setDialog}
          setPeriod={setPeriod}
          sortedTenant={sortedTenant}
          setMessage={setMessage}
          setOpenReq={setOpenReq}
          selectTime={selectTime}
          setTenantId={setTenantId}
          optionValue={optionValue}
          setSelectTime={setSelectTime}
          setOptionValue={setOptionValue}
          setHideMessage={setHideMessage}
          setMessageSort={setMessageSort}
          setHideMessageReq={setHideMessageReq}
          optionValueApartment={optionValueApartment}
          handleChangeBuilding={handleChangeBuilding}
          handleChangeApartment={handleChangeApartment}
          setOptionValueApartment={setOptionValueApartment}
          handleMaintenanceChange={handleMaintenanceChange}
          buildingData={buildingData}
          setSelectedBuildingId={setSelectedBuildingId}
          aprtData={aprtData}
        />
      ) : (
        <SecondPart
          data={data}
          title={title}
          dialog={dialog}
          setOpen={setOpen}
          reqdata={reqdata}
          setError={setError}
          setMessage={setMessage}
          setOpenReq={setOpenReq}
          selectTime={selectTime}
          handleClose={handleClose}
          optionValue={optionValue}
          setSelectTime={setSelectTime}
          setHideMessage={setHideMessage}
          setMessageSort={setMessageSort}
          setHideMessageReq={setHideMessageReq}
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          optionValueApartment={optionValueApartment}
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
          setSelectMorning={setSelectMorning}
          selectMorning={selectMorning}
          changeCalendar={changeCalendar}
          targetArray={targetArray}
          handleChangeStatus={handleChangeStatus}
          handleCloseDialog={handleCloseDialog}
        />
      )}
    </div>
  );
};

export default RequestDialog;
