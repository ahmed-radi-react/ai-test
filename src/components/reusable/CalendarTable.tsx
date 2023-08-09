import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useCalendarChange } from "@/hooks/useCalendarChange";
import { Popover } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { IInfoCalendar } from "~/types/types";

const CalendarTable = ({
  reqData,
  setRequestid,
  handleMenuClick,
  title,
}: any) => {
  const [info, setInfo] = useState<IInfoCalendar>({
    title: "",
    time: "",
    serviceImg: "",
    tenantImage: "",
    status: "",
    tenantName: "",
    building: "",
    code: "",
    apartment: "",
    color: "",
    textColor: "",
  });
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const { myEvents } = useCalendarChange(reqData);
  const render = (eventInfo: any) => {
    return (
      <div
        className="rendered_event"
        style={{
          backgroundColor: eventInfo.backgroundColor,
          color: eventInfo.textColor,
        }}
      >
        <div className="tenant_info">
          <img
            src={eventInfo.event._def.extendedProps.tenantImage}
            alt=""
            className="event_image"
          />
          <div className="code_tenant">
            <span>{eventInfo.event._def.extendedProps.tenant}</span>
            <span>{eventInfo.event._def.title}</span>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="full_calendar">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={myEvents as []}
        dayHeaders={true}
        buttonText={{
          today: "today",
          month: "month",
          week: "week",
          day: "day",
          list: "list",
        }}
        headerToolbar={{
          start: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          end: "prevYear,prev,next,nextYear",
        }}
        dayMaxEvents={1}
        eventMouseEnter={(e) => {
          setAnchorEl(e.el);
          setInfo({
            title: e.event._def.title,
            time:
              moment(e.event._instance?.range.start).format("ddd, MMM DD") + "",
            serviceImg: e.event._def.extendedProps.image,
            tenantImage: e.event._def.extendedProps.tenantImage,
            status: e.event._def.extendedProps.status,
            tenantName: e.event._def.extendedProps.tenantName,
            building: e.event._def.extendedProps.building,
            code: e.event._def.extendedProps.code,
            apartment: e.event._def.extendedProps.apartment,
            color: e.event.backgroundColor,
            textColor: e.event.textColor,
          });
        }}
        eventClick={(e) => {
          if (!(title === "parcels")) {
            setRequestid(e.event._def.publicId);
            handleMenuClick(1);
          }
        }}
        eventMouseLeave={(e) => {
          setAnchorEl(null);
          setInfo({
            title: "",
            time: "",
            serviceImg: "",
            tenantImage: "",
            status: "",
            tenantName: "",
            building: "",
            code: "",
            apartment: "",
            color: "",
            textColor: "",
          });
        }}
        eventContent={render}
        height={750}
        moreLinkText={"Show all"}
      />
      <Popover
        className="calendar_popup"
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className="calendarpop">
          <div
            style={{ backgroundColor: info?.color, color: info?.textColor }}
            className="header_popup"
          >
            <span className="md-tooltip-name-age">{info.title}</span>
            <span className="md-tooltip-time">{info.time}</span>
          </div>
          {info.serviceImg && (
            <div>
              <img
                src={info.serviceImg}
                alt="image"
                className="image_calendar"
              />
            </div>
          )}
          <div className="md-tooltip-info_popup">
            <div className="calendar_status_div">
              <div className="info_req">
                {info.tenantImage && (
                  <img
                    src={info.tenantImage}
                    alt=""
                    className="calendar_tenant"
                  />
                )}
                <div className="info_c">
                  <div>
                    <span className="info tenantName">{info?.tenantName}</span>
                  </div>
                  <div>
                    <span>Building-</span>
                    <span className="info">{info?.building}</span>
                  </div>
                  <div>
                    <span>Apartment-</span>
                    <span className="info">{info?.apartment}</span>
                  </div>
                  <div>
                    <span> Requested ID:</span>
                    <span className="info">{info?.code}</span>
                  </div>
                </div>
              </div>
              <div
                style={{ backgroundColor: info?.color, color: info.textColor }}
                className="status_calendar"
              >
                {info.status}
              </div>
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default CalendarTable;
