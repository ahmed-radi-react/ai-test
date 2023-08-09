import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Container,
} from "@mui/material";
import { addServiceAcordian } from "@/utils/constant";
import BackNavigate from "~/reusable/BackNavigate";
import { ReactComponent as CheckboxIcon } from "@/assets/icons/roundCheckbox.svg";
import { ReactComponent as CheckedboxIcon } from "@/assets/icons/checkbox_round.svg";
import { ReactComponent as BasicInfo } from "@/assets/icons/basicInfo.svg";
import AddServiceActor from "./AddServiceActor";
import { useEffect, useState } from "react";

const AddService = () => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [select, setSelect] = useState("Select Availability");
  const [selectProperty, setSelectProperty] = useState("Select property");
  const [selectActor, setSelectActor] = useState("Select Existing");
  const [infoInput, setInfoInput] = useState<{ name: string; des: string }>({
    name: "",
    des: "",
  });
  const [sectionComplete, setSectionComplete] = useState({
    info: false,
    available: false,
    propert: false,
    actor: false,
  });
  useEffect(() => {
    if (selectedImage && infoInput.name.length && infoInput.des.length) {
      setSectionComplete((prev) => {
        return { ...prev, info: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, info: false };
      });
    }
  }, [selectedImage, infoInput]);
  useEffect(() => {
    if (select !== "Select Availability") {
      setSectionComplete((prev) => {
        return { ...prev, available: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, available: false };
      });
    }
  }, [select]);
  useEffect(() => {
    if (selectProperty !== "Select property") {
      setSectionComplete((prev) => {
        return { ...prev, propert: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, propert: false };
      });
    }
  }, [selectProperty]);
  useEffect(() => {
    if (selectActor !== "Select Existing") {
      setSectionComplete((prev) => {
        return { ...prev, actor: true };
      });
    } else {
      setSectionComplete((prev) => {
        return { ...prev, actor: false };
      });
    }
  }, [selectActor]);

  const isValidEmail = (email: string): boolean => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  return (
    <Container className="add_service_container">
      <BackNavigate title={"Service"} />
      <div className="header_addservice">
        <div className="action_addservice">
          <span>Add Service</span>
          {Object.values(sectionComplete).every((val) => val) ? (
            <CheckedboxIcon className="complete_circle" />
          ) : (
            <CheckboxIcon className="round_circle" />
          )}
        </div>
        <Button
          variant="contained"
          className={`add_servicebtn ${
            Object.values(sectionComplete).every((val) => val)
              ? "active_addservice"
              : ""
          }`}
        >
          Add Service
        </Button>
      </div>
      <div className="add_panel add_services">
        {addServiceAcordian.map((item) => {
          return (
            <Accordion key={item.id}>
              <AccordionSummary>
                <div className="addservice_panel_summary">
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
                  sectionComplete.available ? (
                    <CheckedboxIcon className="complete_circle" />
                  ) : (
                    <CheckboxIcon className="round_circle" />
                  )
                ) : item.id === 3 ? (
                  sectionComplete.propert ? (
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
                  infoInput={infoInput}
                  setInfoInput={setInfoInput}
                  select={select}
                  setSelect={setSelect}
                  selectProperty={selectProperty}
                  setSelectProperty={setSelectProperty}
                />
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
      <div className="add-service-actrors">
        <span className="span">Add Service Actors</span>
        <Accordion>
          <AccordionSummary>
            <div className="addservice_panel_summary">
              <div className="icon_detail">
                <BasicInfo />
              </div>
              <span>Add Actors Information</span>
            </div>
            {sectionComplete.actor ? (
              <CheckedboxIcon className="complete_circle" />
            ) : (
              <CheckboxIcon className="round_circle" />
            )}
          </AccordionSummary>
          <AccordionDetails>
            <AddServiceActor
              selectActor={selectActor}
              setSelectActor={setSelectActor}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </Container>
  );
};

export default AddService;
