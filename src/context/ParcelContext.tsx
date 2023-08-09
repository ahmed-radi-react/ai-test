import { FunctionComponent, SVGProps, createContext, useState } from "react";
import { ParcelContextType } from "~/types/types";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";

export const ContentContext = createContext<ParcelContextType | null>(null);

const ContentContextParcelProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openListTableContent, setOpenListTableContent] = useState<number>();
  const [tableIndex, setTableIndex] = useState<number>();
  const [indexRow, setIndexRow] = useState("");
  const [hideMessage, setHideMessage] = useState(false);
  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });

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
    <ContentContext.Provider
      value={{
        setOpenListTableContent,
        openListTableContent,
        setTableIndex,
        tableIndex,
        setMessageSort,
        messagesort,
        setIndexRow,
        indexRow,
        handleShowAlert,
        hideMessage,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextParcelProvider;
