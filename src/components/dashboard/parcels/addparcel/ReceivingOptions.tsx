import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ReactComponent as ReceivingOptionsIcon } from "@/assets/icons/ParcelsReceivingoptionsIcon.svg";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import ProgressBar from "~/reusable/ProgressBar";
import { accordionStyle, selectStyleParcel } from "@/utils/constant";
import { IReceiving } from "~/types/types";

const ReceivingOptions = ({
  expanded,
  setExpanded,
  setOptionReceiving,
  sectionComplete,
  accordionTwo,
  optionReceiving,
}: IReceiving) => {
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleChangeSelectReceiving = (event: SelectChangeEvent<string>) => {
    setOptionReceiving(event.target.value);
  };
  return (
    <Accordion
      expanded={expanded === "panel2"}
      sx={accordionStyle}
      onChange={handleChange("panel2")}
    >
      <AccordionSummary aria-controls="panel2bh-content" id="panel2bh-header">
        <Box sx={{ width: "33%", flexShrink: 0 }} className="accordion_header">
          <ReceivingOptionsIcon />
          <p>Receiving options</p>
        </Box>
        {sectionComplete.stepTwo ? (
          <SectionComplete className="complete_circle" />
        ) : accordionTwo.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={1} completed={accordionTwo.length} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content">
          <Box className="accordion_content__right">
            <Box className="accordion_content__form">
              <Box className="accordion_content__right-info rm-margin">
                <Select
                  labelId="select-option-label"
                  id="select-option"
                  value={optionReceiving ? optionReceiving : "default-value"}
                  className="accordion_content__form-select full-with"
                  sx={selectStyleParcel}
                  onChange={handleChangeSelectReceiving}
                >
                  <MenuItem value="default-value" disabled>
                    Select option
                  </MenuItem>
                  <MenuItem value="holdAtReception">Hold at reception</MenuItem>
                </Select>
              </Box>
            </Box>
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default ReceivingOptions;
