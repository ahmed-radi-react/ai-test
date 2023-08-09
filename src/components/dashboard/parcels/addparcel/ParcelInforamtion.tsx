import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Input,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  accordionStyle,
  handleChange,
  InputStyleParcel,
  selectStyleParcel,
} from "@/utils/constant";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { ReactComponent as ParcelsInformationIcon } from "@/assets/icons/ParcelsInformationIcon.svg";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import ProgressBar from "~/reusable/ProgressBar";
import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/images/dropimage.png";
import PhoneInput from "react-phone-number-input";
import { IAddParcelInformation } from "~/types/types";

const ParcelInforamtion = ({
  expanded,
  setExpanded,
  sectionComplete,
  accordionOne,
  selectedImage,
  setSelectedImage,
  setBase64,
  setEditBanner,
  editbanner,
  setInfoVal,
  infoVal,
  optionParcelsType,
  setOptionParcelsType,
  setInputDate,
  setPickUpPersonName,
  // pickUpPersonName,
  setPickUpPersonPhone,
  pickUpPersonPhone,
  pickUpSelectDeliver,
  setPickUpSelectDeliver,
  pickUpSelectFood,
  setPickUpSelectFood,
}: IAddParcelInformation) => {
  const handleChangeIn =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const [errorName, setErrorName] = useState("");
  const [errorAmount, setErrorAmount] = useState("");
  const [errorTracking, setErrorTracking] = useState("");
  const [errorDesc, setErrorDesc] = useState("");

  const handleInputAmountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "name" && value.length > 20) {
      setErrorName("Name must be 20 characters or less.");
    } else if (name === "amount" && !/^[0-9]+$/.test(value)) {
      setErrorAmount(`Amount must contain only numbers.`);
    } else if (name === "tracking" && !/^[0-9]+$/.test(value)) {
      setErrorTracking(`Tracking must contain only numbers.`);
    } else if (name === "enterText" && value.length > 50) {
      setErrorDesc("Description must be 50 characters or less");
    } else {
      setErrorName("");
      setErrorAmount("");
      setErrorTracking("");
      setErrorDesc("");
      setInfoVal(
        (prev: {
          amount: string;
          tracking: string;
          enterText: string;
          name: string;
        }) => {
          return { ...prev, [name]: value };
        }
      );
    }
  };
  const handleChangeSelectParcelsType = (event: SelectChangeEvent<string>) => {
    setOptionParcelsType(event.target.value);
  };
  const handleChangeInputDate = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInputDate(event.target.value);
  };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      sx={accordionStyle}
      onChange={handleChangeIn("panel1")}
    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={{ width: "33%", flexShrink: 0 }} className="accordion_header">
          <ParcelsInformationIcon />
          <p>Parcels Information</p>
        </Box>
        {sectionComplete.stepOne ? (
          <SectionComplete className="complete_circle" />
        ) : accordionOne.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={5} completed={accordionOne.length} />
        )}{" "}
        {/* Accordion icon */}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content">
          <Box className="accordion_content__left">
            {selectedImage && !selectedImage[0] ? (
              <UploadImage
                handleChange={handleChange({
                  status: "add",
                  isBanner: false,
                  setBase64,
                  el: 0,
                  setSelectedImage,
                  selectedImage,
                  setEditBanner,
                })}
                dropImage={dropImage}
                className="upload_image"
                name="image_1"
              />
            ) : (
              <div className="uploadimage">
                {editbanner && selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage[0])}
                    alt="Thumb"
                  />
                ) : (
                  <div></div>
                )}
                <label className="editdiv">
                  <UploadImage
                    handleChange={handleChange({
                      status: "edit",
                      isBanner: false,
                      el: 0,
                      setBase64,
                      setSelectedImage,
                      selectedImage,
                    })}
                    dropImage={dropImage}
                    className="fileinput display_upload"
                    name="image_1"
                  />
                  <EditIcon />
                </label>
              </div>
            )}
          </Box>
          <Box className="accordion_content__right">
            <Box className="accordion_content__form">
              {errorName && <span className="error">{errorName}</span>}
              <Box className="accordion_content__right-info">
                <Input
                  type="text"
                  onChange={handleInputAmountChange}
                  placeholder="Parcel Name"
                  className="accordion_content__input"
                  name="name"
                  value={infoVal.name}
                  onBlur={() => setErrorName("")}
                  // inputProps={{ maxLength: 10 }}
                />
                <Select
                  labelId="select-option-label"
                  id="select-option"
                  value={
                    optionParcelsType ? optionParcelsType : "default-value"
                  }
                  className="accordion_content__form-select"
                  sx={selectStyleParcel}
                  onChange={handleChangeSelectParcelsType}
                >
                  <MenuItem value="default-value" disabled>
                    Parcels Type
                  </MenuItem>
                  <MenuItem value="DELIVERY">Delivery</MenuItem>
                  <MenuItem value="PICKUP">Pick Up</MenuItem>
                  <MenuItem value="FOOD">Food</MenuItem>
                </Select>
              </Box>
              {errorAmount && <span className="error">{errorAmount}</span>}
              <Box className="accordion_content__right-info">
                <Input
                  type="text"
                  onChange={handleInputAmountChange}
                  placeholder="Amount"
                  className="accordion_content__input"
                  name="amount"
                  value={infoVal.amount}
                  onBlur={() => setErrorAmount("")}
                />
                <Input
                  type="date"
                  onChange={handleChangeInputDate}
                  placeholder="Date"
                  className="accordion_content__input"
                />
              </Box>
              {errorTracking && <span className="error">{errorTracking}</span>}
              <Box className="accordion_content__right-info">
                <Input
                  type="text"
                  onChange={handleInputAmountChange}
                  placeholder="Tracking number(Optional)"
                  className="accordion_content__input"
                  name="tracking"
                  value={infoVal.tracking}
                  onBlur={() => setErrorTracking("")}
                />
              </Box>
              {errorDesc && <span className="error">{errorDesc}</span>}

              {optionParcelsType === "PICKUP" ? (
                <Box className="accordion_content__right-info">
                  <Input
                    type="text"
                    onChange={(e) => setPickUpPersonName(e.target.value)}
                    placeholder="Person name"
                    className="accordion_content__input"
                    name="person_name"
                  />
                  <PhoneInput
                    value={pickUpPersonPhone}
                    onChange={(value: string) => setPickUpPersonPhone(value)}
                    defaultCountry="SA"
                    limitMaxLength
                    international
                    name="person_phone"
                    className="PhoneInput"
                  />
                </Box>
              ) : optionParcelsType === "DELIVERY" ? (
                <Box className="accordion_content__right-info">
                  <Select
                    labelId="select-option-label"
                    id="select-option"
                    value={
                      pickUpSelectDeliver
                        ? pickUpSelectDeliver
                        : "default-value"
                    }
                    className="accordion_content__form-select"
                    sx={selectStyleParcel}
                    onChange={(e) => setPickUpSelectDeliver(e.target.value)}
                  >
                    <MenuItem value="default-value" disabled>
                      Delivery
                    </MenuItem>
                    <MenuItem value="Amazon">Amazon</MenuItem>
                    <MenuItem value="Noon">Noon</MenuItem>
                  </Select>
                </Box>
              ) : optionParcelsType === "FOOD" ? (
                <Box className="accordion_content__right-info">
                  <Select
                    labelId="select-option-label"
                    id="select-option"
                    value={
                      pickUpSelectFood ? pickUpSelectFood : "default-value"
                    }
                    className="accordion_content__form-select"
                    sx={selectStyleParcel}
                    onChange={(e) => setPickUpSelectFood(e.target.value)}
                  >
                    <MenuItem value="default-value" disabled>
                      Food
                    </MenuItem>
                    <MenuItem value="Zomato">Zomato</MenuItem>
                    <MenuItem value="UberEats">Uber Eats</MenuItem>
                    <MenuItem value="FoodPanda">Food Panda</MenuItem>
                    <MenuItem value="Swiggy">Swiggy</MenuItem>
                    <MenuItem value="Grubhub">Grubhub</MenuItem>
                    <MenuItem value="Deliveroo">Deliveroo</MenuItem>
                  </Select>
                </Box>
              ) : (
                <></>
              )}
              <Box className="accordion_content__right-description">
                <TextField
                  // id="my-textarea"
                  // label="Enter text here"
                  multiline
                  placeholder="Description"
                  rows={2}
                  sx={InputStyleParcel}
                  className="description-input"
                  onChange={handleInputAmountChange}
                  name="enterText"
                  onBlur={() => setErrorName("")}
                  value={infoVal.enterText}
                />
              </Box>
            </Box>
            {/* {errorName && <span className="error">{errorName}</span>} */}
            {/* {errorAmount && <span className="error">{errorAmount}</span>} */}
            {/* {errorTracking && <span className="error">{errorTracking}</span>} */}
          </Box>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};
export default ParcelInforamtion;
