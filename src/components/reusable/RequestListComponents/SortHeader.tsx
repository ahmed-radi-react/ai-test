import {
  Box,
  Button,
  FormControl,
  Input,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import { ReactComponent as MenuCalendar } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TableIcon } from "@/assets/icons/TableIcon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { SortHeaderDropdown } from "./SortHeaderDropdown";
import { IData, TEachService, TSortHeaderProps } from "../../types/types";
import { SortbyNewestFirst, SortbyOldestFirst } from "@/utils/helpers";
import { maintenance } from "@/utils/constant";

export const SortHeader: FC<TSortHeaderProps> = ({
  changeCalendar,
  url,
  handleClickCalendar,
  setOpenReq,
  title,
  buildingsName,
  setCheckedDate,
  checkedDate,
  setSearchValue,
  refetchData,
  servicedData,
  setServicesData,
  checkedItems,
  setCheckedItems,
}) => {
  const [val, setVal] = useState(10);
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);

  const handleSearch =(e:ChangeEvent<HTMLInputElement>)=>{
    if (setSearchValue) {
      // setServicesData([])
      time = setTimeout(() => {
        setSearchValue(e.target.value);
        // refetchData();
      }, 3000);
    }
  }
  return (
    <div className="sort_header">
      <div className="sort">
        <FormControl className="formControl">
          <Input
            placeholder="Search"
            className="inputsearch"
            onChange={handleSearch  }
          />
          <SearchIcon />
        </FormControl>
        <SortHeaderDropdown
          setCheckedDate={setCheckedDate}
          checkedDate={checkedDate}
          buildingsName={buildingsName}
          title={title}
          checkedItems={checkedItems}
          setCheckedItems={setCheckedItems}
          refetchData={refetchData}
        />
        {!changeCalendar ? (
          <div className="sortDiv">
            <span className="sortspan">Sort by:</span>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <Select
                  defaultValue={10}
                  inputProps={{
                    name: "date ",
                    id: "uncontrolled-native",
                  }}
                  IconComponent={(props) => (
                    <SelectIcon {...props} className="icon_select" />
                  )}
                  onChange={(e) => {
                    setVal(e.target.value as number);
                    if (e.target.value === 10) {
                      SortbyNewestFirst(servicedData,setServicesData);
                    } else if (e.target.value === 20) {
                      SortbyOldestFirst(servicedData,setServicesData);
                    }
                  }}
                  value={val}
                >
                  <MenuItem value={10}>Sort Oldest to Newest</MenuItem>
                  <MenuItem value={20}>Sort Newest to Oldest</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
        ) : (
          <div className="weekly_monthly_btn"></div>
        )}
      </div>
      {(url === "amenity" || url === maintenance) && (
        <>
          <Button
            variant="contained"
            className="btn_calendar"
            onClick={handleClickCalendar}
          >
            {!changeCalendar ? (
              <>
                <MenuCalendar />
                Switch to Calendar view
              </>
            ) : (
              <>
                <TableIcon />
                Switch to Table view
              </>
            )}
          </Button>
          {/* position: absolute; right: 231px; width: 22px; cursor: pointer;
        height: 22px; fill: black; opacity: 0.6; */}
          {changeCalendar ? (
            <Tooltip
              title={`Add Request`}
              arrow
              // open={showTooltip && row?._id === requestId}
              className="tooltip_table"
              // disableInteractive
              placement="top"
              // open={true}
            >
              <div
                style={{
                  position: "absolute",
                  right: "230px",

                  cursor: "pointer",
                  fill: "black",
                  // opacity: "0.6",
                }}
                onClick={() => setOpenReq(true)}
              >
                <AddIcon
                  style={{
                    width: "24px",
                    height: "24px",
                  }}
                />
              </div>
            </Tooltip>
          ) : null}
        </>
      )}
    </div>
  );
};
