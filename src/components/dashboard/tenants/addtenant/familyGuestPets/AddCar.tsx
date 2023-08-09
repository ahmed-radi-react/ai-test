import { Button, FormControl, Input, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { IAddCar } from "~/types/types";

const AddCar = ({
  handleClick,
  setCarBrandName,
  setOpenDialog,
  setCarName,
  carName,
  carBrandName,
  data,
  editIndex,
  handleRemove,
}: IAddCar) => {
  const [disable, setDisable] = useState(false);
  const item = data.find((elem) => elem.id === editIndex);
  useEffect(() => {
    if (carName.name.length && carBrandName?.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [carName, carBrandName]);
  const handleChangePets = (e: any) => {
    setCarName((prev) => ({ ...prev, name: e.target.value }));
  };
  const [open, setOpen] = useState(false);

  return (
    <div className="addguest_tenant">
      <span className="guestspan pets">Car</span>
      <div className="guestdiv pets">
        <div className="guestmamber pets">
          <div className="guestinput pets">
            <Input
              placeholder="Name"
              className="guestdate pets"
              onChange={handleChangePets}
              defaultValue={(item && item?.name) || ""}
              name="name"
            />
            <FormControl sx={{ width: 390 }} className="formcontrol guest">
              <ArrowIcon />
              <Select
                onChange={(e) => setCarBrandName(e.target.value)}
                value={carBrandName}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="select"
              >
                <MenuItem value="" className="relationshipitem">
                  Brand Name
                </MenuItem>
                <MenuItem value="Mercedes" className="relationshipitem">
                  Mercedes
                </MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="btn">
            <Button
              variant="contained"
              className={`deletebtn savebtn ${disable ? "activeAdd" : ""}`}
              onClick={() => {
                if (item) {
                  handleClick("car", editIndex);
                } else {
                  handleClick("car");
                }
                setOpen(true);
                setOpenDialog(false);
              }}
            >
              {item ? "Edit" : "Add"}
            </Button>
          </div>
          {item && (
            <div className="btn btnDelete">
              <Button
                variant="contained"
                className={`deletebtn savebtn ${disable ? "" : ""}`}
                onClick={() => {
                  if (item) {
                    handleRemove("car", editIndex);
                  }
                  setOpen(true);
                  setOpenDialog(false);
                }}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCar;
