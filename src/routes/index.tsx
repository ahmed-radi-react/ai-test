import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import SignIn from "@/pages/signin";
import GeneralLayout from "@/layouts/GeneralLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ResetPassword from "@/components/auth/ResetPassword";
import Tenants from "@/pages/dashboard/tenats";
import AmenitiesPage from "@/pages/dashboard/amenities";
import AddNewAmenity from "~/dashboard/amenities/AddNewAmenity";
import ServiceList from "~/reusable/ServiceList";
import Maintenance from "@/pages/dashboard/maintenance";
import AddNewMaintenance from "~/dashboard/maintenance/AddNewMaintenance";
import Parcels from "@/pages/dashboard/parcels";
import Bellboy from "@/pages/dashboard/bellboy";
import AddTenant from "~/dashboard/tenants/AddTenant";
import Visitors from "@/pages/dashboard/visitors";
import Valet from "@/pages/dashboard/valet";
import ValetRequests from "~/dashboard/valet/ValetRequests";
import Notices from "@/pages/dashboard/notices";
import ParcelManagementTable from "~/dashboard/parcels/ParcelManagementTable";
import AddParcel from "~/dashboard/parcels/AddParcel";

import ChargeWallet from "~/dashboard/tenants/chargewallet/ChargeWallet";

import LandScreen from "@/pages/landscreen-onboarding";
import CreateOrganization from "~/landscreen-onboarding/create-organization/CreateOrganization";
import Services from "@/pages/dashboard/services";

import AddNewNotice from "~/dashboard/notices/AddNewNotice";

import ServiceManagement from "~/dashboard/services/ServiceManagement";
import AddService from "~/dashboard/services/addservice/AddService";
import AddUser from "~/dashboard/users/adduser/AddUser";

import AddVisitorsRequests from "~/dashboard/visitors/AddVisitorsRequests";

import Building from "@/pages/dashboard/building";
import AddBuilding from "~/dashboard/building/AddBuilding";

import TenantsList from "~/dashboard/tenants/TenantsList";

import OtherProperties from "@/pages/dashboard/otherproperties";
import AddOtherProperties from "~/dashboard/otherproperties/AddOtherProperties";
import OtherPropertiesTableRequest from "~/dashboard/otherproperties/propertyTable/OtherPropertiesTableRequest";

import GourmetManagementPage from "@/pages/dashboard/gourmetmanagement";
import AddWebsite from "~/dashboard/gourmetmanagement/AddWebsite";
import OtherPropertiesTableList from "~/dashboard/otherproperties/OtherPropertiesTableList";
import Home from "@/pages/dashboard/Home";
import Users from "@/pages/dashboard/users";
import UserManagement from "~/dashboard/users/UserManagement";
import BuildingRequests from "~/dashboard/building/BuildingRequests";
import UsefulInformationPage from "@/pages/dashboard/usefulInformation";
import AddUsefulInformationPage from "~/dashboard/usefulInformation/AddNewUsefulInformation";
// import OnlyMobileAccessBlue from "@/components/auth/OnlyMobileAccessBlue";
import OnlyMobileAccessWhite from "@/components/auth/OnlyMobileAccessWhite";
import NotFound from "@/pages/dashboard/notfound";
import { amenities, maintenance } from "@/utils/constant";
import ContentContextProvider from "@/context/OtherPropertiesContext";
import ContentContextParcelProvider from "@/context/ParcelContext";
import ContentContextServiceListProvider from "@/context/ServiceListContext";
import GeneralLayoutContext from "@/context/GeneralLayoutContext";
import Amenities from "~/dashboard/amenities/Amenities";
import MaintenanceDashboard from "~/dashboard/maintenance/MaintenanceDashboard";

const RootRouter = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: (
        <GeneralLayoutContext>
          <GeneralLayout />
        </GeneralLayoutContext>
      ),
      children: [
        {
          path: "*",
          element: <NotFound />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "",
          element: <Navigate to="amenities" />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/services/serviceslist",
          element: (
            <ContentContextServiceListProvider url="service">
              <ServiceList value={"services"} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "/service/addservice",
          element: <AddService />,
        },
        {
          path: "/services/servicemanagement",
          element: <ServiceManagement />,
        },
        {
          path: "tenants",
          element: <Tenants />,
        },
        {
          path: "/tenants/tenantbuilding",
          element: <TenantsList />,
        },
        {
          path: "tenants/chargewallet",
          element: <ChargeWallet />,
        },
        {
          path: "tenants/addtenant",
          element: <AddTenant />,
        },
        {
          path: `${amenities}`,
          element: <AmenitiesPage />,
        },
        {
          path: `${amenities}/addamenity/`,
          element: <AddNewAmenity />,
        },
        {
          path: `${amenities}/updateamenity/:id`,
          element: <AddNewAmenity />,
        },
        {
          path: `${amenities}/amenitieslist`,
          element: (
            <ContentContextServiceListProvider url="service/amenity">
              <ServiceList value={`${amenities}`} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: `${amenities}/amenitiesrequests`,
          element: (
            <ContentContextServiceListProvider>
              <Amenities isOnlyList={true} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: maintenance,
          element: <Maintenance />,
        },
        {
          path: `${maintenance}/addmaintenance`,
          element: <AddNewMaintenance />,
        },
        {
          path: `${maintenance}/updatemaintenance/:id`,
          element: <AddNewMaintenance />,
        },
        {
          path: `${maintenance}/maintenancelist`,
          element: (
            <ContentContextServiceListProvider url={`service/${maintenance}`}>
              <ServiceList value={maintenance} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "parcels",
          element: <Parcels />,
        },
        {
          path: "parcels/addparcels",
          element: <AddParcel />,
        },
        {
          path: "parcels/management",
          element: (
            <ContentContextParcelProvider>
              <ParcelManagementTable />
            </ContentContextParcelProvider>
          ),
        },
        {
          path: `${maintenance}/maintenancerequests`,
          element: (
            <ContentContextServiceListProvider>
              <MaintenanceDashboard isOnlyList={true} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "bellboy",
          element: <Bellboy />,
        },
        {
          path: "visitors",
          element: <Visitors />,
        },
        {
          path: "visitors/visitorsrequests",
          element: (
            <ContentContextParcelProvider>
              <AddVisitorsRequests />
            </ContentContextParcelProvider>
          ),
        },
        {
          path: "valet",
          element: <Valet />,
        },
        {
          path: "valet/valetrequests",
          element: <ValetRequests />,
        },
        {
          path: "notices",
          element: <Notices />,
        },
        {
          path: "notices/addnewnotice",
          element: <AddNewNotice />,
        },
        {
          path: "/usefulinformation",
          element: <UsefulInformationPage />,
        },
        {
          path: "/usefulinfo/addusefulinfo",
          element: <AddUsefulInformationPage />,
        },
        {
          path: "/users",
          element: <Users />,
        },
        {
          path: "users/usermanagement",
          element: <UserManagement />,
        },
        {
          path: "/users/adduser",
          element: <AddUser />,
        },
        {
          path: "/building",
          element: <Building />,
        },
        {
          path: "/building/buildinglist",
          element: (
            <ContentContextServiceListProvider url="building">
              <ServiceList value={"building"} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "/building/addbuilding",
          element: <AddBuilding />,
        },
        {
          path: "/building/buildingrequests",
          element: <BuildingRequests />,
        },
        {
          path: "/otherproperties",
          element: <OtherProperties />,
        },
        {
          path: "/otherproperties/otherpropertieslist",
          element: (
            <ContentContextServiceListProvider url="service/other_properties">
              <ServiceList value={"Properties"} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "/otherproperties/otherpropertiestablelist",
          element: (
            <ContentContextProvider>
              <OtherPropertiesTableList />
            </ContentContextProvider>
          ),
        },
        {
          path: "/otherproperties/addotherproperties",
          element: <AddOtherProperties />,
        },
        {
          path: "/otherproperties/otherpropertiesrequest",
          element: (
            <ContentContextServiceListProvider url="properties">
              <ServiceList value={"Properties_request"} />
            </ContentContextServiceListProvider>
          ),
        },
        {
          path: "/otherproperties/otherpropertiestablerequest",
          element: (
            <ContentContextProvider>
              <OtherPropertiesTableRequest />
            </ContentContextProvider>
          ),
        },
        {
          path: "/gourmetmanagement",
          element: <GourmetManagementPage />,
        },
        {
          path: "/gourmetmanagement/addwebsite",
          element: <AddWebsite />,
        },
        {
          path: "/usefulInformation",
          element: <UsefulInformationPage />,
        },
        {
          path: "usefulInformation/addusefulinformation",
          element: <AddUsefulInformationPage />,
        },
      ],
    },
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        {
          path: "/onboarding",
          element: <LandScreen />,
        },
        {
          path: "/createorganization",
          element: <CreateOrganization />,
        },
        {
          path: "/login",
          element: <SignIn />,
        },
        {
          path: "/forget-password",
          element: <ResetPassword />,
        },
        {
          path: "/onlymobileaccess",
          element: <OnlyMobileAccessWhite />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
};
export default RootRouter;
