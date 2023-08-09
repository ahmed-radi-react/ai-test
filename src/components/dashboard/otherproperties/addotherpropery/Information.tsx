import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Input,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { ReactComponent as House } from "@/assets/icons/house.svg";
import UploadImage from "~/reusable/UploadImage";
import { ReactComponent as SectionComplete } from "@/assets/icons/sectionComplete.svg";
import { ReactComponent as RoundCheckbox } from "@/assets/icons/roundCheckbox.svg";
import dropImage from "@/assets/images/dropImageWhite.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import ProgressBar from "~/reusable/ProgressBar";
import { accordionStyle, InputStyle } from "@/utils/constant";
import { IOTherProperty, ITarget } from "~/types/types";
import { ReactComponent as DeleteIcon } from "@/assets/icons/deleteIconImage.svg";

const Information = ({
  buttonOne,
  expanded,
  info,
  setInfo,
  setSelectedImages,
  setBase64,
  setExpanded,
  sectionCompleteStep,
  selectedImages,
  accordionOne,
}: IOTherProperty) => {
  const [isValidName, setIsValidName] = useState(true);
  const [isValidDesc, setIsValidDesc] = useState(true);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const imageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string,
    inX?: number
  ) => {
    const FR = new FileReader();
    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (e.target.files && e.target.files.length > 0) {
        if (evt.target) {
          setBase64((evt.target.result as string)?.split(",")[1]);

          const banner = {
            name: e.target.files[0].name,
            base64: (evt?.target?.result as string)?.split(",")[1],
            description: e.target.files[0].name,
            alt: e.target.files[0].name,
            url: e.target.files[0],
          };

          if (selectedImages.length <= 4) {
            if (status === "edit" && inX !== undefined) {
              const newSelectedImages = [...selectedImages];
              newSelectedImages[inX] = banner;
              setSelectedImages(newSelectedImages);
            } else {
              setSelectedImages([...selectedImages, banner]);
            }
          }
        }
      }
    });
    e.target.files && FR.readAsDataURL(e.target.files[0]);
  };
  const handleChangeInfo = ({ target: { value, name } }: ITarget) => {
    if (name === "name") {
      if (value?.length >= 20) {
        setIsValidName(false);
      } else {
        setIsValidName(true);
        setInfo((prev) => {
          return { ...prev, name: value };
        });
      }
    } else {
      if (value?.length >= 50) {
        setIsValidDesc(false);
      } else {
        setIsValidDesc(true);
        setInfo((prev) => {
          return { ...prev, desc: value };
        });
      }
    }
  };

  // position: absolute;
  // top: 10px;
  // right: 43px;
  // z-index: 1000;
  // width: 24px;
  // height: 24px;
  // border-radius: 6px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // background-color: rgba(255, 255, 255, 0.5);
  // cursor: pointer;

  return (
    <Accordion
      expanded={expanded === "panel1"}
      sx={accordionStyle}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ display: "flex", alignItems: "center" }}
      >
        <Box sx={{ width: "80%", flexShrink: 0 }} className="accordion_header">
          <House />
          <div
            className="accordion_header__info"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <p>Property Information</p>
            {sectionCompleteStep.stepOne && (
              <div className="accordion_header__info-content">
                <span className="image_span">
                  {selectedImages?.length} images
                </span>
                <span>{info.name}</span>
                <span>{info.desc}</span>
              </div>
            )}
          </div>
        </Box>
        {sectionCompleteStep.stepOne ? (
          <SectionComplete className="complete_circle" />
        ) : accordionOne.length === 0 ? (
          <RoundCheckbox className="round_circle" />
        ) : (
          <ProgressBar tasksNumber={3} completed={accordionOne.length} />
        )}
      </AccordionSummary>
      <AccordionDetails>
        <Box className="accordion_content_property">
          <Box className="accordion_content_property__left">
            {selectedImages.length === 0 ? (
              <UploadImage
                imageChange={imageChange}
                dropImage={dropImage}
                className="upload_app_banner"
                name="image_1"
              />
            ) : (
              <div
                className={`images-gallery ${
                  selectedImages.length > 1 ? "flex-w" : ""
                }`}
              >
                {selectedImages.map((image, index) => (
                  <div
                    className={`uploadimage ${
                      selectedImages.length > 0 ? "small_image" : ""
                    }`}
                    key={index}
                  >
                    <img
                      className={`${
                        selectedImages.length === 1 ? "image_width" : ""
                      }`}
                      src={URL.createObjectURL(image.url)}
                      alt="Thumb"
                    />
                    <label className="editdiv ">
                      <input
                        type="file"
                        className="fileinput display_upload"
                        name="image_2"
                        onChange={(e) => imageChange(e, "edit", index)}
                      />
                      <EditIcon />
                    </label>
                    <div
                      className="delete_image"
                      // onClick={handleDelete}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                ))}
                {selectedImages.length < 4 && (
                  <div
                    className={`uploadimage ${
                      selectedImages.length > 0 ? "small_image" : ""
                    }`}
                  >
                    <UploadImage
                      imageChange={imageChange}
                      dropImage={dropImage}
                      className={`upload_app_banner ${
                        selectedImages.length > 0 ? "small_image" : ""
                      }`}
                      name="image_1"
                    />
                  </div>
                )}
              </div>
            )}
            {selectedImages.length !== 4 ? (
              <span className="note">
                These images will reflect to the mobile app.
              </span>
            ) : (
              ""
            )}
          </Box>
          <Box className="accordion_content_property__right">
            <Box className="accordion_content__form">
              <Box className="accordion_content__right-info name_field">
                <Input
                  type="text"
                  name="name"
                  value={info?.name}
                  onChange={handleChangeInfo}
                  placeholder="Property Name"
                  className="accordion_content__input"
                />
                {!isValidName && (
                  <span>Property Name length must be less than 20</span>
                )}
              </Box>
              <Box className="accordion_content_property__right-description">
                <TextField
                  multiline
                  placeholder="Description"
                  rows={2}
                  sx={InputStyle}
                  className="description-input"
                  onChange={handleChangeInfo}
                  name="desc"
                  value={info?.desc}
                />
                {!isValidDesc && (
                  <span>Property Description length must be less than 50</span>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="btn_container">
          <Button
            variant="contained"
            className={`next_btn ${buttonOne ? "" : "deactivate"}`}
            onClick={() => setExpanded("panel2")}
          >
            Next
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default Information;
