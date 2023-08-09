import { Button, FormControl, Input, MenuItem, Select } from "@mui/material";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow.svg";

const AddNewFamilyMember = () => {
  const relationship = "";
  return (
    <div className="addfamilymember">
      <span className="familyspan">Family Members</span>
      <div className="familydiv">
        <div className="familymamber">
          <div className="familyinput">
            <Input placeholder="Family Member name" className="familydate" />
            <Input placeholder="Email" className="familydate" />
            <Input placeholder="Password" className="familydate" />
          </div>
          <div className="agediv">
            <Input placeholder="Age" className="ageinput" />
            <FormControl sx={{ width: 390 }} className="formcontrol">
              <ArrowIcon />
              <Select
                value={relationship}
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
                className="select"
              >
                <MenuItem value="" className="relationshipitem">
                  Relationship
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

export default AddNewFamilyMember;
