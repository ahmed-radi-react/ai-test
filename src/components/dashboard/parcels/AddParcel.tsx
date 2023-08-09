import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/system";
import BackNavigate from "~/reusable/BackNavigate";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import ProgressBar from "~/reusable/ProgressBar";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import moment from "moment";
import { IBuilding } from "~/types/types";
import MessageAlert from "~/reusable/MessageAlert";
import ParcelInforamtion from "./addparcel/ParcelInforamtion";
import TenantInformation from "./addparcel/TenantInformation";
import { ContentContextGeneralLayout } from "@/context/GeneralLayoutContext";

const AddParcel = () => {
  const navigate = useNavigate();
  const value = useContext(ContentContextGeneralLayout);
  const [activeBtn, setActiveBtn] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [editbanner, setEditBanner] = useState(false);
  const [base64, setBase64] = useState<(string | ArrayBuffer | null)[]>([]);
  const [optionParcelsType, setOptionParcelsType] = useState("");
  const [inputDate, setInputDate] = useState("");
  const [optionReceiving, setOptionReceiving] = useState("");
  const [optionApartment, setOptionApartment] = useState("");
  const [optionTenant, setOptionTenant] = useState<string>("");
  const [optionReceivedBy, setOptionReceivedBy] = useState("");
  const [infoVal, setInfoVal] = useState<{
    amount: string;
    tracking: string;
    enterText: string;
    name: string;
  }>({
    name: "",
    amount: "",
    tracking: "",
    enterText: "",
  });
  const [subData, setSubData] = useState<
    { _id: string; name: string; status: string }[]
  >([]);
  const { mutate: mutateApartment } = mutationRequest({
    url: "/tenant?offset=0&limit=10000",
    method: "get",
    isAuth: true,
  });

  useEffect(() => {
    if (mutateApartment.isSuccess) {
      // setSubData(
      //   mutateApartment?.data?.data?.items
      //     .filter((item: { status: string }) => item.status === "active")
      //     .filter((item: { buildings: { _id: string }[] }) => {
      //       return item.buildings[0]._id === optionTenant;
      //     })
      // );

      setSubData(mutateApartment?.data?.data?.items);
    }
  }, [mutateApartment.isSuccess]);
  const [sectionComplete, setSectionComplete] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
  });

  const [accordionOne, setAccordionOne] = useState<
    Array<string | ArrayBuffer | null>
  >([]);
  const [accordionTwo, setAccordionTwo] = useState<string[]>([]);
  const [accordionThree, setAccordionThree] = useState<string[]>([]);
  const [accordionComplete, setAccordionComplete] = useState<boolean[]>([]);
  useEffect(() => {
    if (
      base64[0] &&
      optionParcelsType &&
      inputDate &&
      infoVal.name &&
      infoVal.amount
    ) {
      setSectionComplete((prev) => {
        return { ...prev, stepOne: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, stepOne: false };
      });
    }
    if (optionReceiving) {
      setSectionComplete((prev) => {
        return { ...prev, stepTwo: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, stepTwo: false };
      });
    }
    if (optionApartment && optionTenant) {
      setSectionComplete((prev) => {
        return { ...prev, stepThree: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, stepThree: false };
      });
    }
    if (
      base64[0] &&
      optionParcelsType &&
      inputDate &&
      infoVal.name &&
      infoVal.amount &&
      optionApartment &&
      optionTenant
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }
    const inputStatesAccordionOne = [
      base64[0],
      optionParcelsType,
      inputDate,
      infoVal.name,
      infoVal.amount,
    ];
    const inputStatesAccordionTwo = [optionReceiving];
    const inputStatesAccordionThree = [
      optionApartment,
      optionTenant,
      optionTenant,
    ];
    const inputStatesAccordionComplete = [
      sectionComplete.stepOne,
      sectionComplete.stepTwo,
      sectionComplete.stepThree,
    ];
    const newStateArrayAccordionOne = inputStatesAccordionOne
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionTwo = inputStatesAccordionTwo
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionThree = inputStatesAccordionThree
      .filter((state) => state !== "" && state !== null)
      .map((state) => state);
    const newStateArrayAccordionComplete = inputStatesAccordionComplete
      .filter((state: boolean) => state !== false)
      .map((state) => state);

    setAccordionOne(newStateArrayAccordionOne);
    setAccordionTwo(newStateArrayAccordionTwo);
    setAccordionThree(newStateArrayAccordionThree);
    setAccordionComplete(newStateArrayAccordionComplete);
  }, [
    base64[0],
    optionParcelsType,
    inputDate,
    infoVal.amount,
    infoVal.tracking,
    optionReceiving,
    optionApartment,
    optionTenant,
    optionReceivedBy,
    sectionComplete.stepOne,
    sectionComplete.stepTwo,
    sectionComplete.stepThree,
  ]);

  const { data: building, isSuccess: isBuildingSuccess } = queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
  });

  const [buildingData, setBuildingData] = useState<IBuilding[]>([]);

  useEffect(() => {
    if (isBuildingSuccess) {
      setBuildingData(building?.data?.items);
    }
  }, [isBuildingSuccess]);

  const [tenantId, setTenantId] = useState<{
    tenantid: string;
    buildingid: string;
    recidentId: string;
  }>({ tenantid: "", buildingid: "", recidentId: "" });

  const { mutate } = mutationRequest({
    url: "/service-request/parcels",
    method: "post",
    isAuth: true,
  });
  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate({
      scheduleDateFrom: moment(inputDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      scheduleDateTo: moment(inputDate).format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
      name: infoVal.name,
      type: optionParcelsType,
      amount: +infoVal.amount,
      receivingOptions: "holdAtReception",
      someoneToReceive: {
        name: "string",
        phoneNumber: "string",
      },
      residentId: tenantId.recidentId,
      description: infoVal.enterText,
      serviceId: "63b4168f42916b799adf2abf",
      buildingId: tenantId.buildingid,
      tenantId: tenantId.tenantid,
      requestedBy: "admin",
      paymentInfo: {
        paymentMethod: "cash",
        amount: 0,
        prePaidAmount: 0,
      },
      images: [
        {
          name: selectedImage[0]?.name,
          base64: base64[0],
          alt: selectedImage[0]?.name,
          description: selectedImage[0]?.name,
        },
      ],
      timeToServe: "later",
    });
  };
  const [message, setMessage] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate("/parcels/management", {
        state: { data: "success", message: "Parcel" },
        replace: true,
      });
    }
    if (mutate.isError) {
      setHideMessage(true);
      setMessage((mutate.error as { message: string }).message);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [mutate.isSuccess, mutate.isError]);

  const [pickUpPersonName, setPickUpPersonName] = useState<string>("");
  const [pickUpPersonPhone, setPickUpPersonPhone] = useState("+966");
  const [pickUpSelectDeliver, setPickUpSelectDeliver] = useState<string>("");
  const [pickUpSelectFood, setPickUpSelectFood] = useState<string>("");

  return (
    <form onSubmit={handleOnSubmit}>
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert
            error={true}
            messagesort={{
              icon: Canceled,
              message: message,
              title: "Canceled",
              style: "delete",
            }}
          />
        </div>
      )}
      <Container className="setting_container">
        <BackNavigate title={value?.breadcrumb?.text} />

        <Box className="header">
          <Box className="header__info">
            <Typography variant="h6" className="header__info-header">
              Add Parcels
            </Typography>
            {sectionComplete.stepOne && sectionComplete.stepThree ? (
              <SectionComplete className="complete_circle" />
            ) : accordionComplete.length === 0 ? (
              <RoundCheckbox className="round_circle" />
            ) : (
              <ProgressBar
                tasksNumber={3}
                completed={accordionComplete.length}
              />
            )}
          </Box>
          <Button
            className={`btn ${activeBtn ? "add_button" : "deactive"} `}
            type="submit"
            disabled={!activeBtn}
          >
            Add Parcel
          </Button>
        </Box>
        <div className="addparcelacordion">
          <TenantInformation
            optionReceivedBy={optionReceivedBy}
            setOptionReceivedBy={setOptionReceivedBy}
            subData={subData}
            setOptionTenant={setOptionTenant}
            optionTenant={optionTenant}
            setTenantId={setTenantId}
            mutateApartment={mutateApartment}
            setOptionApartment={setOptionApartment}
            optionApartment={optionApartment}
            expanded={expanded}
            setExpanded={setExpanded}
            sectionComplete={sectionComplete}
            accordionThree={accordionThree}
            building={buildingData}
          />
          <ParcelInforamtion
            setInputDate={setInputDate}
            setOptionParcelsType={setOptionParcelsType}
            editbanner={editbanner}
            expanded={expanded}
            sectionComplete={sectionComplete}
            accordionOne={accordionOne}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            setBase64={setBase64}
            setEditBanner={setEditBanner}
            setInfoVal={setInfoVal}
            infoVal={infoVal}
            optionParcelsType={optionParcelsType}
            setExpanded={setExpanded}
            // pickUpPersonName={pickUpPersonName}
            setPickUpPersonName={setPickUpPersonName}
            pickUpPersonPhone={pickUpPersonPhone}
            setPickUpPersonPhone={setPickUpPersonPhone}
            pickUpSelectDeliver={pickUpSelectDeliver}
            setPickUpSelectDeliver={setPickUpSelectDeliver}
            pickUpSelectFood={pickUpSelectFood}
            setPickUpSelectFood={setPickUpSelectFood}
          />

          {/* <ReceivingOptions
            setOptionReceiving={setOptionReceiving}
            optionReceiving={optionReceiving}
            expanded={expanded}
            setExpanded={setExpanded}
            sectionComplete={sectionComplete}
            accordionTwo={accordionTwo}
          /> */}
        </div>
      </Container>
    </form>
  );
};
export default AddParcel;
