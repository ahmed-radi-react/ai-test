import { Button, FormControl, Input, MenuItem, Select } from "@mui/material";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";

const AddGuest = () => {
  return (
    <div className="addguestymember">
      <span className="familyspan">Guests</span>
      <div className="familydiv">
        <div className="familymamber">
          <div className="familyinput">
            <Input placeholder="Guest name" className="familydate" />
            <Input placeholder="Phone Number" className="familydate" />
          </div>
          <div className="agediv">
            <FormControl sx={{ width: 390 }} className="formcontrol guest">
              <ArrowIcon />
              <Select
                value={""}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="select"
              >
                <MenuItem value="" className="relationshipitem">
                  Profession
                </MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <Button variant="contained" className="deletebtn">
          Delete
        </Button>
      </div>
    </div>
  );
};

export default AddGuest;
