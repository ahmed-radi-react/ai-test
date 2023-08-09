import { Textarea } from "@mui/joy";
import { Button } from "@mui/material";
import MakeActive from "~/reusable/MakeActive";
import { IAddAmenityInfo } from "~/types/types";

const AddAmenityInformation = ({
  handleAddService,
  value,
  setValue,
  setValid,
  valid,
}: IAddAmenityInfo) => {
  const bullet = "\u2022";
  const bulletWithSpace = `${bullet} `;
  const enter = 13;
  const handleInput = (event: { keyCode: number; target: any }) => {
    const { keyCode, target } = event;
    const { selectionStart, value } = target;
    if (keyCode === enter) {
      target.value = [...value]
        .map((c, i) => (i === selectionStart - 1 ? `\n${bulletWithSpace}` : c))
        .join("");
      target.selectionStart = selectionStart + bulletWithSpace.length;
      target.selectionEnd = selectionStart + bulletWithSpace.length;
    }

    if (value[0] !== bullet) {
      target.value = `${bulletWithSpace}${value}`;
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue((prev: {}) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    if (e.target.name === "name_input") {
      if (e.target.value.length > 20) {
        setValid((prev) => {
          return { ...prev, name: "Amenity Name length must be less than 20" };
        });
      } else {
        setValid((prev) => {
          return { ...prev, name: "" };
        });
      }
    }
    if (e.target.name === "description_input") {
      if (e.target.value.length > 50) {
        setValid((prev) => {
          return {
            ...prev,
            description: "Amenity description length must be less than 50",
          };
        });
      } else {
        setValid((prev) => {
          return { ...prev, description: "" };
        });
      }
    }
  };

  return (
    <div className="amenity_info">
      <span className="amenity_info_span">Amenity Information</span>
      <div className="info_div">
        <div className="input_addamenity">
          <Textarea
            placeholder="Amenity Name"
            className="amenity_name"
            name="name_input"
            required
            value={value.name_input}
            onChange={handleChange}
          />
          <Button
            variant="contained"
            className="addsub_category"
            onClick={handleAddService}
          >
            Add Amenity Sub category
          </Button>
        </div>
        <span className="valid_div">{valid.name}</span>
        <Textarea
          placeholder="Amenity Description "
          className="amenity_description"
          name="description_input"
          required
          onChange={handleChange}
          value={value.description_input}
        />
      </div>
      <span className="valid_div">{valid.description}</span>
      <div className="instraction_div">
        <span className="instraction_span">Guidelines & Instructions</span>

        <Textarea
          onKeyUp={(event) => handleInput(event)}
          placeholder="• Write here"
          className="instruction_text"
          name="instraction_input"
          required
          onChange={handleChange}
          value={value.instraction_input}
        ></Textarea>
      </div>
      <MakeActive
        width={40}
        height={20}
        bullerWidth={16}
        bullerHeight={16}
        translate={"translateX(20px)"}
      />
    </div>
  );
};

export default AddAmenityInformation;
