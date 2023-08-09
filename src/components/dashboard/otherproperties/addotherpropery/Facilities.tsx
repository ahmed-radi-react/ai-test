import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Input,
} from "@mui/material";
import { accordionStyle } from "@/utils/constant";
import { ReactComponent as House } from "@/assets/icons/house.svg";
import ProgressBar from "~/reusable/ProgressBar";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import { IFacilities } from "~/types/types";

const Facilities = ({
  facilityName,
  expanded,
  setExpanded,
  accordionThree,
  facilityArray,
  sectionCompleteStep,
  setFacilityName,
  setFacilityArray,
  buttonThree,
}: IFacilities) => {
  const handleChange = (panel: string) => (isExpanded: any) => {
    setExpanded(isExpanded ? panel : false);
  };
  const addFacility = () => {
    if (facilityName !== "") {
      setFacilityArray((prevStrings: any) => [...prevStrings, facilityName]);
      setFacilityName("");
    }
  };
  const clearFacilityInput = () => {
    setFacilityName("");
  };
  return (
    <Accordion
      expanded={expanded === "panel3"}
      sx={accordionStyle}
      onChange={handleChange("panel3")}
    >
      <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
        <Box sx={{ width: "80%", flexShrink: 0 }} className="accordion_header">
          <House />
          <div
            className="accordion_header__info"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Facilities</p>
            {sectionCompleteStep.stepThree && (
              <div className="accordion_header__info-content">
                {facilityArray.map((facility, index) => {
                  return <span key={index}>{facility}</span>;
                })}
              </div>
            )}
          </div>
        </Box>
        {sectionCompleteStep.stepThree ? (
          <SectionComplete className="complete_circle" />
        ) : accordionThree.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={1} completed={accordionThree.length} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content_property">
          <Box className="accordion_content_property__right">
            <Box className="accordion_content__form">
              <Box className="accordion_content__right-display">
                {facilityArray.length === 0 ? (
                  <p className="note">Please add facilities</p>
                ) : (
                  facilityArray.map((facility, index) => {
                    return (
                      <Box className="facility-content" key={index}>
                        {facility}
                      </Box>
                    );
                  })
                )}
              </Box>
              <Box className="accordion_content__right-facility small-width">
                <Input
                  value={facilityName}
                  type="text"
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="Facility Name"
                  className="accordion_content__input small-width"
                />
                <Button className="add_facility_btn" onClick={addFacility}>
                  Add Facility
                </Button>
                <Button
                  className="cancel_facility_btn"
                  onClick={clearFacilityInput}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="btn_container">
          <Button
            variant="contained"
            className={`next_btn ${buttonThree ? "" : "deactivate"}`}
            disabled={!buttonThree}
            onClick={() => setExpanded("")}
          >
            Next
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Facilities;
