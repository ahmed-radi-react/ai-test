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
  Paper,
  Popper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as SelectIcon } from "@/assets/icons/select.svg";
import notfoundImg from "@/assets/icons/nodata.png";
import { menuitem } from "@/utils/constant";
import { ITableTenant } from "~/types/types";

import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import ChargeWalletDialog from "./chargewallet/ChargeWalletDialog";
import { useNavigate } from "react-router-dom";
import { columnsTenants } from "@/utils/tableColumn";
import { mutationRequest } from "@/requests-body/queries";
import SkeltonLoad from "~/reusable/loader/SkeltonLoad";
import GeneralTableHead from "~/reusable/GeneralTableComponents/GeneralTableHead";

const TenantsTable = ({
  tenantTable,
  filteredData,
  setFilteredData,
  pending,
  isLoading,
  setSearchVal,
}: ITableTenant) => {
  let time: ReturnType<typeof setTimeout>;
  useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  }, []);
  const [val, setVal] = useState(10);
  const [selected, _] = useState<number[]>([]);

  const isSelected = (name: number) => selected.indexOf(name) !== -1;

  const [selectedId, setSelectedId] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tenantIdrow, setTenantIdrow] = useState("");
  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setTenantIdrow(id);
  };
  const { mutate } = mutationRequest({
    url: "/tenant/status",
    method: "post",
    isAuth: true,
  });
  const [openChargeWallet, setOpenChargeWallet] = useState(0);
  const [tenantData, setTenantData] = useState<any>([]);
  const { mutate: tenantDataReq } = mutationRequest({
    url: `/tenant/${tenantIdrow}`,
    method: "get",
    isAuth: true,
  });
  useEffect(() => {
    tenantDataReq.mutate({});
  }, [tenantIdrow]);

  useEffect(() => {
    if (tenantDataReq.isSuccess) {
      setTenantData(tenantDataReq?.data?.data);
    }
  }, [tenantDataReq.isSuccess]);

  const handleMenuClick = (optionNumber: number) => {
    setAnchorEl(null);
    if (optionNumber === 6) {
      setOpenChargeWallet(optionNumber);
    } else if (optionNumber === 5) {
      mutate.mutate({
        status: pending === "pending" ? "active" : "deactivate",
        userId: selectedId,
      });
      setFilteredData((prev) => {
        return prev.filter((item) => {
          return item._id !== selectedId;
        });
      });
    } else if (optionNumber === 7) {
      mutate.mutate({
        status: "deleted",
        userId: selectedId,
      });
    } else if (optionNumber === 3) {
      navigate("/tenants/addtenant", { state: tenantData });
    }
  };

  useEffect(() => {
    if (mutate.isSuccess) {
      window.location.reload();
    }
  }, [mutate.isSuccess]);

  const handleCloseChargeWalletDialog = () => {
    setOpenChargeWallet(0);
    setConfirmStepOne(false);
    setConfirmStepTwo(false);
    setBalance("");
  };
  const [balance, setBalance] = useState<string>("");
  const [confirmStepOne, setConfirmStepOne] = useState<boolean>(false);
  const [confirmStepTwo, setConfirmStepTwo] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleBalance = (e: string) => {
    setBalance(e);
  };
  const handleConfirmStepOne = () => {
    setConfirmStepOne(true);
  };
  const handleConfirmStepTwo = () => {
    setConfirmStepTwo(true);
  };
  const handleCancel = () => {
    setBalance("");
    handleCloseChargeWalletDialog();
    setConfirmStepOne(false);
    setConfirmStepTwo(false);
  };
  const handleNotifyTalent = () => {};
  const handleConfirmAddBalance = () => {};

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

  return (
    <div style={{ width: "100%" }}>
      <div>
        <Popper
          id={id}
          ref={popperRef}
          open={open}
          anchorEl={anchorEl}
          className="poperaction"
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={500}>
              <Box
                sx={{ bgcolor: "white" }}
                boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
              >
                <div className="popper_arrow arrow-tenant"></div>
                {menuitem.map((item, index) => {
                  return (
                    <MenuItem
                      value=""
                      className="relationshipitem"
                      key={index}
                      onClick={() => {
                        handleMenuClick(index + 1);
                      }}
                    >
                      {index === 4 && pending === "pending"
                        ? "Activate"
                        : item.label}
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
      </div>
      <TableContainer component={Paper} className="table_tenants">
        <div className="sort">
          <FormControl className="formControl">
            <Input
              placeholder="Search"
              className="inputsearch"
              onChange={(e) => {
                time = setTimeout(() => {
                  setSearchVal(e.target.value);
                }, 3000);
              }}
            />
            <SearchIcon />
          </FormControl>
          <div className="sortDiv">
            <span className="sortspan">Sort by:</span>
            <Box sx={{ width: 100, position: "relative" }}>
              <FormControl>
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
                      // SortbyNewestFirst(filteredData, setFilteredData);
                    } else if (e.target.value === 20) {
                      // SortbyOldestFirst(filteredData, setFilteredData);
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

        {!isLoading ? (
          filteredData.length ? (
            <Table aria-label="simple table" stickyHeader>
              <GeneralTableHead columns={columnsTenants} title={"Tenants"} />
              <TableBody>
                {filteredData?.map((row, index: number) => {
                  const isItemSelected = isSelected(index);

                  return (
                    <TableRow
                      key={index}
                      selected={isItemSelected}
                      //onClick={(event) => handleCheck(event, row.id)}
                    >
                      <TableCell>
                        <div>
                          <img src={row?.image?.url} alt="" />
                          <div className="info_tenant">
                            {row?.firstName}
                            <div>
                              <span className="apartment">Apartment </span>
                              <span>{row?.tenantInfo?.apartmentNumber}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        Tower {row?.buildings && row?.buildings[0]?.name}
                      </TableCell>
                      <TableCell align="center">
                        {row?.tenantInfo?.numberOfFamilyMembers}
                      </TableCell>
                      <TableCell align="center">
                        {row?.tenantInfo?.numberOfGuests}
                      </TableCell>
                      <TableCell align="center">
                        {row?.pets?.length > 0
                          ? `${row?.pets?.length} cat`
                          : "not found"}
                      </TableCell>
                      <TableCell align="center">
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              row.cars ??
                              'No Added Cars yet. <span class="add_car">Add</span>',
                          }}
                        ></div>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{ position: "relative" }}
                      >
                        <Button
                          aria-describedby={id}
                          type="button"
                          onClick={(e) => {
                            handleClick(e, row._id);
                            setSelectedId(row._id);
                          }}
                          className="table_action-button"
                        >
                          <Arrow />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="not_found">
              <img src={notfoundImg} alt="not found" />
            </div>
          )
        ) : (
          <>
            <SkeltonLoad />
            <SkeltonLoad />
            <SkeltonLoad />
          </>
        )}
      </TableContainer>
      {!!openChargeWallet && (
        <div className="close" onClick={handleCloseChargeWalletDialog}>
          <Elipse />
          <CloseIcon />
        </div>
      )}
      <Dialog
        open={!!openChargeWallet}
        onClose={handleCloseChargeWalletDialog}
        className="action"
      >
        <DialogContent>
          <ChargeWalletDialog
            handleConfirmAddBalance={handleConfirmAddBalance}
            handleNotifyTalent={handleNotifyTalent}
            confirmStepTwo={confirmStepTwo}
            handleConfirmStepTwo={handleConfirmStepTwo}
            handleCancel={handleCancel}
            handleBalance={handleBalance}
            handleConfirmStepOne={handleConfirmStepOne}
            confirmStepOne={confirmStepOne}
            balance={balance}
            setPassword={setPassword}
            password={password}
            tenantIdrow={tenantIdrow}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TenantsTable;
