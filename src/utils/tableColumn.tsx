import { Button, Checkbox, TableCell, Tooltip } from "@mui/material";
import {
  TcolumnsType,
  IFeedBack,
  IParcelManagementTable,
  TRenderCell,
  TTestingColumns,
} from "~/types/types";
import moment from "moment";
import Status from "~/reusable/Status";
import Dropdown from "react-multilevel-dropdown";
import {
  amenities,
  dropdownPercel,
  generateRandomId,
  maintenance,
  menuBellboyRequest,
  menuItemAmenityRequest,
  menuvaletRequest,
  propertyDropDownAction,
} from "@/utils/constant";
import { ReactComponent as Arrow } from "@/assets/icons/actiondown.svg";
import { ReactComponent as FeedBackIcon } from "@/assets/icons/mantenance.svg";
import { ReactComponent as NoFeedBackIcon } from "@/assets/icons/NoFeedback.svg";
import { ReactComponent as CheckboxIcon } from "@/assets/icons/checkbox.svg";
import { ReactComponent as CheckedboxIcon } from "@/assets/icons/checkedcheckbox.svg";
import { ReactComponent as CheckIcon } from "@/assets/icons/checked.svg";
import { ReactComponent as CopyIcon } from "@/assets/icons/CopySvg.svg";
import { ReactComponent as CheckedIcon } from "@/assets/icons/checkedIconsvg.svg";
import { ReactComponent as WarningIcon } from "@/assets/icons/warning.svg";
import { ReactComponent as WaitingRespIcon } from "@/assets/icons/warning.svg";
import { ReactComponent as CancelIcon } from "@/assets/icons/warning.svg";
import { ReactComponent as SendToAprtIcon } from "@/assets/icons/warning.svg";

import { Dispatch, FunctionComponent, SetStateAction, SVGProps } from "react";
import { selectDateTime } from "@/utils/helpers";

const renderCell = ({ align, headerName }: TRenderCell): JSX.Element => {
  return (
    <TableCell
      key={generateRandomId()}
      align={align || "center"}
      style={{ textAlign: "center", borderBottom: "none" }}
    >
      <span>{headerName}</span>
    </TableCell>
  );
};

const renderCellVisitor = ({
  index,
  align,
  headerName,
}: TRenderCell): JSX.Element => {
  if (headerName === "Tenants") {
    return (
      <TableCell
        style={{ paddingLeft: "16px !important", color: "black" }}
        key={generateRandomId()}
        align={align || "center"}
      >
        {headerName}
      </TableCell>
    );
  }
  return (
    <TableCell
      style={{ color: "black" }}
      key={generateRandomId()}
      align={align || "center"}
    >
      {headerName}
    </TableCell>
  );
};

const renderCellBellboy = ({ align, headerName }: TRenderCell): JSX.Element => {
  return (
    <TableCell key={generateRandomId()} align={align || "center"}>
      {headerName}
    </TableCell>
  );
};

export const columnsOtherProperties: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          image: { url: string; alt: string };
          firstName: string;
          tenantInfo: { apartmentNumber: string };
        };
        property: string;
      };
    }) => {
      return (
        <TableCell>
          <div className="imageDiv">
            <img
              src={row?.owner?.image?.url}
              alt={String(row?.owner?.image?.alt)}
              className="req"
            />
            <div className="info">
              <span className="tenant">{row?.owner?.firstName}</span>
              <span className="apartment">
                Apartment {row?.owner?.tenantInfo?.apartmentNumber}
                <span className="number">{row?.property}</span>
              </span>
            </div>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "tenantBuilding",
    headerName: "Tenant Building",
    type: "number",
    sortable: false,
    width: 131,
    align: "left",
    renderCell: renderCellBellboy,
    cellIn: ({ row }: { row: { building: string } }) => {
      return (
        <TableCell align="left">
          <div className="tenant_building">
            <span className="tenant_building__text" title={row?.building}>
              {row?.building}
            </span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "requestedProperty",
    headerName: "Requested Property",
    type: "number",
    sortable: false,
    width: 212,
    align: "left",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: { service: { icon: { url: string; alt: string }; name: string } };
    }) => {
      return (
        <TableCell align="left">
          <div className="requested_property_div">
            <img
              className="image"
              src={row?.service?.icon?.url}
              alt={row?.service?.icon?.alt}
            />
            {/* <span className="number">{row?.property}</span> */}
            <span className="number">{row?.service?.name}</span>
            {/* <div className="info">
          </div> */}
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "requestTime",
    headerName: "Request Time",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({ row }: { row: { scheduleDateTo: string } }) => {
      return (
        <TableCell align="center">
          <div className="arrivedate">
            {/* moment(timestamp).format('ddd, MM YYYY [At] hh:mm a') */}
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
              {moment(row?.scheduleDateTo).format("ddd, ll")}
              {moment(row?.scheduleDateTo).format(" [At] hh:mm a")}
            </span>
            <span className="arrive time"></span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "requestStatus",
    headerName: "Request Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: { _id: string; status: string };
      setRequestid: Dispatch<SetStateAction<string>>;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
        <TableCell
          align="center"
          style={{ position: "relative" }}
          onMouseEnter={() => {
            setRequestid(row?._id);
          }}
        >
          {!loadingStatus || loadingStatus !== row?._id ? (
            <Status
              status={row?.status}
              showIcon={true}
              page={"other_properties"}
              handleChangeStatus={handleChangeStatus}
            />
          ) : (
            "loading..."
          )}
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      setPropertyIndex,
      handleMenuClick,
      index,
    }: {
      row: { _id: string };
      setPropertyIndex: Dispatch<SetStateAction<string>>;
      handleMenuClick: (listIndex: number, rowIndex: number) => void;
      index: number;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
          <div className="action">
            <div className="arrow_container">
              <Dropdown
                title={<Arrow />}
                buttonClassName="button_dropdown_list_multi_levels"
                menuClassName="menu_dropdown_list_multi_levels"
                wrapperClassName="wrapper_dropdown_list_multi_levels"
                position="left"
                onClick={() => setPropertyIndex(row?._id)}
              >
                {propertyDropDownAction.map((item) => {
                  return (
                    <Dropdown.Item
                      onClick={() => handleMenuClick(item.id, index + 1)}
                    >
                      {item.label}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown>
            </div>
          </div>
        </TableCell>
      );
    },
  },
];

export const columnsAmenities: TTestingColumns[] = [
  {
    field: "requestID",
    headerName: "RequestedID",
    type: "number",
    sortable: false,
    width: 184,
    align: "left",
    renderCell,
    cellIn: ({ row }: { row: { code: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "tenants",
    headerName: "Tenant",
    align: "center",
    sortable: false,
    renderCell,
    width: 200,
    cellIn: ({
      row,
    }: {
      row: { owner: { image: { url: string }; firstName: string } };
    }) => {
      return (
        <TableCell style={{ borderBottom: "none" }}>
          <div className="tenant_info_service">
            <img src={row?.owner?.image?.url} alt="image" />
            {row?.owner?.firstName}
          </div>
        </TableCell>
      );
    },
  },

  {
    field: "selectedperiod",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { building: { name: string } } }) => {
      return (
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
      );
    },
  },

  {
    field: "apartment",
    headerName: "Apartment",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: { owner: { tenantInfo: { apartmentNumber: string } } };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.owner?.tenantInfo?.apartmentNumber}
        </TableCell>
      );
    },
  },
  {
    field: "creationdate",
    headerName: "Creation Date",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { createdAt: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "requestDate",
    headerName: "Request Date",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { scheduleDateFrom: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "time",
    headerName: "Time",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { scheduleDateFrom: string } }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <span>{moment.utc(row.scheduleDateFrom).format("H:mm")}</span>
        </TableCell>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      showTooltip,
      setShowTooltip,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: { status: string; _id: string };
      showTooltip: boolean;
      setShowTooltip: any;
      setRequestid: any;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
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
            </div>
          </Tooltip>
        </TableCell>
      );
    },
  },
  {
    field: "action",
    type: "number",
    headerName: "Action",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      setRequestid,
      handleMenuClick,
      setIndex,
    }: {
      row: { _id: string };
      setRequestid: Dispatch<React.SetStateAction<string>>;
      setIndex: Dispatch<React.SetStateAction<string | undefined>>;
      handleMenuClick: (index: number) => void;
    }) => {
      return (
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
      );
    },
  },
];

export const columnsMaintenance: TTestingColumns[] = [
  {
    field: "service",
    headerName: "Service",
    type: "number",
    sortable: false,
    width: 184,
    align: "left",
    renderCell,
    cellPadding: "checkbox",
    cellIn: ({ row }: { row: { service: { name: string } } }) => {
      return (
        <TableCell padding="checkbox" style={{ borderBottom: "none" }}>
          <div className="service_name_col"> {row?.service?.name}</div>
        </TableCell>
      );
    },
  },
  {
    field: "requestID",
    headerName: "RequestedID",
    type: "number",
    sortable: false,
    width: 184,
    align: "left",
    renderCell,
    cellIn: ({ row }: { row: { code: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "tenants",
    headerName: "Tenants",
    align: "left",
    sortable: false,
    width: 300,
    renderCell,
    cellIn: ({
      row,
    }: {
      row: { owner: { image: { url: string }; firstName: string } };
    }) => {
      return (
        <TableCell style={{ borderBottom: "none" }}>
          <div className="tenant_info_service">
            <img src={row?.owner?.image?.url} alt="image" />
            {row?.owner?.firstName}
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { building: { name: string } } }) => {
      return (
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
      );
    },
  },
  {
    field: "apartment",
    headerName: "Apatrment",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: { owner: { tenantInfo: { apartmentNumber: string } } };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.owner?.tenantInfo?.apartmentNumber}
        </TableCell>
      );
    },
  },
  {
    field: "creationdate",
    headerName: "Creation Date",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { createdAt: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "requestDate",
    headerName: "Request Date",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({ row }: { row: { scheduleDateFrom: string } }) => {
      return (
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
      );
    },
  },
  {
    field: "time",
    headerName: "Time",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: { scheduleDateFrom: string; scheduleDateTo: string };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <span>
            {selectDateTime(
              moment.utc(row.scheduleDateFrom).format("H:mm"),
              moment.utc(row.scheduleDateTo).format("H:mm")
            )}
          </span>
        </TableCell>
      );
    },
  },
  {
    field: "attachements",
    headerName: "Attachments",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        images: { url: string }[];
        description: string;
        voiceNote: { url: string };
      };
    }) => {
      return (
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
            // setAttachment(true);
            // setIndex(row?._id);
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
      );
    },
  },
  // {
  //   field: "voice",
  //   headerName: "Voice Recoridng",
  //   type: "number",
  //   sortable: false,
  //   width: 212,
  //   align: "center",
  // },
  {
    field: "severity",
    headerName: "Severity",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        severityLevel: string;
      };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.severityLevel}
        </TableCell>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      showTooltip,
      setShowTooltip,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: { status: string; _id: string };
      showTooltip: boolean;
      setShowTooltip: any;
      setRequestid: any;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
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
            </div>
          </Tooltip>
        </TableCell>
      );
    },
  },
  {
    field: "feedback",
    headerName: "Feedback",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      showTooltipFeedBack,
      setShowTooltipFeedBack,
      setFeedBackOpen,
      setSelectedFeedBack,
    }: {
      row: {
        images: { url: string }[];
        description: string;
        voiceNote: { url: string };
        ownerFeedBack: IFeedBack;
        owner: {
          image: {
            url: string;
          };
          firstName: string;
        };
      };
      showTooltipFeedBack: boolean;
      setShowTooltipFeedBack: Dispatch<React.SetStateAction<boolean>>;
      setFeedBackOpen: Dispatch<React.SetStateAction<boolean>>;
      setSelectedFeedBack: Dispatch<React.SetStateAction<IFeedBack>>;
    }) => {
      return (
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
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      setRequestid,
      handleMenuClick,
      setIndex,
    }: {
      row: { _id: string };
      setRequestid: Dispatch<React.SetStateAction<string>>;
      setIndex: Dispatch<React.SetStateAction<string | undefined>>;
      handleMenuClick: (index: number) => void;
    }) => {
      return (
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
      );
    },
  },
];

export const columnsVisitor: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell: () => {
      return <></>;
    },
    cellIn: ({ row }: { row: { service: { name: string } } }) => {
      return (
        <TableCell padding="checkbox" style={{ borderBottom: "none" }}>
          <Checkbox
            icon={<CheckboxIcon id="checboxiconvisitor" />}
            checkedIcon={
              <div className="checked checkeddivsVisitor">
                <CheckedboxIcon /> <CheckIcon className="check" />
              </div>
            }
            color="primary"
            //checked={isItemSelected}
          />
        </TableCell>
      );
    },
  },
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell: renderCellVisitor,
    cellIn: ({
      row,
    }: {
      row: { owner: { image: { url: string }; firstName: string } };
    }) => {
      return (
        <TableCell>
          <div className="imageDiv">
            {row?.owner?.image && (
              <img src={row?.owner?.image?.url} alt="image" />
            )}
            <div className="info">
              <span className="tenant"> {row?.owner?.firstName}</span>
            </div>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "buildingnumber",
    headerName: "Building No.",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { buildingNumber: string } }) => {
      return (
        <TableCell align="left">
          <div className="building_name">
            <span className="name">{row?.buildingNumber}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "apartmentnumber",
    headerName: "Apt. No.",
    type: "number",
    sortable: false,
    width: 212,
    renderCell: renderCellVisitor,
    align: "center",
    cellIn: ({ row }: { row: { apartmentNumber: string } }) => {
      return (
        <TableCell align="left">
          <div className="apartment_number">
            <span className="pick">{row?.apartmentNumber}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "visitorName",
    headerName: "Visitor Name",
    type: "string",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { visitorName: string } }) => {
      return (
        <TableCell align="left">
          <div className="visitor_name">
            <span className="pick">{row?.visitorName}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "visitorPhoneNumber",
    headerName: "visitor Number",
    type: "string",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { visitorPhoneNumber: string } }) => {
      return (
        <TableCell align="left">
          <div className="visitor_phone_number">
            <span className="pick">{row?.visitorPhoneNumber}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "requestdate",
    headerName: "Request Date & Time",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { scheduleDateFrom: string } }) => {
      return (
        <TableCell align="center">
          <span
            className="request_time"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "max-content",
            }}
          >
            {moment(row?.scheduleDateFrom).format("ddd MMM DD HH:mm:ss")}
          </span>
        </TableCell>
      );
    },
  },
  {
    field: "code",
    headerName: "Code",
    type: "string",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { code: string } }) => {
      return (
        <TableCell align="center">
          <div className="visitorotp">
            <span className="otp">{row?.code}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "visitorotp",
    headerName: "Visitor OTP",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({ row }: { row: { visitorOtp: string } }) => {
      return (
        <TableCell align="center">
          <div className="visitorotp">
            <span className="otp">{row?.visitorOtp}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({
      row,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: { _id: string; status: string };
      setRequestid: Dispatch<React.SetStateAction<string>>;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
        <TableCell
          align="center"
          style={{ position: "relative" }}
          onMouseEnter={() => {
            setRequestid(row?._id);
          }}
        >
          {!loadingStatus || loadingStatus !== row?._id ? (
            <Status
              status={
                row?.status === "access_amenities"
                  ? "Acces 4th Floor"
                  : row?.status
              }
              showIcon={false}
              page={"visitors"}
              handleChangeStatus={handleChangeStatus}
            />
          ) : (
            "loading..."
          )}
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellVisitor,
    cellIn: ({
      dropdownRef,
      setOpen,
      handleShowAlert,
      closeDropdown,
      row,
      setVisitorOTP
    }: {
      row: { visitorOtp: string };
      dropdownRef: any;
      setOpen: Dispatch<React.SetStateAction<boolean>>;
      handleShowAlert: (
        icon: FunctionComponent<SVGProps<SVGSVGElement>>,
        message: string,
        title: string,
        style: string
      ) => void;
      setVisitorOTP: React.Dispatch<React.SetStateAction<string>>;
      closeDropdown: () => void;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
          <div className="action">
            <div className="arrow_container">
              <Dropdown
                title={<Arrow />}
                wrapperClassName="wrapper_dropdown_list_multi_levels"
                buttonClassName="button_dropdown_list_multi_levels"
                position="left"
                menuClassName="menu_dropdown_list_multi_levels"
                ref={dropdownRef}
              >
                <Dropdown.Item
                  onClick={() => {
                    if (setOpen) {
                      setVisitorOTP(row?.visitorOtp)
                      setOpen((prev) => !prev);
                    }
                  }}
                >
                  Re-notify Tenant
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    navigator.clipboard.writeText(row?.visitorOtp);
                    handleShowAlert(
                      CopyIcon,
                      "Visitor OTP has been Copied",
                      "Copied",
                      "copy"
                    );
                    closeDropdown();
                  }}
                >
                  Copy OTP
                </Dropdown.Item>
              </Dropdown>
            </div>
          </div>
        </TableCell>
      );
    },
  },
];

export const columnsValet: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell: () => {
      return <></>;
    },
    cellIn: ({ row }: { row: { service: { name: string } } }) => {
      return (
        <TableCell padding="checkbox">
          <Checkbox
            icon={<CheckboxIcon />}
            checkedIcon={<CheckedIcon />}
            color="primary"
          />
        </TableCell>
      );
    },
  },
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    renderCell: renderCellBellboy,
    width: 241,
    align: "left",
    cellIn: ({
      row,
    }: {
      row: { owner: { image: { url: string }; firstName: string } };
    }) => {
      return (
        <TableCell>
          <div className="imageDiv">
            {row.owner?.image?.url && (
              <img src={row.owner.image.url} alt="image" />
            )}
            {row.owner?.firstName}
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building No.",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({ row }: { row: { building: { name: string } } }) => {
      return <TableCell align="center">{row?.building?.name}</TableCell>;
    },
  },
  {
    field: "apartment",
    headerName: "Apt. No.",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: { owner: { tenantInfo: { apartmentNumber: string } } };
    }) => {
      return (
        <TableCell align="center">
          {row.owner?.tenantInfo?.apartmentNumber}
        </TableCell>
      );
    },
  },
  {
    field: "car",
    headerName: "Car",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({ row }: { row: { car: { name: string } } }) => {
      return <TableCell align="center">{row.car?.name}</TableCell>;
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: { status: string; _id: string };
      setRequestid: Dispatch<SetStateAction<string>>;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
        <TableCell
          align="justify"
          onMouseEnter={() => {
            setRequestid(row?._id);
          }}
        >
          {!loadingStatus || loadingStatus !== row?._id ? (
            <Status
              status={row?.status}
              showIcon={false}
              page={"bellboy"}
              handleChangeStatus={handleChangeStatus}
            />
          ) : (
            "loading..."
          )}
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      handleClickOpen,
      handleMenuClick,
    }: {
      row: {
        _id: string;
      };
      handleClickOpen: (
        event: React.MouseEvent<HTMLElement>,
        index: string
      ) => void;
      handleMenuClick: (index: number) => void;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
          <div className="action" onClick={(e) => handleClickOpen(e, row._id)}>
            <Dropdown
              title={<Arrow />}
              buttonClassName="button_dropdown_list_multi_levels_home_action_btn"
              menuClassName="menu_dropdown_list_multi_levels_home_action_btn"
              wrapperClassName="wrapper_dropdown_list_multi_levels_home_action_btn"
              position="left"
            >
              {menuvaletRequest.map((item, index) => {
                return (
                  <Dropdown.Item
                    className="relationshipitem"
                    key={index}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.label}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
        </TableCell>
      );
    },
  },
];

export const columnsTenants: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    align: "left",
    sortable: false,
    width: 241,
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        image: { url: string };
        firstName: string;
        tenantInfo: { apartmentNumber: string };
      };
    }) => {
      return (
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
      );
    },
  },
  {
    field: "buildingNum",
    headerName: "Building No.",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        buildings: { name: string }[];
      };
    }) => {
      return (
        <TableCell align="center">
          Tower {row?.buildings && row?.buildings[0]?.name}
        </TableCell>
      );
    },
  },
  {
    field: "apartmentNum",
    headerName: "Family Members",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        tenantInfo: { numberOfFamilyMembers: string };
      };
    }) => {
      return (
        <TableCell align="center">
          {row?.tenantInfo?.numberOfFamilyMembers}
        </TableCell>
      );
    },
  },
  {
    field: "guestNum",
    headerName: "Guests",
    type: "number",
    sortable: false,
    width: 145,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        tenantInfo: { numberOfGuests: string };
      };
    }) => {
      return (
        <TableCell align="center">{row?.tenantInfo?.numberOfGuests}</TableCell>
      );
    },
  },
  {
    field: "pets",
    headerName: "Pets",
    type: "number",
    sortable: false,
    width: 145,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        pets: {}[];
      };
    }) => {
      return (
        <TableCell align="center">
          {row?.pets?.length > 0 ? `${row?.pets?.length} cat` : "not found"}
        </TableCell>
      );
    },
  },
  {
    field: "car",
    headerName: "Car",
    type: "number",
    sortable: false,
    width: 145,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        cars: string;
      };
    }) => {
      return (
        <TableCell align="center">
          <div
            dangerouslySetInnerHTML={{
              __html:
                row.cars ??
                'No Added Cars yet. <span class="add_car">Add</span>',
            }}
          ></div>
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 146,
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      handleClick,
      setSelectedId,
      id,
    }: {
      row: {
        _id: string;
      };
      handleClick: (event: React.MouseEvent<HTMLElement>, id: string) => void;
      setSelectedId: Dispatch<SetStateAction<string>>;
      id: string;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
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
      );
    },
  },
];

export const columnsservice: TcolumnsType[] = [
  {
    field: "tenants",
    headerName: "Service Name",
    align: "left",
    sortable: false,
    width: 241,
  },
  {
    field: "people",
    headerName: "Availability",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
  },
  {
    field: "selectedperiod",
    headerName: "Online Actors",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
  },
  {
    field: "apartment",
    headerName: "Buildings",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
  {
    field: "apartment",
    headerName: "Requests",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
];

export const columnsParcel: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          image: { url: string };
          firstName: string;
          tenantInfo: { apartmentNumber: string };
        };
      };
    }) => {
      return (
        <TableCell>
          <div className="imageDiv">
            <img src={row.owner?.image?.url} alt="image" />
            <div className="info">
              <span className="tenant"> {row.owner?.firstName}</span>
              <span className="apartment">
                Apartment{" "}
                <span className="number">
                  {row.owner?.tenantInfo?.apartmentNumber}
                </span>
              </span>
            </div>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "apartmentNumber",
    headerName: "Apartment",
    type: "number",
    sortable: false,
    width: 131,
    align: "left",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          tenantInfo: { apartmentNumber: string };
        };
      };
    }) => {
      return (
        <TableCell align="center">
          <span className="building_num">
            {row?.owner?.tenantInfo?.apartmentNumber}
          </span>
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        building: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center">
          <span className="building_num">{row?.building?.name}</span>
        </TableCell>
      );
    },
  },
  {
    field: "parcelName",
    headerName: "Parcel Name",
    type: "number",
    sortable: false,
    width: 131,
    align: "left",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        name: string;
      };
    }) => {
      return (
        <TableCell align="left">
          <div className="view_pictures">
            <span className="name">{row?.name}</span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "parcelName",
    headerName: "Parcel Image",
    type: "number",
    sortable: false,
    width: 131,
    align: "left",
    renderCell,
    cellIn: ({
      row,
      setOpen,
      filteredData,
      setParcelItem,
    }: {
      row: {
        images: any[];
        building: { images: { url: string; alt: string }[] };
        _id: string;
      };
      setOpen: Dispatch<SetStateAction<boolean>>;
      setParcelItem: Dispatch<SetStateAction<IParcelManagementTable[] | any>>;
      filteredData: IParcelManagementTable[];
    }) => {
      return (
        <TableCell align="center">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (row.images.length) {
                setParcelItem(
                  filteredData.filter((item) => item._id === row._id)
                );
                setOpen(true);
              }
            }}
            className="parcel_image"
          >
            {row.images.length ? (
              <img
                src={row?.images[0]?.url}
                alt={row.building?.images[0]?.alt}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <></>
            )}
            <span className="view">
              {row.images.length ? "View" : "No Images"}
            </span>
          </div>
        </TableCell>
      );
    },
  },

  {
    field: "type",
    headerName: "Type",
    type: "number",
    sortable: false,
    width: 212,
    align: "left",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        type: string;
      };
    }) => {
      return (
        <TableCell align="center">
          <span className="pick">{row?.type?.toLowerCase()}</span>
        </TableCell>
      );
    },
  },
  {
    field: "code",
    headerName: "Code",
    type: "string",
    sortable: false,
    width: 212,
    align: "left",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        code: string;
      };
    }) => {
      return (
        <TableCell align="left">
          <span className="pick">{row?.code?.toLowerCase()}</span>
        </TableCell>
      );
    },
  },
  {
    field: "arriveDate",
    headerName: "Arrive Date",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        scheduleDateTo: string;
      };
    }) => {
      return (
        <TableCell align="center">
          <div className="arrivedate">
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
              {moment(row.scheduleDateTo).format("ddd, MM YYYY")}
              {moment(row.scheduleDateTo).format(" [At] hh:mm a")}
            </span>
            <span className="arrive time"></span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      loadingStatus,
      handleChangeStatus,
      setRequestid,
    }: {
      row: {
        _id: string;
        status: string;
      };
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
      setRequestid: Dispatch<SetStateAction<string>>;
    }) => {
      return (
        <TableCell
          align="center"
          style={{ position: "relative" }}
          onMouseEnter={() => {
            setRequestid(row?._id);
          }}
        >
          {!loadingStatus || loadingStatus !== row?._id ? (
            <Status
              status={row?.status}
              showIcon={true}
              page={"parcel"}
              handleChangeStatus={handleChangeStatus}
            />
          ) : (
            "loading..."
          )}
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      deleteLoading,
      setSelectedRow,
      ReNotifyTenant,
      ConfirmedParcels,
      handleMenuClick,
      handleDeclined,
      index,
    }: {
      row: { _id: string; owner: { _id: string } };
      deleteLoading: string;
      setSelectedRow: Dispatch<SetStateAction<string>>;
      ReNotifyTenant: () => void;
      ConfirmedParcels: () => void;
      handleMenuClick: (
        listIndex: number,
        rowIndex: number,
        index: string
      ) => void;
      handleDeclined: (_id: string) => void;
      index: number;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
          <div className="action">
            {!deleteLoading || deleteLoading !== row?._id ? (
              <div className="arrow_container">
                <Dropdown
                  title={<Arrow />}
                  buttonClassName="button_dropdown_list_multi_levels"
                  menuClassName="menu_dropdown_list_multi_levels"
                  wrapperClassName="wrapper_dropdown_list_multi_levels"
                  position="left"
                  onClick={() => {
                    setSelectedRow(row._id);
                  }}
                >
                  {dropdownPercel?.map(({ id, title }) => (
                    <Dropdown.Item
                      key={id}
                      onClick={() => {
                        if (id === 1) {
                          ReNotifyTenant();
                        } else if (id === 2) {
                          ConfirmedParcels();
                        } else if (id === 3 || id === 4) {
                          handleMenuClick(id, index + 1, row.owner?._id);
                        } else if (id === 5) {
                          handleDeclined(row._id);
                        }
                      }}
                    >
                      {title}
                    </Dropdown.Item>
                  ))}
                </Dropdown>
              </div>
            ) : (
              "loading..."
            )}
          </div>
        </TableCell>
      );
    },
  },
];

export const columnsOther: TcolumnsType[] = [
  {
    field: "property",
    headerName: "Property",
    sortable: false,
    width: 241,
    align: "left",
  },
  {
    field: "building",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 131,
    align: "left",
  },
  {
    field: "facilities",
    headerName: "Facilities",
    type: "number",
    sortable: false,
    width: 100,
    align: "center",
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
];
export const columnsUser: TcolumnsType[] = [
  {
    field: "tenants",
    headerName: " Name",
    align: "left",
    sortable: false,

    width: 241,
  },
  {
    field: "building",
    headerName: "Building",
    type: "string",
    sortable: false,
    width: 131,
    align: "center",
  },
  {
    field: "people",
    headerName: "Role",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
  },
  {
    field: "selectedperiod",
    headerName: "Last Login Date/ time",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
  },
  {
    field: "apartment",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
];

export const columnsBellboy: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    align: "left",
    renderCell: () => {
      return <></>;
    },
    cellIn: ({ row }: { row: { service: { name: string } } }) => {
      return (
        <TableCell padding="checkbox" sx={{ paddingLeft: "6px" }}>
          <Checkbox
            icon={<CheckboxIcon id="checboxiconbellboy" />}
            checkedIcon={<CheckedIcon />}
            color="primary"
          />
        </TableCell>
      );
    },
  },
  {
    field: "tenants",
    headerName: "Tenants",
    sortable: false,
    width: 241,
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          image: { url: string; alt: string };
          firstName: string;
        };
      };
    }) => {
      return (
        <TableCell>
          <div className="imageDiv">
            {row?.owner && row.owner.image && (
              <img src={row?.owner.image.url} alt="image" />
            )}
            {row.owner.firstName}
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building No.",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        building: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center">
          <div className="building_number">{row?.building?.name}</div>
        </TableCell>
      );
    },
  },
  {
    field: "apartment",
    headerName: "Apt. No.",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          tenantInfo: { apartmentNumber: string };
        };
      };
    }) => {
      return (
        <TableCell align="center">
          {row.owner.tenantInfo?.apartmentNumber}
        </TableCell>
      );
    },
  },
  {
    field: "requestDate",
    headerName: "Request Date & Time",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        scheduleDateFrom: string;
      };
    }) => {
      return (
        <TableCell align="center">
          <div className="request_date">
            {moment(row.scheduleDateFrom).format("ddd MMM DD HH:mm:ss")}
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "specialInstructions",
    headerName: "Special Instructions",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
    }: {
      row: {
        scheduleDateFrom: string;
      };
    }) => {
      return (
        <TableCell align="center">
          <div className="show_request">Show Request</div>
        </TableCell>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: renderCellBellboy,
    cellIn: ({
      row,
      setRequestid,
      loadingStatus,
      handleChangeStatus,
    }: {
      row: {
        _id: string;
        status: string;
      };
      setRequestid: Dispatch<SetStateAction<string>>;
      handleChangeStatus: (newStatus: string) => void;
      loadingStatus: string;
    }) => {
      return (
        <TableCell
          align="justify"
          onMouseEnter={() => {
            setRequestid(row?._id);
          }}
        >
          {!loadingStatus || loadingStatus !== row?._id ? (
            <Status
              status={row?.status}
              showIcon={false}
              page={"bellboy"}
              handleChangeStatus={handleChangeStatus}
            />
          ) : (
            "loading..."
          )}
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell: ({ index, align, headerName }: TRenderCell) => {
      return (
        <TableCell
          style={{ width: "unset" }}
          key={generateRandomId()}
          align={align || "center"}
        >
          {headerName}
        </TableCell>
      );
    },
    cellIn: ({
      row,
      handleClickOpen,
      handleMenuClick,
    }: {
      row: {
        _id: string;
      };
      handleClickOpen: (
        event: React.MouseEvent<HTMLElement>,
        index: string
      ) => void;
      handleMenuClick: (index: number) => void;
    }) => {
      return (
        <TableCell align="center" style={{ position: "relative" }}>
          <div className="action" onClick={(e) => handleClickOpen(e, row._id)}>
            <Dropdown
              title={<Arrow />}
              buttonClassName="button_dropdown_list_multi_levels_home_action_btn"
              menuClassName="menu_dropdown_list_multi_levels_home_action_btn"
              wrapperClassName="wrapper_dropdown_list_multi_levels_home_action_btn"
              position="left"
            >
              {menuBellboyRequest.map((item, index) => {
                return (
                  <Dropdown.Item
                    className="relationshipitem"
                    key={index}
                    onClick={() => handleMenuClick(item.id)}
                  >
                    {item.label}
                  </Dropdown.Item>
                );
              })}
            </Dropdown>
          </div>
        </TableCell>
      );
    },
  },
];

export const columnsReqList: TcolumnsType[] = [
  {
    field: "tenants",
    headerName: "Tenant",
    align: "left",
    sortable: false,

    width: 241,
  },
  {
    field: "people",
    headerName: "People",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
  },
  {
    field: "selectedperiod",
    headerName: "Selected period",
    type: "number",
    sortable: false,
    width: 184,
    align: "center",
  },
  {
    field: "apartment",
    headerName: "Apartment",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
  {
    field: "action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
  },
];
export const columnsHome: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    align: "left",
    sortable: false,
    renderCell,
    width: 300,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          tenantInfo: { apartmentNumber: string };
          image: { url: string; alt: string };
          firstName: string;
        };
      };
    }) => {
      return (
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
      );
    },
  },

  {
    field: "service",
    headerName: "Service",
    type: "string",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        service: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.service?.name}
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        building: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.building?.name ? row?.building?.name : "-"}
        </TableCell>
      );
    },
  },
  {
    field: "selectedperiod",
    headerName: "Request Date",
    type: "string",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        scheduleDateTo: string;
      };
    }) => {
      return (
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
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      setShowTooltip,
      setRequestid,
      handleChangeStatus,
    }: {
      row: { status: string; _id: string; flow: string };
      showTooltip: boolean;
      setShowTooltip: any;
      setRequestid: any;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
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
            page={`${row.flow}`}
            handleChangeStatus={handleChangeStatus}
          />
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: (row: any) => {
      return (
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
      );
    },
  },
];

export const testingColumnsBuilding: TTestingColumns[] = [
  {
    field: "tenants",
    headerName: "Tenants",
    align: "left",
    sortable: false,
    renderCell,
    width: 300,
    cellIn: ({
      row,
    }: {
      row: {
        owner: {
          tenantInfo: { apartmentNumber: string };
          image: { url: string; alt: string };
          firstName: string;
        };
      };
    }) => {
      return (
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
      );
    },
  },

  {
    field: "service",
    headerName: "Service",
    type: "string",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        service: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.service?.name}
        </TableCell>
      );
    },
  },
  {
    field: "building",
    headerName: "Building",
    type: "number",
    sortable: false,
    width: 131,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        building: {
          name: string;
        };
      };
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          {row?.building?.name ? row?.building?.name : "-"}
        </TableCell>
      );
    },
  },
  {
    field: "selectedperiod",
    headerName: "Request Date",
    type: "string",
    sortable: false,
    width: 184,
    align: "center",
    renderCell,
    cellIn: ({
      row,
    }: {
      row: {
        scheduleDateTo: string;
      };
    }) => {
      return (
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
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: ({
      row,
      setShowTooltip,
      setRequestid,
      handleChangeStatus,
    }: {
      row: { status: string; _id: string; flow: string };
      showTooltip: boolean;
      setShowTooltip: any;
      setRequestid: any;
      loadingStatus: string;
      handleChangeStatus: (newStatus: string) => void;
    }) => {
      return (
        <TableCell align="center" style={{ borderBottom: "none" }}>
          <div className={`status_table ${row.status}`}>
            <div className={`${row?.status}_icon`}>
              {(row?.status === "pending" && <WarningIcon />) ||
                (row?.status === "cancelled" && <CancelIcon />) ||
                (row?.status === "booked" && <SendToAprtIcon />) ||
                (row?.status === "requested" && <WaitingRespIcon />)}
            </div>
            <span className={`status_${row.status}`}>
              {(row?.status === "pending" && "On Hold") ||
                (row?.status === "cancelled" && "Cancelled") ||
                (row?.status === "booked" && "Send to apartment") ||
                (row?.status === "requested" && "Waiting Response") ||
                (row?.status === "confirmed" && "Confirmed") ||
                (row?.status === "awaiting_pickup" && "Awaiting Pickup")}
            </span>
          </div>
        </TableCell>
      );
    },
  },
  {
    field: "action",
    headerName: "Action",
    type: "number",
    sortable: false,
    width: 212,
    align: "center",
    renderCell,
    cellIn: (row: any) => {
      return (
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
      );
    },
  },
];
