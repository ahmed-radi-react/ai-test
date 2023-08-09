import { Button, FormControl, Input, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";
import { ITarget, IAddPets } from "~/types/types";

const AddPets = ({
  handleClick,
  setPetType,
  setOpenDialog,
  petType,
  petsVal,
  setPetsVal,
  editIndex,
  data,
  handleRemove,
}: IAddPets) => {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(false);
  const handleChangePets = ({ target: { value, name } }: ITarget) => {
    setPetsVal((prev) => ({ ...prev, [name]: value }));
  };
  const item = data.find((elem) => elem.id === editIndex);
  useEffect(() => {
    if (petsVal.name?.length && petsVal.age.length && petType.length) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  }, [petsVal, petType]);

  return (
    <div className="addguest_tenant">
      {!open && <span className="guestspan pets">Pets</span>}
      {!open ? (
        <div className="guestdiv pets">
          <div className="guestmamber pets">
            <div className="guestinput pets">
              <Input
                placeholder="Pet name"
                className="guestdate pets"
                onChange={handleChangePets}
                name="name"
                defaultValue={(item && item?.name) || ""}
              />
              <Input
                placeholder="Age"
                className="guestdate"
                onChange={handleChangePets}
                name="age"
                defaultValue={(item && item?.age) || ""}
              />
              <FormControl sx={{ width: 390 }} className="formcontrol guest">
                <ArrowIcon />
                <Select
                  onChange={(e) => setPetType(e.target.value)}
                  value={petType}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="select"
                >
                  <MenuItem value="" className="relationshipitem">
                    Type
                  </MenuItem>
                  <MenuItem value="DOG" className="relationshipitem">
                    Dog
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
                    handleClick("pets", editIndex);
                  } else {
                    handleClick("pets");
                  }
                  setOpen(true);
                  setOpenDialog(false);
                }}
              >
                {item ? "Edit" : "Add"}
              </Button>
              {/* <Button variant="contained" className="deletebtn">
                Delete
              </Button> */}
            </div>
            {item && (
              <div className="btn btnDelete">
                <Button
                  variant="contained"
                  className={`deletebtn savebtn ${disable ? "" : ""}`}
                  onClick={() => {
                    if (item) {
                      handleRemove("pets", editIndex);
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
      ) : (
        ""
      )}
    </div>
  );
};

export default AddPets;
