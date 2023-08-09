import {
  Button,
  Dialog,
  Fade,
  MenuItem,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Box, Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import {
  amenitytablefilter,
  menuItemAmenityRequest,
  tableStaticDataAmenity,
} from "@/utils/constant";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import { useState } from "react";
// import { ContentContext } from "@/components/reusable/ServiceList";
import AllAmenityListContent from "~/reusable/dialog/AllListContent";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { columnsReqList } from "@/utils/tableColumn";

const AmenitiesRequestList = () => {
  const [sorttable, setSorttable] = useState(0);
  const [openContent, setOpenContent] = useState<number>();
  const [index, setIndex] = useState<number>();
  const handleClose = () => {
    setOpenContent(0);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [hideMessage, setHideMessage] = useState(false);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (index: number) => {
    setSorttable(index);
  };
  const handleMenuClick = (index: number) => {
    if (index === 5) {
      setHideMessage(true);
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
      setAnchorEl(null);
      return;
    }
    setOpenContent(index);
    setAnchorEl(null);
  };
  const handleClickOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIndex(index);
  };

  return (
    <div>
      {hideMessage && (
        <div className="message_div request">
          <span>Booking link has been copied</span>
        </div>
      )}
      <Container className="requestlist_container">
        <Popper
          id={id}
          open={open}
          anchorEl={anchorEl}
          className="poperaction amenity req"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={500}>
              <Box
                sx={{ bgcolor: "white" }}
                boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
              >
                <div className="popper_arrow"></div>
                {menuItemAmenityRequest.map((item, index) => {
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
        <div className="requestlist">
          <div className="request_header">
            <span>Amenities Requests</span>
            <Button className="btn">
              <AddIcon />
              Add Amenities Request
            </Button>
          </div>
        </div>
        <div className="table_header">
          <div className="sort_div">
            {amenitytablefilter.map((item, index) => {
              return (
                <Button
                  key={index}
                  className={`btn ${sorttable === index ? "activesort" : ""}`}
                  onClick={() => handleClick(index)}
                >
                  {item.label}
                  <div>{item.count}</div>
                </Button>
              );
            })}
          </div>
          <div className="sort_by">
            <span>Sort by:</span>
            <span>
              Date <Arrow />
            </span>
          </div>
        </div>
        <Box
          boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
          borderRadius="10px"
        >
          <TableContainer className="table">
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    padding="checkbox"
                    style={{ borderBottom: "none" }}
                  ></TableCell>
                  {columnsReqList.map((col, index) => (
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
                {tableStaticDataAmenity.map((row, index) => {
                  return (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      //onClick={(event) => handleCheck(event, row.id)}
                    >
                      <TableCell
                        padding="checkbox"
                        style={{ borderBottom: "none" }}
                      ></TableCell>
                      <TableCell style={{ borderBottom: "none" }}>
                        <img src={row.image} alt="image" />
                        {row.tenants}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row.people}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row.selectedperiod}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none" }}
                      >
                        {row.apartment}
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none", position: "relative" }}
                      ></TableCell>
                      <TableCell
                        align="center"
                        style={{ borderBottom: "none", position: "relative" }}
                      >
                        <div
                          className="action"
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
        </Box>
        {!!openContent && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <Dialog
          open={!!openContent}
          //onClose={() => handleClose(false)}
          className="action"
        >
          <AllAmenityListContent />
        </Dialog>
      </Container>
    </div>
  );
};

export default AmenitiesRequestList;
