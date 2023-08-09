import React, { useEffect, useState } from "react";
import { Container } from "@mui/system";
import BackNavigate from "~/reusable/BackNavigate";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import ProgressBar from "~/reusable/ProgressBar";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import Location from "./addotherpropery/Location";
import Facilities from "./addotherpropery/Facilities";
import Information from "./addotherpropery/Information";
import { mutationRequest } from "@/requests-body/queries";
import { useNavigate } from "react-router-dom";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";

const AddOtherProperties = () => {
  const { mutate } = mutationRequest({
    url: "/service/other_properties",
    method: "post",
    isAuth: true,
  });
  const [selectLocation, setSelectLocation] = useState({
    id: 0,
    label: "Select Building",
  });
  const [selectProperty, setSelectProperty] = useState({
    id: 0,
    label: "Select Property",
  });
  const [activeBtn, setActiveBtn] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [selectedImages, setSelectedImages] = useState<
    {
      name: string;
      base64: string;
      description: string;
      alt: string;
      url: File;
    }[]
  >([]);
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const [info, setInfo] = useState<{ name: string; desc: string }>({
    name: "",
    desc: "",
  });

  const [facilityName, setFacilityName] = useState("");
  const [facilityArray, setFacilityArray] = useState<string[]>([]);
  const [buttonOne, setButtonOne] = useState(false);
  const [buttonTwo, setButtonTwo] = useState(false);
  const [buttonThree, setButtonThree] = useState(false);
  const [sectionCompleteStep, setSectionCompleteStep] = useState({
    stepOne: false,
    stepTwo: false,
    stepThree: false,
  });
  const [accordionOne, setAccordionOne] = useState<
    Array<string | number | null>
  >([]);
  const [accordionTwo, setAccordionTwo] = useState<string[]>([]);
  const [accordionThree, setAccordionThree] = useState<number[]>([]);
  const [accordionComplete, setAccordionComplete] = useState<boolean[]>([]);
  useEffect(() => {
    if (selectedImages.length && info.name && info.desc) {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepOne: true };
      });
      setButtonOne(true);
    } else {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepOne: false };
      });
      setButtonOne(false);
    }
    if (selectLocation.id !== 0 && selectProperty.id !== 0) {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepTwo: true };
      });
      setButtonTwo(true);
    } else {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepTwo: false };
      });
      setButtonTwo(false);
    }
    if (facilityArray.length) {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepThree: true };
      });
      setButtonThree(true);
    } else {
      setSectionCompleteStep((prev) => {
        return { ...prev, stepThree: false };
      });
      setButtonThree(false);
    }
    if (
      base64 &&
      info.name &&
      info.desc &&
      selectLocation.id !== 0 &&
      selectProperty.id !== 0 &&
      facilityArray.length
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }

    const inputStatesAccordionOne = [
      selectedImages.length,
      info.name,
      info.desc,
    ];
    const inputStatesAccordionTwo = [
      selectLocation.label,
      selectProperty.label,
    ];
    const inputStatesAccordionThree = [facilityArray.length];
    const inputStatesAccordionComplete = [
      sectionCompleteStep.stepOne,
      sectionCompleteStep.stepTwo,
      sectionCompleteStep.stepThree,
    ];
    const newStateArrayAccordionOne = inputStatesAccordionOne
      .filter((state) => state !== "" && state !== 0)
      .map((state) => state);
    const newStateArrayAccordionTwo = inputStatesAccordionTwo
      .filter(
        (state) =>
          state !== "" &&
          state !== "Select Building" &&
          state !== "Select Property"
      )
      .map((state) => state);
    const newStateArrayAccordionThree = inputStatesAccordionThree
      .filter((state) => state !== 0)
      .map((state) => state);
    const newStateArrayAccordionComplete = inputStatesAccordionComplete
      .filter((state: boolean) => state !== false)
      .map((state) => state);

    setAccordionOne(newStateArrayAccordionOne);
    setAccordionTwo(newStateArrayAccordionTwo);
    setAccordionThree(newStateArrayAccordionThree);
    setAccordionComplete(newStateArrayAccordionComplete);
  }, [
    base64,
    info,
    selectLocation,
    selectProperty,
    facilityArray.length,
    sectionCompleteStep.stepOne,
    sectionCompleteStep.stepTwo,
    sectionCompleteStep.stepThree,
  ]);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate.mutate({
      buildings: "63a8bc51fac594bcec23e077",
      name: info.name,
      description: info.desc,
      status: "active",
      availabilitySlots: [],
      images: selectedImages,
      icon: {
        name: selectedImages[0].name,
        base64: base64,
        alt: selectedImages[0].name,
        description: selectedImages[0].name,
      },
      bookable: false,
      bookingLimitation: false,
      requireManualApproval: false,
      banners: selectedImages,
      facilities: facilityArray,
    });
  };
  const [hideMessage, setHideMessage] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate("/otherproperties/otherpropertieslist", {
        state: { data: "success", message: "Property" },
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
  return (
    <form onSubmit={handleSubmit}>
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
      <Container className="property_container">
        <BackNavigate title={"Other Properties"} />

        <Box className="header">
          <Box className="header__info">
            <Typography variant="h6" className="header__info-header">
              Add Property
            </Typography>
            {sectionCompleteStep.stepOne &&
            sectionCompleteStep.stepTwo &&
            sectionCompleteStep.stepThree ? (
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
            Add Property
          </Button>
        </Box>
        <div>
          <Information
            expanded={expanded}
            setExpanded={setExpanded}
            sectionCompleteStep={sectionCompleteStep}
            selectedImages={selectedImages}
            accordionOne={accordionOne}
            setBase64={setBase64}
            setSelectedImages={setSelectedImages}
            buttonOne={buttonOne}
            info={info}
            setInfo={setInfo}
          />
          <Location
            buttonTwo={buttonTwo}
            accordionTwo={accordionTwo}
            expanded={expanded}
            setExpanded={setExpanded}
            sectionCompleteStep={sectionCompleteStep}
            selectLocation={selectLocation}
            setSelectLocation={setSelectLocation}
            selectProperty={selectProperty}
            setSelectProperty={setSelectProperty}
          />
          <Facilities
            buttonThree={buttonThree}
            setFacilityArray={setFacilityArray}
            facilityName={facilityName}
            setFacilityName={setFacilityName}
            accordionThree={accordionThree}
            expanded={expanded}
            setExpanded={setExpanded}
            facilityArray={facilityArray}
            sectionCompleteStep={sectionCompleteStep}
          />
        </div>
      </Container>
    </form>
  );
};

export default AddOtherProperties;
