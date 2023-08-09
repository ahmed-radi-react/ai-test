import {
  Box,
  ClickAwayListener,
  Fade,
  FormControl,
  Input,
  MenuItem,
  NativeSelect,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { menuitemDialogServices } from "@/utils/constant";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SettingIcon } from "@/assets/icons/parcelSetIcon.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import image from "@/assets/images/question.png";
import { useEffect, useRef, useState } from "react";
import SkeltonLoad from "./loader/SkeltonLoad";
import nodata from "@/assets/icons/nodata.png";
interface ICol {
  columns?: any[];
  classname?: string;
  data?: any[];
  setSearchVal?: React.Dispatch<React.SetStateAction<string>>;
  isLoading?: boolean;
}

const ManagementTable = ({
  columns,
  classname,
  data,
  setSearchVal,
  isLoading,
}: ICol) => {
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [index, setIndex] = useState<number>();
  const handleClickOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIndex(index);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const handleMenuClick = (index: number) => {};

  const popperRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      popperRef.current &&
      !popperRef.current.contains(event.target as Node)
    ) {
      handleClose();
    }
  };
  return (
    <Box
      boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
      borderRadius="10px"
      bgcolor={"white"}
    >
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        className={`poperaction req amenity service ${
          anchorEl === null ? "dialog_li" : ""
        }`}
        transition
        ref={popperRef}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Box
              sx={{ bgcolor: "white" }}
              boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
            >
              <div className="popper_arrow"></div>
              {menuitemDialogServices.map((item, index) => {
                return (
                  <MenuItem
                    value=""
                    className="relationshipitem"
                    key={index}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.label}
                  </MenuItem>
                );
              })}
            </Box>
          </Fade>
        )}
      </Popper>
      {anchorEl && (
        <ClickAwayListener onClickAway={handleOutsideClick}>
          <div />
        </ClickAwayListener>
      )}
      <div className="service_management_form">
        <div className="search">
          <FormControl className="formControl">
            <Input
              placeholder="Search"
              className="inputsearch"
              onChange={(e) => {
                if (setSearchVal) {
                  time = setTimeout(() => {
                    setSearchVal(e.target.value);
                  }, 3000);
                }
              }}
            />
            <SearchIcon />
          </FormControl>
          <SettingIcon />
        </div>

        <div className="sortDivmanagementTable">
          <span className="sortspan">Sort by:</span>
          <Box sx={{ width: 67, position: "relative" }}>
            <FormControl fullWidth>
              <SelectIcon className="selecticon" />
              <NativeSelect
                defaultValue={"all"}
                inputProps={{
                  name: "date ",
                  id: "uncontrolled-native",
                }}
                // onChange={(e) => handleSortDate(e.target.value)}
              >
                {/* <option value={'All'}>All</option> */}
                <option value={"New date"}>New Date</option>
                <option value={"Old date"}>Old Date</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </div>
      </div>
      {!isLoading ? (
        data && data.length >= 1 ? (
          <TableContainer className={`table table_service ${classname}`}>
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  {columns?.map((col, index) => (
                    <TableCell
                      key={index}
                      align={col.align || "center"}
                      style={{ borderBottom: "none" }}
                    >
                      {col.headerName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.map((row: any, index: number) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell style={{ borderBottom: "none" }}>
                        {location.pathname.includes("user") && (
                          <img src={row?.image?.url || image} alt="image" />
                        )}
                        {location.pathname.includes("user") && (
                          <span className="line_clam"> {row?.firstName}</span>
                        )}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row?.buildings && !!row?.buildings.length
                          ? row?.buildings[0]?.name
                          : "not has building"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row?.role?.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {"Online"}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row?.status == "waitingForAdminApproval" ? (
                          <span className="action_Pending">Pending</span>
                        ) : row?.status === "active" ? (
                          <span className="action_active">Active</span>
                        ) : (
                          <span className="action_Inactive">Inactive</span>
                        )}
                      </TableCell>
                      {location.pathname.includes("service") && (
                        <TableCell
                          align="center"
                          style={{ borderBottom: "none", position: "relative" }}
                        >
                          {row?.numberOfRequests} New Request
                        </TableCell>
                      )}
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none", position: "relative" }}
                      >
                        <div
                          className="action action_service"
                          onClick={(e) => handleClickOpen(e, row.id)}
                        >
                          <Arrow />
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <div className="no_data building_data">
            <img src={nodata} alt="no data" />
          </div>
        )
      ) : (
        <SkeltonLoad />
      )}
    </Box>
  );
};

export default ManagementTable;
