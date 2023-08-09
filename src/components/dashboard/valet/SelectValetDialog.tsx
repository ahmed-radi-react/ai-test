import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  NativeSelect,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/selescticon.svg";
import { valetTableStaticData } from "@/utils/constant";
import { ReactComponent as CheckboxIcon } from "@/assets/icons/checkbox.svg";
import { ReactComponent as CheckedIcon } from "@/assets/icons/checkedIconsvg.svg";
import { ReactComponent as MessageIcon } from "@/assets/icons/message.svg";
import { ReactComponent as CallIcon } from "@/assets/icons/CallIcon.svg";
import { IAssign } from "~/types/types";

const SelectValetDialog = ({ title }: IAssign) => {
  return (
    <div className="valet_dialog_select">
      <span className="select_span">Select {title}</span>
      <div className="sort">
        <FormControl className="formControl">
          <Input placeholder="Search" className="inputsearch" />
          <SearchIcon />
        </FormControl>
        <div className="sortDiv">
          <span className="sortspan">Sort by:</span>
          <Box sx={{ width: 67, position: "relative" }}>
            <FormControl fullWidth>
              <SelectIcon className="selecticon" />
              <NativeSelect
                defaultValue={10}
                inputProps={{
                  name: "date ",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Date</option>
                <option value={20}>Date</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="list">
        {valetTableStaticData.map((item, index) => {
          return (
            <div key={index} className="list_item">
              <div className="left_item_div">
                <Checkbox
                  icon={<CheckboxIcon />}
                  checkedIcon={<CheckedIcon />}
                  color="primary"
                />
                <div className="img_div">
                  <img src={item.image} alt="image valet " />
                  <div className="active">
                    <div></div>
                  </div>
                </div>
                <div className="tenanat_info">
                  <span>{item.tenants}</span>
                  <span>3 tasks ongoing</span>
                </div>
              </div>
              <div className="btn_div">
                <Button variant="contained" className="btn">
                  <MessageIcon />
                  Message
                </Button>
                <Button variant="contained" className="btn">
                  <CallIcon />
                  Call
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Button variant="contained" className="btn_assign">
        Assign
      </Button>
    </div>
  );
};

export default SelectValetDialog;
