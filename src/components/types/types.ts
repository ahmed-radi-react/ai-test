import { SelectChangeEvent } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  SVGProps,
} from "react";
import { IBuidling } from "../dashboard/tenants/AddTenant";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutationResult,
} from "@tanstack/react-query";

export type Detail = {
  id: number;
  tenants: string;
  people: number;
  selectedperiod: string;
  apartment: string;
  image: string;
};

interface IMessagesSort {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  message: string;
  title: string;
  style: string;
}

interface IHandleShowAlert {
  (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ): void;
}

export type ParcelContextType = {
  indexRow?: string;
  setOpenListTableContent?: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  openListTableContent?: number | undefined;
  tableIndex?: number;
  title?: string;
  setMessageSort?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  setMessageSortList?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  setTableIndex?: Dispatch<SetStateAction<number | undefined>>;
  messagesort?: IMessagesSort;
  setIndexRow?: Dispatch<SetStateAction<string>>;
  handleShowAlert?: IHandleShowAlert;
  hideMessage?: boolean;
};
export type ContextType = {
  data?: IDataReq[] | undefined;
  setData?: Dispatch<SetStateAction<IDataReq[] | undefined>>;
  setOpenContent: React.Dispatch<React.SetStateAction<number | undefined>>;
  openContent: number | undefined;
  index?: any;
  title?: string;
  titleheader?: string;
  sorttable?: string;
  amenityId?: string;
  tableIndex?: number;
  handleShowAlert?: (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => void;
  url?: string;
  setHideMessage?: (value: boolean) => void;
  setMessageSort?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  setOpen?: (value: boolean) => void;
  setDeactive?: (value: string | any) => void;
  setMessageSortList?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  openAddApartment?: boolean;
  setOpenAddApartment?: Dispatch<SetStateAction<boolean>>;
  handleClose?: (value: boolean) => void;
  handleChangeStatus?: (newStatus: string) => void;
  propertyIndex?: string;
  changeCalendar?: boolean;
  hideMessage?: boolean;
  setTableIndex?: Dispatch<SetStateAction<number | undefined>>;
  messagesort?: IMessagesSort;
  setTitleHeader?: Dispatch<SetStateAction<string>>;
  setAmenityId?: Dispatch<SetStateAction<string>>;
  open?: boolean;
  deactive?: string;
  setTitle?: Dispatch<SetStateAction<string>>;
  setIndex?: Dispatch<SetStateAction<string | undefined>>;
  setSorttable?: Dispatch<SetStateAction<string>>;
  setChangeCalendar?: Dispatch<SetStateAction<boolean>>;
  setPropertyIndex?: Dispatch<SetStateAction<string | undefined>>;
  setIndexNumber?: Dispatch<SetStateAction<number | undefined>>;
  indexNumber?: number;
};

export interface IMessageAlert {
  messagesort: IMessagesSort;
  error?: boolean;
}

interface IMessagesSort {
  icon: FunctionComponent<SVGProps<SVGSVGElement>>;
  message: string;
  title: string;
  style: string;
}

export type ContextTypeBreadcrumb = {
  breadcrumb?: { text: string };
  profileData?: IProfileData;
  setProfileData?: Dispatch<SetStateAction<IProfileData | undefined>>;
  setBreadcrumb?: Dispatch<
    SetStateAction<{ lastText: string; text: string; path: string }>
  >;
};

export interface ISortData {
  id: number;
  label: string;
  count: number;
}

export interface IAddAmenityInfo {
  valid: { name: string; description: string; count: string; capacity: string };
  setValid: Dispatch<
    SetStateAction<{
      name: string;
      description: string;
      count: string;
      capacity: string;
    }>
  >;
  setAddSubCategory?: (value: boolean) => void;
  handleAddService: () => void;
  value: {
    name_input: string;
    description_input: string;
    instraction_input: string;
  };
  setValue: any;
}

export interface IValue {
  name_input: string;
  description_input: string;
  instraction_input: string;
}

export interface IFeedBack {
  rate: number;
  notes: string;
  url?: string;
  name: string;
}

export interface IData {
  ownerFeedBack: IFeedBack;
  name?: string | undefined;
  description?: string | undefined;
  guideLinesAndInstructions?: string | undefined;
  timeWeekDay?: string;
  availabilitySlots?: any;
  amenityBuilding?: string;
  code?: string;
  //number[] | undefined;
  images?: any;
  voiceNote?: { url?: string };
  _id: string;
  flow: string;
  icon: {};
  service: { icon: { url?: string }; name: string };
}

export interface IReqData {
  reqdata: any;
  tenantData?: ITenant[];
  setMessageSortList?: any;
  handleChangeStatus?: (newStatus: string) => void;
}

export interface ITableTenant {
  tenantTable: ITenant[];
  filteredData: ITenant[];
  setFilteredData: React.Dispatch<React.SetStateAction<ITenant[]>>;
  pending: string;
  isLoading: boolean;
  setSearchVal: React.Dispatch<React.SetStateAction<string>>;
}

export interface ITenant {
  cars: string;
  pets: any;
  firstName?: string;
  image?: { url: string };
  tenantInfo?: {
    cars: any;
    apartmentNumber?: number;
    numberOfFamilyMembers?: number;
    numberOfGuests?: number;
  };
  buildings?: { name: string }[];
  _id: string;
  phoneNumber: number | string;
  scheduleDateFrom: string;
  scheduleDateTo: string;
  name: string;
  status: string;
}

export interface IProfileData {
  firstName?: string;
  image?: { url: string };
  numberOfNotifications?: number;
  email: string;
}

export interface IDataReq {
  parentId: string;
  numberOfRequests?: number;
  id: number;
  images: { url: string }[];
  label: string;
  time: string;
  requiestCount: number;
  participantsCount: number;
  link: string;
  instractionVal?: string;
  description?: string;
  timeWeekDay?: number[];
  slotsAvailable?: number[];
  amenityBuilding?: number[];
  name: string;
  icon: { url: string };
  _id: string;
  availabilitySlots: { from: string; to: string; day: string }[];
  bookable?: boolean;
  hasSubCategories: boolean;
}

export interface ISetOpenContent {
  setOpenContent: (value: string) => void;
  setData?: (value: any) => void;
  data?: any;
}

export interface IDetailData {
  _id: string;
  name?: string;
  description?: string;
  icon?: { url: string };
  images?: { url: string }[];
  bookable?: boolean;
  requireManualApproval?: boolean;
  banners?: { url: string }[];
  maximumBookingPerMonth?: string;
  hasSubCategories?: boolean;
  services: { flow: string; name?: string }[];
  guideLinesAndInstructions?: string;
  desc?: string;
}

export interface ITarget {
  target: { value: string; name: string };
}

export interface IPropertyRequestTable {
  id: number;
  _id?: string;
  image: {
    url: string;
    alt: string;
  };
  firstName: string;
  property: string;
  building: string;
  status: string;
  scheduleDateTo: string;
  owner?: {
    image: {
      url: string;
      alt: string;
    };
    firstName?: string;
    tenantInfo?: { apartmentNumber?: number };
  };
  service?: {
    name: string;
    icon: {
      name?: string;
      url?: string;
      alt?: string;
    };
  };
}

export interface IPropertyListTable {
  images: { url?: string }[];
  property: string;
  building: string;
  facilities: string[];
  status: string;
  scheduleDateTo?: string;
  name?: string;
  icon: { url?: string };
  createdAt: string;
}

export interface IsetSetting {
  setSetting?: (value: boolean) => void;
  setAmenitiesDataForParent?: any;
  amenitiesData?: any;
  maintenanceData?: any;
  setMaintenanceDataForParent?: any;
  isOnlyList?: boolean;
}

export interface IBuilding {
  _id: string;
  code: string;
  createdAt: string;
  name: string;
  images: [{}];
  organization: {};
  services: [{}];
  status: string;
  updatedAt: string;
}

export interface TimeSlot {
  id: number;
  from: string;
  to: string;
}

export interface IRequestDialog {
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  setOpenReq?: (value: boolean) => void;
  title: string;
  url?: string;
  setOpen?: (value: boolean) => void;
  setMessageSort?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  setHideMessage?: (value: boolean) => void;
  setMessageSortList?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  data?: IDataReq[];
  setHideMessageReq?: (value: boolean) => void;
  setError?: (value: boolean) => void;
  isListPage?: boolean | undefined;
  reqdata?: any;
  handleChangeStatus?: (newStatus: string) => void;
  handleCloseDialog?: any;
  changeCalendar?: boolean;
  targetArray?: { id: number; status: string; title: string }[];
}

export interface ITenantInfo {
  expanded?: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionComplete: { stepOne: boolean; stepTwo: boolean; stepThree: boolean };
  accordionThree: string[];
  optionApartment: string;
  setOptionApartment: Dispatch<SetStateAction<string>>;
  mutateApartment: any;
  setTenantId: Dispatch<
    SetStateAction<{
      tenantid: string;
      buildingid: string;
      recidentId: string;
    }>
  >;
  optionTenant: string;
  setOptionTenant: Dispatch<SetStateAction<string>>;
  subData: { _id: string; name: string; status: string }[];
  setOptionReceivedBy: Dispatch<SetStateAction<string>>;
  optionReceivedBy: string;
  building: IBuilding[];
}

export interface IMessageBody {
  title: string;
  number: string;
  data: any[];
}

export interface IBarChart {
  title: string;
  number: string;
  mainColor: string;
  bgColor: string;
  maxCompleteNumber: number;
}

export interface IHeaderHome {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  color: string;
}

export interface ISupportContent {
  Icon: React.ReactNode;
  title: string;
  subtitle: string;
  button: string;
}

export type TSecondStepProps = {
  data?: IDataReq[];
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  setOpenReq?: (value: boolean) => void;
  title?: string;
  setError?: (value: boolean) => void;
  setHideMessageReq?: (value: boolean) => void;
  setHideMessage?: (value: boolean) => void;
  setOpen?: (value: boolean) => void;
  setMessageSort?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  selectTime: boolean;
  setSelectTime: React.Dispatch<React.SetStateAction<boolean>>;
  dialog: IDataReq | null;
  handleClose: () => void;

  selectedDay: string[];
  setSelectedDay: React.Dispatch<React.SetStateAction<string[]>>;

  optionValueApartment: IApartments;
  optionValue: any | null;
  selectedRange: string;
  setSelectedRange: Dispatch<SetStateAction<string>>;
  selectMorning: {
    id: number;
    from: string;
    to: string;
  };
  setSelectMorning: Dispatch<
    SetStateAction<{
      id: number;
      from: string;
      to: string;
    }>
  >;
  reqdata: any;
  changeCalendar?: boolean;
  targetArray?: {
    id: number;
    status: string;
    title: string;
  }[];
  handleChangeStatus?: (newStatus: string) => void;
  handleCloseDialog?: any;
};

export interface IApartments {
  // _id: string,
  name: string;
  // status: string,
  // building: {
  //   name: string,
  //   services: {
  //       requireManualApproval: false,
  //       needServiceActor: false,
  //       name: string,
  //       _id: string,
  //       flow: string
  //     }[],
  //   _id: string,
  //   images: {
  //       name: string,
  //       url: string,
  //       alt: string,
  //       description: string
  //     }[]
  // },
  // createdAt: string,
  // updatedAt: string,
}

export type TFirstStepProps = {
  data?: IDataReq[];
  sortedTenant: any;
  setMessage?: React.Dispatch<React.SetStateAction<string>>;
  setOpenReq?: (value: boolean) => void;
  title?: string;
  setError?: (value: boolean) => void;
  setHideMessageReq?: (value: boolean) => void;
  setHideMessage?: (value: boolean) => void;
  setOpen?: (value: boolean) => void;
  setMessageSort?: (value: {
    icon: FunctionComponent<SVGProps<SVGSVGElement>>;
    message: string;
    title: string;
    style: string;
  }) => void;
  selectTime: boolean;
  setSelectTime: React.Dispatch<React.SetStateAction<boolean>>;
  handleMaintenanceChange: (event: SelectChangeEvent) => void;
  handleChangeBuilding: (id: string) => void;
  handleChangeApartment: (event: SelectChangeEvent) => void;
  dialog: IDataReq | null;
  setDialog: Dispatch<React.SetStateAction<IDataReq | null>>;
  setTenantId: Dispatch<
    React.SetStateAction<{
      tenantid: string;
      buildingid: string;
      aprtId: string;
    }>
  >;
  optionValueApartment: IApartments;
  setOptionValueApartment: Dispatch<SetStateAction<IApartments>>;
  optionValue: any | null;
  setOptionValue: Dispatch<SetStateAction<any>>;
  period: number;
  setPeriod: Dispatch<SetStateAction<number>>;
  buildingData: any;
  setSelectedBuildingId: Dispatch<SetStateAction<string>>;
  aprtData: any;
};

export interface IOTherProperty {
  expanded: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionCompleteStep: { stepOne: boolean };
  selectedImages: {
    name: string;
    base64: string;
    description: string;
    alt: string;
    url: File;
  }[];
  accordionOne: Array<string | number | null>;
  setBase64: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
  setSelectedImages: Dispatch<
    SetStateAction<
      {
        name: string;
        base64: string;
        description: string;
        alt: string;
        url: File;
      }[]
    >
  >;
  buttonOne: boolean;
  info: { name: string; desc: string };
  setInfo: Dispatch<SetStateAction<{ name: string; desc: string }>>;
}

export interface IData {
  severityLevel?: string;
  scheduleDateFrom: string;
  scheduleDateTo: string;
  _id: string;
  organization: { image: { url: string }; name: string };
  owner: {
    _id: string;
    image?: { url: string };
    firstName: string;
    tenantInfo?: { apartmentNumber?: string };
  };
  status?: string;
  service: { name: string; icon: { url?: string } };
  building?: { name?: string };
  createdAt?: string;
}

export interface ISortedData {
  id: number;
  label: string;
  data: IData[];
  image?: string;
}

export type TService = {
  availabilitySlots: any;
  banners: any;
  bookable: boolean;
  createdAt: string;
  description: string;
  facilities: any;
  flow: string;
  hasSubCategories: boolean;
  images: string[];
  isMainFrontPageService: boolean;
  isPrivateToOrganization: boolean;
  name: string;
  needServiceActor: boolean;
  numberOfRequests: number;
  requireManualApproval: boolean;
  status: string;
  _id: string;
};

export type TEachService = {
  _id: string;
  description: string;
  scheduleDateTo: string;
  scheduleDateFrom: string;

  status: string;
  service: {
    requireManualApproval: boolean;
    needServiceActor: boolean;
    name: string;
    _id: string;
    flow: string;
  };

  requestedBy: string;
  images: any;

  owner: {
    _id: string;
    firstName: string;
    email: string;
    roleId: string;
    phoneNumber: string;
    role: {
      name: string;
      requiredUserFields: any;
      _id: string;
      permissions: any;
      description: string;
    };
    tenantInfo: {
      numberOfGuests: number;
      numberOfFamilyMembers: number;
      apartmentNumber: string;
      cars: {
        name: string;
        model: string;
        _id: string;
      }[];
      pets: {
        name: string;
        type: string;
        age: number;
        _id: string;
      }[];
    };
    image: {
      name: string;
      url: string;
      alt: string;
      description: string;
    };
  };
  organization: {
    name: string;
    image: {
      name: string;
      url: string;
      alt: string;
      description: string;
    };
    _id: string;
    status: string;
  };
  building: {
    name: string;
    _id: string;
    images: {
      name: string;
      url: string;
      alt: string;
      description: string;
    }[];
  };
  paymentInfo: {
    paymentMethod: string;
    amount: number;
    prePaidAmount: number;
  };
  flow: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type THomePageSelectProps = {
  setHomePageSorttable?: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  services?: TService[];
  statusses?: TStatusses[];
};

export type TCarouseChunkProps = {
  title: string;
  dashboard?: boolean;
  sortedData: ISortedData[];
  sorttable: string;
  setSorttable: React.Dispatch<React.SetStateAction<string>>;
  handleClick: (label: string) => void;
};

export type TStatusses = {
  id: number;
  status: string;
  title: string;
};

export interface IApartmentDialog {
  setOpenAddApartment: Dispatch<SetStateAction<boolean>>;
  setHideMessage: Dispatch<SetStateAction<boolean>>;
  setMessageSort: Dispatch<
    SetStateAction<{
      icon: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
      >;
      message: string;
      title: string;
      style: string;
    }>
  >;
  amenityId: string;
}

export interface IOwner {
  _id: string;
  image: { url: string };
  firstName: string;
  tenantInfo: { apartmentNumber: number };
}

export interface parcelProps {
  isDashboard?: boolean;
}

export interface IParcelManagementTable {
  name?: string;
  owner: IOwner;
  scheduleDateTo: string;
  scheduleDateFrom: string;
  service: {
    name: string;
    icon: { url?: string };
  };
  status: string;
  type?: string;
  code: string;
  building?: {
    name: string;
    images: { url: string; alt: string; description: string; name: string }[];
  };
  _id: string;
  images?: any;
  url?: any;
  flow: string;
  icon: {};
}

export interface IFamily {
  firstName: string;
  email: string;
  age: string;
  relationship: string;
}

export interface IAddNewFamilyMember {
  handleClick: (type: string, id?: number) => void;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  family: IFamily;
  setFamily: React.Dispatch<
    React.SetStateAction<{
      firstName: string;
      email: string;
      age: string;
      relationship: string;
      id: number;
    }>
  >;
  phoneFamily: string;
  setPhoneFamily: React.Dispatch<React.SetStateAction<string>>;
  data: {
    firstName: string;
    phoneNumber: string;
    id: number;
    countryCode: string;
    email: string;
    relation: string;
    age: string;
  }[];
  editIndex: number;
  handleRemove: (type: string, editIndex?: number) => void;
}

export interface IFamilyGuestPets {
  guestPhone: string;
  setguestPhone: React.Dispatch<React.SetStateAction<string>>;
  setData: React.Dispatch<
    React.SetStateAction<{
      family: any;
      pets: any;
      guests: any;
      car: any;
    }>
  >;
  data: {
    family: {
      firstName: string;
      phoneNumber: string;
      countryCode: string;
      email: string;
      id: number;
      relation: string;
      age: string;
    }[];
    guests: [];
    pets: [];
    car: [];
  };
  guestNumber: any;
  family?: any;
  setFamily: any;
}

export interface ITimeAvailability {
  updateData?: IData;
  setConvertedData?: Dispatch<
    SetStateAction<{ from: string; to: string; day: string }[][]>
  >;
  convertedData?: { from: string; to: string; day: string }[];
  slotsData?: { day: string; from: string; to: string };
  setSlotsData?: Dispatch<
    SetStateAction<{ day: string; from: string; to: string }[]>
  >;
  el: number;
  setAvailabiliySlot: Dispatch<SetStateAction<{}[][] | {}[]>>;
  availabilitySlots?: any;
  setAllowMultipleSlots?: Dispatch<SetStateAction<boolean>>;
  allowMultipleSlots?: boolean;
}

export type AvailableDate = {
  [key: string]: { state: TimeSlot[]; hour: string; time: string };
};

export interface IbuidlingData {
  _id: string;
  name?: string;
}

export type banner = {
  name: string;
  base64: string;
  description: string;
  alt: string;
  url: File;
};

export interface IVisitorDialogProp {
  handleClose: () => void;
  handleShowAlert: (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => void;
  setOpenVisitor?: (value: boolean) => void;
}

export interface IBellboyList {
  _id: string;
  image?: { url?: string };
  firstName: string;
  numberOfNotifications: number;
}

export interface IBellboyReqData {
  owner: {
    image?: { url: string };
    firstName?: string;
    tenantInfo?: { apartmentNumber: string };
  };
  scheduleDateFrom: string;
  scheduleDateTo: string;
  status: string;
  _id: string;
  service: {
    name: string;
    icon: { url?: string };
  };
  code: string;
  flow: string;
  building: {
    name: string;
  };
  icon: {};
}

export interface IGeneralInfo {
  imageChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    status?: string
  ) => void;
  selectedImage: Blob | MediaSource | undefined;
  setValue: (value: string) => void;
  value: string;
  // setTenantName: React.Dispatch<React.SetStateAction<string>>;
  // setTenantEmail: React.Dispatch<React.SetStateAction<string>>;
  // setTenantBirthDate: React.Dispatch<React.SetStateAction<string>>;
  handleGeneralInfoValidation: (e: ITarget) => void;
  setErrorName: React.Dispatch<React.SetStateAction<string>>;
  errorName: string;
  setErrorEmail: React.Dispatch<React.SetStateAction<string>>;
  errorEmail: string;
  setErrorDate: React.Dispatch<React.SetStateAction<string>>;
  errorDate: string;
  // tenantName: string;
  generalInfo: {
    tenant_name: string;
    tenant_email: string;
    date_birth: string;
  };
  setGeneralInfo: React.Dispatch<
    React.SetStateAction<{
      tenant_name: string;
      tenant_email: string;
      date_birth: string;
    }>
  >;
  fullNumber?: string;
  image?: {
    alt: string;
    url: string;
    description: string;
    name: string;
  };
}

export interface IBellboyDialog {
  setOpen?: (value: boolean) => void;
  setHideMessage?: (value: boolean) => void;
  setMessageSort?: Dispatch<
    SetStateAction<{
      icon: FunctionComponent<
        SVGProps<SVGSVGElement> & { title?: string | undefined }
      >;
      message: string;
      title: string;
      style: string;
    }>
  >;
}

export interface IValetDashboardProps {
  setHideMessage?: Dispatch<SetStateAction<boolean>>;
  url?: string;
  setMessageSort?: React.Dispatch<
    React.SetStateAction<{
      icon: FunctionComponent<SVGProps<SVGSVGElement>>;
      message: string;
      title: string;
      style: string;
    }>
  >;
  hideMessage?: boolean;
}

export interface IAmenityBuildingSetting {
  handleSelect: (e: SelectChangeEvent<string>) => void;
  buidlingData: { _id: string; name?: string }[];
  slotsDataBuilding: string[];
  setSlotsDataBuilding: Dispatch<SetStateAction<string[]>>;
  setCount?: Dispatch<SetStateAction<number | undefined>>;
  valid: { name: string; description: string; count: string; capacity: string };
  setValid: Dispatch<
    SetStateAction<{
      name: string;
      description: string;
      count: string;
      capacity: string;
    }>
  >;
  addService: number[];
  count?: number;
  setSettingBookableAndPayment: Dispatch<
    SetStateAction<{
      bookable: boolean;
      requireManualApproval: boolean;
      bookingLimitationPerAprt: boolean;
      bookingLimitationPerTenant: boolean;
      requirePeyment: boolean;
    }>
  >;
  bookable?: boolean;
  bookingLimitationPerAprt?: boolean;
  requireManualApproval?: boolean;
  bookingLimitationPerTenant?: boolean;
  requirePeyment?: boolean;
  maximumBookingPer?: string;
  capacity: number | undefined;
  setCapacity?: Dispatch<SetStateAction<number | undefined>>;
  setMaximumBookingFor: Dispatch<SetStateAction<string>>;
}

export interface IStatus {
  page: string;
  status: string;
  showIcon?: boolean;
  handleChangeStatus: (newStatus: string) => void;
  aaaa?: string;
}

export interface IStatusIcon {
  status: string;
  showIcon?: boolean;
  page: string;
}

export interface IAssign {
  title: string;
}

export interface INoticeData {
  scheduleDateFrom?: string;
  _id: string;
  title?: string;
  description?: string;
  images?: { url: string }[];
  views?: number;
}

export interface IUsefulInformationData {
  scheduleDateFrom?: string;
  _id: string;
  title?: string;
  description?: string;
  images?: { url: string }[];
  views?: number;
}

export type TBookingLimitationProps = {
  handleChange: (event: any, label: string) => void;
  count?: number;
  maximumBookingPer?: string;
  handleSelect: (e: SelectChangeEvent<string>) => void;
};

export interface StyleProps {
  height: number;
}

export interface ILocation {
  setOrganization: React.Dispatch<React.SetStateAction<string>>;
  setBuildingNumber: React.Dispatch<React.SetStateAction<string>>;
  setApartmentNumberID: React.Dispatch<React.SetStateAction<string>>;
  organization: string;
  buildingNumber: string;
  apartmentNumberID: string;
  setBuilding: (value: IBuidling[]) => void;
  building: IBuidling[];
  setTenantId: React.Dispatch<
    React.SetStateAction<{ tenantid: string; buildingid: string }>
  >;
  tenantId: { tenantid: string; buildingid: string };
  apartmentName: string;
  setApartmentName: React.Dispatch<React.SetStateAction<string>>;
}

export interface IInterests {
  interestsArray: string[];
  setInterestArray: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface ISetPass {
  values: {
    email: string;
    pass: string;
    showPass: boolean;
  };
  setValues: React.Dispatch<
    React.SetStateAction<{
      email: string;
      pass: string;
      showPass: boolean;
    }>
  >;
  fullNumber?: string;
}

export interface IAddAmenitySubCategory {
  handleChange: (arg: THandleChange) => (file: File | File[]) => void;
  updateData?: IData;
  el: number;
  handleDeleteService: (id: number) => void;
  addService: number[];
  setConvertedData: React.Dispatch<
    React.SetStateAction<{ from: string; to: string; day: string }[][]>
  >;
  convertedData: { from: string; to: string; day: string }[];
  slotsData: { day: string; from: string; to: string };
  setSlotsData: React.Dispatch<
    React.SetStateAction<{ day: string; from: string; to: string }[]>
  >;
  selectedImage: File[];
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
  // active: boolean,
  // setActive: Dispatch<React.SetStateAction<boolean>>,
  availabilitySlotSub: {}[];
  setAvailabiliySlotSub: Dispatch<React.SetStateAction<{}[][]>>;
  setSubTime: Dispatch<React.SetStateAction<{}[]>>;
  subTime: {}[];
  availabilitySlot: any;
}

export interface ILocationInterface {
  expanded: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionCompleteStep: { stepTwo: boolean };
  accordionTwo: string[];
  buttonTwo: boolean;
  setSelectLocation: Dispatch<SetStateAction<{ id: number; label: string }>>;
  selectLocation: { id: number; label: string };
  setSelectProperty: Dispatch<SetStateAction<{ id: number; label: string }>>;
  selectProperty: { id: number; label: string };
}

export interface ITableSort {
  setCheckedDate: any;
  checkedDate: any;
  setCheckedType: Dispatch<SetStateAction<string[]>>;
  checkedType: string[];
  handleHeaderFilter: (value: string) => void;
  handleSortDate: (value: string) => void;
}

export interface IComponeneService {
  selectedImage?: File;
  setSelectedImage?: (value: File) => void;
  infoInput?: { name: string; des: string };
  setInfoInput?: any;
}

export interface IForgotPass {
  setNext: (value: boolean) => void;
}

export interface INext {
  handleClick: (e: React.SyntheticEvent) => void;
  emailValid: boolean;
  emailVal: string;
  emailhandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface IEmailVal {
  emailVal: string;
  emailhandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface GourmetManagementSettings {
  setSetting: (value: boolean) => void;
  title: string;
  typeImage: string;
}

export interface ICard {
  header: string;
  number: number;
  color: string;
  gradient: string;
  percentage: string;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

export interface IOtherProperties {
  setSetting: React.Dispatch<React.SetStateAction<boolean>>;
  setPropertyData: any;
  propertyData: any;
}

export interface IPropertyRequestProp {
  isDashboard?: boolean;
}

export interface IAddParcelInformation {
  expanded?: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionComplete: { stepOne: boolean; stepTwo: boolean; stepThree: boolean };
  accordionOne: Array<string | ArrayBuffer | null>;
  selectedImage?: File[];
  setSelectedImage?: Dispatch<SetStateAction<File[]>>;
  setBase64: Dispatch<SetStateAction<(string | ArrayBuffer | null)[]>>;
  setEditBanner: Dispatch<SetStateAction<boolean>>;
  editbanner: boolean;
  setInfoVal: Dispatch<
    SetStateAction<{
      amount: string;
      tracking: string;
      enterText: string;
      name: string;
    }>
  >;
  infoVal: {
    amount: string;
    tracking: string;
    enterText: string;
    name: string;
  };
  optionParcelsType: string;
  setOptionParcelsType: Dispatch<SetStateAction<string>>;
  setInputDate: Dispatch<SetStateAction<string>>;
  // pickUpPersonName: string;
  setPickUpPersonName: Dispatch<SetStateAction<string>>;
  pickUpPersonPhone: string;
  setPickUpPersonPhone: Dispatch<SetStateAction<string>>;
  pickUpSelectDeliver: string;
  setPickUpSelectDeliver: Dispatch<SetStateAction<string>>;
  pickUpSelectFood: string;
  setPickUpSelectFood: Dispatch<SetStateAction<string>>;
}

export interface IReceiving {
  expanded?: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionComplete: { stepOne: boolean; stepTwo: boolean; stepThree: boolean };
  accordionTwo: string[];
  optionReceiving: string;
  setOptionReceiving: Dispatch<SetStateAction<string>>;
}

export interface IServiceManagement {
  setChangeTable?: Dispatch<SetStateAction<boolean>>;
  data?: IDataReq[];
}

export interface IActor {
  selectActor: string;
  setSelectActor: (value: string) => void;
}

export interface IPropertyDetails {
  selectProperty?: string;
  setSelectProperty?: (value: string) => void;
}

export interface ISelect {
  select?: string;
  setSelect: (value: string) => void;
}

export interface IAccount {
  setDate: React.Dispatch<React.SetStateAction<any>>;
  date: any;
}

export interface IValidation {
  setFileType: React.Dispatch<React.SetStateAction<string>>;
  fileType: string;
  setSelectedDocument: React.Dispatch<React.SetStateAction<File | undefined>>;
  selectedDocument: File | undefined;
}

export interface IValetData {
  _id: string;
  owner?: {
    image?: { url: string };
    firstName: string;
    tenantInfo?: { apartmentNumber: string };
  };
  car?: { name: string };
  status: string;
  scheduleDateFrom: string;
  scheduleDateTo: string;
  service: {
    name: string;
    icon: {};
  };
  code: string;
  flow: string;
  building?: {
    name: string;
    images: { url: string; alt: string; description: string; name: string }[];
  };
  icon: {};
}

export type PropsFeedBack = {
  feedback?: IFeedBack;
};

export interface IBackNavigate {
  title?: string;
  setSetting?: (value: boolean) => void;
}

export type THomePageHEaderProps = {
  handleClick?: (label: string) => void;
  servicedData: TEachService[];
  homePageSorttable?: string;
  index?: string;
  services?: TService[] | IData[];
  handleRemoveService: () => void;
  setHomePageSorttable: React.Dispatch<
    React.SetStateAction<string | undefined>
  >;
  count: number;
};
export type TSortHedaerDropdownProps = {
  title: string;
  buildingsName?: { id: string; name: string }[];
  setCheckedDate: any;
  checkedDate: any;
  checkedItems?: { status: string; building: string };
  setCheckedItems?: React.Dispatch<
    React.SetStateAction<{ status: string; building: string }>
  >;
  refetchData?: () => void;
};

export type TSortHeaderProps = {
  changeCalendar: boolean;
  url: string;
  handleClickCalendar: () => void;
  setOpenReq: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  buildingsName?: { id: string; name: string }[];
  setCheckedDate: any;
  checkedDate: any;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  refetchData?: () => void;
  servicedData: TEachService[] | IData[];
  setServicesData:
    | React.Dispatch<
        React.SetStateAction<
          {
            scheduleDateFrom: string;
          }[]
        >
      >
    | React.Dispatch<React.SetStateAction<IValetData[]>>
    | Dispatch<React.SetStateAction<TEachService[]>>;
  checkedItems?: { status: string; building: string };
  setCheckedItems?: React.Dispatch<
    React.SetStateAction<{ status: string; building: string }>
  >;
};
export type THomePageTable = {
  servicedData: TEachService[];
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  setRequestid: React.Dispatch<React.SetStateAction<string>>;
  handleChangeStatus: (newStatus: string) => void;
  isLoadingServicesReq: boolean;
};

export type NonHomeType = {
  filteredData: IData[];
  sorttable: string;
  value: string;
  title: string;
  setAttachment: React.Dispatch<React.SetStateAction<boolean>>;
  setIndex: React.Dispatch<React.SetStateAction<string | undefined>>;
  setShowTooltip: React.Dispatch<React.SetStateAction<boolean>>;
  showTooltip: boolean;
  setRequestid: React.Dispatch<React.SetStateAction<string>>;
  loadingStatus: string;
  handleChangeStatus: (newStatus: string) => void;
  setFeedBackOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedFeedBack: any;
  showTooltipFeedBack: boolean;
  setShowTooltipFeedBack: React.Dispatch<React.SetStateAction<boolean>>;
  handleMenuClick: (index: number) => void;
  isLoading: boolean;
};

export interface IApiRequest {
  url?: string;
  body?: object;
  headers?: object;
  isAuth?: boolean;
  method: string;
}

export type tBut = {
  view: any;
  changeView: any;
};

export interface IUploadImageProps {
  imageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChange?: (file: File) => void;
  className?: string;
  dropImage: string;
  small?: boolean;
  name?: string;
  banner?: boolean;
}

export interface IFetchingStrategy {
  fetchUnseenCount: boolean;
  fetchOrganization: boolean;
  fetchNotifications: boolean;
  fetchUserPreferences: boolean;
}

export interface IFacilities {
  expanded: string | false;
  setExpanded: Dispatch<SetStateAction<string | false>>;
  sectionCompleteStep: { stepThree: boolean };
  facilityArray: string[];
  accordionThree: number[];
  facilityName: string;
  setFacilityName: Dispatch<SetStateAction<string>>;
  setFacilityArray: Dispatch<SetStateAction<string[]>>;
  buttonThree: boolean;
}

export interface IAddCar {
  handleClick: (type: string, editIndex?: number) => void;
  setCarBrandName: React.Dispatch<React.SetStateAction<string>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  carName: { name: string; model: string; id: number };
  setCarName: React.Dispatch<
    React.SetStateAction<{ name: string; model: string; id: number }>
  >;
  carBrandName: string;
  data: { name: string; id: number }[];
  editIndex: number;
  handleRemove: (type: string, editIndex?: number) => void;
}

export interface IGuests {
  firstName: string;
  email: string;
  proffesion: string;
  id: number;
}

export interface IAddGuest {
  handleClick: (type: string, editIndex?: number) => void;
  guestPhone: string;
  setguestPhone: React.Dispatch<React.SetStateAction<string>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setGuestsVal: React.Dispatch<React.SetStateAction<IGuests>>;
  guestsVal: IGuests;
  phoneFamily: string;
  handleRemove: (type: string, editIndex?: number) => void;
  setPhoneFamily: React.Dispatch<React.SetStateAction<string>>;
  data: {
    firstName: string;
    email: string;
    proffesion: string;
    phoneNumber: string;
    id: number;
    countryCode: string;
  }[];
  editIndex: number;
}

export interface IChargeWalletDialogProp {
  handleConfirmAddBalance: () => void;
  handleNotifyTalent: () => void;
  confirmStepTwo: boolean;
  handleConfirmStepTwo: () => void;
  handleCancel: () => void;
  handleBalance: (balance: string) => void;
  handleConfirmStepOne: () => void;
  confirmStepOne: boolean;
  balance: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  tenantIdrow: string;
}

export interface IUsefulData {
  scheduleDateFrom?: string;
  _id: string;
  title?: string;
  description?: string;
  images?: { url: string }[];
  views?: number;
  content?: string;
}

export interface IAddUserInfo {
  selectedImage?: File[];
  setSelectedImage?: React.Dispatch<React.SetStateAction<File[]>>;
  value: string;
  setValue: (value: string) => void;
  infoInput?: { name: string; email: string; birthday: string };
  setInfoInput?: Dispatch<
    SetStateAction<{ name: string; email: string; birthday: string }>
  >;
  setInfo: Dispatch<
    SetStateAction<{
      number: string;
      countryCode: string;
    }>
  >;
  info?: {
    number: string;
    countryCode: string;
  };
  setBase64?: Dispatch<SetStateAction<string | ArrayBuffer | null>>;
}

export interface IVisitorDialogProps {
  handleCloseVisitorOTP: () => void;
  handleShowAlert: (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => void;
  setOpenVisitorOTP?: (value: boolean) => void;
}

export interface APIData {
  _id: string;
  visitorName: string;
  owner: { firstName: string };
  visitorOtp: string;
  apartmentNumber: number;
}

export interface IAddPets {
  handleClick: (type: string, editIndex?: number) => void;
  setPetType: React.Dispatch<React.SetStateAction<string>>;
  setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleRemove: (type: string, editIndex?: number) => void;
  editIndex?: number;
  petType: string;
  petsVal: {
    name: string;
    id: number;
    age: string;
  };
  data: {
    name: string;
    id: number;
    age: string;
  }[];
  setPetsVal: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: number;
      age: string;
    }>
  >;
}

export interface IVisitorsReqData {
  scheduleDateFrom?: string;
  _id: string;
  status?: string;
  images?: { url?: string };
  buildingNumber?: number;
  apartmentNumber?: number;
  numberOfVisitors?: number;
  visitorName?: number;
  visitorPhoneNumber?: string;
  visitorOtp?: string;
  owner?: { image: { url: string }; firstName: string };
}

export interface IUrl {
  visitorData: any;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchVal?: React.Dispatch<React.SetStateAction<string>>;
  refetch?: () => void;
  data: { data: { count: number } };
  setVisitorData: any;
  isLoading: boolean;
  searchVal?: string;
  sorttable?: string;
  totalRows: number;
  currentPage: number;
  handlePageChange: (event: any, page: number) => void;
  limitPerPage: number;
  changePageLimit: (limit: number) => void;
  visitorOTP: string;
  setVisitorOTP: React.Dispatch<React.SetStateAction<string>>;
}

export interface IAddVisitorDialog {
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  type?: string;
  visitorOTP: string;
  setVisitorOTP: React.Dispatch<React.SetStateAction<string>>;
}

export interface IOwnerVisitor {
  image: { url: string };
  firstName: string;
  tenantInfo: { apartmentNumber: number };
}

export interface IVisitor {
  owner: IOwnerVisitor;
  scheduleDateTo: string;
  status: string;
}

export interface IList {
  data?: {
    items?: {
      firstName?: string;
      label: string;
      images?: { url?: string }[];
      image?: { url: string };
      name: string;
      icon?: { url?: string };
      numberOfRequests?: number;
    }[];
    count: number;
  };
  addbutton: string;
  showAll: string;
  addNavigate: string;
  showNavigate: string;
}

export interface IAttachment {
  togglePlay: () => void;
  isPlaying: boolean;
  index: string | undefined;
}

export interface ICarouselDialog {
  addedbanner: boolean;
  data: { image?: string; url?: any; images?: { url: string }[] }[];
  parcel?: boolean;
  onClose?: Dispatch<React.SetStateAction<boolean>>;
  maintenance?: boolean;
}

export interface IDeactiveDialog {
  title: string;
  url: string;
  dataInfo?: { name?: string; _id: string };
}

export interface IDeleteDialog {
  title: string;
  dataInfo?: { name?: string; _id: string };
  profile?: IProfileData;
}

export interface IShare {
  dataInfo?: IDetailData;
}

export interface IReNotifyTenantDialog {
  handleShowAlert: (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => void;
  handleCloseTableListDialog: () => void;
  type?: string;
  searchVal?: string;
  sorttable?: string;
  visitorOTP?: string;
  setVisitorOTP?: React.Dispatch<React.SetStateAction<string>>;
}

export type THandleChange = {
  status: string;
  isBanner: boolean;
  el?: number;
  setSAelectedAppBanner?: Dispatch<
    SetStateAction<
      {
        alt: string;
        base64: string;
        description: string;
        name: string;
        url: File;
      }[]
    >
  >;
  setEditImage?: Dispatch<SetStateAction<boolean>>;
  setBase64?: Dispatch<SetStateAction<(string | ArrayBuffer | null)[]>>;
  setSelectedImage?: Dispatch<SetStateAction<File[]>>;
  selectedImage?: File[];
  setEditBanner?: Dispatch<SetStateAction<boolean>>;
};

export interface RenotifyTenantUsingOTP {
  _id: string;
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

export interface IStatusMappings {
  [key: string]: string | undefined;
}

export interface IApi {
  data: {
    items: {
      _id: string;
      flow: string;
      description: string;
      scheduleDateFrom: string;
      scheduleDateTo: string;
      status: string;
      timeToServe: string;
      requestedBy: string;
      images: {
        name: string;
        url: string;
        alt: string;
        description: string;
      }[];
      service: {
        needServiceActor: boolean;
        name: string;
        _id: string;
        flow: string;
      };
      organization: {
        name: string;
        _id: string;
        image: {
          name: string;
          url: string;
          alt: string;
          description: string;
        };
      };
      paymentInfo: {
        paymentMethod: string;
        amount: number;
        prePaidAmount: number;
      };
      title: string;
      content: string;
      fileUrl: string;
      isNew: boolean;
      sendByEmail: boolean;
      sendTo: string;
      views: number;
      tenant: null;
      __t: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      ownerFeedBack: {
        rate: number;
        notes: string;
      };
    }[];
    count: number;
  };
}

export interface IErrorSignUp {
  organizationName: boolean;
  adminEmail: boolean;
  phoneNumber: boolean;
  country: boolean;
}

export interface IInfoCalendar {
  title: string;
  time: string;
  serviceImg: string;
  tenantImage: string;
  status: string;
  tenantName: string;
  building: string;
  code: string;
  apartment: string;
  color: string;
  textColor: string;
}

export interface IMakeActiveInterface {
  width: number;
  height: number;
  bullerWidth: number;
  bullerHeight: number;
  translate?: string;
  title1?: string;
  el?: number;
  subClass?: boolean;
  active?: boolean;
  setActive?: Dispatch<SetStateAction<boolean>>;
  setAvailabiliySlotSub?: Dispatch<SetStateAction<{}[][]>>;
  handleSwitchChange?: (id: number | undefined | string) => void;
  maintainceActive?: string;
  id?: string;
  text?: string;
  availabilitySlot?: any;
  setAvailabiliySlot?: Dispatch<React.SetStateAction<{}[][]>>;
}

export interface IPaginationinterface {
  currentPage: number;
  setCurrentPage: Dispatch<React.SetStateAction<number>>;
  data: any;
  limit: number;
}

export interface ISubmitDocuments {
  file: File[];
  setFile: Dispatch<React.SetStateAction<File[]>>;
  setDownloadExcelStep: Dispatch<React.SetStateAction<boolean>>;
  setOpenLastStep: Dispatch<React.SetStateAction<boolean>>;
}

export interface IEvent {
  color: string;
  start: string;
  // end: string;
  id: string;
  title: string;
  code: string;
  tenant: string;
  apartment: string;
  service: string;
  status: string | undefined;
  image: string;
  tenantImage: string;
  tenantName: string;
  building: string;
}

export interface ISelectApartmentType {
  selectedOption: string;
  handleDivClick: (optionValue: string) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setDownloadExcelStep: Dispatch<React.SetStateAction<boolean>>;
  disable: boolean;
}

export interface IUploadDocument {
  file: File[];
  setFile: Dispatch<React.SetStateAction<File[]>>;
  setOpenLastStep: Dispatch<React.SetStateAction<boolean>>;
}

export type TRenderCell = {
  index: number;
  align: "left" | "right" | "center" | "justify" | "inherit" | undefined;
  headerName: string;
};

export type TTestingColumns = {
  field: string;
  headerName: string;
  type?: string;
  sortable: boolean;
  width: number;
  align?: "center" | "left" | "right" | "inherit" | "justify" | undefined;
  renderCell: ({ index, align, headerName }: TRenderCell) => JSX.Element;
  cellIn: (row: any) => JSX.Element;
  cellPadding?: string;
};

export type TadditionalInfo = {
  contextTitle?: string;
  setRequestid?: Dispatch<React.SetStateAction<string>>;
  requestId?: string;
  loadingStatus?: string;
  handleChangeStatus?: (newStatus: string) => void;
  handleMenuClick?:
    | ((index: number) => void)
    | ((listIndex: number, rowIndex: number, index: string) => void);
  setLoadingStatus?: Dispatch<React.SetStateAction<string>>;
  openContent?: number | undefined;
  setOpenContent?: Dispatch<React.SetStateAction<number | undefined>>;
  isLoadingServicesReq: boolean;
  changeCalendar?: boolean;
  index?: string | undefined | number;
  setIndex?: Dispatch<React.SetStateAction<string | undefined>>;
  hideMessage?: boolean;
  setHideMessage?: Dispatch<React.SetStateAction<boolean>>;
  showTooltipFeedBack?: boolean;
  setShowTooltipFeedBack?: Dispatch<React.SetStateAction<boolean>>;
  setFeedBackOpen?: Dispatch<React.SetStateAction<boolean>>;
  setSelectedFeedBack?: Dispatch<React.SetStateAction<IFeedBack | undefined>>;
  showTooltip?: boolean;
  setShowTooltip?: Dispatch<React.SetStateAction<boolean>>;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  setParcelItem?: Dispatch<SetStateAction<IParcelManagementTable[] | any>>;
  filteredData?: IParcelManagementTable[];
  setSelectedRow?: Dispatch<SetStateAction<string>>;
  ReNotifyTenant?: () => void;
  deleteLoading?: string;
  ConfirmedParcels?: () => void;
  handleDeclined?: (id: string) => void;
  dropdownRef?: any;
  handleShowAlert?: (
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) => void;
  closeDropdown?: () => void;
  handleClickOpen?: (
    event: React.MouseEvent<HTMLElement>,
    index: string
  ) => void;
  setPropertyIndex?: Dispatch<SetStateAction<string | undefined>>;
  handleClick?: (event: React.MouseEvent<HTMLElement>, id: string) => void;
  setSelectedId?: Dispatch<SetStateAction<string>>;
  id?: string | undefined;
  visitorOTP?: string;
  setVisitorOTP?: React.Dispatch<React.SetStateAction<string>>;
};

export type TTableRows =
  | IData[]
  | IBellboyReqData[]
  | IValetData[]
  | IPropertyRequestTable[]
  | TEachService[]
  | ITenant[];
export interface IGeneralTable {
  columns: TTestingColumns[];
  rows: TTableRows;
  totalRows: number;
  currentPage: number;
  handlePageChange: (event: any, page: number) => void;
  additionalInfo: TadditionalInfo;
  title: string;
  limitPerPage: number;
  changePageLimit: (limit: number) => void;
  visitorOTP?: string;
  setVisitorOTP?: React.Dispatch<React.SetStateAction<string>>;
}

export type TGeneralTableHeadProps = {
  columns: TTestingColumns[];
  title: string;
};
export type TGeneralTableBodyProps = {
  columns: TTestingColumns[];
  rows: TTableRows;
  additionalInfo: TadditionalInfo;
  title: string;
};

export type TcolumnsType = {
  field: string;
  headerName?: string;
  align: "left" | "center" | "right" | "justify" | "inherit" | undefined;
  sortable: boolean;
  width: number;
  type?: string;
};

export type TsettingBookableAndPayment = {
  bookable: boolean;
  requireManualApproval: boolean;
  bookingLimitationPerAprt: boolean;
  bookingLimitationPerTenant: boolean;
  requirePeyment: boolean;
};
export type TbannersFromLocation = {
  alt: string;
  description: string;
  url: string;
  name: string;
};

export type ThandleChangeStatus = {
  data: any;
  setLoadingStatus: any;
  requestId: string;
  mutate: UseMutationResult<
    any,
    unknown,
    | object
    | {
        data: string;
      },
    unknown
  >;
  setRequestid?: any;
  key?: string;
  refetch?: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
};

export interface IsetSubmit {
  setSubmit: (value: boolean) => void;
  setOpenContent: (value: string) => void;
  setData: any;
  data: any;
  mutate: UseMutationResult<
    any,
    unknown,
    | object
    | {
        data: string;
      },
    unknown
  >;
}
