import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Fade,
  FormControl,
  Input,
  MenuItem,
  NativeSelect,
  Popper,
  Tooltip,
} from "@mui/material";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/selescticon.svg";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { columnsBellboy } from "@/utils/tableColumn";
import { handleChangeStatus, menuBellboyRequest } from "@/utils/constant";
import { IBellboyReqData } from "~/types/types";
import SelectValetDialog from "~/dashboard/valet/SelectValetDialog"; // check again
import { ReactComponent as MenuCalendar } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TableIcon } from "@/assets/icons/TableIcon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";

import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";

import BellboyDialog from "./BellboyDialog";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";

const BellboyDashboardTable = () => {
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, _] = useState("");
  const [totalRows, setTotalRows] = useState(0);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };
  const { data, isSuccess, isLoading, refetch } = queryRequest({
    url: `/service-request/bellboy?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `bellboyKey+${currentPage}`,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  const [bellboyReqData, setBellboyReqData] = useState<IBellboyReqData[]>([]);
  const [filteredData, setFilteredData] = useState<IBellboyReqData[]>([]);
  useEffect(() => {
    if (isSuccess) {
      setTotalRows(data?.data?.count);
      setBellboyReqData(data?.data?.items);
      setFilteredData(data?.data?.items);
    }
  }, [isSuccess, data]);
  const handleHeaderFilter = (value: any) => {
    let matches = bellboyReqData.filter((object) => {
      return (
        (object?.owner?.firstName &&
          object?.owner?.firstName
            .toLowerCase()
            .includes(value.toLowerCase())) ||
        (object?.owner.tenantInfo &&
          object?.owner?.tenantInfo?.apartmentNumber
            ?.toLowerCase()
            .includes(value.toLowerCase())) ||
        // object?.building?.toLowerCase().includes(value.toLowerCase()) ||
        moment(object?.scheduleDateFrom)
          ?.format("ddd MMM DD HH:mm:ss")
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        object?.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(matches);
  };

  const handleSortDate = (label: string) => {
    const sortedDataCopy = [...filteredData];
    setFilteredData(
      sortedDataCopy.sort((date1, date2) => {
        if (label === "Old date") {
          return (
            Date.parse(date1.scheduleDateFrom.split("T")[0]) -
            Date.parse(date2.scheduleDateFrom.split("T")[0])
          );
        } else {
          return (
            Date.parse(date2.scheduleDateFrom.split("T")[0]) -
            Date.parse(date1.scheduleDateFrom.split("T")[0])
          );
        }
      })
    );
  };

  const [requestId, setRequestid] = useState<any>();
  const { mutate } = mutationRequest({
    url: "/service-request/bellboy/status",
    method: "post",
    isAuth: true,
  });
  const [loadingStatus, setLoadingStatus] = useState("");

  // const { mutate: { mutate: assignBellboy } } = mutationRequest(
  //   `/service-request/bellboy/`,
  //   "post",
  //   true
  // );
  const [index, setIndex] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openvaletreq, setOpenvaletreq] = useState(false);
  const handleClose = () => {
    setOpenvaletreq(false);
  };
  const handleClosePoper = () => {
    setAnchorEl(null);
  };
  const popperRef = useRef<HTMLDivElement>(null);
  const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
    if (
      popperRef.current &&
      !popperRef.current.contains(event.target as Node)
    ) {
      handleClosePoper();
    }
  };
  const [hideMessage, setHideMessage] = useState(false);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  const handleMenuClick = (index: number) => {
    if (index === 1) {
      setOpenvaletreq(true);
      // assignBellboy({})
    }
    if (index === 2) {
      setHideMessage(true);
      setTimeout(() => {
        setHideMessage(false);
      }, 3000);
      setAnchorEl(null);
      return;
    }
    setAnchorEl(null);
  };
  const handleClickOpen = (
    event: React.MouseEvent<HTMLElement>,
    index: string
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setIndex(index);
  };
  const [changeCalendar, setChangeCalendar] = useState(false);
  const handleClickCalendar = () => {
    setChangeCalendar((prev) => !prev);
  };

  const [openReq, setOpen] = useState(false);
  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });
  return (
    <Box
      boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
      borderRadius="10px"
      className="bellboy_table"
    >
      <div className="sort">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "22px",
          }}
        >
          <FormControl className="formControl">
            <Input
              placeholder="Search"
              className="inputsearch"
              onChange={(e) => handleHeaderFilter(e.target.value)}
            />
            <SearchIcon />
          </FormControl>
          <div className="sortDiv">
            <span className="sortspan">Sort by:</span>
            <Box sx={{ position: "relative" }}>
              <FormControl fullWidth>
                <SelectIcon className="selecticon" />
                <NativeSelect
                  defaultValue={"New date"}
                  inputProps={{
                    name: "date ",
                    id: "uncontrolled-native",
                  }}
                  onChange={(e) => handleSortDate(e.target.value)}
                >
                  <option value={"New date"}>Sort Newest to Oldest</option>
                  <option value={"Old date"}>Sort Oldest to Newest</option>
                </NativeSelect>
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
              }}
              onClick={() => setOpen(true)}
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
      <GeneralTable
        columns={columnsBellboy}
        totalRows={totalRows}
        rows={bellboyReqData}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        additionalInfo={{
          setRequestid,
          loadingStatus,
          setLoadingStatus,
          handleChangeStatus: handleChangeStatus({
            data: bellboyReqData,
            setLoadingStatus,
            requestId,
            mutate,
            setRequestid,
            refetch,
          }),
          hideMessage,
          setHideMessage,
          changeCalendar,
          requestId,
          handleMenuClick,
          isLoadingServicesReq: isLoading,
          setOpen,
          handleClickOpen,
        }}
        title="bellboy"
        limitPerPage={limitPerPage}
        changePageLimit={changePageLimit}
      />
      <Dialog open={openvaletreq} onClose={handleClose} className="action">
        <DialogContent>
          <SelectValetDialog title="Bellboy" />
        </DialogContent>
      </Dialog>
      {!!open && (
        <div className="close" onClick={handleClose}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog open={openReq} className="bellboy_req" onClose={handleClose}>
        <DialogContent className="bellboy_req">
          <BellboyDialog
            setOpen={setOpen}
            setMessageSort={setMessageSort}
            setHideMessage={setHideMessage}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BellboyDashboardTable;
