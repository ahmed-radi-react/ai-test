import { FC } from "react";
import Dropdown from "react-multilevel-dropdown";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";

import {
  Checkbox,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import { checkboxStyle, filterParcelType, statuses } from "@/utils/constant";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TSortHedaerDropdownProps } from "~/types/types";
import { useLocation } from "react-router-dom";

export const SortHeaderDropdown: FC<TSortHedaerDropdownProps> = ({
  title,
  buildingsName,
  setCheckedDate,
  checkedDate,
  checkedItems,
  setCheckedItems,
  refetchData,
}) => {
  const handleCheckboxChange = (value: string, label: string) => {
    refetchData && refetchData();
    if (label === "status") {
      setCheckedItems &&
        setCheckedItems((prev) => {
          return { ...prev, status: value };
        });
    }
    if (label === "building") {
      setCheckedItems &&
        setCheckedItems((prev) => {
          const newBuildingValue = prev.building === value ? "" : value;
          return { ...prev, building: newBuildingValue };
        });
    }
  };

  const location = useLocation();

  return (
    <>
      {title === "Home" ? (
        <>
          <Dropdown
            title={<SettingIcon />}
            buttonClassName="button_dropdown_list_multi_levels_home"
            menuClassName="menu_dropdown_list_multi_levels_home"
            position="right"
          >
            {!location.pathname.includes("home") && (
              <Dropdown.Item>
                Type
                <Dropdown.Submenu position="right">
                  <Dropdown.Item className="inner_list">
                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                      {filterParcelType.map((value, id) => {
                        const labelId = `checkbox-list-label-${value}`;
                        return (
                          <ListItem key={id} disablePadding>
                            <ListItemButton
                              sx={{ padding: "0 10px" }}
                              role={undefined}
                              // onClick={handleToggleType(
                              //   "type",
                              //   value.filterVal
                              // )}
                              dense
                            >
                              <Checkbox
                                edge="start"
                                // checked={
                                //   checkedType.type === value.filterVal
                                //     ? true
                                //     : false
                                // }
                                tabIndex={-1}
                                disableRipple
                                inputProps={{
                                  "aria-labelledby": labelId,
                                }}
                                size="small"
                                sx={checkboxStyle}
                              />

                              <ListItemText
                                id={labelId}
                                primary={`${value.label}`}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  </Dropdown.Item>
                </Dropdown.Submenu>
              </Dropdown.Item>
            )}

            <Dropdown.Item>
              Building
              <Dropdown.Submenu position="right">
                <Dropdown.Item className="inner_list">
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {buildingsName?.map((value, id) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem key={id} disablePadding>
                          <ListItemButton
                            sx={{ padding: "0 10px" }}
                            role={undefined}
                            // onClick={handleToggleBuilding(value)}
                            dense
                          >
                            <Checkbox
                              edge="start"
                              // checked={
                              //   checkedBuilding.indexOf(value) !== -1
                              // }
                              tabIndex={-1}
                              disableRipple
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              size="small"
                              sx={checkboxStyle}
                              checked={value.id === checkedItems?.building}
                              onChange={() =>
                                handleCheckboxChange(value.id, "building")
                              }
                            />

                            <ListItemText id={labelId} primary={value.name} />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  {/*  */}
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>

            <Dropdown.Item>
              Date
              <Dropdown.Submenu position="right">
                <Dropdown.Item className="inner_list date">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <StaticDatePicker
                      displayStaticWrapperAs="desktop"
                      onChange={setCheckedDate}
                      renderInput={() => <TextField />}
                      value={checkedDate}
                      disablePast
                      showDaysOutsideCurrentMonth
                    />
                  </LocalizationProvider>
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>

            <Dropdown.Item>
              Status
              <Dropdown.Submenu position="right">
                <Dropdown.Item className="inner_list">
                  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                    {statuses.map((value, id) => {
                      const labelId = `checkbox-list-label-${value}`;

                      return (
                        <ListItem
                          key={id}
                          disablePadding
                          className="status_dropdown_hovered"
                        >
                          <ListItemButton
                            sx={{ padding: "0 10px" }}
                            role={undefined}
                            dense
                          >
                            <Checkbox
                              edge="start"
                              tabIndex={-1}
                              disableRipple
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                              size="small"
                              sx={checkboxStyle}
                              checked={value.value === checkedItems?.status}
                              onChange={() =>
                                handleCheckboxChange(value.value, "status")
                              }
                            />
                            {/*
                            <Box
                              sx={{
                                marginRight: "10px",
                                lineHeight: "10px",
                              }}
                            >
                              {<value.icon />}
                            </Box> */}
                            <ListItemText
                              id={labelId}
                              primary={`${
                                value.label.charAt(0).toUpperCase() +
                                value.label.slice(1)
                              }`}
                            />
                          </ListItemButton>
                        </ListItem>
                      );
                    })}
                  </List>
                  {/*  */}
                </Dropdown.Item>
              </Dropdown.Submenu>
            </Dropdown.Item>
          </Dropdown>
        </>
      ) : null}
    </>
  );
};
