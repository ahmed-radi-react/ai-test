import { CircularProgress } from "@mui/material";
import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "~/dashboard/navbar";
import SideBar from "~/dashboard/sidebar";
import { queryRequest } from "@/requests-body/queries";
import { amenities, breadcrumbs, maintenance } from "@/utils/constant";
import { getCookie } from "@/utils/cookies";
import { ContentContextGeneralLayout } from "@/context/GeneralLayoutContext";

const GeneralLayout = () => {
  const { setBreadcrumb, breadcrumb, setProfileData, profileData }: any =
    useContext(ContentContextGeneralLayout);
  const { data, isSuccess, isLoading } = queryRequest({
    url: `/auth/me`,
    method: "get",
    key: "authmeKey",
  });
  useEffect(() => {
    if (isSuccess) {
      setProfileData(data?.data);
    }
  }, [isSuccess]);
  const location = useLocation();

  useLayoutEffect(() => {
    setBreadcrumb(breadcrumbs[location.pathname as keyof typeof breadcrumbs]);
  }, [location.pathname]);

  const [openMenu, setOpenMenu] = useState(false);

  return !getCookie("token") ? (
    <Navigate to="/onboarding" />
  ) : !isLoading ? (
    <div>
      {/* {location.pathname.includes("parcels") ? <ChangableNavbar /> : <Navbar />} */}
      <Navbar
        openMenu={openMenu}
        setOpenMenu={setOpenMenu}
        profileData={profileData}
      />
      <div
        className={`content ${
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
          location.pathname === "/usefulinformation"
            ? "content_services"
            : ""
        }`}
        onClick={() => {
          openMenu && setOpenMenu(false);
        }}
      >
        {!breadcrumb?.lastText?.length && <SideBar />}
        {location.pathname.includes("valetrequests") && <SideBar />}
        <div
          className={`outlet ${
            !breadcrumb?.lastText?.length ||
            location.pathname.includes("valetrequests")
              ? ""
              : "editOutlet"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <div className="circle_login">
      <CircularProgress disableShrink className="circle" />
    </div>
  );
};

export default GeneralLayout;
