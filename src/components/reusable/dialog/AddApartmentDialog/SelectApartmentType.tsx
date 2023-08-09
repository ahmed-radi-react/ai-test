import { Button, Checkbox } from "@mui/material";
import { ReactComponent as SingleApartment } from "@/assets/icons/SingleApartment.svg";
import { ReactComponent as MultipleApartments } from "@/assets/icons/MultipleApartments.svg";
import { ISelectApartmentType } from "~/types/types";
import { ReactComponent as Checkbtn } from "@/assets/icons/checkbox_round.svg";

const SelectApartmentType = ({
  selectedOption,
  handleDivClick,
  handleInputChange,
  setDownloadExcelStep,
  disable,
}: ISelectApartmentType) => {
  return (
    <>
      <div className="add_apart_select_option">
        <div
          className="select_apart_type"
          onClick={() => handleDivClick("single")}
        >
          <Checkbox
            value="single"
            className="checkbox"
            icon={<div className="checkincon"></div>}
            checkedIcon={
              <div className="checkincon">
                <Checkbtn />
              </div>
            }
            checked={selectedOption === "single"}
            onChange={handleInputChange}
          />
          <div className="select_apart_type__content">
            <SingleApartment />
            <span className="select_apart_type__content-text">
              Single Apartment
            </span>
          </div>
        </div>
        <div
          className="select_apart_type"
          onClick={() => handleDivClick("multiple")}
        >
          <Checkbox
            className="checkbox"
            icon={<div className="checkincon"></div>}
            checkedIcon={
              <div className="checkincon">
                <Checkbtn />
              </div>
            }
            checked={selectedOption === "multiple"}
            onChange={handleInputChange}
            value="multiple"
          />
          <div className="select_apart_type__content">
            <MultipleApartments />
            <span className="select_apart_type__content-text">
              Multiple Apartment
            </span>
          </div>
        </div>
      </div>
      <Button
        variant="contained"
        disabled={disable}
        className="btn"
        type="submit"
        onClick={() => setDownloadExcelStep(true)}
      >
        Continue
      </Button>
    </>
  );
};

export default SelectApartmentType;
