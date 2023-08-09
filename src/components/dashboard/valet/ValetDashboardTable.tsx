import {
  Button,
  Checkbox,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Fade,
  FormControl,
  Input,
  MenuItem,
  NativeSelect,
  Popper,
  Select,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Box } from "@mui/system";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/selescticon.svg";
import { handleChangeStatus } from "@/utils/constant";
import { useEffect, useRef, useState } from "react";
import SelectValetDialog from "./SelectValetDialog";
import { mutationRequest, queryRequest } from "@/requests-body/queries";
import { columnsValet } from "@/utils/tableColumn";

import { IValetDashboardProps, IValetData } from "~/types/types";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { ReactComponent as MenuCalendar } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TableIcon } from "@/assets/icons/TableIcon.svg";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import ValetDialog from "./ValetDialog";
import { SortbyNewestFirst, SortbyOldestFirst } from "@/utils/helpers";
import GeneralTable from "~/reusable/GeneralTable";
import useControlPagination from "@/hooks/useControlPagination";

const ValetDashboardTable = ({
  setHideMessage,
  setMessageSort,
  hideMessage,
}: IValetDashboardProps) => {
  const { currentPage, handlePageChange } = useControlPagination();
  const [serviceSearch, setServiceSearch] = useState("");
  const [limitPerPage, setLimitPerPage] = useState(10);
  const changePageLimit = (limit: number) => {
    setLimitPerPage(limit);
    handlePageChange(event, 1);
  };
  const {
    data: valetOverviewReq,
    isSuccess: valetOverviewReqIsSuccess,
    isLoading,
    refetch,
  } = queryRequest({
    url: `/service-request/valet?offset=${currentPage}&limit=${limitPerPage}&searchKey=${serviceSearch}`,
    method: "get",
    key: `valetKey + ${currentPage}`,
  });
  useEffect(() => {
    refetch();
  }, [limitPerPage]);
  const [totalRows, setTotalRows] = useState(0);

  const [val, setVal] = useState(10);
  const [valetData, setValetData] = useState<IValetData[]>([]);
  const [filteredData, setFilteredData] = useState<IValetData[]>([]);
  useEffect(() => {
    if (valetOverviewReqIsSuccess) {
      setValetData(valetOverviewReq?.data?.items);
      setFilteredData(valetOverviewReq?.data?.items);
      setTotalRows(valetOverviewReq?.data?.count);
    }
  }, [valetOverviewReqIsSuccess, valetOverviewReq]);
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

  const [_, setIndex] = useState<string>("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (index: number) => {
    if (index === 1) {
      setOpenvaletreq(true);
    }
    if (index === 2) {
      setHideMessage && setHideMessage(true);
      setTimeout(() => {
        setHideMessage && setHideMessage(false);
      }, 3000);
      setAnchorEl(null);
      setMessageSort &&
        setMessageSort({
          title: "Copied",
          message: "Car link has been copied",
          style: "copy",
          icon: CongratsIcon,
        });
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

  const handleHeaderFilter = (value: any) => {
    let matches = valetData.filter((object) => {
      return (
        (object?.owner?.firstName &&
          object?.owner?.firstName
            .toLowerCase()
            .includes(value.toLowerCase())) ||
        // object?.building && object?.building?.toLowerCase().includes(value.toLowerCase()) ||
        (object?.owner?.tenantInfo &&
          object?.owner?.tenantInfo?.apartmentNumber
            ?.toLowerCase()
            .includes(value.toLowerCase())) ||
        object?.car?.name?.toLowerCase().includes(value.toLowerCase()) ||
        object?.status.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredData(matches);
  };

  // const handleSortDate = (label: string) => {
  //   const sortedDataCopy = [...filteredData];
  //   setFilteredData(
  //     sortedDataCopy.sort((date1, date2) => {
  //       if (label === "Old date") {
  //         return (
  //           Date.parse(date1.scheduleDateFrom.split("T")[0]) -
  //           Date.parse(date2.scheduleDateFrom.split("T")[0])
  //         );
  //       } else {
  //         return (
  //           Date.parse(date2.scheduleDateFrom.split("T")[0]) -
  //           Date.parse(date1.scheduleDateFrom.split("T")[0])
  //         );
  //       }
  //     })
  //   );
  // };

  const [requestId, setRequestid] = useState<any>();
  const { mutate } = mutationRequest({
    url: `/service-request/valet/status`,
    method: "post",
    isAuth: true,
  });
  const [loadingStatus, setLoadingStatus] = useState("");

  const [changeCalendar, setChangeCalendar] = useState(false);
  const handleClickCalendar = () => {
    setChangeCalendar((prev) => !prev);
  };
  const [openReq, setOpen] = useState(false);

  const handleCloseReq = () => {
    setOpen(false);
  };

  return (
    <Box
      boxShadow={" 0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
      borderRadius="10px"
      className="_table"
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
                      SortbyNewestFirst(valetData, setValetData);
                    } else if (e.target.value === 20) {
                      SortbyOldestFirst(valetData, setValetData);
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
                top: "20px",
                // opacity: "0.6",
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
        columns={columnsValet}
        totalRows={totalRows as number}
        rows={valetData}
        currentPage={currentPage as number}
        handlePageChange={
          handlePageChange as (event: any, page: number) => void
        }
        additionalInfo={{
          setRequestid,
          loadingStatus,
          setLoadingStatus,
          handleChangeStatus: handleChangeStatus({
            data: filteredData,
            setLoadingStatus,
            requestId,
            mutate,
            setRequestid,
            key: `requestVisitorKey+${filteredData.length}`,
          }),
          hideMessage,
          setHideMessage,
          changeCalendar,
          requestId,
          handleMenuClick,
          isLoadingServicesReq: isLoading as boolean,
          setOpen,
          handleClickOpen,
        }}
        limitPerPage={limitPerPage}
        changePageLimit={changePageLimit}
        title="bellboy"
      />
      <Dialog open={openvaletreq} onClose={handleClose} className="action">
        <DialogContent>
          <SelectValetDialog title="Valet" />
        </DialogContent>
      </Dialog>
      {!!openReq && (
        <div className="close" onClick={handleClose}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog open={openReq} className="bellboy_req" onClose={handleCloseReq}>
        <DialogContent className="bellboy_req">
          <ValetDialog
            setOpen={setOpen}
            setMessageSort={setMessageSort}
            setHideMessage={setHideMessage}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ValetDashboardTable;
