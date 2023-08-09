import { useState } from "react";
import MaintenanceDashboard from "~/dashboard/maintenance/MaintenanceDashboard";
import SettingServicePage from "~/reusable/SettingServicePage";
import ContentContextServiceListProvider from "@/context/ServiceListContext";

const Maintenance = () => {
  const [setting, setSetting] = useState(true);
  const [maintenanceData, setMaintenanceDataForParent] = useState<any>();
  return (
    <>
      {setting ? (
        <ContentContextServiceListProvider>
          <MaintenanceDashboard
            setSetting={setSetting}
            setMaintenanceDataForParent={setMaintenanceDataForParent}
          />
        </ContentContextServiceListProvider>
      ) : (
        <SettingServicePage
          setSetting={setSetting}
          title="Maintenance"
          typeImage="Image & Banner"
          maintenanceData={maintenanceData}
        />
      )}
    </>
  );
};

export default Maintenance;
