import {
  Box,
  Button,
  CircularProgress,
  ClickAwayListener,
  Dialog,
  DialogContent,
  Fade,
  MenuItem,
  Popper,
} from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as AddIcon } from "@/assets/icons/add.svg";
import {
  amenities,
  maintenance,
  participants,
  valueMap,
} from "@/utils/constant";
import { ReactComponent as MenuTable } from "@/assets/icons/menuCalendar.svg";
import { ReactComponent as TimeIcon } from "@/assets/icons/time.svg";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreWhite.svg";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AllContent from "./dialog/AllContent";
import { ContextType, IDataReq } from "~/types/types";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import RequestDialog from "./RequestDialog";
import { queryRequest } from "@/requests-body/queries";
import emptyImage from "@/assets/images/dropimage.png";
import BackNavigate from "./BackNavigate";
import MessageAlert from "./MessageAlert";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { ReactComponent as CopySvg } from "@/assets/icons/CopySvg.svg";
import { ReactComponent as DeactiveSvg } from "@/assets/icons/deactiveSvg.svg";
import { ReactComponent as OtherPropertiesIcon } from "@/assets/icons/OtherPropertiesIconWhite.svg";
import BuildingDialog from "~/dashboard/building/BuildingDialog";
import ServiceManagement from "~/dashboard/services/ServiceManagement";
import AddApartmentDialog from "./dialog/AddApartmentDialog";
import { ContentContextServiceList } from "@/context/ServiceListContext";
import { ContentContextGeneralLayout } from "@/context/GeneralLayoutContext";
interface IServiceList {
  value: string;
  // url: string;
}
const ServiceList = ({ value }: IServiceList) => {
  const {
    handleClose,
    setOpenContent,
    openContent,
    setAmenityId,
    amenityId,
    setTitleHeader,
    titleheader,
    url,
    setHideMessage,
    setMessageSort,
    setOpen,
    deactive,
    setData,
    data,
    openAddApartment,
    setOpenAddApartment,
    open,
    messagesort,
    hideMessage,
  }: any = useContext(ContentContextServiceList);
  const { state } = useLocation();
  const [menucontent, setMenuContent] =
    useState<{ id: number; label: string }[]>();
  const {
    data: contentData,
    isSuccess: successcontent,
    isLoading,
  } = queryRequest({
    url: `${
      value === `${amenities}`
        ? `/${url}?parentId=6449249d3e4d9445b7087a79&offset=0&limit=10000`
        : `/${url}?offset=0&limit=10000`
    }`,
    method: "get",
    key: url + state?.date + "servicekey",
  });

  const [title, setTitle] = useState("");
  // const [titleheader, setTitleHeader] = useState("");
  useEffect(() => {
    const { title, titleHeader, menuContent } =
      valueMap[value] || valueMap["default"];
    setTitle(title);
    setTitleHeader(titleHeader);
    setMenuContent(menuContent);
  }, [value]);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(true);
  };
  const handleNavigate = () => {
    if (value === amenities) {
      navigate(`/${amenities}/addamenity`);
    } else if (value === "building") {
      navigate("/building/addbuilding");
    } else if (value === "Properties" || value === "Properties_request") {
      navigate("/otherproperties/addotherproperties");
    } else if (value === "services") {
      navigate("/service/addservice");
    } else {
      navigate(`/${maintenance}/addmaintenance`);
    }
  };
  const handleNavigateRequest = (_id: string) => {
    if (value === amenities) {
      navigate(`/${amenities}/amenitiesrequests`);
    } else if (value === "Properties") {
      // navigate("/otherproperties/otherpropertiestablelist");
      navigate("/otherproperties/otherpropertiestablerequest");
    } else if (value === "Properties_request") {
      navigate("/otherproperties/otherpropertiesrequesttablelist");
    } else if (value === maintenance) {
      navigate(`/${maintenance}/maintenancerequests`);
    } else if (value === "building") {
      navigate("/building/buildingrequests", { state: _id });
    }
  };
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openanchor = Boolean(anchorEl);
  const [copy, setCopy] = useState("");

  const id = open ? "simple-popper" : undefined;
  const handleCloseDialog = () => {
    setOpenContent(0);
  };
  const handleClickAnchor = (
    event: React.MouseEvent<HTMLElement>,
    link: string,
    index: string
  ) => {
    setAmenityId(index);
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setCopy(link);
  };

  // open edit page from dropdown list
  const [sendDataToEdit, setSendDataToEdit] = useState<any>();
  const { data: detailData, isSuccess: successdetail } = queryRequest({
    url: `/${url}/${amenityId}`,
    method: "get",
    key: amenityId + "deactiveKey",
  });

  useEffect(() => {
    if (successdetail) {
      setSendDataToEdit(detailData.data);
    }
  }, [successdetail, detailData?.data]);
  const handleMenuClick = (index: number) => {
    if (value === "building" && index === 5) {
      navigate("/building/addbuilding", { state: detailData?.data });
    } else {
      if (index === 3) {
        setMessageSort({
          icon: CopySvg,
          message: `${titleheader} link has been Copied!`,
          title: "Copied",
          style: "copy",
        });
        setHideMessage(true);
        navigator.clipboard.writeText(copy);
        setTimeout(() => {
          setHideMessage(false);
        }, 3000);
        setAnchorEl(null);
      } else if (index === 7) {
        if (!location.pathname.includes("building")) {
          navigate(`/${amenities}/addamenity`, { state: sendDataToEdit });
        }
        if (location.pathname.includes("building")) {
          setOpenContent(index);
        }
      } else {
        setAnchorEl(null);
        setOpenContent(index);
      }
    }
  };
  useEffect(() => {
    if (successcontent) {
      setData(contentData?.data?.items);
    }
  }, [successcontent, contentData?.data]);
  const hanldeClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    let time: ReturnType<typeof setTimeout>;
    if (state?.data === "success") {
      setMessageSort({
        icon: CongratsIcon,
        message: `${state?.message} has been added Successfully`,
        title: "Done",
        style: "done",
      });
      setHideMessage(true);
      time = setTimeout(() => {
        setHideMessage(false);
      }, 3000);
    }
    window.history.replaceState({}, document.title);
    return () => {
      clearTimeout(time);
    };
  }, [state?.data]);
  const [changeTable, setChangeTable] = useState(false);
  const handleChangeTable = () => {
    setChangeTable((prev) => !prev);
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
  const valueMe = useContext(ContentContextGeneralLayout);

  const handleOpenAddApartment = (arg: boolean) => {
    setOpenAddApartment(arg);
  };

  if (!isLoading) {
    if (!changeTable) {
      return (
        <div>
          <div>
            <Popper
              id={id}
              ref={popperRef}
              open={openanchor}
              anchorEl={anchorEl}
              className={`poperaction amenity maintenancedialog ${
                anchorEl ? "openpopper" : ""
              }`}
              transition
            >
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={500}>
                  <Box
                    sx={{ bgcolor: "white" }}
                    boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
                  >
                    {menucontent?.map((item, index) => {
                      return (
                        <MenuItem
                          value=""
                          className="relationshipitem"
                          key={index}
                          onClick={() => handleMenuClick(item.id)}
                        >
                          {item.label}
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
          <div>
            {hideMessage && (
              <div className="content content_alert">
                <MessageAlert messagesort={messagesort} />
              </div>
            )}
            <Container className="amenity_maintenance_list">
              <BackNavigate
                title={
                  title === "Properties Requests" || title === "Properties"
                    ? "Other Properties"
                    : title
                }
              />
              <div className="amenity_manintenance_list_header">
                <span>
                  {title}{" "}
                  {title === "Buildings" || title === "Properties Requests"
                    ? ""
                    : "List"}
                </span>
                {!title.includes("Building") &&
                !title.includes("Properties") &&
                !title.includes("Service") ? (
                  <Button
                    variant="contained"
                    className="list_button"
                    onClick={handleClick}
                  >
                    <AddIcon />
                    Add {title === "Amenities" ? "Amenity" : "Maintenance"}{" "}
                    request
                  </Button>
                ) : title.includes("Service") ? (
                  <div className="service_view_btn_table">
                    <Button
                      variant="contained"
                      className="list_button table"
                      onClick={handleChangeTable}
                    >
                      <MenuTable />
                      Table View
                    </Button>
                    <Button
                      variant="contained"
                      className="list_button"
                      onClick={() => navigate("/service/addservice")}
                    >
                      <AddIcon />
                      Add New Service
                    </Button>
                  </div>
                ) : title.includes("Properties") ? (
                  <div className="btn_container">
                    <Button
                      variant="contained"
                      className="addbuilding"
                      onClick={handleClick}
                    >
                      <AddIcon /> Add Property Request
                    </Button>
                    <Button
                      variant="contained"
                      className="list_button"
                      onClick={() =>
                        navigate("/otherproperties/addotherproperties")
                      }
                    >
                      <OtherPropertiesIcon />
                      Add New Property
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="contained"
                    className="addbuilding"
                    onClick={() => navigate("/building/addbuilding")}
                  >
                    <AddIcon />
                    Add Building
                  </Button>
                )}
                {!!open && (
                  <div className="close" onClick={hanldeClose}>
                    <Elipse />
                    <CloseIcon />
                  </div>
                )}
                <Dialog
                  open={open}
                  onClose={() => handleClose(true)}
                  className="dialog_request"
                >
                  <DialogContent>
                    <RequestDialog
                      data={data}
                      title={title}
                      setOpen={setOpen}
                      setHideMessage={setHideMessage}
                      url={url}
                      setMessageSort={setMessageSort}
                      handleCloseDialog={handleClose}
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="amenities_maintenance_list_div">
                {data?.map((item: IDataReq, index: number) => {
                  return (
                    <Box
                      className="list_item"
                      key={index}
                      boxShadow={"0px 0px 40px 2px rgba(0, 0, 0, 0.08)"}
                      borderRadius="15px"
                    >
                      <div className="image__list">
                        <img
                          src={
                            item?.images?.[0]?.url ||
                            item?.icon?.url ||
                            emptyImage
                          }
                          alt=" list image"
                          className={
                            item._id === deactive && deactive ? "deactive" : ""
                          }
                        />
                        {item._id === deactive && deactive && (
                          <div className="deactive_div">
                            <DeactiveSvg />
                            <span className="span">Deactivated</span>
                          </div>
                        )}
                        <Button
                          onClick={(e) =>
                            handleClickAnchor(e, item.link, item._id)
                          }
                        >
                          <MoreIcon />
                        </Button>
                      </div>
                      <div className="item_content">
                        <div>
                          <div className="_name_active">
                            <div className="_name">
                              <span>{item.name}</span>
                            </div>
                            <div className="active_icon"></div>
                          </div>
                          <div className="time_div">
                            <TimeIcon />
                            <span>{item.time}</span>
                          </div>
                          <div className="participants">
                            <div className="partic_div">
                              {participants.map((item, index) => {
                                return (
                                  <div key={index} className="image_div">
                                    <img src={item.img} alt="participants " />
                                  </div>
                                );
                              })}
                              <span>+{item.participantsCount}</span>
                            </div>
                            <span className="participant_span">
                              Participants
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="contained"
                          className="request"
                          onClick={() => {
                            handleNavigateRequest(item?._id);
                          }}
                        >
                          {item?.numberOfRequests} View Requests
                        </Button>
                      </div>
                    </Box>
                  );
                })}
                <Button
                  variant="contained"
                  className="add_amenity_maintenance"
                  onClick={handleNavigate}
                >
                  <AddIcon />
                  <span>
                    Add New{" "}
                    {title === "Amenities"
                      ? "Amenity"
                      : title === "Buildings"
                      ? "Building"
                      : title === "Properties"
                      ? "Properties"
                      : title === "Services"
                      ? "Service"
                      : "Maintenance"}
                  </span>
                </Button>
              </div>
              {!!openContent && (
                <div className="close" onClick={handleCloseDialog}>
                  <Elipse />
                  <CloseIcon />
                </div>
              )}
              <Dialog
                open={!!openContent}
                onClose={() => handleClose(false)}
                className="action"
              >
                {value !== "building" ? (
                  <AllContent profile={valueMe?.profileData} />
                ) : (
                  <BuildingDialog />
                )}
              </Dialog>
              {openAddApartment && (
                <div
                  className="close"
                  onClick={() => handleOpenAddApartment(false)}
                >
                  <Elipse />
                  <CloseIcon />
                </div>
              )}
              <Dialog
                open={openAddApartment}
                onClose={() => handleOpenAddApartment(false)}
                className="action"
              >
                <AddApartmentDialog
                  amenityId={amenityId}
                  setOpenAddApartment={setOpenAddApartment}
                  setHideMessage={setHideMessage}
                  setMessageSort={setMessageSort}
                />
              </Dialog>
            </Container>
          </div>
        </div>
      );
    } else {
      return <ServiceManagement setChangeTable={setChangeTable} data={data} />;
    }
  } else {
    return <CircularProgress disableShrink className="circle" />;
  }
};

export default ServiceList;
