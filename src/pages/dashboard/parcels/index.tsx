import { useState } from "react";
import ParcelManagementTable from "~/dashboard/parcels/ParcelManagementTable";
import ParcelsDashboard from "~/dashboard/parcels/ParcelsDashboard";
import SettingServicePage from "~/reusable/SettingServicePage";

const Parcels = () => {
  const [setting, setSetting] = useState(true);
  const [parcelData, setParcelData] = useState();
  return (
    <div>
      {setting ? (
        <ParcelsDashboard
          setSetting={setSetting}
          parcelData={parcelData}
          setParcelData={setParcelData}
        />
      ) : (
        <SettingServicePage
          setSetting={setSetting}
          title="Parcels"
          typeImage="Image"
          parcelData={parcelData}
        />
      )}
      {/* <ParcelManagementTable/> */}
    </div>
  );
};

export default Parcels;
