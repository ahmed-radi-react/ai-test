import {
  Box,
  Checkbox,
  FormControl,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  NativeSelect,
  TextField,
} from "@mui/material";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dropdown from "react-multilevel-dropdown";
import { checkboxStyle, dropDownPropertiesTable } from "@/utils/constant";
import { ITableSort } from "~/types/types";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";

const TableSort = ({
  setCheckedDate,
  checkedDate,
  setCheckedType,
  checkedType,
  handleHeaderFilter,
  handleSortDate,
}: ITableSort) => {
  const handleToggleType = (value: string) => () => {
    const currentIndex = checkedType.indexOf(value);
    const newCheckedType = [...checkedType];

    if (currentIndex === -1) {
      newCheckedType.push(value);
    } else {
      newCheckedType.splice(currentIndex, 1);
    }

    setCheckedType(newCheckedType);
  };
  //   const handleSortDate = (label: string) => {
  //     const sortedDataCopy = [...filteredData];
  //     setFilteredData(
  //       sortedDataCopy.sort((date1, date2) => {
  //         if (label === "New date") {
  //           return (
  //             Date.parse(date1.scheduleDateTo.split("T")[0]) -
  //             Date.parse(date2.scheduleDateTo.split("T")[0])
  //           );
  //         } else {
  //           return (
  //             Date.parse(date2.scheduleDateTo.split("T")[0]) -
  //             Date.parse(date1.scheduleDateTo.split("T")[0])
  //           );
  //         }
  //       })
  //     );
  //   };

  return (
    <div className="sort">
      <div className="search_setting">
        <FormControl className="formControl">
          <Input
            placeholder="Search"
            className="inputsearch"
            onChange={(e) => handleHeaderFilter(e.target.value)}
          />
          <SearchIcon />
        </FormControl>
        <Dropdown
          title={<SettingIcon />}
          buttonClassName="button_dropdown_list_multi_levels"
          menuClassName="menu_dropdown_list_multi_levels"
          position="right"
        >
          {dropDownPropertiesTable.map((item) => {
            return (
              <Dropdown.Item key={item.id}>
                {item.label}
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list">
                    {item.id === 3 ? (
                      <Dropdown.Item className="inner_list date">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            onChange={() => setCheckedDate}
                            renderInput={() => <TextField />}
                            value={checkedDate}
                            disablePast
                            showDaysOutsideCurrentMonth
                          />
                        </LocalizationProvider>
                      </Dropdown.Item>
                    ) : (
                      <List
                        sx={{
                          width: "100%",
                          bgcolor: "background.paper",
                        }}
                      >
                        {item?.item?.map(
                          (value: {
                            icon?: any;
                            id: number;
                            value: string;
                            label: string;
                          }) => {
                            const labelId = `checkbox-list-label-${value}`;

                            return (
                              <ListItem key={value.id} disablePadding>
                                <ListItemButton
                                  sx={{ padding: "0 10px" }}
                                  role={undefined}
                                  onClick={handleToggleType(value.value)}
                                  dense
                                >
                                  <Checkbox
                                    edge="start"
                                    checked={
                                      checkedType.indexOf(value.value) !== -1
                                    }
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                      "aria-labelledby": labelId,
                                    }}
                                    size="small"
                                    sx={checkboxStyle}
                                  />
                                  {value.icon && <value.icon />}
                                  <ListItemText
                                    id={labelId}
                                    primary={`${value.label}`}
                                  />
                                </ListItemButton>
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                    )}
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
            );
          })}
        </Dropdown>
      </div>
      <div className="sortDiv">
        <span className="sortspan">Sort by:</span>
        <Box sx={{ width: 102, position: "relative" }}>
          <FormControl fullWidth>
            <SelectIcon className="selecticon" />
            <NativeSelect
              defaultValue={"all"}
              inputProps={{
                name: "date ",
                id: "uncontrolled-native",
              }}
              onChange={(e) => handleSortDate(e.target.value)}
            >
              <option value={"New date"}>New Date</option>
              <option value={"Old date"}>Old Date</option>
            </NativeSelect>
          </FormControl>
        </Box>
      </div>
    </div>
  );
};

export default TableSort;
