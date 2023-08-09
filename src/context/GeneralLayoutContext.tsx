import { createContext, useState } from "react";
import { ContextTypeBreadcrumb, IProfileData } from "~/types/types";

export const ContentContextGeneralLayout =
  createContext<ContextTypeBreadcrumb | null>(null);

const GeneralLayoutContext = ({ children }: { children: React.ReactNode }) => {
  const [profileData, setProfileData] = useState<IProfileData>();

  const [breadcrumb, setBreadcrumb] = useState({
    lastText: "",
    text: "Tenants",
    path: "/tenants",
  });

  return (
    <ContentContextGeneralLayout.Provider
      value={{
        setBreadcrumb,
        breadcrumb,
        setProfileData,
        profileData,
      }}
    >
      {children}
    </ContentContextGeneralLayout.Provider>
  );
};

export default GeneralLayoutContext;
