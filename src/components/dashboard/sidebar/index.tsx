import { FunctionComponent, SVGProps, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  amenities,
  maintenance,
  sidebardata,
  sidebarfooter,
} from "@/utils/constant";
import { ReactComponent as AddIcon } from "@/assets/icons/addIconWhite.svg";
import { ReactComponent as ArrowIcon } from "@/assets/icons/arrow_right.svg";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { ReactComponent as AddIconServices } from "@/assets/images/servciesAddIcon.svg";
import { ReactComponent as Canceled } from "@/assets/icons/CanceledIcon.svg";
import { ReactComponent as DoneSvg } from "@/assets/icons/doneSvg.svg";
import { ReactComponent as LogoutIcon } from "@/assets/icons/logoutIcon.svg";
import BellboyDialog from "../bellboy/BellboyDialog";
import MessageAlert from "~/reusable/MessageAlert";
import { queryRequest } from "@/requests-body/queries";
import RequestDialog from "~/reusable/RequestDialog";
import VisitorRequestDialog from "../visitors/VisitorRequestDialog";
import ValetDialog from "../valet/ValetDialog";
import LogoutDialog from "./LogoutDialog";

const SideBar = () => {
  const [openLogout, setOpenLogout] = useState(false);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number>();
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [hideMessage, setHideMessage] = useState(false);

  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange = (data: {
    link: string;
    id: number;
    subLinks?: object;
  }) => {
    navigate(data.link);
    setSelected(data.id);
  };
  const [openReq, setOpenReq] = useState(false);
  const handleCloseReq = () => {
    setOpenReq(false);
  };
  const { data: amenityReq, isSuccess: amenityReqIsSuccess } = queryRequest({
    url: `/service/amenity?parentId=6449249d3e4d9445b7087a79&offset=0&limit=20`,
    method: "get",
    key: `amenitieskeyreq`,
  });

  const { data: maintenanceReq, isSuccess: maintenanceReqIsSuccess } =
    queryRequest({
      url: `/service/${maintenance}?parentId=63b41be442916b799adf2ac7&offset=0&limit=20`,
      method: "get",
      key: "maintenancekey",
    });

  const [amenitiesData, setAmenitiesData] = useState<any>();
  const [maintenanceData, setMaintenanceData] = useState<any>();

  useEffect(() => {
    if (amenityReqIsSuccess) {
      setAmenitiesData(amenityReq?.data);
    }
  }, [amenityReq]);

  useEffect(() => {
    if (maintenanceReqIsSuccess) {
      setMaintenanceData(maintenanceReq.data);
    }
  }, [maintenanceReq]);

  const [hideMessageReq, setHideMessageReq] = useState(false);
  const [error, setError] = useState(false);

  const handleAddNewRequest = () => {
    const { pathname } = location;
    if (pathname === `/${amenities}`) {
      setOpenReq(true);
    } else if (pathname === `/${maintenance}`) {
      setOpenReq(true);
    } else if (pathname === "/parcels") {
      navigate("/parcels/addparcels");
    } else if (pathname === "/bellboy") {
      handleOpen();
    } else if (pathname === "/otherproperties") {
      navigate("/otherproperties/addotherproperties");
    } else if (pathname === "/usefulinformation") {
      navigate("/usefulinformation/addusefulinformation");
    } else if (pathname === "/visitors") {
      setOpenReq(true);
    } else if (pathname === "/valet") {
      handleOpen();
    }
  };
  const [message, setMessage] = useState("");

  const [whatPage, setWhatPage] = useState<string>(`/${amenities}`);

  useEffect(() => {
    if (
      location.pathname === `/${amenities}` ||
      location.pathname === `/${maintenance}` ||
      location.pathname === "/visitors"
    ) {
      setWhatPage(location.pathname);
    }
  }, [location.pathname]);

  const obj = {
    [`/${amenities}`]: {
      data: amenitiesData?.items,
      title: "Amenities",
      url: "amenity",
      setOpenReq: setOpenReq,
      setHideMessageReq: setHideMessageReq,
      setError: setError,
      setMessage: setMessage,
      isListPage: !true,
      handleCloseDialog: handleClose,
    },
    [`/${maintenance}`]: {
      title: "Maintenance",
      data: maintenanceData?.items,
      url: "maintenance",
      setOpenReq: setOpenReq,
      setHideMessageReq: setHideMessageReq,
      setError: setError,
      setMessage: setMessage,
    },
  };

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

  return (
    <div className="sidebar">
      {hideMessage && (
        <div className="content content_alert">
          <MessageAlert messagesort={messagesort} />
        </div>
      )}
      {hideMessageReq && (
        <div className="content content_alert">
          <MessageAlert
            messagesort={
              error
                ? {
                    icon: Canceled,
                    message: message,
                    title: "Canceled",
                    style: "delete amenReq",
                  }
                : {
                    icon: DoneSvg,
                    message: "Request has been added Successfully",
                    title: "Done",
                    style: "request reqamen",
                  }
            }
          />
        </div>
      )}

      {!(
        location.pathname === "/services" ||
        location.pathname === `/${amenities}` ||
        location.pathname === `/${maintenance}` ||
        location.pathname === "/parcels" ||
        location.pathname === "/visitors" ||
        location.pathname === "/notices" ||
        location.pathname === "/gourmetmanagement" ||
        location.pathname === "/bellboy" ||
        location.pathname === "/valet" ||
        location.pathname === "/otherproperties" ||
        location.pathname === "/usefulinformation" ||
        location.pathname === "/valet/valetrequests"
      ) ? (
        <>
          <List className="sidebarmenu">
            <Button
              variant="contained"
              className="add_reqsidebar"
              onClick={handleAddNewRequest}
            >
              <AddIcon />
              <div></div>
              Add New Request
            </Button>
            {sidebardata.map((data, index) => {
              let subLinks;
              if (data.subLinks) {
                subLinks = data.subLinks.find(
                  (elem: any) => location.pathname === elem.link
                );
              }

              return (
                <div key={index}>
                  <ListItem
                    disablePadding
                    style={
                      location.pathname === data.link ||
                      location.pathname.includes(data.link) ||
                      location.pathname.includes(subLinks?.link as string)
                        ? { backgroundColor: "#FFFBE3", borderRadius: "5px" }
                        : {}
                    }
                  >
                    {data.id === 3 ? (
                      <div className="list_button_div">
                        <ListItemButton
                          onClick={() => handleChange(data)}
                          className="listitem"
                        >
                          <data.icon
                            className={
                              location.pathname === data.link ||
                              location.pathname.includes(data.link) ||
                              location.pathname.includes(
                                subLinks?.link as string
                              )
                                ? "activeicon"
                                : ""
                            }
                          />
                          <div className="linkSubLink">
                            <ListItemText
                              primary={data.label}
                              className={
                                location.pathname === data.link ||
                                location.pathname.includes(data.link) ||
                                location.pathname.includes(
                                  subLinks?.link as string
                                )
                                  ? "activelabel"
                                  : "menulabel"
                              }
                            />
                            {subLinks?.label && (
                              <ListItemText
                                primary={subLinks?.label}
                                className="activeSubtitle"
                              />
                            )}
                          </div>
                          <ArrowIcon
                            className={`${
                              location.pathname.includes("/services") ||
                              location.pathname.includes(
                                subLinks?.link as string
                              )
                                ? "arrowiconactive"
                                : "arrowdeactive"
                            }`}
                          />
                        </ListItemButton>
                        <List className={`list_submenu`}>
                          {data?.subLinks?.map((data, index) => (
                            <ListItem
                              key={index}
                              disablePadding
                              style={
                                location.pathname === data.link ||
                                location.pathname.includes(data.link)
                                  ? {
                                      backgroundColor: "#FFFBE3",
                                      borderRadius: "5px",
                                    }
                                  : {}
                              }
                            >
                              <ListItemButton
                                className="listitem"
                                onClick={() => {
                                  navigate(data.link);
                                  setSelected(3);
                                }}
                              >
                                <data.icon
                                  className={
                                    location.pathname === data.link ||
                                    location.pathname.includes(data.link)
                                      ? "activeicon"
                                      : ""
                                  }
                                />
                                <ListItemText
                                  primary={data.label}
                                  className={
                                    location.pathname === data.link ||
                                    location.pathname.includes(data.link)
                                      ? "activelabel"
                                      : "menulabel"
                                  }
                                />
                              </ListItemButton>
                            </ListItem>
                          ))}
                        </List>
                      </div>
                    ) : (
                      <ListItemButton
                        onClick={() => handleChange(data)}
                        className="listitem"
                        style={
                          data.disable
                            ? { pointerEvents: "none", opacity: 0.7 }
                            : {}
                        }
                      >
                        <data.icon
                          className={
                            location.pathname === data.link ||
                            location.pathname.includes(data.link)
                              ? "activeicon"
                              : ""
                          }
                        />
                        <ListItemText
                          primary={data.label}
                          className={
                            location.pathname === data.link ||
                            location.pathname.includes(data.link)
                              ? "activelabel"
                              : "menulabel"
                          }
                        />
                        {selected === 3 &&
                          data.link.includes("/services") &&
                          location.pathname.includes("/services") && (
                            <ArrowIcon />
                          )}
                      </ListItemButton>
                    )}
                  </ListItem>
                </div>
              );
            })}
          </List>
          <List className="sidebarbottom">
            {sidebarfooter.map((data, index) => (
              <ListItem
                key={index}
                disablePadding
                className="list"
                style={{ pointerEvents: "none", opacity: 0.7 }}
              >
                <ListItemButton className="listitem">
                  <data.icon />
                  <ListItemText primary={data.label} className="menulabel" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <>
          <List className="sidebarmenu_services">
            <div className="sidebar_icon_div">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Button
                  variant="contained"
                  className="add_reqsidebar_services"
                  onClick={handleAddNewRequest}
                >
                  <AddIconServices />
                </Button>
                {sidebardata.map((data, index) => {
                  let subLinks;
                  if (data.subLinks) {
                    //
                    subLinks = data.subLinks.find(
                      (elem: any) => location.pathname === elem.link
                    );
                  }

                  return (
                    <div key={index}>
                      <div>
                        <ListItem
                          disablePadding
                          style={
                            location.pathname === data.link ||
                            location.pathname.includes(data.link) ||
                            location.pathname.includes(subLinks?.link as string)
                              ? {
                                  backgroundColor: "#FFFBE3",
                                  borderRadius: "5px",
                                }
                              : {}
                          }
                          className="list_items"
                        >
                          {data.id === 3 && (
                            <div
                              style={{
                                position: "absolute",
                                width: "5px",
                                height: "40px",
                                left: "-11px",
                                backgroundColor: "#9c8f41",
                                borderRadius: "5px",
                              }}
                            ></div>
                          )}

                          <ListItemButton
                            onClick={() => handleChange(data)}
                            className={`listitem_services ${
                              data.id === 3 ? "active" : ""
                            }`}
                          >
                            <data.icon
                              className={
                                location.pathname === data.link ||
                                location.pathname.includes(data.link)
                                  ? "activeicon"
                                  : ""
                              }
                            />
                          </ListItemButton>
                        </ListItem>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="log_out_btn" onClick={() => setOpenLogout(true)}>
                <LogoutIcon />
              </div>
              <LogoutDialog
                setOpenLogout={setOpenLogout}
                openLogout={openLogout}
              />
            </div>

            <List className={`list_submenu_services`}>
              {sidebardata[2]?.subLinks?.map((data, index) => (
                <ListItem
                  key={index}
                  disablePadding
                  style={
                    location.pathname === data.link ||
                    location.pathname.includes(data.link)
                      ? {
                          backgroundColor: "#FFFBE3",
                          borderRadius: "5px",
                        }
                      : {}
                  }
                  className="list_submenu_services_li"
                >
                  <ListItemButton
                    className="listitem_servcies"
                    onClick={() => {
                      navigate(data.link);
                      setSelected(3);
                    }}
                  >
                    <data.icon
                      className={
                        location.pathname === data.link ||
                        location.pathname.includes(data.link)
                          ? "activeicon"
                          : ""
                      }
                    />
                    <ListItemText
                      primary={data.label}
                      className={
                        location.pathname === data.link ||
                        location.pathname.includes(data.link)
                          ? "activelabel"
                          : "menulabel_servcies"
                      }
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </List>
        </>
      )}

      <Dialog open={open} className="bellboy_req" onClose={handleClose}>
        <DialogContent className="bellboy_req">
          {location.pathname === "/valet" ? (
            <ValetDialog
              setOpen={setOpen}
              setMessageSort={setMessageSort}
              setHideMessage={setHideMessage}
            />
          ) : (
            <BellboyDialog
              setOpen={setOpen}
              setMessageSort={setMessageSort}
              setHideMessage={setHideMessage}
            />
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={openReq}
        className="dialog_request"
        onClose={handleCloseReq}
      >
        <DialogContent>
          {whatPage === "/visitors" ? (
            <VisitorRequestDialog
              handleClose={handleClose}
              handleShowAlert={handleShowAlert}
              setOpenVisitor={setOpen}
            />
          ) : (
            <RequestDialog {...obj[whatPage]} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SideBar;
