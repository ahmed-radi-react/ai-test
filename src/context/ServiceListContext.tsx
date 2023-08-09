import { createContext, useState } from "react";
import { ContextType, IDataReq } from "~/types/types";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";

export const ContentContextServiceList = createContext<ContextType | null>(
  null
);

const ContentContextServiceListProvider = ({
  children,
  url,
}: {
  children: React.ReactNode;
  url?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [openContent, setOpenContent] = useState<number>();
  const [amenityId, setAmenityId] = useState("");
  const [data, setData] = useState<IDataReq[]>();
  const [titleheader, setTitleHeader] = useState("");
  const [title, setTitle] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  const [openAddApartment, setOpenAddApartment] = useState(false);
  const [deactive, setDeactive] = useState("");
  const [index, setIndex] = useState<string>();
  const [sorttable, setSorttable] = useState("All");
  const [changeCalendar, setChangeCalendar] = useState(false);
  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });

  const handleClose = (arg: boolean) => {
    if (arg) {
      setOpen(false);
    } else {
      setOpenContent(0);
    }
  };

  return (
    <ContentContextServiceList.Provider
      value={{
        handleClose,
        setOpenContent,
        openContent,
        setAmenityId,
        amenityId,
        titleheader,
        url,
        setHideMessage,
        setMessageSort,
        setOpen,
        setDeactive,
        setData,
        data,
        setTitleHeader,
        openAddApartment,
        setOpenAddApartment,
        open,
        hideMessage,
        deactive,
        messagesort,
        setTitle,
        title,
        setIndex,
        index,
        setSorttable,
        sorttable,
        setChangeCalendar,
        changeCalendar,
      }}
    >
      {children}
    </ContentContextServiceList.Provider>
  );
};

export default ContentContextServiceListProvider;
