import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { addtenantExpansionpanel } from "@/utils/constant";
import { ReactComponent as CheckboxIcon } from "@/assets/icons/roundCheckbox.svg";
import { ReactComponent as CheckedboxIcon } from "@/assets/icons/checkbox_round.svg";
import { mutationRequest } from "@/requests-body/queries";
import BackNavigate from "~/reusable/BackNavigate";
import ProgressBar from "~/reusable/ProgressBar";
import moment from "moment";
import MessageAlert from "~/reusable/MessageAlert";
import { ITarget } from "~/types/types";
import { isEmail, isUnderage } from "@/utils/helpers";
export interface IBuidling {
  _id: string;
  name: string;
  buildings: { _id: string }[];
}
const AddTenant = () => {
  const { state: stateFromLocation } = useLocation();
  const [fullNumber, setFullNumber] = useState("");
  const { mutate: editMutate } = mutationRequest({
    url: `/tenant`,
    method: "PUT",
    isAuth: true,
  });

  const [values, setValues] = useState({
    email: "",
    pass: "",
    showPass: false,
  });

  useEffect(() => {
    if (stateFromLocation?.firstName) {
      setValues((prev) => ({ ...prev, email: stateFromLocation?.email })); //
      setGeneralInfo((prev) => ({
        ...prev,
        tenant_name: stateFromLocation?.firstName,
        tenant_email: stateFromLocation?.email,
        date_birth: moment(stateFromLocation?.dateOfBirth).format("YYYY-MM-DD"),
      }));
      setFullNumber(
        stateFromLocation?.countryCode + stateFromLocation?.phoneNumber
      );
      setValue(stateFromLocation?.countryCode + stateFromLocation?.phoneNumber);
      setTenantId((prev) => ({
        ...prev,
        tenantid: stateFromLocation?._id,
        buildingid: stateFromLocation?.apartment?.building?._id,
      }));
      setApartmentNumberID(stateFromLocation?.apartment?._id);
      setData((prev) => ({
        ...prev,
        family: [...stateFromLocation?.tenantInfo?.members],
        pets: [...stateFromLocation?.tenantInfo?.pets],
        guests: [...stateFromLocation?.tenantInfo?.guests],
        car: [...stateFromLocation?.tenantInfo?.cars],
      }));
      setImageLc(stateFromLocation?.image);
    }
  }, []);

  const [tenantId, setTenantId] = useState<{
    tenantid: string;
    buildingid: string;
  }>({ tenantid: "", buildingid: "" });

  const { mutate } = mutationRequest({
    url: `/tenant`,
    method: "post",
    isAuth: true,
  });
  const [selectedImage, setSelectedImage] = useState<File>();
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const [guestPhone, setguestPhone] = useState("+966");
  const imageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string
  ) => {
    setImageLc(undefined);
    const FR = new FileReader();
    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (evt.target) {
        setBase64((evt.target.result as string)?.split(",")[1]);
      }
      if (e.target.files && e.target.files.length > 0) {
        if (status) {
          setSelectedImage(e.target.files[0]);
        } else {
          setSelectedImage(e.target.files[0]);
        }
      }
    });
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };
  const guestNumber: HTMLInputElement | null =
    document.querySelector(".PhoneInputInput");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formTarget = e.target as HTMLFormElement;
    const ev: HTMLInputElement | null =
      document.querySelector(".PhoneInputInput");
    const brth = new Date(formTarget.date_birth.value).toISOString();
    const getAge = (dateOfBirth: string) => {
      const dob = new Date(dateOfBirth);
      const now = new Date();
      const yearsDiff = now.getFullYear() - dob.getFullYear();
      if (
        now.getMonth() < dob.getMonth() ||
        (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
      ) {
        return yearsDiff - 1;
      } else {
        return yearsDiff;
      }
    };
    const age = getAge(brth);

    if (!stateFromLocation?.firstName) {
      mutate.mutate({
        apartmentId: apartmentNumberID,
        buildingId: tenantId.buildingid,
        tenantInfo: {
          apartmentNumber: apartmentName,
          numberOfGuests: data.guests.length,
          numberOfFamilyMembers: data.family.length,
        },
        familyMembers: data.family,
        guests: data.guests,
        pets: data.pets,
        cars: data.car,
        firstName: generalInfo.tenant_name,
        lastName: generalInfo.tenant_name,
        countryCode: ev?.value.slice(0, ev?.value.indexOf(" ")),
        phoneNumber: value.slice(ev?.value.indexOf(" "), value.length + 1),
        email: generalInfo.tenant_email,
        age: age,
        password: values.pass,
        dateOfBirth: brth.slice(0, brth.indexOf(".")),
        image: {
          name: selectedImage?.name,
          base64: base64,
          alt: selectedImage?.name,
          description: selectedImage?.name,
        },
      });
    } else {
      if (selectedImage?.name) {
        editMutate.mutate({
          organizationId: stateFromLocation?.organization?._id,
          buildingsIds: [tenantId.buildingid],
          servicesIds: [...stateFromLocation?.services],
          roleId: stateFromLocation?.role?._id,
          apartmentId: apartmentNumberID,
          _id: stateFromLocation?._id,
          firstName: generalInfo.tenant_name,
          lastName: generalInfo.tenant_name,
          countryCode: ev?.value.slice(0, ev?.value.indexOf(" "))
            ? ev?.value.slice(0, ev?.value.indexOf(" "))
            : stateFromLocation?.countryCode,
          phoneNumber: value.slice(ev?.value.indexOf(" "), value.length + 1)
            ? value.slice(ev?.value.indexOf(" "), value.length + 1)
            : stateFromLocation?.phoneNumber,
          email: values.email,
          age: age ? age : stateFromLocation?.age,
          dateOfBirth: brth.slice(0, brth.indexOf("."))
            ? brth.slice(0, brth.indexOf("."))
            : stateFromLocation?.dateOfBirth,
          image: {
            name: imageLc?.name ? imageLc?.name : selectedImage?.name,
            base64: imageLc?.url ? imageLc?.url : base64,
            alt: imageLc?.name ? imageLc?.name : selectedImage?.name,
            description: imageLc?.name ? imageLc?.name : selectedImage?.name,
          },
        });
      } else {
        editMutate.mutate({
          organizationId: stateFromLocation?.organization?._id,
          buildingsIds: [tenantId.buildingid],
          servicesIds: [...stateFromLocation?.services],
          roleId: stateFromLocation?.role?._id,
          apartmentId: apartmentNumberID,
          _id: stateFromLocation?._id,
          firstName: generalInfo.tenant_name,
          lastName: generalInfo.tenant_name,
          countryCode: ev?.value.slice(0, ev?.value.indexOf(" "))
            ? ev?.value.slice(0, ev?.value.indexOf(" "))
            : stateFromLocation?.countryCode,
          phoneNumber: value.slice(ev?.value.indexOf(" "), value.length + 1)
            ? value.slice(ev?.value.indexOf(" "), value.length + 1)
            : stateFromLocation?.phoneNumber,
          email: values.email,
          age: age ? age : stateFromLocation?.age,
          dateOfBirth: brth.slice(0, brth.indexOf("."))
            ? brth.slice(0, brth.indexOf("."))
            : stateFromLocation?.dateOfBirth,
        });
      }
    }
  };

  //General Information
  const [value, setValue] = useState("");
  // const [tenantName, setTenantName] = useState("");
  // const [tenantEmail, setTenantEmail] = useState("");
  // const [tenantBirthDate, setTenantBirthDate] = useState("");
  const [generalInfo, setGeneralInfo] = useState({
    tenant_name: "",
    tenant_email: "",
    date_birth: "",
  });

  // Location
  const [organization, setOrganization] = useState("");
  const [buildingNumber, setBuildingNumber] = useState("");
  const [apartmentNumberID, setApartmentNumberID] = useState("");
  const [apartmentName, setApartmentName] = useState("");
  // Validation
  const [fileType, setFileType] = useState("");
  const [selectedDocument, setSelectedDocument] = useState<File | undefined>(
    undefined
  );
  // Interests & Preferences
  const [interestsArray, setInterestArray] = useState<string[]>([]);

  // Family & Gusts & Pets
  const [data, setData] = useState<{
    family: any;
    pets: any;
    guests: any;
    car: any;
  }>({
    family: [],
    pets: [],
    guests: [],
    car: [],
  });
  // Account
  const [date, setDate] = useState<any>(new Date());

  const [building, setBuilding] = useState<IBuidling[]>([]);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    if (
      generalInfo.tenant_name?.length &&
      generalInfo.tenant_email &&
      generalInfo.date_birth &&
      value?.length &&
      selectedImage
    ) {
      setDisable(true);
    }
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (mutate.isSuccess) {
      navigate("/tenants/tenantbuilding");
    }
  }, [mutate, editMutate]);

  const [activeBtn, setActiveBtn] = useState(false);
  // section complete
  const [sectionComplete, setSectionComplete] = useState({
    info: false,
    location: false,
    validdoc: false,
    interest: false,
    family: false,
    account: false,
    password: false,
  });
  const [accordionGeneralInfo, setAccordionGeneralInfo] = useState<
    Array<string | ArrayBuffer | null>
  >([]);
  const [accordionLocation, setAccordionLocation] = useState<string[]>([]);
  const [accordionValidation, setAccordionValidation] = useState<
    (File | undefined)[]
  >([]);
  const [accordionInterests, setAccordionInterests] = useState<number[]>([]);
  const [accordionFamily, setAccordionFamily] = useState<any[]>([]);
  const [accordionAccount, setAccordionAccount] = useState<any[]>([]);
  const [accordionPassword, setAccordionPassword] = useState<any[]>([]);
  const [accordionComplete, setAccordionComplete] = useState<boolean[]>([]);
  const [family, setFamily] = useState<{
    firstName: string;
    email: string;
    age: string;
    relationship: string;
    id: number;
  }>({
    firstName: "",
    email: "",
    age: "",
    relationship: "",
    id: 1,
  });

  useEffect(() => {
    // General Information
    if (
      (base64 || imageLc?.url) &&
      generalInfo.tenant_name &&
      value &&
      generalInfo.tenant_email &&
      generalInfo.date_birth
    ) {
      setSectionComplete((prev) => {
        return { ...prev, info: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, info: false };
      });
    }
    // Location
    if (organization && buildingNumber && apartmentNumberID) {
      setSectionComplete((prev) => {
        return { ...prev, location: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, location: false };
      });
    }
    // Validation
    if (fileType && selectedDocument) {
      setSectionComplete((prev) => {
        return { ...prev, validdoc: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, validdoc: false };
      });
    }
    // Interests & Preferences
    if (interestsArray.length) {
      setSectionComplete((prev) => {
        return { ...prev, interest: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, interest: false };
      });
    }
    // Family & Gusts & Pets
    if (data.family.length || data.guests.length || data.pets.length) {
      setSectionComplete((prev) => {
        return { ...prev, family: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, family: false };
      });
    }
    // Account
    if (date) {
      setSectionComplete((prev) => {
        return { ...prev, account: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, account: false };
      });
    }
    // Password
    if (values.pass) {
      setSectionComplete((prev) => {
        return { ...prev, password: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, password: false };
      });
    }
    // complete section
    if (
      sectionComplete.info &&
      sectionComplete.location &&
      sectionComplete.validdoc &&
      sectionComplete.interest &&
      // sectionComplete.family &&
      sectionComplete.account &&
      sectionComplete.password
    ) {
      setActiveBtn(true);
    } else {
      setActiveBtn(false);
    }

    // Store input states in an array
    const inputStatesAccordionGeneralInfo = [
      base64,
      generalInfo.tenant_name,
      value,
      generalInfo.tenant_email,
      generalInfo.date_birth,
    ];
    const inputStatesAccordionLocation = [
      organization,
      buildingNumber,
      apartmentNumberID,
    ];
    const inputStatesAccordionValidation = [selectedDocument];
    const inputStatesAccordionInterests = [interestsArray.length];
    const inputStatesAccordionFamily = [data.family, data.guests, data.pets];
    const inputStatesAccordionAccount = [date];
    const inputStatesAccordionPassword = [values.pass];
    const inputStatesAccordionComplete = [
      sectionComplete.info,
      sectionComplete.location,
      sectionComplete.validdoc,
      sectionComplete.interest,
      sectionComplete.family,
      sectionComplete.account,
      sectionComplete.password,
    ];

    // Filter out empty values and update the stateArray
    const newStateArrayAccordionGeneralInfo = inputStatesAccordionGeneralInfo
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionLocation = inputStatesAccordionLocation
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionValidation = inputStatesAccordionValidation
      .filter((state) => state?.name !== "")
      .map((state) => state);
    const newStateArrayAccordionInterests = inputStatesAccordionInterests
      .filter((state) => state !== 0)
      .map((state) => state);
    const newStateArrayAccordionFamily = inputStatesAccordionFamily
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionAccount = inputStatesAccordionAccount
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionPassword = inputStatesAccordionPassword
      .filter((state) => state !== "")
      .map((state) => state);
    const newStateArrayAccordionComplete = inputStatesAccordionComplete
      .filter((state: boolean) => state !== false)
      .map((state) => state);

    setAccordionGeneralInfo(newStateArrayAccordionGeneralInfo);
    setAccordionLocation(newStateArrayAccordionLocation);
    setAccordionValidation(newStateArrayAccordionValidation);
    setAccordionInterests(newStateArrayAccordionInterests);
    setAccordionFamily(newStateArrayAccordionFamily);
    setAccordionAccount(newStateArrayAccordionAccount);
    setAccordionPassword(newStateArrayAccordionPassword);
    setAccordionComplete(newStateArrayAccordionComplete);
  }, [
    base64,
    generalInfo.tenant_name,
    value,
    generalInfo.tenant_email,
    generalInfo.date_birth,
    organization,
    buildingNumber,
    apartmentNumberID,
    fileType,
    selectedDocument,
    interestsArray,
    data.family?.length,
    data.guests?.length,
    data.pets?.length,
    date,
    values.pass,
    sectionComplete.info,
    sectionComplete.location,
    sectionComplete.validdoc,
    sectionComplete.interest,
    sectionComplete.family,
    sectionComplete.account,
    sectionComplete.password,
  ]);
  const [hideMessage, setHideMessage] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess || editMutate.isSuccess) {
      navigate("/tenants/tenantbuilding", {
        state: { data: "success", message: "Tenant" },
        replace: true,
      });
    }
    if (mutate.isError || editMutate.isSuccess) {
      setHideMessage(true);
      setMessage((mutate.error as { message: string }).message);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [mutate.isSuccess, mutate.isError, editMutate.isSuccess]);

  const [errorName, setErrorName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorDate, setErrorDate] = useState("");
  //General Information validation
  const handleGeneralInfoValidation = ({
    target: { value, name },
  }: ITarget) => {
    if (name === "tenant_name") {
      if (value.length > 20) {
        setErrorName("Name should be less than 20 characters");
      } else {
        setErrorName("");
      }
    } else if (name === "date_birth") {
      if (isUnderage(value)) {
        setErrorDate("Tenant should be 18 years old or above");
      } else {
        setErrorDate("");
      }
    }
    setGeneralInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    if (!isEmail(generalInfo.tenant_email) && generalInfo.tenant_email !== "") {
      setErrorEmail("Please enter a valid email");
    } else {
      setErrorEmail("");
    }
  }, [generalInfo.tenant_email]);

  const [imageLc, setImageLc] = useState<
    | {
        alt: string;
        url: string;
        description: string;
        name: string;
      }
    | undefined
  >();

  return (
    <>
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
      <Container className="addtenants">
        <BackNavigate title={"Tenants"} />
        <form action="" onSubmit={handleSubmit}>
          <div className="addtenantHeader">
            <span className="addtenantspan">
              Add Tenant
              {sectionComplete.info &&
              sectionComplete.location &&
              sectionComplete.validdoc &&
              sectionComplete.interest &&
              // sectionComplete.family &&
              sectionComplete.account &&
              sectionComplete.password ? (
                <CheckedboxIcon className="complete_circle" />
              ) : accordionComplete.length === 0 ? (
                <CheckboxIcon className="round_circle" />
              ) : (
                <ProgressBar
                  tasksNumber={5}
                  completed={accordionComplete.length}
                />
              )}
            </span>
            <div className="btnsaveAdd">
              <Button
                variant="contained"
                className={`addtenantBtn ${activeBtn ? "" : "deactivate"}`}
                type="submit"
                disabled={!activeBtn}
              >
                {stateFromLocation?.firstName ? "Save" : "Add Tenant"}
              </Button>
            </div>
          </div>
          <div className="add_panel">
            {addtenantExpansionpanel.map((item) => {
              return (
                <Accordion key={item.id}>
                  <AccordionSummary>
                    <div className="addtenant_panel_summary">
                      {selectedImage && item.label === "General Information" ? (
                        <div className="image-container">
                          <img
                            src={URL.createObjectURL(selectedImage)}
                            alt="Thumb"
                          />
                        </div>
                      ) : (
                        <item.icon />
                      )}
                      <div>
                        <span className="accordion_title">{item.label}</span>
                        {item.label === "General Information" &&
                          sectionComplete.info && (
                            <div className="accordion_info">
                              <span>
                                <span className="accordion_info__info">
                                  Name:
                                </span>{" "}
                                {generalInfo.tenant_name}
                              </span>
                              <span>
                                <span className="accordion_info__info">
                                  WhatsApp Number:
                                </span>{" "}
                                {value}
                              </span>
                              <span>
                                <span className="accordion_info__info">
                                  Email:
                                </span>{" "}
                                {generalInfo.tenant_email}
                              </span>
                              <span>
                                <span className="accordion_info__info">
                                  Date of Birth:
                                </span>{" "}
                                {generalInfo.date_birth}
                              </span>
                            </div>
                          )}
                        {item.label === "Location" && sectionComplete.location && (
                          <div className="accordion_info">
                            <span>
                              <span className="accordion_info__info">
                                Organization:
                              </span>{" "}
                              {organization === "default-Organization"
                                ? ""
                                : organization}
                            </span>
                            <span>
                              <span className="accordion_info__info">
                                Building Number:
                              </span>{" "}
                              {buildingNumber === "default-BuildingNumber"
                                ? ""
                                : buildingNumber}
                            </span>
                            <span>
                              <span className="accordion_info__info">
                                Apartment Number:
                              </span>{" "}
                              {apartmentName === "default-ApartmentNumber"
                                ? ""
                                : apartmentName}
                            </span>
                          </div>
                        )}
                        {item.label === "Validation document" &&
                          sectionComplete.validdoc && (
                            <div className="accordion_info">
                              <span>
                                <span className="accordion_info__info">
                                  File:
                                </span>{" "}
                                {fileType === "default-SelectedDocument"
                                  ? ""
                                  : selectedDocument?.name}
                              </span>
                            </div>
                          )}
                        {item.label === "Interests & Preferences" &&
                          sectionComplete.interest && (
                            <div className="accordion_info" key={item.id}>
                              {interestsArray.length === 0
                                ? ""
                                : interestsArray.map((value) => (
                                    <span className="interests_info">
                                      {value}
                                    </span>
                                  ))}
                            </div>
                          )}
                        {item.label === "Family & Gusts & Pets" &&
                          sectionComplete.family && (
                            <div className="accordion_info">
                              {!!data.family?.length && (
                                <span>
                                  <span className="accordion_info__info">
                                    Family:
                                  </span>{" "}
                                  {data?.family.length === 0
                                    ? ""
                                    : data?.family?.length}
                                </span>
                              )}
                              {!!data?.guests?.length && (
                                <span>
                                  <span className="accordion_info__info">
                                    Guests:
                                  </span>{" "}
                                  {data.guests.length === 0
                                    ? ""
                                    : data.guests.length}
                                </span>
                              )}
                              {!!data?.pets?.length && (
                                <span>
                                  <span className="accordion_info__info">
                                    Pets:
                                  </span>{" "}
                                  {data?.pets?.length === 0
                                    ? ""
                                    : data?.pets?.length}
                                </span>
                              )}
                              {!!data?.car?.length && (
                                <span>
                                  <span className="accordion_info__info">
                                    Car:
                                  </span>{" "}
                                  {data?.car?.length === 0
                                    ? ""
                                    : data?.car?.length}
                                </span>
                              )}
                            </div>
                          )}
                        {item.label === "Account Settings" &&
                          sectionComplete.account && (
                            <div className="accordion_info">
                              <span>
                                <span className="accordion_info__info">
                                  Date:
                                </span>
                                {moment(new Date(Date.parse(date))).format(
                                  "YYYY-MM-DD"
                                )}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                    <div>
                      {item.label === "General Information" &&
                        (sectionComplete.info ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionGeneralInfo.length === 0 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={5}
                            completed={accordionGeneralInfo.length}
                          />
                        ))}
                      {item.label === "Location" &&
                        (sectionComplete.location ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionLocation.length === 0 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={3}
                            completed={accordionLocation.length}
                          />
                        ))}
                      {item.label === "Validation document" &&
                        (sectionComplete.validdoc ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionValidation.length === 1 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={1}
                            completed={accordionValidation.length}
                          />
                        ))}
                      {item.label === "Interests & Preferences" &&
                        (sectionComplete.interest ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionInterests.length === 0 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={2}
                            completed={accordionInterests.length}
                          />
                        ))}
                      {item.label === "Family & Gusts & Pets" && (
                        <CheckedboxIcon className="complete_circle" />
                      )}
                      {item.label === "Account Settings" &&
                        (sectionComplete.account ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionAccount.length === 1 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={1}
                            completed={accordionAccount.length}
                          />
                        ))}
                      {item.label === "Set tenant Password" &&
                        (sectionComplete.password ? (
                          <CheckedboxIcon className="complete_circle" />
                        ) : accordionPassword.length === 0 ? (
                          <CheckboxIcon className="round_circle" />
                        ) : (
                          <ProgressBar
                            tasksNumber={1}
                            completed={accordionPassword.length}
                          />
                        ))}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <item.Component
                      // General information
                      imageChange={imageChange}
                      selectedImage={selectedImage}
                      setValue={setValue}
                      value={value}
                      family={family}
                      setFamily={setFamily}
                      fullNumber={fullNumber}
                      image={imageLc}
                      // setTenantName={setTenantName}
                      // tenantName={tenantName}
                      // setTenantEmail={setTenantEmail}
                      // setTenantBirthDate={setTenantBirthDate}
                      generalInfo={generalInfo}
                      setGeneralInfo={setGeneralInfo}
                      // Location
                      setOrganization={setOrganization}
                      setBuildingNumber={setBuildingNumber}
                      setBuilding={setBuilding}
                      building={building}
                      setApartmentNumberID={setApartmentNumberID}
                      organization={organization}
                      buildingNumber={buildingNumber}
                      apartmentNumberID={apartmentNumberID}
                      // Validation
                      setFileType={setFileType}
                      fileType={fileType}
                      setSelectedDocument={setSelectedDocument}
                      selectedDocument={selectedDocument}
                      // Interests & Preferences
                      setInterestArray={setInterestArray}
                      interestsArray={interestsArray}
                      // Family & Gusts & Pets
                      setData={setData}
                      data={data}
                      setguestPhone={setguestPhone}
                      guestPhone={guestPhone}
                      guestNumber={guestNumber}
                      // Account Settings
                      setDate={setDate}
                      date={date}
                      setTenantId={setTenantId}
                      tenantId={tenantId}
                      // validation
                      handleGeneralInfoValidation={handleGeneralInfoValidation}
                      setErrorName={setErrorName}
                      errorName={errorName}
                      setErrorEmail={setErrorEmail}
                      errorEmail={errorEmail}
                      setErrorDate={setErrorDate}
                      errorDate={errorDate}
                      setApartmentName={setApartmentName}
                      apartmentName={apartmentName}
                      setValues={setValues}
                      values={values}
                    />
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </div>
        </form>
      </Container>
    </>
  );
};

export default AddTenant;
