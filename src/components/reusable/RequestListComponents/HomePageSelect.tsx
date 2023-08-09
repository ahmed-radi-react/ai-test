import { Box, MenuItem, Select } from "@mui/material";
import { FC } from "react";
import { THomePageSelectProps } from "~/types/types";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow_to_up.svg";
import { ReactComponent as CloseDiv } from "@/assets/icons/closeDiv.svg";
import { selectStyleParcel } from "@/utils/constant";
import { ReactComponent as CancelIcon } from "@/assets/icons/status_cancelled_icon.svg";
import { ReactComponent as WarningIcon } from "@/assets/icons/warning.svg";
import { ReactComponent as WaitingRespIcon } from "@/assets/icons/waiting_resp_icon.svg";
import { ReactComponent as SendToAprtIcon } from "@/assets/icons/send_to_aprt_icon.svg";

const HomePageSelect: FC<THomePageSelectProps> = ({
  setHomePageSorttable,
  services,
  statusses,
}) => {
  return (
    <>
      <Box className="home_page_select">
        <Select
          labelId="select-option-label4"
          id="select-option-2"
          value={"defaultValue"}
          onChange={(e) => {
            const value = e?.target?.value;
            setHomePageSorttable &&
              services &&
              setHomePageSorttable(
                services?.find((val) => val?.flow === value)?.flow
              );
          }}
          IconComponent={(props) =>
            true ? (
              <ArrowIcon
                style={{
                  width: "11px",
                  height: "11px",
                  right: "16.42px",
                  top: "12px",
                }}
                {...props}
              />
            ) : (
              <CloseDiv
                className="arrow_icon_close"
                // onClick={() => setSelectedBuilding("")}
              />
            )
          }
          className="select"
          sx={{
            ...selectStyleParcel,
            "& .MuiSelect-select.MuiSelect-select": {
              padding: "0",
              fontSize: "12px",
              backgroundColor: "#FBFBFB",
              "&:focus": {
                backgroundColor: "#FBFBFB",
              },
            },
          }}
        >
          <MenuItem value="defaultValue" disabled>
            Select Service
          </MenuItem>
          {statusses?.map((item) => {
            return (
              <MenuItem key={item.id} value={item?.title}>
                <div className={`${item?.status}_icon`}>
                  {(item?.status === "pending" && <WarningIcon />) ||
                    (item?.status === "cancelled" && <CancelIcon />) ||
                    (item?.status === "booked" && <SendToAprtIcon />) ||
                    (item?.status === "requested" && <WaitingRespIcon />)}
                </div>
                {item?.title}
              </MenuItem>
            );
          })}
          {services?.map((item: any) => {
            return (
              <MenuItem key={item._id} value={item?.flow}>
                {item?.name}
              </MenuItem>
            );
          })}
        </Select>
      </Box>
    </>
  );
};

export default HomePageSelect;
