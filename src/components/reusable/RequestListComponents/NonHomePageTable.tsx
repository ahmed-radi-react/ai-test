import { TableCell, TableRow, Tooltip } from "@mui/material";
import { FC } from "react";
import moment from "moment";
import {
  amenities,
  maintenance,
  menuItemAmenityRequest,
} from "@/utils/constant";
import Status from "../Status";
import { ReactComponent as FeedBackIcon } from "@/assets/icons/mantenance.svg";
import { ReactComponent as NoFeedBackIcon } from "@/assets/icons/NoFeedback.svg";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";

import Dropdown from "react-multilevel-dropdown";
import { NonHomeType } from "~/types/types";
import { selectDateTime } from "@/utils/helpers";

const NonHomePageTable: FC<NonHomeType> = ({
  filteredData,
  sorttable,
  value,
  title,
  setAttachment,
  setIndex,
  setShowTooltip,
  showTooltip,
  setRequestid,
  loadingStatus,
  handleChangeStatus,
  setFeedBackOpen,
  setSelectedFeedBack,
  showTooltipFeedBack,
  setShowTooltipFeedBack,
  handleMenuClick,
  isLoading,
}) => {
  return (
    <>
      {filteredData?.map((row, index) => {
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
              {sorttable === "All" &&
                row?.service?.name &&
                title === "Maintenance" && (
                  <TableCell
                    padding="checkbox"
                    style={{ borderBottom: "none" }}
                  >
                    <div className="service_name_col">
                      {" "}
                      {row?.service?.name}
                    </div>
                  </TableCell>
                )}
              <TableCell
                style={{
                  borderBottom: "none",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span>{row?.code || "-"}</span>
                </div>
              </TableCell>
              <TableCell style={{ borderBottom: "none" }}>
                <div className="tenant_info_service">
                  <img src={row?.owner?.image?.url} alt="image" />
                  {row?.owner?.firstName}
                </div>
              </TableCell>
              {
                <TableCell
                  style={{
                    borderBottom: "none",
                  }}
                >
                  <div className="builidng__num_amenity">
                    <span style={{ width: "max-content" }}>
                      {row?.building?.name || "-"}
                    </span>
                  </div>
                </TableCell>
              }

              <TableCell align="center" style={{ borderBottom: "none" }}>
                {row?.owner?.tenantInfo?.apartmentNumber}
              </TableCell>

              {value === amenities || value === maintenance ? (
                <>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "max-content",
                      }}
                    >
                      {moment(row.createdAt).format("ddd,  ll ")}
                    </span>
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "max-content",
                      }}
                    >
                      {moment(row.scheduleDateFrom).format("ddd, ll")}
                    </span>
                  </TableCell>
                  <TableCell align="center" style={{ borderBottom: "none" }}>
                    <span>
                      {title === "Maintenance"
                        ? selectDateTime(
                            moment.utc(row.scheduleDateFrom).format("H:mm"),
                            moment.utc(row.scheduleDateTo).format("H:mm")
                          )
                        : moment.utc(row.scheduleDateFrom).format("H:mm")}
                    </span>
                  </TableCell>
                </>
              ) : null}

              {value !== amenities && (
                <TableCell
                  align="center"
                  style={{
                    borderBottom: "none",
                    cursor: "pointer",
                    pointerEvents:
                      !row?.images.length &&
                      !row?.description?.length &&
                      !row?.voiceNote?.url
                        ? "none"
                        : "visible",
                  }}
                  onClick={() => {
                    setAttachment(true);
                    setIndex(row?._id);
                  }}
                >
                  {row?.images && row?.images[0] ? (
                    <img src={row?.images[0]?.url} alt="Tumb" />
                  ) : (
                    <span>
                      {!row?.images.length &&
                      !row?.description?.length &&
                      !row?.voiceNote?.url
                        ? "No attachments"
                        : "View attachments"}
                    </span>
                  )}
                </TableCell>
              )}
              {value !== amenities && (
                <TableCell align="center" style={{ borderBottom: "none" }}>
                  {row?.severityLevel}
                </TableCell>
              )}

              <TableCell
                align="center"
                style={{
                  borderBottom: "none",
                  cursor: "pointer",
                }}
              >
                <Tooltip
                  title={`${showTooltip ? "Change Status" : ""}`}
                  arrow
                  className="tooltip_table"
                  placement="top"
                >
                  <div
                    onMouseEnter={(event) => {
                      setShowTooltip(true);
                      setRequestid(row?._id);
                    }}
                    onMouseLeave={(e) => {
                      setShowTooltip(false);
                    }}
                    style={{
                      width: "153px !important",
                    }}
                  >
                    {value === amenities ? (
                      <>
                        {!loadingStatus || loadingStatus !== row?._id ? (
                          <Status
                            status={row?.status ? row?.status : ""}
                            showIcon={true}
                            page={amenities}
                            handleChangeStatus={handleChangeStatus}
                          />
                        ) : (
                          "loading..."
                        )}
                      </>
                    ) : (
                      <>
                        {!loadingStatus || loadingStatus !== row?._id ? (
                          <Status
                            status={row?.status ? row?.status : ""}
                            showIcon={true}
                            page={maintenance}
                            handleChangeStatus={handleChangeStatus}
                          />
                        ) : (
                          "loading..."
                        )}
                      </>
                    )}
                  </div>
                </Tooltip>

                {/* <HomePageSelect  statusses={amenitiesStatusses} /> */}
              </TableCell>
              {value === maintenance && (
                <TableCell align="center" style={{ borderBottom: "none" }}>
                  {row?.hasOwnProperty("ownerFeedBack") ? (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setFeedBackOpen(true);
                        setSelectedFeedBack({
                          ...row.ownerFeedBack,
                          url: row?.owner?.image?.url,
                          name: row?.owner?.firstName,
                        });
                      }}
                    >
                      <FeedBackIcon />
                    </div>
                  ) : (
                    <Tooltip
                      title={`${showTooltipFeedBack ? "No feed back" : ""}`}
                      arrow
                      // open={showTooltip && row?._id === requestId}
                      className="tooltip_table"
                      // disableInteractive
                      placement="top"
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        // onClick={() => setFeedBackOpen(true)}
                        onMouseEnter={(event) => {
                          setShowTooltipFeedBack(true);
                        }}
                        onMouseLeave={(e) => {
                          setShowTooltipFeedBack(false);
                        }}
                      >
                        <NoFeedBackIcon />
                      </div>
                    </Tooltip>
                  )}
                </TableCell>
              )}
              <TableCell
                align="right"
                style={{
                  borderBottom: "none",
                  position: "relative",
                }}
              >
                <div
                  className="action"
                  onClick={(e) => {
                    setRequestid(row?._id);
                  }}
                >
                  <Dropdown
                    title={<Arrow />}
                    buttonClassName="button_dropdown_list_multi_levels_home_action_btn"
                    menuClassName="menu_dropdown_list_multi_levels_home_action_btn"
                    wrapperClassName="wrapper_dropdown_list_multi_levels_home_action_btn"
                    position="left"
                  >
                    {menuItemAmenityRequest?.map((item, index) => {
                      return (
                        <Dropdown.Item
                          key={index}
                          onClick={(e) => {
                            handleMenuClick(item.id);
                            setIndex(row?._id);
                          }}
                        >
                          {item.label}
                        </Dropdown.Item>
                      );
                    })}
                  </Dropdown>
                </div>
              </TableCell>
            </>
          </TableRow>
        );
      })}
    </>
  );
};

export default NonHomePageTable;
