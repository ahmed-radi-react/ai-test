import { ReactComponent as AmenitiesIcon } from "@/assets/icons/amenities.svg";
import { ReactComponent as MaintenanceIcon } from "@/assets/icons/maintenance.svg";
import { ReactComponent as ParcelsIcon } from "@/assets/icons/parcels.svg";
import { ReactComponent as VisitorsIcon } from "@/assets/icons/visitors.svg";
import { ReactComponent as NoticesIcon } from "@/assets/icons/notification.svg";
import { ReactComponent as GourmetIcon } from "@/assets/icons/gourmet.svg";
import { ReactComponent as BellboyIcon } from "@/assets/icons/bellboy.svg";
import { ReactComponent as ValetIcon } from "@/assets/icons/valet.svg";
import { ReactComponent as TenantIcon } from "@/assets/icons/TenantIcon.svg";
import { ReactComponent as UserIcon } from "@/assets/icons/user.svg";
import { ReactComponent as SettingsIcon } from "@/assets/icons/settings.svg";
import { ReactComponent as AnalysticsIcon } from "@/assets/icons/AnalysticsIcon.svg";
import { ReactComponent as SupportIcon } from "@/assets/icons/support.svg";
import { ReactComponent as SupportIconSvg } from "@/assets/icons/SupportIconSvg.svg";
import { ReactComponent as TotalTaskIcon } from "@/assets/images/charger.svg";
import { ReactComponent as ProgressIcon } from "@/assets/images/load.svg";
import { ReactComponent as CompletedIcon } from "@/assets/images/check.svg";
import { ReactComponent as MaintenanceIconover } from "@/assets/icons/mantenance.svg";
import PasswordIcon from "@mui/icons-material/Password";
import male_img from "@/assets/images/Male.png";
import male from "@/assets/images/Male.png";
import amenities1 from "@/assets/images/amenities1.png";
import amenities2 from "@/assets/images/amenities2.png";
import amenities3 from "@/assets/images/amenities3.png";
import swiming_img from "@/assets/images/swiming.png";
import tennis_img from "@/assets/images/tennis.png";
import basketball_img from "@/assets/images/basketball.png";
import football_img from "@/assets/images/football.png";
import man_image from "@/assets/images/manimage.png";
import electrican_img from "@/assets/images/electrican.png";
import cleaning_img from "@/assets/images/cleaning.png";
import plumber_img from "@/assets/images/plumber.png";
import test_png from "@/assets/images/Testpng.png";
import testImage from "@/assets/images/Testpng.png";
import { FunctionComponent, SVGProps } from "react";
import { ReactComponent as GenerealInfoIcon } from "@/assets/icons/generelinfo.svg";
import { ReactComponent as LocationIcon } from "@/assets/icons/locationSvg.svg";
import { ReactComponent as ValidIcon } from "@/assets/icons/validDoc.svg";
import { ReactComponent as InterestIcon } from "@/assets/icons/interestsSvg.svg";
import { ReactComponent as FamilyIcon } from "@/assets/icons/familySvg.svg";
import { ReactComponent as AcountIcon } from "@/assets/icons/accountSvg.svg";
import GeneralInformation from "~/dashboard/tenants/addtenant/GeneralInformation";
import Location from "~/dashboard/tenants/addtenant/Location";
import Validation from "~/dashboard/tenants/addtenant/Validation";
import Interests from "~/dashboard/tenants/addtenant/Interests";
import FamilyGuestsPets from "~/dashboard/tenants/addtenant/familyGuestPets/FamilyGuestsPets";
import Account from "~/dashboard/tenants/addtenant/Account";
import { ReactComponent as HourIcon } from "@/assets/icons/24hourIcon.svg";
import { ReactComponent as MorningIcon } from "@/assets/icons/morningSunIcon.svg";
import { ReactComponent as MoonIcon } from "@/assets/icons/moonIcon.svg";
import { ReactComponent as HoldIcon } from "@/assets/icons/holdIcon.svg";
import { ReactComponent as WaitingResponse } from "@/assets/icons/WaitingResponseIcon.svg";
import { ReactComponent as SendToApartmentIcon } from "@/assets/icons/SendToApartmentIcon.svg";
import { ReactComponent as CancelIcon } from "@/assets/icons/CanceledIcon.svg";
import receptionImg from "@/assets/images/reception.png";
import maintenanceImg from "@/assets/images/maintenance.png";
import parcelsImg from "@/assets/images/parcels.png";
import amenitiesImg from "@/assets/images/amenitiess.png";
import bellboyImg from "@/assets/images/bellboy.png";
import visitorsImg from "@/assets/images/visitors.png";
import valetImg from "@/assets/images/valet.png";
import loungeImg from "@/assets/images/lounge.png";
import usefulinfoImg from "@/assets/images/usefulinfo.png";
import noticesImg from "@/assets/images/notices.png";
import { ReactComponent as BasicInfo } from "@/assets/icons/basicInfo.svg";
import { ReactComponent as AvailabilityIcon } from "@/assets/icons/availabl.svg";
import { ReactComponent as DetailIcon } from "@/assets/icons/proportyDetail.svg";
import AddServiceInfo from "~/dashboard/services/addservice/AddServiceInfo";
import SelectAvailable from "~/dashboard/services/addservice/SelectAvailable";
import ProportyDetails from "~/dashboard/services/addservice/ProportyDetails";
import AddUserInfo from "~/dashboard/users/adduser/AddUserInfo";
import AddRoleUser from "~/dashboard/users/adduser/AddRoleUser";
import { ReactComponent as Building } from "@/assets/icons/building.svg";
import { ReactComponent as OtherPropertiesIcon } from "@/assets/icons/OtherPropertiesIcon.svg";
import { ReactComponent as UsefulInformationIcon } from "@/assets/icons/usefulinfo.svg";
import { ReactComponent as CommunicationIcon } from "@/assets/icons/CommunicationIcon.svg";

import { ReactComponent as WiFiIcon } from "@/assets/icons/Wi-Fi.svg";
import { ReactComponent as ACIcon } from "@/assets/icons/AC.svg";
import { ReactComponent as DoubleBedIcon } from "@/assets/icons/Double Bed.svg";
import { ReactComponent as HomeIcon } from "@/assets/icons/HomeIconSidebar.svg";
import { ReactComponent as ServiceIcon } from "@/assets/icons/ServiceIcon.svg";
import { ReactComponent as UserIconSvg } from "@/assets/icons/UserIcon.svg";
import { ReactComponent as BuildingMainDashboard } from "@/assets/icons/buildingMainDashboard.svg";
import { ReactComponent as ReserveMainDashboard } from "@/assets/icons/reserveMainDashboard.svg";
import { ReactComponent as securityUserMainDashboard } from "@/assets/icons/securityUserMainDashboard.svg";
import { ReactComponent as profile2UserMainDashboard } from "@/assets/icons/profile2UserMainDashboard.svg";
import {
  THandleChange,
  ThandleChangeStatus,
  TimeSlot,
  TStatusses,
} from "~/types/types";
import moment from "moment";
import SetPassword from "~/dashboard/tenants/addtenant/SetPassword";
import { Theme } from "@mui/material";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutationResult,
} from "@tanstack/react-query";

export const amenities = "amenities";
export const maintenance = "maintenance";

export const sidebardata = [
  {
    id: 1,
    label: "Home",
    icon: HomeIcon,
    link: "/home",
  },
  {
    id: 2,
    label: "Building",
    icon: Building,
    link: "/building",
  },
  {
    id: 3,
    label: "Services",
    icon: ServiceIcon,
    link: "/services",
    subLinks: [
      {
        id: 1,
        label: "Amenities",
        icon: AmenitiesIcon,
        link: `/${amenities}`,
      },
      {
        id: 2,
        label: "Maintenance",
        icon: MaintenanceIcon,
        link: `/${maintenance}`,
      },
      {
        id: 3,
        label: "Parcels",
        icon: ParcelsIcon,
        link: "/parcels",
      },
      {
        id: 4,
        label: "Visitors",
        icon: VisitorsIcon,
        link: "/visitors",
      },
      {
        id: 5,
        label: "Notices",
        icon: NoticesIcon,
        link: "/notices",
      },
      {
        id: 6,
        label: "Gourmet",
        icon: GourmetIcon,
        link: "/gourmetmanagement",
      },
      {
        id: 7,
        label: "Bellboy",
        icon: BellboyIcon,
        link: "/bellboy",
      },
      {
        id: 8,
        label: "Valet",
        icon: ValetIcon,
        link: "/valet",
      },
      {
        id: 9,
        label: "Other Properties",
        icon: OtherPropertiesIcon,
        link: "/otherproperties",
      },
      {
        id: 10,
        label: "Useful Information",
        icon: UsefulInformationIcon,
        link: "/usefulinformation",
      },
    ],
  },
  {
    id: 4,
    label: "Users",
    icon: UserIconSvg,
    link: "/users",
  },
  {
    id: 5,
    label: "Tenants",
    icon: TenantIcon,
    link: "/tenants",
  },
  {
    id: 6,
    label: "Communication",
    icon: CommunicationIcon,
    link: "/communication",
    disable: true,
  },
  {
    id: 7,
    label: "Analytics",
    icon: AnalysticsIcon,
    link: "/analytics",
    disable: true,
  },
  {
    id: 8,
    label: "Support",
    icon: SupportIconSvg,
    link: "/support",
    disable: true,
  },
];
export const sidebarfooter = [
  {
    label: "User",
    icon: UserIcon,
    disable: true,
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    disable: true,
  },
  {
    label: "Customers Support",
    icon: SupportIcon,
    disable: true,
  },
];

export const menuitem = [
  { label: "Share" },
  { label: "Rename" },
  { label: "Edit" },
  { label: "Copy Tenant link" },
  { label: "Deactivate" },
  { label: "Charge Wallet" },
  { label: "Delete" },
];

export const tableStaticData = new Array(100)
  .fill(undefined)
  .map((item, key) => {
    return (item = {
      id: { key },
      buildingNum: 2,
      tenants: "Cersei",
      apartmentNum: 42,
      familyMem: 2,
      guestNum: 2,
      avatar: male_img,
    });
  });

export const breadcrumbs = {
  "/home": { lastText: "", text: "Home", path: "/home" },
  "/tenants": { lastText: "", text: "Tenants", path: "/tenants" },
  "/tenants/addtenant": {
    lastText: "Tenants ",
    text: "Add Tenant ",
    path: "/tenants",
  },
  "/tenants/chargewallet": {
    lastText: "Tenants ",
    text: "Charge Wallet ",
    path: "/tenants",
  },
  [`/${amenities}`]: { lastText: "", text: "Amenities", path: `/${amenities}` },
  [`/${amenities}/addamenity`]: {
    lastText: "Amenities",
    text: "Add Amenities",
    path: `/${amenities}`,
  },
  [`/${amenities}/amenitieslist`]: {
    lastText: "Amenities",
    text: "Amenities List",
    path: `/${amenities}`,
  },
  [`/${amenities}/amenitiesrequests`]: {
    lastText: "Amenities",
    text: " Amenities Requests",
    path: `/${amenities}`,
  },
  [`/${maintenance}`]: {
    lastText: "",
    text: "Maintenance",
    path: `/${maintenance}`,
  },
  [`/${maintenance}/addmaintenance`]: {
    lastText: "Maintenance",
    text: "Add Maintenance ",
    path: `/${maintenance}`,
  },
  [`/${amenities}/updateamenity`]: {
    lastText: "Amenities",
    text: "Update Amenities",
    path: `/${amenities}`,
  },
  [`/${maintenance}/maintenancelist`]: {
    lastText: "Maintenance",
    text: "Maintenance List",
    path: `/${maintenance}`,
  },
  "/bellboy": { lastText: "", text: "Bellboy", path: "/bellboy" },
  "/bellboy/bellboylist": {
    lastText: "Bellboy",
    text: "Bellboy List",
    path: "/bellboy",
  },
  "/parcels": {
    lastText: "",
    text: "Parcels",
    path: "/parcels",
  },
  "/parcels/addparcels": {
    lastText: "Parcels",
    text: "Add Parcels",
    path: "/parcels",
  },
  "/parcels/management": {
    lastText: "Parcels",
    text: "Parcels Management ",
    path: "/parcels",
  },
  "/visitors": { lastText: "", text: "Visitors ", path: "/visitors" },
  "/visitors/visitorsrequests": {
    lastText: "Visitors",
    text: "Visitors Requests",
    path: "/visitors",
  },
  "/visitors/addvisitorsrequests": {
    lastText: "Visitors Requests",
    text: "Add Visitors Requests",
    path: "/visitors/visitorsrequests",
  },
  "/valet": { lastText: "", text: "Valet", path: "/valet" },
  "/valet/valetrequests": {
    lastText: "Valet",
    text: "Valet Requests",
    path: "/valet",
  },
  "/notices": { lastText: "", text: "Notices", path: "/notices" },
  "/notices/addnewnotice": {
    lastText: "Notices",
    text: "Add New Notice",
    path: "/notices",
  },
  "/usefulinfo": {
    lastText: "",
    text: "Useful Information",
    path: "/usefulinfo",
  },
  "/usefulinfo/addusefulinfo": {
    lastText: "Useful Information",
    text: "Add Useful Information",
    path: "/usefulinfo",
  },
  [`/${maintenance}/updatemaintenance`]: {
    lastText: "Maintenance",
    text: "Update Maintenance",
    path: `/${maintenance}`,
  },
  [`/${maintenance}/maintenancerequests`]: {
    lastText: "Maintenance",
    text: "Maintenance Requests",
    path: `/${maintenance}`,
  },
  "/services/servicemanagement": {
    lastText: "Home",
    text: "User Management",
    path: "/services/servicemanagement",
  },
  "/service/addservice": {
    lastText: "Home",
    text: "Add Service",
    path: "/services",
  },
  "/users": { lastText: "", text: "Users", path: "/users" },
  "/users/usermanagement": {
    lastText: "Users",
    text: "User Management",
    path: "/users",
  },
  "/users/adduser": {
    lastText: "User",
    text: "Add User",
    path: "/users",
  },

  "/building": { lastText: "", text: "Building", path: "/building" },
  "/building/buildinglist": {
    lastText: "Building",
    text: "Building List",
    path: "/building",
  },
  "/building/addbuilding": {
    lastText: "Building List",
    text: "Add Building",
    path: "/building/buildinglist",
  },
  "/building/buildingrequests": {
    lastText: "Buildings",
    text: "Building Requests",
    path: "/building",
  },

  "/tenants/tenantbuilding": {
    lastText: "Tenants",
    text: "Tenants Building A",
    path: "/tenants",
  },

  "/otherproperties": {
    lastText: "",
    text: "Other Properties",
    path: "/otherproperties",
  },
  "/otherproperties/otherpropertieslist": {
    lastText: "Other Properties",
    text: "Properties List",
    path: "/otherproperties",
  },
  "/otherproperties/otherpropertiestablelist": {
    lastText: "Other Properties",
    text: "Properties List",
    path: "/otherproperties",
  },
  "/otherproperties/addotherproperties": {
    lastText: "Other Properties",
    text: "Add Other Properties",
    path: "/otherproperties",
  },
  "/otherproperties/otherpropertiesrequest": {
    lastText: "Other Properties",
    text: "Properties Requests",
    path: "/otherproperties",
  },
  "/otherproperties/otherpropertiestablerequest": {
    lastText: "Other Properties",
    text: "Properties Requests",
    path: "/otherproperties",
  },
  "/gourmetmanagement": {
    lastText: "",
    text: "Gourmet",
    path: "/gourmetmanagement",
  },
  "/gourmetmanagement/addwebsite": {
    lastText: "Gourmet",
    text: "Add Website",
    path: "/gourmetmanagement",
  },
  "/services/serviceslist": {
    lastText: "Services",
    text: "Services list",
    path: "/services",
  },
  "/addfeatures/calendarview": {
    lastText: "Add Features",
    text: "Calendar View",
    path: "/addfeatures",
  },
  "/usefulinformation": {
    lastText: "",
    text: "Useful Information",
    path: "/usefulinformation",
  },
  "/usefulinformation/addusefulinformation": {
    lastText: "Useful Information",
    text: "Add New Useful Information",
    path: "/usefulinformation",
  },
};

export const amenitiesListing = [
  {
    label: "Amenitie Name 1",
    img: amenities1,
  },
  {
    label: "Amenitie Name 2",
    img: amenities2,
  },
  {
    label: "Amenitie Name 3",
    img: amenities3,
  },
  {
    label: "Amenitie Name 3",
    img: amenities3,
  },
  {
    label: "Amenitie Name 3",
    img: amenities3,
  },
  {
    label: "Amenitie Name 3",
    img: amenities3,
  },
];

export interface IOverview {
  taskNumber?: number | undefined;
  amenitiesType?: string;
  Img: FunctionComponent<SVGProps<SVGSVGElement>>;
  valuecompleted?: number;
  valueprogress?: number;
}

export const amenitiesOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const maintenanceOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Feedbacks",
    Img: MaintenanceIconover,
  },
];
export const visitorsOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Feedbacks",
    Img: MaintenanceIconover,
  },
];

export const visitorsTableAddRequestSort = [
  { id: 0, label: "All", count: 23 },
  {
    id: 1,
    label: "Completed",
    count: 23,
  },
  {
    id: 2,
    label: "Rejected",
    count: 13,
  },
  {
    id: 3,
    label: "Pending",
    count: 23,
  },
];
export const bellboyOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Feedbacks",
    Img: MaintenanceIconover,
  },
];
export const valetOverview: IOverview[] = [
  {
    taskNumber: 1150,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 1150,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 1150,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 1150,
    amenitiesType: "Feedbacks",
    Img: MaintenanceIconover,
  },
];
export const usefulInfoOverview: IOverview[] = [
  {
    taskNumber: 1150,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 1150,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 1150,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 1150,
    amenitiesType: "Feedbacks",
    Img: MaintenanceIconover,
  },
];
export const noticesOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const buildingsOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const otherPropertiesOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const ValetOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const UsefulInformationOverview: IOverview[] = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const trueValues = [
  {
    name: "1",
    uv: 7,
    pv: 1,
    amt: 15,
  },
  {
    name: "2",
    uv: 6,
    pv: 2,
    amt: 1,
  },
  {
    name: "3",
    uv: 5,
    pv: 1,
    amt: 14,
  },
  {
    name: "4",
    uv: 4,
    pv: 2,
    amt: 14,
  },
  {
    name: "5",
    uv: 3,
    pv: 1,
    amt: 14,
  },
  {
    name: "6",
    uv: 8,
    pv: 1,
    amt: 14,
  },
  {
    name: "7",
    uv: 7,
    pv: 1,
    amt: 14,
  },
  {
    name: "8",
    uv: 5,
    pv: 3,
    amt: 14,
  },
  {
    name: "9",
    uv: 4,
    pv: 1,
    amt: 14,
  },
  {
    name: "10",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "11",
    uv: 1,
    pv: 2,
    amt: 14,
  },
  {
    name: "12",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "13",
    uv: 4,
    pv: 5,
    amt: 14,
  },
  {
    name: "14",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "15",
    uv: 1,
    pv: 7,
    amt: 14,
  },
  {
    name: "16",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "17",
    uv: 4,
    pv: 4,
    amt: 14,
  },
  {
    name: "18",
    uv: 2,
    pv: 7,
    amt: 14,
  },
  {
    name: "19",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "20",
    uv: 3,
    pv: 6,
    amt: 14,
  },
  {
    name: "21",
    uv: 1,
    pv: 5,
    amt: 14,
  },
  {
    name: "22",
    uv: 2,
    pv: 5,
    amt: 14,
  },
  {
    name: "23",
    uv: 1,
    pv: 7,
    amt: 14,
  },
  {
    name: "24",
    uv: 2,
    pv: 8,
    amt: 14,
  },
  {
    name: "25",
    uv: 1,
    pv: 7,
    amt: 14,
  },
  {
    name: "26",
    uv: 1,
    pv: 7,
    amt: 14,
  },
  {
    name: "27",
    uv: 3,
    pv: 7,
    amt: 14,
  },
  {
    name: "28",
    uv: 2,
    pv: 6,
    amt: 14,
  },
  {
    name: "29",
    uv: 3,
    pv: 7,
    amt: 14,
  },
  {
    name: "30",
    uv: 1,
    pv: 4,
    amt: 14,
  },
  {
    name: "31",
    uv: 2,
    pv: 7,
    amt: 14,
  },
];
export const chartButton = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Day",
  },
  { id: 3, label: "Week" },
  { id: 4, label: "Month" },
  { id: 5, label: "Year" },
];

export const timeWeekDay = [
  {
    id: 1,
    label: "SUN",
    name: "sunday",
  },
  {
    id: 2,
    label: "MON",
    name: "monday",
  },
  {
    id: 3,
    label: "TUE",
    name: "tuesday",
  },
  {
    id: 4,
    label: "WED",
    name: "wednesday",
  },
  {
    id: 5,
    label: "THU",
    name: "thursday",
  },
  {
    id: 6,
    label: "FRI",
    name: "friday",
  },
  {
    id: 7,
    label: "SAT",
    name: "saturday",
  },
];
export const slotsAvailable = [
  {
    id: 1,
    label: "Morning",
    time: "From 8 AM  to 12 PM",
    name: "morning",
    from: "08:00",
    to: "12:00",
  },

  {
    id: 3,
    label: "Evening",
    time: "From 4 PM to 8 PM",
    name: "evening",
    from: "16:00",
    to: "20:00",
  },
];
export const amenityBuilding = new Array(4)
  .fill(undefined)
  .map((item, index) => {
    return (item = {
      id: index + 1,
      label: `Building ${index + 1} Name`,
      name: `building${index + 1}`,
    });
  });
export const amenitySetting = [
  {
    id: 1,
    label: "Bookable",
    name: "bookable",
  },
  {
    id: 2,
    label: "Require Payment",
    name: "requirepayment",
  },
  // {
  //   id: 3,
  //   label: "Booking Limitation per Apartment",
  //   name: "bookinglimitationAprt",
  // },
  // {
  //   id: 4,
  //   label: "Booking Limitation per Tenant",
  //   name: "bookinglimitationTenant",
  // },
  {
    id: 5,
    label: "Require Manual Approval ",
    name: "manualapproval",
  },
];

export const AUTH_URL = import.meta.env.VITE_AUTH_URL;
export const amenitieslist = [
  {
    id: 1,
    img: swiming_img,
    label: "Swimming Pool",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
    instractionVal: "Lorem Ipsum dolar sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor cras placerat platea lacus sollicitudin egestas a. Et at montes eu in velit aenean libero. Nullam facilisis velit arcu morbi orci neque proin. ",
    timeWeekDay: [1, 6],
    slotsAvailable: [1, 3],
    amenityBuilding: [1],
  },
  {
    id: 2,
    img: tennis_img,
    label: "Tennis Court",
    time: "11 am - 3 pm",
    requiestCount: 5,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
    instractionVal: "Lorem Ipsum dolar sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor cras placerat platea lacus sollicitudin egestas a. Et at montes eu in velit aenean libero. Nullam facilisis velit arcu morbi orci neque proin. ",
    timeWeekDay: [1, 2, 3, 6],
    slotsAvailable: [1, 3],
    amenityBuilding: [1],
  },
  {
    id: 3,
    img: basketball_img,
    label: "Basketball court",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
    instractionVal: "Lorem Ipsum dolar sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor cras placerat platea lacus sollicitudin egestas a. Et at montes eu in velit aenean libero. Nullam facilisis velit arcu morbi orci neque proin. ",
    timeWeekDay: [1, 3, 6, 7],
    slotsAvailable: [1, 3],
    amenityBuilding: [1],
  },
  {
    id: 4,
    img: football_img,
    label: "Football Court ",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
    instractionVal: "Lorem Ipsum dolar sit amet",
    description:
      "Lorem ipsum dolor sit amet consectetur. Tortor cras placerat platea lacus sollicitudin egestas a. Et at montes eu in velit aenean libero. Nullam facilisis velit arcu morbi orci neque proin. ",
    timeWeekDay: [1, 3, 6],
    slotsAvailable: [1, 3],
    amenityBuilding: [1],
  },
];
export const participants = [
  {
    id: 1,
    img: man_image,
  },
  {
    id: 2,
    img: man_image,
  },
  {
    id: 3,
    img: man_image,
  },
];
export const moriningTime = [
  {
    id: 1,
    label: "07-08 AM",
  },
  {
    id: 2,
    label: "08-09 AM",
  },
  {
    id: 3,
    label: "09-10 AM",
  },
  {
    id: 4,
    label: "10-11 AM",
  },
  {
    id: 5,
    label: "11-12 AM",
  },
];
export const eveningTime = [
  {
    id: 1,
    label: "12-01 PM",
  },
  {
    id: 2,
    label: "01-02 PM",
  },
  {
    id: 3,
    label: "02-03 PM",
  },
  {
    id: 4,
    label: "03-04 PM",
  },
  {
    id: 5,
    label: "04-05 PM",
  },
  {
    id: 6,
    label: "05-06 PM",
  },
  {
    id: 7,
    label: "06-07 PM",
  },
  {
    id: 8,
    label: "07-08 PM",
  },
  {
    id: 9,
    label: "08-09 PM",
  },
  {
    id: 10,
    label: "09-10 PM",
  },
  {
    id: 11,
    label: "10-11 PM",
  },
  {
    id: 12,
    label: "11-12 PM",
  },
];
export const menuitemDialog = [
  { id: 1, label: "Share" },
  { id: 2, label: "Rename" },
  { id: 7, label: "Edit" },
  { id: 3, label: "Copy Amenity link" },
  { id: 4, label: "Amenity Details" },
  { id: 5, label: "Deactivate" },
  { id: 6, label: "Delete" },
];
export const menuBuildingItemDialog = [
  { id: 1, label: "Share" },
  { id: 2, label: "Rename" },
  { id: 3, label: "Copy Building Link" },
  { id: 4, label: "Building Details" },
  { id: 5, label: "Edit" },
  { id: 6, label: "Users" },
  { id: 7, label: "Services" }, // not found
  { id: 8, label: "Add Apartement" },
  { id: 9, label: "Deactivate" },
  { id: 10, label: "Delete" },
];
export const menuitemDialogMaintenance = [
  { id: 1, label: "Share" },
  { id: 2, label: "Rename" },
  { id: 3, label: "Copy Maintenance link" },
  { id: 4, label: "Maintenance Details" },
  { id: 5, label: "Deactivate" },
  { id: 6, label: "Delete" },
];
export const menuitemDialogServices = [
  { id: 1, label: "Share" },
  { id: 2, label: "Rename" },
  { id: 3, label: "Copy Service Link" },
  { id: 4, label: "Service Details" },
  { id: 5, label: "Add Service Actor" },
  { id: 6, label: "Deactive" },
  { id: 7, label: "Delete" },
];
export const tableStaticDataAmenity = new Array(10)
  .fill(undefined)
  .map((item, key) => {
    return (item = {
      id: key,
      tenants: "Lindsey Gusikowski",
      people: 3,
      selectedperiod: "12:00 to 2:00",
      apartment: "A22",
      image: male,
      attachements: " 5 Attachments",
    });
  });

export const amenitytablefilter = [
  {
    id: 1,
    label: "Swimming Pool",
    count: 23,
  },
  {
    id: 2,
    label: "Tennis Court",
    count: 13,
  },
  {
    id: 3,
    label: "Basketball court",
    count: 23,
  },
  {
    id: 4,
    label: "Football court",
    count: 3,
  },
];
export const maintenancetablefilter = [
  {
    id: 1,
    label: "Electrician",
    count: 23,
  },
  {
    id: 2,
    label: "AC Cleaning",
    count: 13,
  },
  {
    id: 3,
    label: "Plumber",
    count: 23,
  },
];
export const menuItemAmenityRequest = [
  { id: 1, label: "Reschedule" },
  { id: 2, label: "Booking Details" },
  { id: 3, label: "Call the tenant" },
  { id: 4, label: "Message the tenant" },
  { id: 5, label: "Copy booking link" },
  { id: 6, label: "Decline Request" },
];
export const menuBellboyRequest = [
  {
    id: 1,
    label: "Assign to Bellboy",
  },
  // { id: 2, label: "Copy Bellboy Link" },
];
export const menuvaletRequest = [
  {
    id: 1,
    label: "Assign to Valet",
  },
  // { id: 2, label: "Copy Car Link" },
];
export const maintenanceListing = [
  {
    label: "Electrician",
    img: electrican_img,
  },
  {
    label: "AC Cleaning",
    img: cleaning_img,
  },

  {
    label: "Plumber",
    img: plumber_img,
  },
  {
    label: "Plumber",
    img: plumber_img,
  },
];
export const maintenancelist = [
  {
    id: 1,
    img: electrican_img,
    label: "Electrician",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
  },
  {
    id: 2,
    img: cleaning_img,
    label: "AC Cleaning",
    time: "11 am - 3 pm",
    requiestCount: 5,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
  },
  {
    id: 3,
    img: plumber_img,
    label: "Plumber",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
  },
  {
    id: 4,
    img: plumber_img,
    label: "Plumber",
    time: "11 am - 3 pm",
    requiestCount: 12,
    participantsCount: 12,
    link: "http://localhost:5173/amenities/amenitieslist",
  },
];

export const parcelsOverview = [
  {
    taskNumber: 0,
    amenitiesType: "Total Task",
    Img: TotalTaskIcon,
    valuecompleted: 100,
    valueprogress: 10,
  },
  {
    taskNumber: 0,
    amenitiesType: "In progress",
    Img: ProgressIcon,
    valuecompleted: 100,
    valueprogress: 20,
  },
  {
    taskNumber: 0,
    amenitiesType: "Completed Task",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Assigned",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Awaiting Pickup",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Tenant Notified",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Rejected",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Send To Tenant",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Tenant Pickup",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
  {
    taskNumber: 0,
    amenitiesType: "Reassigned",
    Img: CompletedIcon,
    valuecompleted: 100,
    valueprogress: 80,
  },
];
export const addtenantExpansionpanel = [
  {
    id: 1,
    label: "General Information",
    icon: GenerealInfoIcon,
    Component: GeneralInformation,
  },
  {
    id: 2,
    label: "Location",
    icon: LocationIcon,
    Component: Location,
  },
  {
    id: 3,
    label: "Validation document",
    icon: ValidIcon,
    Component: Validation,
  },
  {
    id: 4,
    label: "Interests & Preferences",
    icon: InterestIcon,
    Component: Interests,
  },
  {
    id: 5,
    label: "Family & Gusts & Pets",
    icon: FamilyIcon,
    Component: FamilyGuestsPets,
  },
  {
    id: 6,
    label: "Account Settings",
    icon: AcountIcon,
    Component: Account,
  },
  {
    id: 7,
    label: "Set tenant Password",
    icon: PasswordIcon,
    Component: SetPassword,
  },
];
export const interestaddtebnant = [
  {
    id: 1,
    label: "Gym",
  },
  {
    id: 2,
    label: "Swimming",
  },
  {
    id: 3,
    label: "Hiking",
  },
  {
    id: 4,
    label: "Dancing",
  },
  {
    id: 5,
    label: "Local food",
  },
  {
    id: 6,
    label: "Outdoor Activities",
  },
  {
    id: 7,
    label: "Yoga",
  },
];
export const parcelmanagementsort = [
  { id: 0, label: "All", count: 23, value: "All" },
  {
    id: 1,
    label: "Pick Up",
    count: 23,
    value: "PICKUP",
  },
  {
    id: 2,
    label: "Delivery",
    count: 13,
    value: "DELIVERY",
  },
];
export const filterParcelType = [
  { id: 1, value: "delivery", label: "Delivery", filterVal: "DELIVERY" },
  { id: 2, value: "pickup", label: "Pick up", filterVal: "PICKUP" },
];
export const filterParcelBuilding = [
  { id: 1, value: "buildingA", label: "Building A" },
  { id: 2, value: "buildingB", label: "Building B" },
  { id: 3, value: "buildingC", label: "Building C" },
];
export const filterParcelStatus = [
  { id: 1, value: "pending", label: "On Hold", icon: HoldIcon },
  {
    id: 2,
    value: "approved",
    label: "Send to apartment",
    icon: SendToApartmentIcon,
  },
  {
    id: 3,
    value: "waitingApproval",
    label: "Waiting Response",
    icon: WaitingResponse,
  },
  { id: 4, value: "rejected", label: "Canceled", icon: CancelIcon },
];
export const statuses = [
  { id: 1, value: "pending", label: "Pending" },
  { id: 1, value: "booked", label: "Booked" },
  { id: 1, value: "declined", label: "declined" },
  { id: 1, value: "cancelled", label: "cancelled" },
  { id: 1, value: "no_show", label: "no_show" },
  { id: 1, value: "confirmed", label: "confirmed" },
  { id: 1, value: "ongoing", label: "ongoing" },
  { id: 1, value: "rescheduled", label: "rescheduled" },
  { id: 1, value: "requested", label: "requested" },
  { id: 1, value: "processed", label: "processed" },
  { id: 1, value: "tenant_notified", label: "tenant_notified" },
  { id: 1, value: "rejected", label: "rejected" },
  { id: 1, value: "added", label: "added" },
  { id: 1, value: "hold_at_reception", label: "hold_at_reception" },
  { id: 1, value: "admitted", label: "admitted" },
  { id: 1, value: "assigned", label: "assigned" },
  { id: 1, value: "awaiting_pickup", label: "awaiting_pickup" },
  { id: 1, value: "on_hold", label: "on_hold" },
  { id: 1, value: "reassigned", label: "reassigned" },
  { id: 1, value: "received", label: "received" },
  { id: 1, value: "send_to_tenant", label: "send_to_tenant" },
  { id: 1, value: "tenant_pickup", label: "tenant_pickup" },
  { id: 1, value: "delayed", label: "delayed" },
  { id: 1, value: "scheduled", label: "scheduled" },
];
export const parcelmanagementTableStaticData = new Array(100)
  .fill(undefined)
  .map((item, key) => {
    return (item = {
      id: key,
      tenants: "Everett Mante",
      parcelName: "tenetur-maxime-non",
      building: "Tower A",
      arriveDate: "Mon ,02 2023",
      time: "At 03:33 pm",
      image: male,
      status: "hold",
    });
  });

export const parcelreqDialogDate = [
  {
    id: 1,
    label: "All day",
    Icon: HourIcon,
  },
  {
    id: 2,
    label: "Morning",
    Icon: MorningIcon,
  },
  {
    id: 3,
    label: "Evening",
    Icon: MoonIcon,
  },
];

export const valetTableStaticData = [
  {
    id: 1,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 2,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 3,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 4,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 5,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 6,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 7,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 8,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 9,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Completed",
  },
  {
    id: 10,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 11,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 12,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 13,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
  {
    id: 14,
    tenants: "Andy Schaden",
    image: test_png,
    building: 2,
    apartment: 1,
    car: "Chevrolet - AB222",
    status: "Pending",
  },
];

export const testSearchData = [
  {
    id: 1,
    label: "Mohammed Ali - 10",
  },
  {
    id: 2,
    label: "Mohammed",
  },
  {
    id: 3,
    label: "Salah",
  },
  {
    id: 4,
    label: "Sameh",
  },
  {
    id: 5,
    label: "Armine",
  },
  {
    id: 6,
    label: "John",
  },
  {
    id: 7,
    label: "Ali",
  },
  {
    id: 8,
    label: "Saeed",
  },
  {
    id: 9,
    label: "Ahmed",
  },
];
export const toggleweek = [
  {
    id: 1,
    label: "Weekly",
  },
  { id: 2, label: "Monthly" },
];
export const landScreenCreateOrg = [
  {
    id: 1,
    label: " General Information",
    open: "general",
  },
  {
    id: 2,
    label: "Services",
    open: "service",
  },
  {
    id: 3,
    label: "Appearance",
    open: "appearance",
  },
];
export const servicesLandScreen = [
  {
    id: 1,
    label: "Reception",
    img: receptionImg,
  },
  {
    id: 2,
    label: "Maintenance",
    img: maintenanceImg,
  },
  {
    id: 3,
    label: "Parcels",
    img: parcelsImg,
  },
  {
    id: 4,
    label: "Amenities",
    img: amenitiesImg,
  },
  {
    id: 5,
    label: "Bellboy",
    img: bellboyImg,
  },
  {
    id: 6,
    label: "Visitors",
    img: visitorsImg,
  },
  {
    id: 7,
    label: "Valet",
    img: valetImg,
  },
  {
    id: 8,
    label: "Lounge",
    img: loungeImg,
  },
  {
    id: 9,
    label: "Useful Information",
    img: usefulinfoImg,
  },
  {
    id: 10,
    label: "Notices",
    img: noticesImg,
  },
];
export const themeColorDiv = [
  {
    id: 1,
    color: "#FF7473",
  },
  {
    id: 2,
    color: "#1D4599",
  },
  {
    id: 3,
    color: "#4FFFAA",
  },
  {
    id: 4,
    color: "#ADFF00",
  },
  {
    id: 5,
    color: "#CC00FF",
  },
  {
    id: 6,
    color: "#4FFFAA",
  },
  {
    id: 7,
    color: "#4FFFAA",
  },
  {
    id: 8,
    color: "#4FFFAA",
  },
  {
    id: 9,
    color: "#62FFFF",
  },
];
export const menuBox = [
  {
    id: 1,
    title: "Reception",
    items: [
      {
        id: 1,
        item: "Reception Services",
      },
      {
        id: 2,
        item: "Reception Management",
      },
      {
        id: 3,
        item: "Add Reception Request",
      },
    ],
  },
  {
    id: 2,
    title: "Maintenance",
    items: [
      {
        id: 1,
        item: "Maintenance Services",
      },
      {
        id: 2,
        item: "Maintenance Management",
      },
      {
        id: 3,
        item: "Add Maintenance Request",
      },
    ],
  },
  {
    id: 3,
    title: "Parcels",
    items: [
      {
        id: 1,
        item: "Parcel Services",
      },
      {
        id: 2,
        item: "Parcels Management",
      },
      {
        id: 3,
        item: "Add Parcels Request",
      },
    ],
  },
  {
    id: 4,
    title: "Amenities",
    items: [
      {
        id: 1,
        item: "Amenities Services",
      },
      {
        id: 2,
        item: "Amenities Management",
      },
      {
        id: 3,
        item: "Add Amenities Request",
      },
    ],
  },
  {
    id: 5,
    title: "Lounge",
    items: [
      {
        id: 1,
        item: "Open Menu ",
      },
      {
        id: 2,
        item: "Open Reservation ",
      },
      {
        id: 3,
        item: "Book",
      },
    ],
  },
  {
    id: 6,
    title: "Bellboy",
    items: [
      {
        id: 1,
        item: "Current Requests   ",
      },
      {
        id: 2,
        item: "Bellboy Management",
      },
      {
        id: 3,
        item: "Add Bellboy Request",
      },
    ],
  },
  {
    id: 7,
    title: "Valet",
    items: [
      {
        id: 1,
        item: "Current Requests   ",
      },
      {
        id: 2,
        item: "Valet Management",
      },
      {
        id: 3,
        item: "Add Valet Request",
      },
    ],
  },
  {
    id: 8,
    title: "Visitors",
    items: [
      {
        id: 1,
        item: "Current Requests   ",
      },
      {
        id: 2,
        item: "Visitors Management",
      },
      {
        id: 3,
        item: "Add Visitors Request",
      },
    ],
  },
  {
    id: 9,
    title: "Useful Information",
    items: [
      {
        id: 1,
        item: "Current Information",
      },
      {
        id: 2,
        item: "Add Information",
      },
    ],
  },
  {
    id: 10,
    title: "Notices",
    items: [
      {
        id: 1,
        item: "current Notices ",
      },
      {
        id: 2,
        item: "Add Notices",
      },
    ],
  },
];
export const sortServiceTable = [
  {
    id: 1,
    label: "All",
  },
  {
    id: 2,
    label: "Building A",
  },
  {
    id: 3,
    label: "Building B",
  },
  {
    id: 4,
    label: "Building C",
  },
];

export const addServiceAcordian = [
  {
    id: 1,
    label: "Basic Information",
    icon: BasicInfo,
    Component: AddServiceInfo,
    field: "info",
  },
  {
    id: 2,
    label: "Availability",
    icon: AvailabilityIcon,
    Component: SelectAvailable,
    field: "available",
  },
  {
    id: 3,
    label: "Property Details",
    icon: DetailIcon,
    Component: ProportyDetails,
    field: "propert",
  },
];
export const proportyDetailSelect = [
  {
    id: 1,
    label: "In all properties",
  },
  {
    id: 2,
    label: "Building A ",
  },
  {
    id: 3,
    label: "Building B ",
  },
  {
    id: 4,
    label: "Building C ",
  },
];
export const AvailableSelect = [
  {
    id: 1,
    label: "Available",
  },
  {
    id: 2,
    label: "Not-Available",
  },
  {
    id: 3,
    label: "Coming soon",
  },
];

export const addUserAcordian = [
  {
    id: 1,
    label: "Basic Information",
    icon: BasicInfo,
    Component: AddUserInfo,
  },
  {
    id: 2,
    label: "Role",
    icon: AvailabilityIcon,
    Component: AddRoleUser,
  },
];
export const checkItemNotice = [
  {
    id: 1,
    label: "Mandatory",
    span: "(Optional is default)",
  },
  {
    id: 2,
    label: "Send by email",
  },
  {
    id: 3,
    label: "Specific building",
    span: "By selecting this option this will not be published to General ",
  },
  {
    id: 4,
    label: "Specific Tenant",
    span: "General is default",
  },
];
export const dataTest = [
  {
    id: 1,
    image: football_img,
  },
  {
    id: 2,
    image: football_img,
  },
  {
    id: 3,
    image: football_img,
  },
];
export const BuildingData = [
  {
    _id: "115131113513131513d5d135fs",
    id: 1,
    name: "Building A",
    images: [
      {
        url: "https://storage.googleapis.com/tenx-development2/service/arrow_up.svgGtIT8NEACP47DISro2UIIaSsmHf5NdBa.jpeg",
      },
    ],
    link: "string",
    participantsCount: 10,
    numberOfRequests: 10,
    time: "10:00 AM",
  },
  {
    _id: "115131113513131513d5d135fdsadas",
    name: "Building B",
    images: [
      {
        url: "https://storage.googleapis.com/tenx-development2/service/arrow_up.svgGtIT8NEACP47DISro2UIIaSsmHf5NdBa.jpeg",
      },
    ],
    link: "string",
    participantsCount: 3,
    numberOfRequests: 10,
    time: "10:00 AM",
  },
];
export const BuildingDataList = {
  count: 2,
  items: [
    {
      _id: "63da438ac2b17497fe74f819",
      name: "Swiming",
      label: "Swiming",
      flow: "amenity",
      status: "active",
      availabilitySlots: [
        {
          slotsPerUser: 1,
          from: "string",
          to: "string",
          day: "sunday",
        },
      ],
      bookable: false,
      isPrivateToOrganization: true,
      isMainFrontPageService: false,
      requireManualApproval: false,
      needServiceActor: false,
      parentId: "63a485fd46f543f48faed3e4",
      images: [
        {
          name: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpegl9hfGpdY4ntuX7af0sZeroHtRxb79dgf.jpeg",
          url: "https://storage.googleapis.com/tenx-development2/service/stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpegl9hfGpdY4ntuX7af0sZeroHtRxb79dgf.jpeg",
          alt: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpeg",
          description: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpeg",
        },
      ],
      icon: {
        name: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpegcGdQC1RAPrOAVQh8fnjf14otmATe15Rl.jpeg",
        url: "https://storage.googleapis.com/tenx-development2/service/stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpegcGdQC1RAPrOAVQh8fnjf14otmATe15Rl.jpeg",
        alt: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpeg",
        description: "stringu9RHsZXoX9hmDcsl6lIWEqd7XaICCtHt.jpeg",
      },
      banners: [
        {
          name: "arrow_up.svgGtIT8NEACP47DISro2UIIaSsmHf5NdBa.jpeg",
          url: "https://storage.googleapis.com/tenx-development2/service/arrow_up.svgGtIT8NEACP47DISro2UIIaSsmHf5NdBa.jpeg",
          alt: "arrow_up.svg",
          description: "arrow_up.svg",
        },
      ],
      createdAt: "2023-02-01T10:48:42.508Z",
      updatedAt: "2023-02-01T10:48:42.508Z",
      __v: 0,
      numberOfRequests: 0,
    },
  ],
};

export const PropertyDataList = new Array(10)
  .fill(undefined)
  .map((item, key) => {
    return (item = {
      id: key,
      image: { url: male },
      property: "A 12 type A",
      building: "A",
      facilities: [
        { facility: "Wi-Fi", icon: WiFiIcon },
        { facility: "AC", icon: ACIcon },
        { facility: "Double Bed", icon: DoubleBedIcon },
      ],
      status: "hold",
    });
  });
export const propertySort = [
  { id: 0, label: "All", count: 23 },
  {
    id: 1,
    label: "Building A",
    count: 23,
  },
  {
    id: 2,
    label: "Building B",
    count: 13,
  },
  {
    id: 3,
    label: "Building C",
    count: 23,
  },
];

export const building = [
  {
    id: 1,
    label: "Building 1",
  },
  {
    id: 2,
    label: "Building 2",
  },
  {
    id: 3,
    label: "Building 3",
  },
];

export const InputStyle = {
  "& .MuiOutlinedInput-root": {
    padding: "10px",
    fontSize: "12px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const selectStyle = {
  "& .MuiSelect-root": {
    padding: 0,
    // height: '100%',
  },
  "& .MuiSelect-select.MuiSelect-select": {
    padding: "0",
    fontSize: "12px",
    backgroundColor: "white",
    "&:focus": {
      backgroundColor: "white",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiSelect-icon": {
    top: "calc(50% - 12px)",
    right: 0,
    width: 24,
    height: 24,
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const accordionStyle = {
  "&.Mui-expanded": {
    margin: "0px",
  },
};
export const selectStyleParcel = {
  "& .MuiSelect-root": {
    padding: 0,
    // height: '100%',
  },
  "& .MuiSelect-select.MuiSelect-select": {
    padding: "0",
    fontSize: "12px",
    backgroundColor: "white", // replace with your desired background color
    "&:focus": {
      backgroundColor: "white", //#E2E2E2
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiSelect-icon": {
    top: "calc(50% - 12px)",
    right: 0,
    width: 24,
    height: 24,
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const InputStyleParcel = {
  "& .MuiOutlinedInput-root": {
    padding: "10px",
    fontSize: "12px",
    // background: "red",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};
export const dropDownPropertiesTable = [
  {
    id: 1,
    item: filterParcelType,
    label: "Type",
  },
  {
    id: 2,
    item: filterParcelBuilding,
    label: "Building",
  },
  {
    id: 3,
    label: "Date",
  },
  {
    id: 4,
    item: filterParcelStatus,
    label: "Status",
  },
];
export const checkboxStyle = {
  "& .MuiSvgIcon-root": {
    width: "15px",
    height: "15px",
    borderRadius: "4px",
  },
  color: "#A1A1A1",
  borderWidth: "2px",
  padding: "10px",
};
export const propertyDropDownAction = [
  {
    id: 1,
    label: "Reschedule",
  },
  {
    id: 2,
    label: "Request Details",
  },
  {
    id: 3,
    label: "Call the tenant",
  },
  {
    id: 4,
    label: "Message the tenant",
  },
  {
    id: 5,
    label: "Copy Property link",
  },
  {
    id: 6,
    label: "Decline Request",
  },
];

export const availablePropertyDropDown = [
  {
    id: 2,
    label: "Change Status",
  },
  {
    id: 1,
    label: "Copy Property link",
  },
  {
    id: 3,
    label: "Deactivate it",
  },
  {
    id: 4,
    label: "Remove Property",
  },
];
export const notavailableProperyDropDown = [
  {
    id: 5,
    label: " Property Details",
  },
  {
    id: 2,
    label: "Change Status",
  },
  {
    id: 6,
    label: " Message the tenant",
  },
  {
    id: 7,
    label: "Copy Property link",
  },
];
export const cardData = [
  {
    id: 1,
    header: "Buildings",
    number: 0,
    color: "#FFB200",
    gradient: "rgba(255, 239, 214, 0)",
    percentage: "13.63",
    Icon: BuildingMainDashboard,
  },
  {
    id: 2,
    header: "Services",
    number: 0,
    color: "#1FA2FF",
    gradient: "rgba(2, 160, 252, 0)",
    percentage: "6.98",
    Icon: ReserveMainDashboard,
  },
  {
    id: 3,
    header: "Users",
    number: 0,
    color: "#FF3A29",
    gradient: "rgba(255, 70, 70, 0)",
    percentage: "13.12",
    Icon: securityUserMainDashboard,
  },
  {
    id: 4,
    header: "Tenants",
    number: 0,
    color: "#00BB47",
    gradient: "rgba(16, 191, 82, 0)",
    percentage: "6.98",
    Icon: profile2UserMainDashboard,
  },
];
export const reqData = new Array(10).fill(undefined).map((item, key) => {
  return (item = {
    scheduleDateFrom: "2023-03-26T08:00:00.000Z",
    scheduleDateTo: "2023-03-26T12:00:00.000Z",
    _id: 2,
    organization: {
      name: "Abraj Bay",
      image: {
        url: "https://storage.googleapis.com/tenx-development2/organization/Abraj BayQYH10OwT9muBqRYoOUzBjPigyayxkZRz.jpeg",
      },
    },
    owner: {
      _id: "63a8dbbbacb17f783128a3c2",
      firstName: "Tenant",
      tenantInfo: {
        apartmentNumber: "123",
      },
      image: {
        url: "https://storage.googleapis.com/tenx-development2/user/TenantqFsczkyvESF18O41rGp9gm8R055bnL3g.jpeg",
      },
    },
    status: "scheduled",
    service: {
      name: "Spa Amenity",
    },
  });
});
export const tenantData = new Array(10).fill(undefined).map((item, key) => {
  return (item = {
    scheduleDateFrom: "2023-03-26T08:00:00.000Z",
    scheduleDateTo: "2023-03-26T12:00:00.000Z",
    _id: 2,
    organization: {
      name: "Abraj Bay",
      image: {
        url: "https://storage.googleapis.com/tenx-development2/organization/Abraj BayQYH10OwT9muBqRYoOUzBjPigyayxkZRz.jpeg",
      },
    },
    owner: {
      _id: "63a8dbbbacb17f783128a3c2",
      firstName: "Tenant",
      tenantInfo: {
        apartmentNumber: "123",
      },
      image: {
        url: "https://storage.googleapis.com/tenx-development2/user/TenantqFsczkyvESF18O41rGp9gm8R055bnL3g.jpeg",
      },
    },
    status: "scheduled",
    service: {
      name: "Spa Amenity",
    },
  });
});
export const timesHalf: { [key: string]: TimeSlot[] } = {
  "7:00": [
    { id: 1, from: "7:00", to: "8:30" },
    { id: 2, from: "8:30", to: "10:00" },
    { id: 3, from: "10:00", to: "11:30" },
    { id: 4, from: "11:30", to: "13:00" },
    { id: 5, from: "13:00", to: "14:30" },
    { id: 6, from: "14:30", to: "16:00" },
    { id: 7, from: "16:00", to: "17:30" },
    { id: 8, from: "17:30", to: "19:00" },
    { id: 9, from: "19:00", to: "20:30" },
    { id: 10, from: "20:30", to: "22:00" },
    { id: 11, from: "22:00", to: "23:30" },
  ],

  "8:00": [
    { id: 1, from: "8:00", to: "9:30" },
    { id: 2, from: "9:30", to: "11:00" },
    { id: 3, from: "11:00", to: "12:30" },
    { id: 4, from: "12:30", to: "14:00" },
    { id: 5, from: "14:00", to: "15:30" },
    { id: 6, from: "15:30", to: "17:00" },
    { id: 7, from: "17:00", to: "19:30" },
    { id: 8, from: "19:30", to: "21:00" },
    { id: 9, from: "21:00", to: "22:30" },
    { id: 10, from: "22:30", to: "00:00" },
  ],
  "9:00": [
    { id: 1, from: "9:00", to: "10:30" },
    { id: 2, from: "10:30", to: "12:00" },
    { id: 3, from: "12:00", to: "13:30" },
    { id: 4, from: "13:30", to: "15:00" },
    { id: 5, from: "15:00", to: "16:30" },
    { id: 6, from: "16:30", to: "18:00" },
    { id: 7, from: "18:00", to: "19:30" },
    { id: 8, from: "19:30", to: "21:00" },
    { id: 9, from: "21:00", to: "22:30" },
    { id: 10, from: "22:30", to: "00:00" },
  ],
  "10:00": [
    { id: 1, from: "10:00", to: "11:30" },
    { id: 2, from: "11:30", to: "13:00" },
    { id: 3, from: "13:00", to: "14:30" },
    { id: 4, from: "14:30", to: "16:00" },
    { id: 5, from: "16:00", to: "17:30" },
    { id: 6, from: "17:30", to: "19:00" },
    { id: 7, from: "19:00", to: "20:30" },
    { id: 8, from: "20:30", to: "22:00" },
    { id: 9, from: "22:00", to: "23:30" },
  ],
  "11:00": [
    { id: 1, from: "11:00", to: "12:30" },
    { id: 2, from: "12:30", to: "14:00" },
    { id: 3, from: "14:00", to: "15:30" },
    { id: 4, from: "15:30", to: "17:00" },
    { id: 5, from: "17:00", to: "18:30" },
    { id: 6, from: "18:30", to: "20:00" },
    { id: 7, from: "20:00", to: "21:30" },
    { id: 8, from: "21:30", to: "23:00" },
  ],
  "12:00": [
    { id: 1, from: "12:00", to: "13:30" },
    { id: 2, from: "13:30", to: "15:00" },
    { id: 3, from: "15:00", to: "16:30" },
    { id: 4, from: "16:30", to: "18:00" },
    { id: 5, from: "18:00", to: "19:30" },
    { id: 6, from: "19:30", to: "21:00" },
    { id: 7, from: "21:00", to: "22:30" },
    { id: 8, from: "22:30", to: "00:00" },
  ],
  "13:00": [
    { id: 1, from: "13:00", to: "14:30" },
    { id: 2, from: "14:30", to: "16:00" },
    { id: 3, from: "16:00", to: "17:30" },
    { id: 4, from: "17:30", to: "19:00" },
    { id: 5, from: "19:00", to: "20:30" },
    { id: 6, from: "20:30", to: "22:00" },
    { id: 7, from: "22:00", to: "23:30" },
  ],
  "14:00": [
    { id: 1, from: "14:00", to: "15:30" },
    { id: 2, from: "15:30", to: "17:00" },
    { id: 3, from: "17:00", to: "18:30" },
    { id: 4, from: "18:30", to: "20:00" },
    { id: 5, from: "20:00", to: "21:30" },
    { id: 6, from: "21:30", to: "23:00" },
  ],
  "15:00": [
    { id: 1, from: "15:00", to: "16:30" },
    { id: 2, from: "16:30", to: "18:00" },
    { id: 3, from: "18:00", to: "19:30" },
    { id: 4, from: "19:30", to: "21:00" },
    { id: 5, from: "21:00", to: "22:30" },
    { id: 6, from: "22:30", to: "00:00" },
  ],
  "16:00": [
    { id: 1, from: "16:00", to: "17:30" },
    { id: 2, from: "17:30", to: "19:00" },
    { id: 3, from: "19:00", to: "20:30" },
    { id: 4, from: "20:30", to: "22:00" },
    { id: 5, from: "22:00", to: "23:30" },
  ],
  "17:00": [
    { id: 1, from: "17:00", to: "18:30" },
    { id: 2, from: "18:30", to: "20:00" },
    { id: 3, from: "20:00", to: "21:30" },
    { id: 4, from: "21:30", to: "23:00" },
  ],
  "18:00": [
    { id: 1, from: "18:00", to: "19:30" },
    { id: 2, from: "19:30", to: "21:00" },
    { id: 3, from: "21:00", to: "22:30" },
    { id: 4, from: "22:30", to: "00:00" },
  ],
  "19:00": [
    { id: 1, from: "19:00", to: "20:30" },
    { id: 2, from: "20:30", to: "22:00" },
    { id: 3, from: "22:00", to: "23:30" },
  ],
  "20:00": [
    { id: 1, from: "20:00", to: "21:30" },
    { id: 2, from: "21:30", to: "23:00" },
  ],
  "21:00": [
    { id: 1, from: "21:00", to: "22:30" },
    { id: 2, from: "22:30", to: "00:00" },
  ],
  "22:00": [{ id: 1, from: "22:00", to: "23:30" }],
};

export const times: TimeSlot[] = [
  { id: 1, from: "7:00", to: "8:00" },
  { id: 2, from: "8:00", to: "9:00" },
  { id: 3, from: "9:00", to: "10:00" },
  { id: 4, from: "10:00", to: "11:00" },
  { id: 5, from: "11:00", to: "12:00" },
  { id: 6, from: "12:00", to: "13:00" },
  { id: 7, from: "13:00", to: "14:00" },
  { id: 8, from: "14:00", to: "15:00" },
  { id: 9, from: "15:00", to: "16:00" },
  { id: 10, from: "16:00", to: "17:00" },
  { id: 11, from: "17:00", to: "18:00" },
  { id: 12, from: "18:00", to: "19:00" },
  { id: 13, from: "19:00", to: "20:00" },
  { id: 14, from: "20:00", to: "21:00" },
  { id: 15, from: "21:00", to: "22:00" },
  { id: 16, from: "22:00", to: "23:00" },
  { id: 17, from: "23:00", to: "00:00" },
];

export const timeAvailable = {
  SUN: { state: times, hour: "1", time: "1" },
  MON: { state: times, hour: "1", time: "1" },
  TUE: { state: times, hour: "1", time: "1" },
  WED: { state: times, hour: "1", time: "1" },
  THU: { state: times, hour: "1", time: "1" },
  FRI: { state: times, hour: "1", time: "1" },
  SAT: { state: times, hour: "1", time: "1" },
};

export const timesTwoHourOdd = [
  { id: 1, from: "7:00", to: "9:00" },
  { id: 2, from: "9:00", to: "11:00" },
  { id: 3, from: "11:00", to: "13:00" },
  { id: 4, from: "13:00", to: "15:00" },
  { id: 5, from: "15:00", to: "17:00" },
  { id: 6, from: "17:00", to: "19:00" },
  { id: 7, from: "19:00", to: "21:00" },
  { id: 8, from: "21:00", to: "23:00" },
];

export const timesTwoHourEven = [
  { id: 1, from: "8:00", to: "10:00" },
  { id: 2, from: "10:00", to: "12:00" },
  { id: 3, from: "12:00", to: "14:00" },
  { id: 4, from: "14:00", to: "16:00" },
  { id: 5, from: "16:00", to: "18:00" },
  { id: 6, from: "18:00", to: "20:00" },
  { id: 7, from: "20:00", to: "22:00" },
  { id: 8, from: "22:00", to: "00:00" },
];
export const marks = [
  {
    value: 1,
    label: "Low",
  },
  {
    value: 50,
    label: "Medium",
  },
  {
    value: 100,
    label: "High",
  },
];

export const services: { label: string; id: number; nameForReq: string }[] = [
  { label: "Amenities", id: 1, nameForReq: "amenity" },
  { label: "Maintenance", id: 2, nameForReq: maintenance },
  { label: "Percels", id: 3, nameForReq: "parcels" },
  { label: "Visitors", id: 5, nameForReq: "visitor" },
  { label: "Notices", id: 6, nameForReq: "notices" },
  // { label: "Gourmet", id: 7 },
  { label: "Bellboy", id: 8, nameForReq: "bellboy" },
  { label: "Valet", id: 9, nameForReq: "valet" },
  { label: "Other Properties", id: 10, nameForReq: "other_properties" },
];
export const messageData = [
  {
    image: testImage,
    name: "Hala Joe",
    role: "General Manager",
    message: "Send me all the Properties Assets",
  },
  {
    image: testImage,
    name: "Georgia Nide",
    role: "General Manager",
    message: "No, All of them is Mandatory",
  },
  {
    image: testImage,
    name: "Andrew Milad",
    role: "General Manager",
    message: "Thanks!",
  },
];

export const dataChartHomePage = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export function isEmail(text: string) {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(text);
}

export function isUnderage(dateString: any) {
  var birthdate = moment(dateString);
  var today = moment();
  var minDate = today.subtract(18, "years");
  return birthdate.isAfter(minDate);
}

export const RequestListResponsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 9,
    slidesToSlide: 1, // Number of items to slide on every click
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // Number of items to slide on every click
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};
export const responsiveDialog = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3.4,
    slidesToSlide: 1, // Number of items to slide on every click
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const amenitiesStatusses: TStatusses[] = [
  { id: 1, status: "pending", title: "On Hold" },
  { id: 2, status: "booked", title: "Send To Apartament" },
  { id: 3, status: "cancelled", title: "Cancelled" },
  { id: 4, status: "rescheduled", title: "Rescheduled" },
  { id: 5, status: "confirmed", title: "Confirmed" },
  { id: 6, status: "declined", title: "Declined" },
  { id: 7, status: "completed", title: "Completed" },
  { id: 8, status: "ongoing", title: "On Going" },
  { id: 9, status: "no_show", title: "No Show" },
];
export const maintenanceStausses: TStatusses[] = [
  { id: 2, status: "booked", title: "Send To Apartament" },
  { id: 3, status: "cancelled", title: "Cancelled" },
  { id: 4, status: "rescheduled", title: "Rescheduled" },
  { id: 1, status: "scheduled", title: "Scheduled" },

  { id: 5, status: "confirmed", title: "Confirmed" },
  { id: 6, status: "declined", title: "Declined" },
  { id: 7, status: "completed", title: "Completed" },
  { id: 8, status: "ongoing", title: "On Going" },
  { id: 9, status: "delayed", title: "Delayed" },
];
export const parcelsStatusses: TStatusses[] = [
  { id: 1, status: "received", title: "Received" },
  { id: 2, status: "assigned", title: "Assigned" },
  { id: 3, status: "awaiting_pickup", title: "Awaiting Pickup" },
  { id: 4, status: "tenant_notified", title: "Tenant Notified" },
  { id: 5, status: "rejected", title: "Rejected" },
  { id: 6, status: "on_hold", title: "On Hold" },
  { id: 7, status: "send_to_tenant", title: "Tend To Tenant" },
  { id: 8, status: "tenant_pickup", title: "Tenant Pickup " },
  { id: 9, status: "reassigned", title: "Reassigned" },
  { id: 10, status: "completed", title: "Completed" },
];
export const maintenancePeriod = [
  { id: 1, label: "All day", icon: HourIcon },
  { id: 2, label: "Morning", icon: MorningIcon },
  { id: 3, label: "Evening", icon: MoonIcon },
];

export const dropdownPercel: { id: number; title: string }[] = [
  { id: 1, title: "Re-notify Tenant" },
  { id: 2, title: "Confirm Delivery" },
  { id: 3, title: "Call the tenant" },
  { id: 4, title: "Message the tenant" },
  { id: 5, title: "Delete Parcel" },
];

export const autoCompleteStyle = {
  width: "100%",
  "& .MuiAutocomplete-inputRoot": {
    backgroundColor: "#EBEBEB",
    height: "36px",
    fontWeight: "bold",
    fontSize: "12px",
    borderRadius: "6px",
  },
  "& .MuiOutlinedInput-input": {
    paddingLeft: "24px",
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiAutocomplete-input": {
      padding: "0px !important",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};
export const ifStatusBookedAmenities = [
  { id: 2, status: "confirmed", title: "Confirmed" },
  { id: 3, status: "cancelled", title: "Cancelled" },
];
export const ifStatusConfirmedAmenities = [
  { id: 2, status: "no_show", title: "No Show" },
  { id: 3, status: "ongoing", title: "On Going" },
];
export const ifStatusRescheduledAmenities = [
  { id: 1, status: "confirmed", title: "Confirmed" },
  { id: 2, status: "booked", title: "Send To Apartament" },
];
export const ifStatusOnGoingAmenities = [
  { id: 1, status: "completed", title: "completed" },
];

export const ifStatusBookedMaintenance = [
  { id: 1, status: "confirmed", title: "Confirmed" },
  { id: 2, status: "cancelled", title: "Cancelled" },
];
export const ifStatusConfirmedMaintenance = [
  { id: 1, status: "completed", title: "Completed" },
  { id: 2, status: "cancelled", title: "Cancelled" },
];
export const ifStatusRescheduledMaintenance = [
  { id: 1, status: "booked", title: "Send To Apartament" },
];
export const ifStatusScheduledMaintenance = [
  { id: 1, status: "confirmed", title: "Confirmed" },
  { id: 2, status: "delayed", title: "Delayed" },
  { id: 3, status: "ongoing", title: "On Going" },
];
export const ifStatusOnGoingMaintenance = [
  { id: 1, status: "completed", title: "Completed" },
];
export const ifStatusDraftTenant = [
  { id: 1, status: "deleted", title: "Deleted" },
  { id: 2, status: "deactive", title: "Deactive" },
];
export const ifStatusDeactiveTenant = [
  { id: 1, status: "active", title: "Active" },
];
export const ifStatusActiveTenant = [
  { id: 1, status: "registered", title: "Registered" },
  { id: 2, status: "deactive", title: "Deactive" },
];
export const ifStatusRegisteredTenant = [
  { id: 1, status: "active", title: "Active" },
];
export const ifStatusDraftAdminPanel = [
  { id: 1, status: "deleted", title: "Deleted" },
  { id: 2, status: "deactive", title: "Deactive" },
];
export const ifStatusDeactiveAdminPanel = [
  { id: 1, status: "active", title: "Active" },
];
export const ifStatusActiveAdminPanel = [
  { id: 1, status: "registered", title: "Registered" },
  { id: 2, status: "deactive", title: "Deactive" },
];
export const ifStatusRegisteredAdminPanel = [
  { id: 1, status: "active", title: "Active" },
  { id: 2, status: "off_duty", title: "Off Duty" },
];
export const ifStatusOffDutyAdminPanel = [
  { id: 2, status: "on_duty", title: "On Duty" },
];
export const ifStatusOnDutyAdminPanel = [
  { id: 2, status: "off_duty", title: "Off Duty" },
];
/**Admin panel */

/**Bellboy & valet */
export const ifStatusRequestedBellboy = [
  { id: 1, status: "assigned", title: "Assigned" },
  { id: 2, status: "declined", title: "Declined" },
  { id: 3, status: "cancelled", title: "Cancelled" },
];
export const ifStatusAssignedBellboy = [
  { id: 1, status: "completed", title: "Completed" },
  { id: 2, status: "declined", title: "Declined" },
  { id: 3, status: "cancelled", title: "Cancelled" },
];
/**Bellboy & valet */

/**Visitors */
/** tenant create visitor request */
/** OTP verification? yes */
export const ifStatusRequestedVisitorOTPVerificationYes = [
  { id: 1, status: "processed", title: "Processed" },
  { id: 2, status: "no_show", title: "No Show" },
  { id: 3, status: "declined", title: "Declined" },
  { id: 4, status: "cancelled", title: "Cancelled" },
];
export const ifTenantNotified = [
  { id: 1, status: "admitted", title: "Admitted" },
  { id: 2, status: "rejected", title: "Rejected" },
  { id: 3, status: "declined", title: "Declined" },
];
/** Processed OTP verification successful */
/**Has Tenant pre-allowed the visitor? yes*/
export const ifStatusProcessedVisitorTenantPreAllowed = [
  { id: 1, status: "approved", title: "Approved" },
];
/**Has Tenant pre-allowed the visitor? yes*/
/**Has Tenant pre-allowed the visitor? no*/
export const ifStatusProcessedVisitorTenantPreNotAllowed = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
];
/**Has Tenant pre-allowed the visitor? no*/
/** Processed OTP verification successful */
/** OTP verification? yes */
/** OTP verification? no */
export const ifStatusRequestedVisitorOTPVerificationNo = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
  { id: 2, status: "no_show", title: "No Show" },
  { id: 3, status: "declined", title: "Declined" },
  { id: 4, status: "cancelled", title: "Cancelled" },
];
export const ifStatusAddedVisitor = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
  { id: 2, status: "declined", title: "Declined" },
];

export const ifStatusTenantNotifiedVisitor = [
  { id: 1, status: "hold_at_reception", title: "Hold at Reception" },
  { id: 2, status: "admitted", title: "Admitted" },
  { id: 3, status: "rejected", title: "Rejected" },
  { id: 4, status: "access_amenities", title: "Access 4th Floor" },
];
export const ifStatusCompletedVisitor = [
  { id: 1, status: "approved", title: "Approved" },
  { id: 2, status: "hold_at_reception", title: "Hold at Reception" },
  { id: 3, status: "admitted", title: "Admitted" },
  { id: 4, status: "rejected", title: "Rejected" },
];
export const ifStatusAssignedParcelAddByTenant = [
  { id: 1, status: "received", title: "Received" },
];
export const ifStatusReceivedParcel = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
];
export const ifStatusAssignedParcelTypePickUp = [
  { id: 1, status: "awaiting_pickup", title: "Awaiting Pickup" },
];
export const ifStatusAwaitingPickupParcel = [
  { id: 1, status: "completed", title: "Completed" },
];
export const ifStatusOnHoldParcel = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
];
export const ifStatusAssignedParcelTypeNoPickUp = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
];
export const ifStatusTenantNotifiedParcel = [
  { id: 1, status: "reassigned", title: "Reassigned" },
  { id: 2, status: "send_to_tenant", title: "Tend To Tenant" },
  { id: 3, status: "tenant_pickup", title: "Tenant Pickup " },
  { id: 4, status: "rejected", title: "Rejected" },
  { id: 5, status: "on_hold", title: "On Hold" },
];
export const ifStatusReassignedParcel = [
  { id: 1, status: "tenant_notified", title: "Tenant Notified" },
];
export const ifStatusTenantPickupParcel = [
  { id: 1, status: "completed", title: "Completed" },
];
export const ifStatusTendToTenantParcel = [
  { id: 1, status: "completed", title: "Completed" },
];
export const InputStyleBuilding = {
  marginTop: "15px",
  backgroundColor: "#F5F5F5",
  width: "100%",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    padding: "10px",
    fontSize: "14px",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const addTime = Object.entries(timeAvailable).flatMap(([day, times]) =>
  times?.state.map((val) => ({
    from: val.from,
    to: val.to,
    day,
    hour: times.hour,
    time: times.time,
    id: val.id,
  }))
);

export const radioStyle: {
  color: string;
  "&.Mui-checked": {
    color: string;
  };
} = {
  color: "#9c8f41",
  "&.Mui-checked": {
    color: "#9c8f41",
  },
};

export const newTime = Object.entries(timeAvailable).flatMap(([day, times]) =>
  times?.state.map((val) => ({
    from: val.from,
    to: val.to,
    day,
    hour: times.hour,
    time: times.time,
  }))
);

// search input style
export function getStyles(
  name: string,
  interestsArray: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      interestsArray.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const ITEM_HEIGHT = 48;
export const ITEM_PADDING_TOP = 8;
export const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const selectStyleInterests = {
  // width: '100%',
  "& .MuiSelect-root": {
    padding: 0,
  },
  "& .MuiSelect-select.MuiSelect-select": {
    padding: "0 5px",
    fontSize: "12px",
    backgroundColor: "white", // replace with your desired background color
    "&:focus": {
      backgroundColor: "white",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiSelect-icon": {
    top: "calc(50% - 12px)",
    right: 0,
    width: 24,
    height: 24,
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const selectDateTime = (fromTime: string, toTime: string) => {
  const fromHour = parseInt(fromTime.split(":")[0]);
  const toHour = parseInt(toTime.split(":")[0]);

  if (fromHour === 0 && toHour === 23) {
    return "All Day";
  } else if (fromHour === 12 && toHour === 18) {
    return "Morning";
  } else if (fromHour === 18 && toHour === 0) {
    return "Evening";
  }

  // Return 'Unknown' if the time does not match any time
  return "Unknown";
};

export interface RenotifyTenantUsingOTP {
  apartmentNumber: string;
  building: { name: "string" };
  buildingNumber: number;
  numberOfVisitors: number;
  owner: {
    email: string;
    firstName: string;
    image: { url: string; alt: string; description: string };
  };
  firstName: string;
  phoneNumber: string;
  visitPurpose: string;
  visitorName: string;
  visitorOtp: string;
  visitorPhoneNumber: string;
  visitorEmail: string;
}

export const handleChange =
  ({
    status,
    isBanner,
    setSAelectedAppBanner,
    setEditImage,
    setBase64,
    el,
    selectedImage,
    setSelectedImage,
    setEditBanner,
  }: THandleChange) =>
  (file: File | File[]) => {
    const FR = new FileReader();
    const firstElemFile = (file as File[])[0];
    if (isBanner) {
      FR.readAsDataURL(firstElemFile);
    }

    FR.addEventListener("load", function (evt: ProgressEvent<FileReader>) {
      if (evt.target && el !== undefined) {
        const base64 = (evt.target.result as string)?.split(",")[1];
        if (isBanner) {
          const banner = {
            name: firstElemFile.name,
            base64: base64,
            description: firstElemFile.name,
            alt: firstElemFile.name,
            url: firstElemFile,
          };
          if (status === "edit") {
            setSAelectedAppBanner &&
              setSAelectedAppBanner((prev) => [
                banner,
                ...prev.slice(0, prev.length - 1),
              ]);
          } else {
            setSAelectedAppBanner &&
              setSAelectedAppBanner((prev) => [...prev, banner]);
            setEditImage && setEditImage(true);
          }
        } else {
          setBase64 &&
            setBase64((prevState) => {
              const newBase64 = [...prevState];
              if (newBase64[el] !== undefined) {
                newBase64[el] = base64;
              } else {
                newBase64[el] = base64;
              }
              return newBase64;
            });
        }
      }
    });

    if (file && !isBanner && selectedImage) {
      if (status === "edit" && el !== undefined) {
        const newSelectedImages = [...selectedImage];
        if (newSelectedImages[el]) {
          newSelectedImages[el] = file as File;
        } else {
          newSelectedImages.push(file as File);
        }
        setSelectedImage && setSelectedImage(newSelectedImages);
      } else {
        const fileExists = selectedImage.some(
          (elem) => elem.name === (file as File).name
        );
        if (!fileExists) {
          setSelectedImage &&
            setSelectedImage([...selectedImage, file as File]);
          setEditBanner && setEditBanner(true);
        }
      }
      FR.readAsDataURL(file as File);
    }
  };

export const imageFormats = ["jpeg", "png", "gif", "jpg"];
export const dataLoader = new Array(10).fill(undefined);
export const novuConfig = JSON.parse(import.meta.env.VITE_NOVU_CONFIG);

export const AddApartmentToBuilding = new Array(10)
  .fill(undefined)
  .map((item) => {
    return (item = {
      apartment: "A122",
      apartmentSize: "120 m / 3 rooms, 120 m / 3 rooms",
      status: "Available",
    });
  });

export function generateRandomId() {
  const randomString = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now().toString(36).substring(2, 8);
  return randomString + timestamp;
}

export const handleChangeStatus =
  ({
    data,
    setLoadingStatus,
    requestId,
    mutate,
    setRequestid,
    refetch,
  }: ThandleChangeStatus) =>
  (newStatus: string) => {
    if (
      !(
        data.find((val: { _id: string }) => val?._id === requestId)?.status ===
        newStatus
      )
    ) {
      setLoadingStatus(requestId);
      mutate.mutate(
        {
          requestId: requestId,
          status: newStatus,
        },

        {
          onSuccess: () => {
            refetch && refetch();
            setTimeout(() => {
              setLoadingStatus("");
            }, 1000);
          },
        }
      );
      setRequestid("");
    }
  };

export const UsefullInfoInputStyle = {
  marginTop: "15px",
  backgroundColor: "#F5F5F5",
  width: "100%",
  borderRadius: "10px",
  "& .MuiOutlinedInput-root": {
    padding: "10px",
    fontSize: "14px",
    // background: "red",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};

export const timeLineData = [
  {
    createdAt: "12, Jan,2022",
    whatYouBuy: "Buy Monthly Package",
    amount: 200,
  },
  {
    createdAt: "11, Jan,2022",
    whatYouBuy: "Buy Monthly Package",
    amount: 300,
  },
  {
    createdAt: "10, Jan,2022",
    whatYouBuy: "Buy Monthly Package",
    amount: 1000,
  },
  {
    createdAt: "12, Jan,2022",
    whatYouBuy: "Buy Monthly Package",
    amount: 500,
  },
  {
    createdAt: "12, Jan,2022",
    whatYouBuy: "Buy Monthly Package",
    amount: 100,
  },
];

export const visitorRequestDialogStyle = {
  width: "100%",
  "& .MuiAutocomplete-inputRoot": {
    backgroundColor: "#EBEBEB",
    height: "36px",
    fontWeight: "bold",
    fontSize: "12px",
    borderRadius: "6px",
  },
  "& .MuiOutlinedInput-input": {
    paddingLeft: "24px",
  },
  "& .MuiOutlinedInput-root": {
    "& .MuiAutocomplete-input": {
      padding: "0px !important",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};

export const visitorRequestsDialogInputsGenerator = ({
  value,
  handleChange,
}: {
  value: (string | number)[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return visitorRequestsDialogInputs.map((item, index) => ({
    ...item,
    value: value[index],
    onChange: handleChange,
  }));
};

export const visitorRequestsDialogInputs: {
  placeholder: string;
  className: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  type: string;
}[] = [
  {
    placeholder: "Visitor Name",
    className: "visitor_name_input",
    value: "",
    onChange: () => {},
    name: "name",
    type: "text",
  },
  {
    placeholder: "Visitor Purpose",
    className: "visitor_name_input",
    value: "",
    onChange: () => {},
    name: "purpose",
    type: "text",
  },
  {
    placeholder: "Number of visitors",
    className: "visitor_name_input",
    value: 0,
    onChange: () => {},
    name: "number",
    type: "number",
  },
];

export const InputStyleW = {
  "& .MuiOutlinedInput-root": {
    padding: "0",
    fontSize: "12px",
    background: "#F9F9F9",
    "&:hover .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none",
      outline: "none",
    },
  },
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
    outline: "none",
  },
  "& .MuiMenuItem-root:hover": {
    backgroundColor: "transparent",
  },
};
export const rowsPerPageOptions = [10, 25, 50, 100];
export const AntSwitch = ({
  width,
  height,
  translate,
  bullerWidth,
  bullerHeight,
}: {
  width: number;
  height: number;
  translate?: string;
  bullerWidth: number;
  bullerHeight: number;
}) => {
  return {
    width: width,
    height: height,
    padding: 0,
    display: "flex",
    borderRadius: 10,
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 35,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 0.2,
      "&.Mui-checked": {
        transform: translate,
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#34C759",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: bullerWidth,
      height: bullerHeight,
      borderRadius: 10,
      transition: {
        duration: 200,
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  };
};

export const overViewCarosule = {
  desktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 4,
    slidesToSlide: 1, // Number of items to slide on every click
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // Number of items to slide on every click
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const handleChangePage = (
  label: string,
  setCurrentPage: (value: React.SetStateAction<number>) => void
) => {
  if (label === "next") {
    setCurrentPage((prev) => prev + 1);
  } else {
    setCurrentPage((prev) => prev - 1);
  }
};

export const valueMap = {
  [`${amenities}`]: {
    title: "Amenities",
    titleHeader: "Amenity",
    menuContent: menuitemDialog,
  },
  building: {
    title: "Buildings",
    titleHeader: "Buildings",
    menuContent: menuBuildingItemDialog,
  },
  Properties: {
    title: "Properties",
    titleHeader: "Properties",
    menuContent: menuBuildingItemDialog,
  },
  Properties_request: {
    title: "Properties Requests",
    titleHeader: "Properties Requests",
    menuContent: menuBuildingItemDialog,
  },
  services: {
    title: "Services",
    titleHeader: "Service",
    menuContent: menuitemDialogServices,
  },
  default: {
    title: "Maintenance",
    titleHeader: "Maintenance",
    menuContent: menuitemDialogMaintenance,
  },
};

export const GourmetManagmentdata = {
  data: {
    items: [
      {
        _id: "63fb2a32084d6f2f02cfd3fc",
        flow: "notices",
        description: "Testing",
        scheduleDateFrom: "2023-02-26T09:45:21.865Z",
        scheduleDateTo: "2023-02-26T10:45:21.866Z",
        status: "pending",
        timeToServe: "now",
        requestedBy: "admin",
        images: [
          {
            name: "testingfB8cy9L5F2emYy2dqc1GQuYypE3w9IzR.jpeg",
            url: "https://storage.googleapis.com/tenx-development2/service/testingfB8cy9L5F2emYy2dqc1GQuYypE3w9IzR.jpeg",
            alt: "testing",
            description: "testing",
          },
        ],
        service: {
          needServiceActor: false,
          name: "Notices",
          _id: "63b4173142916b799adf2ac3",
          flow: "notices",
        },
        organization: {
          name: "Abraj Bay",
          _id: "63a8b4cfaf1b0c19ca045a06",
          image: {
            name: "organization/Abraj BayQYH10OwT9muBqRYoOUzBjPigyayxkZRz.jpeg",
            url: "https://storage.googleapis.com/tenx-development2/organization/Abraj BayQYH10OwT9muBqRYoOUzBjPigyayxkZRz.jpeg",
            alt: "Abraj Bay",
            description: "Abraj Bay",
          },
        },
        paymentInfo: {
          paymentMethod: "cash",
          amount: 0,
          prePaidAmount: 0,
        },
        title: "Testing",
        content: "Testing",
        fileUrl: "string",
        isNew: true,
        sendByEmail: true,
        sendTo: "allTenant",
        views: 0,
        tenant: null,
        __t: "notices",
        createdAt: "2023-02-26T09:45:22.984Z",
        updatedAt: "2023-02-26T09:45:22.984Z",
        __v: 0,
        ownerFeedBack: {
          rate: 4,
          notes: "string",
        },
      },
    ],
    count: 1,
  },
};

export const createData = (
  qty: string,
  desc: string,
  rate: number,
  amont: string
) => {
  return { qty, desc, rate, amont };
};

export const rows = [
  createData("01", "Item Name", 3000, "$3,000.00"),
  createData("01", "Item Name", 3000, "$3,000.00"),
];
