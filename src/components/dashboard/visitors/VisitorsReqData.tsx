import { FunctionComponent, SVGProps, useRef, useState } from "react";
import { mutationRequest } from "@/requests-body/queries";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import notfoundImg from "@/assets/icons/nodata.png";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  FormControl,
  Input,
  MenuItem,
  Select,
  Tooltip,
} from "@mui/material";
import { columnsVisitor } from "@/utils/tableColumn";
import { ReactComponent as CopyIcon } from "@/assets/icons/CopySvg.svg";
import MessageAlert from "~/reusable/MessageAlert";
import { ReactComponent as MenuCalendar } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TableIcon } from "@/assets/icons/TableIcon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";

import VisitorRequestDialog from "./VisitorRequestDialog";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { IUrl } from "~/types/types";
import VisitorReNotifyTenant from "./VisitorReNotifyTenant";
import { SortbyNewestFirst, SortbyOldestFirst } from "@/utils/helpers";
import GeneralTable from "~/reusable/GeneralTable";
import { handleChangeStatus } from "@/utils/constant";

const VisitorsReqData = ({
  visitorData,
  open,
  setOpen,
  setSearchVal,
  data,
  setVisitorData,
  searchVal,
  sorttable,
  totalRows,
  currentPage,
  handlePageChange,
  isLoading,
  limitPerPage,
  changePageLimit,
  visitorOTP,
  setVisitorOTP,
}: IUrl) => {
  const [val, setVal] = useState(10);
  const { mutate } = mutationRequest({
    url: `/service-request/visitor/status`,
    method: "post",
    isAuth: true,
  });
  const [requestId, setRequestid] = useState<any>();
  const [loadingStatus, setLoadingStatus] = useState("");

  const [hideMessage, setHideMessage] = useState(false);
  const [messagesort, setMessageSort] = useState({
    icon: CopyIcon,
    message: "",
    title: "",
    style: "",
  });
  const handleShowAlert = (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => {
    setHideMessage(true);
    setMessageSort({
      icon,
      message,
      title,
      style,
    });
    const time = setTimeout(() => {
      if (setHideMessage) {
        setHideMessage(false);
      }
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  };
  const dropdownRef = useRef<any>();
  const closeDropdown = () => {
    const dropdownElement = dropdownRef.current;
    if (dropdownElement && dropdownElement?.toggle) {
      dropdownElement?.toggle();
    }
  };
  const [changeCalendar, setChangeCalendar] = useState(false);
  const handleClickCalendar = () => {
    setChangeCalendar((prev) => !prev);
  };

  const handleClose = () => {
    setOpenVisitor(false);
  };
  const [openVisitor, setOpenVisitor] = useState(false);

  const handleCloseTableListDialog = () => {
    if (setOpen) {
      setOpen(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearchVal) {
      setSearchVal(e.target.value);
    }
  };
  return (
    <Box
      boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
      borderRadius="10px"
    >
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      <div className="sort" style={{ position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <div className="search_setting">
            <FormControl className="formControl">
              <Input
                placeholder="Search"
                className="inputsearch"
                onChange={handleChange}
              />
              <SearchIcon />
            </FormControl>
          </div>
          <div className="sortDiv">
            <span className="sortspan">Sort by:</span>
            <Box sx={{ position: "relative" }}>
              <FormControl className="sort_date_select">
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
                      SortbyNewestFirst(visitorData, setVisitorData);
                    } else if (e.target.value === 20) {
                      SortbyOldestFirst(visitorData, setVisitorData);
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
        </div>

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
        {changeCalendar ? (
          <Tooltip
            title={`Add Request`}
            arrow
            className="tooltip_table"
            placement="top"
          >
            <div
              style={{
                position: "absolute",
                right: "230px",

                cursor: "pointer",
                fill: "black",
                top: "20px",
                // opacity: "0.6",
              }}
              onClick={() => setOpenVisitor(true)}
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
      </div>
      <Container className={`requestlist_container req_dashboard`}>
        <Box
          boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
          borderRadius="10px"
          className="box_calendar"
        >
          <GeneralTable
            columns={columnsVisitor}
            totalRows={totalRows}
            rows={visitorData}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            additionalInfo={{
              setRequestid,
              loadingStatus,
              setLoadingStatus,
              handleChangeStatus: handleChangeStatus({
                data: visitorData,
                setLoadingStatus,
                requestId,
                mutate,
                setRequestid,
                key: `requestVisitorKey+${currentPage}`,
              }),
              setHideMessage,
              hideMessage,
              changeCalendar,
              requestId,
              isLoadingServicesReq: isLoading,
              dropdownRef,
              setOpen,
              handleShowAlert,
              closeDropdown,
              visitorOTP,
              setVisitorOTP,
            }}
            limitPerPage={limitPerPage}
            changePageLimit={changePageLimit}
            title="visitors"
          />
        </Box>
      </Container>

      {data?.data?.count < 1 && (
        <div className="not_found">
          <img src={notfoundImg} alt="not found" />
        </div>
      )}
      {!!openVisitor && (
        <div className="close" onClick={handleClose}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog open={openVisitor} onClose={handleClose} className="action">
        <DialogContent>
          <VisitorRequestDialog
            handleClose={handleClose}
            handleShowAlert={handleShowAlert}
            setOpenVisitor={setOpenVisitor}
          />
        </DialogContent>
      </Dialog>
      {!!open && (
        <div className="close" onClick={handleCloseTableListDialog}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog
        open={open as boolean}
        onClose={handleCloseTableListDialog}
        className="action"
      >
        <DialogContent>
          <VisitorReNotifyTenant
            handleShowAlert={handleShowAlert}
            handleCloseTableListDialog={handleCloseTableListDialog}
            type="otp"
            searchVal={searchVal}
            sorttable={sorttable}
            visitorOTP={visitorOTP}
            setVisitorOTP={setVisitorOTP}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VisitorsReqData;
