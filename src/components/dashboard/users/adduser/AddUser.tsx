import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from "@mui/material";
import { addUserAcordian } from "@/utils/constant";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as CheckboxIcon } from "@/assets/icons/roundCheckbox.svg";
import { ReactComponent as CheckedboxIcon } from "@/assets/icons/checkbox_round.svg";
import { useEffect, useState } from "react";
import { mutationRequest } from "@/requests-body/queries";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { useNavigate } from "react-router-dom";
interface SelectedState {
  servicesIds: string[];
  buildingsIds: string[];
  roleId: string;
}

const AddUser = () => {
  const [selected, setSelected] = useState<SelectedState>({
    servicesIds: [],
    buildingsIds: [],
    roleId: "",
  });

  const [info, setInfo] = useState({
    number: "",
    countryCode: "",
  });
  const [base64, setBase64] = useState<string | ArrayBuffer | null>("");
  const { mutate } = mutationRequest({
    url: `/user`,
    method: "post",
    isAuth: true,
  });
  const [selectedImage, setSelectedImage] = useState<File[]>([]);
  const [value, setValue] = useState("+966");
  const [infoInput, setInfoInput] = useState<{
    name: string;
    email: string;
    birthday: string;
  }>({
    name: "",
    email: "",
    birthday: "",
  });
  const [sectionComplete, setSectionComplete] = useState({
    info: false,
    role: false,
  });
  useEffect(() => {
    if (
      selectedImage[0] &&
      infoInput.name.length &&
      infoInput.email.length &&
      infoInput.birthday.length &&
      info.number?.length > 4
    ) {
      setSectionComplete((prev) => {
        return { ...prev, info: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, info: false };
      });
    }
    if (selected.roleId.length > 1) {
      setSectionComplete((prev) => {
        return { ...prev, role: true };
      });
    }
  }, [selectedImage[0], infoInput, selected.roleId]);
  const handleSubmit = () => {
    mutate.mutate({
      organizationId: "63a8b4cfaf1b0c19ca045a06",
      buildingsIds: selected.buildingsIds,
      servicesIds: selected.servicesIds,
      roleId: selected.roleId,
      apartmentId: "",
      firstName: infoInput.name,
      lastName: infoInput.name,
      countryCode: "+" + info.countryCode,
      phoneNumber: info.number.slice(
        info.countryCode.length + 1,
        info.number.length
      ),
      email: infoInput.email,
      age: 0,
      password: "string",
      dateOfBirth: infoInput.birthday,
      image: {
        name: selectedImage[0]?.name,
        base64: base64,
        alt: selectedImage[0]?.name,
        description: selectedImage[0]?.name,
      },
    });
  };
  const [hideMessage, setHideMessage] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (mutate.isSuccess) {
      navigate("/users/usermanagement", {
        state: { data: "success", message: "Building" },
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
      <Container className="addnew_user_home">
        <BackNavigate title={"Home"} />
        <div className="header_adduser">
          <span>Add User</span>
          <Button
            variant="contained"
            className="add_userbtn"
            disabled={!sectionComplete.info || !sectionComplete.role}
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </div>
        <div className="add_panel add_services">
          {addUserAcordian.map((item) => {
            return (
              <Accordion key={item.id}>
                <AccordionSummary>
                  <div className="adduser_panel_summary">
                    <div className="icon_detail">
                      <item.icon />
                    </div>
                    <span>{item.label}</span>
                  </div>
                  {item.id === 1 ? (
                    sectionComplete.info ? (
                      <CheckedboxIcon className="complete_circle" />
                    ) : (
                      <CheckboxIcon className="round_circle" />
                    )
                  ) : item.id === 2 ? (
                    sectionComplete.role ? (
                      <CheckedboxIcon className="complete_circle" />
                    ) : (
                      <CheckboxIcon className="round_circle" />
                    )
                  ) : (
                    <CheckboxIcon className="round_circle" />
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <item.Component
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    value={value}
                    setValue={setValue}
                    infoInput={infoInput}
                    setInfoInput={setInfoInput}
                    setBase64={setBase64}
                    info={info}
                    setInfo={setInfo}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default AddUser;
