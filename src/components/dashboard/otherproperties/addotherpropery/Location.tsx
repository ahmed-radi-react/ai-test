import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
} from "@mui/material";
import { useState } from "react";
import { accordionStyle, building } from "@/utils/constant";
import { ReactComponent as House } from "@/assets/icons/house.svg";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import ProgressBar from "~/reusable/ProgressBar";
import { ILocationInterface } from "~/types/types";

const Location = ({
  expanded,
  buttonTwo,
  setExpanded,
  sectionCompleteStep,
  accordionTwo,
  setSelectLocation,
  selectLocation,
  setSelectProperty,
  selectProperty,
}: ILocationInterface) => {
  const handleChange = (panel: string) => (isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [openProperty, setOpenProperty] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <Accordion
      expanded={expanded === "panel2"}
      sx={accordionStyle}
      onChange={handleChange("panel2")}
    >
      <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
        <Box sx={{ width: "80%", flexShrink: 0 }} className="accordion_header">
          <House />
          <div
            className="accordion_header__info"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Location</p>
            {sectionCompleteStep.stepTwo && (
              <div className="accordion_header__info-content">
                <span>{selectLocation.label}</span>
                <span>{selectProperty.label}</span>
              </div>
            )}
          </div>
        </Box>
        {sectionCompleteStep.stepTwo ? (
          <SectionComplete className="complete_circle" />
        ) : accordionTwo.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={2} completed={accordionTwo.length} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content_property">
          <Box className="accordion_content_property__right">
            <Box className="accordion_content__form">
              <Box className="accordion_content__right-info location full-with d-flex">
                <div className="slect_buuilding_div">
                  <div
                    className="select_building"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    <span
                      className={`${
                        selectLocation.id !== 0 ? "active_select" : ""
                      }`}
                    >
                      {selectLocation.label}
                    </span>
                    <ArrowIcon />
                  </div>
                  {open && (
                    <div className="select_building_item">
                      {building.map((item) => {
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectLocation({
                                id: item.id,
                                label: item.label,
                              });
                              setOpen(false);
                            }}
                          >
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="slect_buuilding_div">
                  <div
                    className="select_building"
                    onClick={() => {
                      setOpenProperty(true);
                    }}
                  >
                    <span
                      className={`${
                        selectProperty.id !== 0 ? "active_select" : ""
                      }`}
                    >
                      {selectProperty.label}
                    </span>
                    <ArrowIcon />
                  </div>
                  {openProperty && (
                    <div className="select_building_item">
                      {building.map((item) => {
                        return (
                          <div
                            key={item.id}
                            onClick={() => {
                              setSelectProperty({
                                id: item.id,
                                label: item.label,
                              });
                              setOpenProperty(false);
                            }}
                          >
                            <span>{item.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="btn_container">
          <Button
            variant="contained"
            className={`next_btn ${buttonTwo ? "" : "deactivate"}`}
            disabled={!buttonTwo}
            onClick={() => setExpanded("panel3")}
          >
            Next
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Location;
