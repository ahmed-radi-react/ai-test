import { FunctionComponent, SVGProps, createContext, useState } from "react";
import { ContextType } from "~/types/types";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";

export const ContentContext = createContext<ContextType | null>(null);

const ContentContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openContent, setOpenContent] = useState<number>();
  const [tableIndex, setTableIndex] = useState<number>();
  const [hideMessage, setHideMessage] = useState(false);
  const [propertyIndex, setPropertyIndex] = useState<string | undefined>("");
  const [indexNumber, setIndexNumber] = useState<number>();
  const [messagesort, setMessageSort] = useState({
    icon: CongratsIcon,
    message: "",
    title: "",
    style: "",
  });

  function handleShowAlert(
    icon: FunctionComponent<SVGProps<SVGSVGElement>>,
    message: string,
    title: string,
    style: string
  ) {
    setHideMessage(true);
    setMessageSort({
      icon,
      message,
      title,
      style,
    });
    setTimeout(() => {
      if (setHideMessage) {
        setHideMessage(false);
      }
    }, 3000);
  }

  return (
    <ContentContext.Provider
      value={{
        setOpenContent,
        openContent,
        tableIndex,
        setMessageSort,
        handleShowAlert,
        hideMessage,
        setTableIndex,
        messagesort,
        setPropertyIndex,
        propertyIndex,
        indexNumber,
        setIndexNumber,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContextProvider;
