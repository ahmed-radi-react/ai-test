import UploadImage from "~/reusable/UploadImage";
import dropImage from "@/assets/icons/dropimagesub.png";
import { Dispatch, useState } from "react";
import { Button, Input } from "@mui/material";
import { Textarea } from "@mui/joy";
import TimeAvailability from "~/reusable/TimeAvailability";
import MakeActive from "~/reusable/MakeActive";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";
import { IAddAmenitySubCategory } from "~/types/types";
import { FileUploader } from "react-drag-drop-files";

const AddAmenitySubCategory = ({
  el,
  addService,
  handleDeleteService,
  setConvertedData,
  convertedData,
  slotsData,
  setSlotsData,
  selectedImage,
  setAvailabiliySlotSub,
  availabilitySlot,
  handleChange,
  setSelectedImage,
}: IAddAmenitySubCategory) => {
  const [valid, setValid] = useState({ name: "", description: "" });
  const [subNameInput, setSubNameInput] = useState("");
  const [subDescriptionInput, setSubDescriptionInput] = useState("");
  const hanldeValid = () => {
    if (subNameInput.length >= 20) {
      setValid((prev) => {
        return {
          ...prev,
          name: "Maintenance Name length must be less than 20",
        };
      });
    } else {
      setValid((prev) => {
        return { ...prev, name: "" };
      });
    }

    if (subDescriptionInput.length >= 50) {
      setValid((prev) => {
        return {
          ...prev,
          description: "Maintenance description length must be less than 50",
        };
      });
    } else {
      setValid((prev) => {
        return { ...prev, description: "" };
      });
    }
  };
  const [active, setActive] = useState(false);
  return (
    <div className="addamenitysubcategory">
      {el === addService[0] && (
        <span className="span_sub_category">Sub Category</span>
      )}
      <div className="sub_div">
        <div>
          <div className="image_input_sub">
            {!selectedImage[el] ? (
              <UploadImage
                handleChange={handleChange({
                  status: "add",
                  isBanner: false,
                  el,
                  selectedImage,
                  setSelectedImage,
                })}
                dropImage={dropImage}
              />
            ) : (
              <div className="uploadimage">
                <img src={URL.createObjectURL(selectedImage[el])} alt="Thumb" />
                <label className="editdiv" style={{ cursor: "pointer" }}>
                  <FileUploader
                    handleChange={handleChange({
                      status: "edit",
                      isBanner: false,
                      el,
                      selectedImage,
                      setSelectedImage,
                    })}
                    name={`sub_category_input${el}`}
                    types={["jpeg", "png", "gif"]}
                    classes="fileinput display_upload"
                  />
                  <EditIcon />
                </label>
              </div>
            )}
            <div className="input_sub_category">
              <Input
                placeholder="Amenity Sub Category Name  "
                className=" input_sub_name"
                name={`sub_name_input${el}`}
                value={subNameInput}
                onChange={(e) => {
                  setSubNameInput(e.target.value);
                  hanldeValid();
                }}
              />
              <span className="valid_div">{valid.name}</span>
              <Textarea
                placeholder="Description "
                className=" input_sub_desc"
                name={`sub_desc_input${el}`}
                value={subDescriptionInput}
                onChange={(e) => {
                  setSubDescriptionInput(e.target.value);
                  hanldeValid();
                }}
              />
              <span className="valid_div">{valid.description}</span>
            </div>
          </div>
          <span className="note_span">
            Note: this image will reflect to the mobile app.
          </span>
          <MakeActive
            width={30}
            height={15}
            bullerWidth={12}
            bullerHeight={12}
            translate={"translateX(13px)"}
            el={el}
          />
        </div>
        <div className="time_sub_category">
          <div>
            <MakeActive
              width={30}
              subClass={true}
              height={15}
              bullerWidth={12}
              bullerHeight={12}
              translate={"translateX(13px)"}
              availabilitySlot={availabilitySlot}
              el={el}
              active={active}
              setActive={setActive}
              setAvailabiliySlot={setAvailabiliySlotSub}
              setAvailabiliySlotSub={setAvailabiliySlotSub}
            />
            {active && (
              <TimeAvailability
                setConvertedData={setConvertedData}
                convertedData={convertedData}
                slotsData={slotsData}
                setSlotsData={setSlotsData}
                el={el}
                setAvailabiliySlot={
                  setAvailabiliySlotSub as Dispatch<React.SetStateAction<{}[]>>
                }
              />
            )}
            <div className="sub_capacity">
              <Input
                placeholder="capacity"
                type="number"
                className="capacity"
                inputProps={{ maxLength: 3 }}
                // onChange={(e) => handleChange(e, 'capacity')}
                // value={capacity ? capacity : ""}
                name={`sub_capacity${el}`}
              />
            </div>
          </div>
          <Button
            variant="contained"
            className="deletebtn"
            onClick={() => handleDeleteService(el)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddAmenitySubCategory;
