import logo from "@/assets/logo/volanteLogo.png";
import { ReactComponent as MenuIcon } from "@/assets/icons/menu.svg";
import { AppBar, Box, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as HelpIcon } from "@/assets/icons/help.svg";
import { useLocation, useNavigate } from "react-router-dom";
import {
  amenities,
  breadcrumbs,
  maintenance,
  menuBox,
  novuConfig,
} from "@/utils/constant";
import { ReactComponent as ArrowNavIcon } from "@/assets/icons/arrownav.svg";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { IProfileData } from "~/types/types";
import { ReactComponent as Actiondown } from "@/assets/icons/actiondown.svg";
import { ReactComponent as Message } from "@/assets/icons/message.svg";
import { NovuProvider } from "@novu/notification-center";
import Noty from "./Novu";
import { queryRequest } from "@/requests-body/queries";
const Navbar = ({
  profileData,
  setOpenMenu,
  openMenu,
}: {
  profileData?: IProfileData;
  openMenu: boolean;
  setOpenMenu: Dispatch<SetStateAction<boolean>>;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [breadcrumb, setBreadcrumb] = useState({
    lastText: "",
    text: "Tenants",
    path: "/tenants",
  });

  useEffect(() => {
    if (
      location.pathname.includes(`/${amenities}/updateamenity`) ||
      location.pathname.includes(`/${maintenance}/updatemaintenance`)
    ) {
      const path = location.pathname.slice(
        0,
        location.pathname.lastIndexOf("/")
      );
      setBreadcrumb(breadcrumbs[path as keyof typeof breadcrumbs]);
    } else {
      setBreadcrumb(breadcrumbs[location.pathname as keyof typeof breadcrumbs]);
    }
  }, [location.pathname]);
  const handleNavigate = () => navigate("/home");
  const handleNavigateBreadcrumb = () => navigate(breadcrumb?.path);
  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const { data, isSuccess, isLoading } = queryRequest({
    url: `/auth/me`,
    method: "get",
    key: "authmeKey",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (isSuccess) {
      setUserId(data?.data?._id);
    }
  }, [isSuccess]);
  return (
    <AppBar position="static" className="appbar">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="navbar ">
            <div className="logodiv">
              <div className="logo_div" onClick={handleNavigate}>
                <img src={logo} alt="logo" className="logo" />
              </div>
              <div className="nav_text">
                <Box
                  display="flex"
                  borderRadius="10px"
                  paddingBottom={1}
                  paddingTop={1}
                  alignItems={"center"}
                  width="72px"
                  className={`menubox  ${
                    location.pathname === "/services" ? "justify" : ""
                  }`}
                  onClick={handleOpenMenu}
                >
                  <MenuIcon />
                  {location.pathname !== "/services" && (
                    <span>{breadcrumb?.lastText === "" ? 1 : 2}</span>
                  )}
                </Box>
                {breadcrumb && (
                  <div className="navigateDiv">
                    {location.pathname !== "/services" && (
                      <ArrowNavIcon className="breadcrumbicon" />
                    )}
                    {breadcrumb?.lastText !== "" && (
                      <div
                        onClick={handleNavigateBreadcrumb}
                        className="div_breadcrumb"
                      >
                        <span className="navslastspan">
                          {breadcrumb?.lastText}
                        </span>
                      </div>
                    )}
                    {breadcrumb?.lastText !== "" &&
                      location.pathname !== "/services" && (
                        <ArrowNavIcon className="breadcrumbicon_active" />
                      )}
                    <div className="div_breadcrumb">
                      <span className="breadcrumb">{breadcrumb?.text}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="divnavinfo">
              <div className="infodiv">
                <Box
                  component="form"
                  width="277px"
                  height="40px"
                  position={"relative"}
                >
                  <input type="text" className="input" placeholder="Search" />
                  <SearchIcon className="searchIcon" />
                </Box>
                <Box width="100px" height="40px" className="helpbox">
                  <span>Help</span>
                  <HelpIcon />
                </Box>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <NovuProvider
                    applicationIdentifier={novuConfig.applicationIdentifier}
                    backendUrl={novuConfig.backendUrl}
                    // socketUrl={novuConfig.socketUrl}
                    initialFetchingStrategy={{
                      fetchUnseenCount: true,
                      fetchOrganization: true,
                      fetchNotifications: true,
                      fetchUserPreferences: true,
                    }}
                    subscriberId={userId}
                    // subscriberHash={"4297f44b13955235245b2497399d7a93"}
                  >
                    <Noty />
                  </NovuProvider>
                </Box>
                <div className="userdiv">
                  <span className="userspan">Welcome Volante!</span>
                  {/* <span className="user">{profileData?.firstName}</span> */}
                  <span className="user">Admin</span>
                </div>
              </div>
              <div className="userIcon">
                <img
                  // src={profileData?.image && profileData?.image.url}
                  src={logo}
                  alt="user imaege"
                />
                <div className="statusicon">
                  <div></div>
                </div>
                {!!profileData?.numberOfNotifications &&
                  profileData?.numberOfNotifications >= 1 && (
                    <div className="notification">
                      <span className="numnotification">
                        {profileData?.numberOfNotifications}
                      </span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </Toolbar>
        {openMenu && (
          <div className="menu_box_chat">
            <div className="menubox_div">
              {menuBox.map((item) => {
                return (
                  <div key={item.id} className="items">
                    <span className="menu_title">{item.title}</span>
                    {item.items.map((div) => {
                      return (
                        <div key={div.id} className="menu_item">
                          {div.item}
                          {div.id === 1 && <Actiondown />}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div className="chat_div_ebchat">
              <div className="chat">
                <div>
                  <Message />
                </div>
                <span>EB Chat</span>
                <span>Open Chat</span>
              </div>
              <div className="chat">
                <div></div>
                <span>EB Chat</span>
                <span>Open Chat</span>
              </div>
            </div>
          </div>
        )}
      </Container>
    </AppBar>
  );
};

export default Navbar;
