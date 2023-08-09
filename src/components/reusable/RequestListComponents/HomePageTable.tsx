import { CircularProgress, TableCell, TableRow } from "@mui/material";
import moment from "moment";
import React, { FC } from "react";
import Status from "../Status";
import { THomePageTable } from "~/types/types";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import { amenities } from "@/utils/constant";

export const HomePageTable: FC<THomePageTable> = ({
  servicedData,
  setShowTooltip,
  setRequestid,
  handleChangeStatus,
  isLoadingServicesReq,
}) => {
  return (
    <>
      {servicedData?.map((row, index: number) => {
        return (
          <TableRow
            key={index}
            sx={{
              "&:last-child td, &:last-child th": { border: 0 },
            }}
            //onClick={(event) => handleCheck(event, row.id)}
          >
            <>
              <TableCell
                padding="checkbox"
                style={{ borderBottom: "none" }}
              ></TableCell>
              <TableCell padding="checkbox" style={{ borderBottom: "none" }}>
                <div className="tenant_info_div">
                  <img
                    src={row?.owner?.image?.url}
                    alt={row?.owner?.image?.alt}
                    style={{ borderRadius: "20px" }}
                  />
                  <div>
                    <span> {row?.owner?.firstName}</span>
                    <span className="span_child">
                      Apartment <b>{row?.owner?.tenantInfo?.apartmentNumber}</b>
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell align="center" style={{ borderBottom: "none" }}>
                {row?.service?.name}
              </TableCell>
              <TableCell align="center" style={{ borderBottom: "none" }}>
                {row?.building?.name ? row?.building?.name : "-"}
              </TableCell>
              <TableCell align="center" style={{ borderBottom: "none" }}>
                <div className="arrivedate arrive_table">
                  <span
                    className="arrive"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                      width: "max-content",
                    }}
                  >
                    {moment(row.scheduleDateTo).format("ddd, ll")}
                    {moment(row.scheduleDateTo).format(" [At] hh:mm a")}
                  </span>
                  <span className="arrive time"></span>
                </div>
              </TableCell>

              <TableCell
                align="center"
                style={{ borderBottom: "none" }}
                onMouseEnter={(event) => {
                  setShowTooltip(true);
                  // setTooltipPosition({
                  //   x: event.pageX + 60,
                  //   y: event.pageY - 360,
                  // });
                  setRequestid(row?._id);
                }}
                onMouseLeave={(e) => {
                  setShowTooltip(false);
                }}
              >
                <Status
                  status={row?.status ? row?.status : ""}
                  showIcon={true}
                  page={`${amenities}`}
                  handleChangeStatus={handleChangeStatus}
                />
              </TableCell>
              <TableCell
                align="center"
                style={{
                  borderBottom: "none",
                  position: "relative",
                }}
              >
                <div className="action">
                  <Arrow />
                </div>
              </TableCell>
            </>
          </TableRow>
        );
      })}
    </>
  );
};
