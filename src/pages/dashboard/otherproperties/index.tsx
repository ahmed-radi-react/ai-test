import { useState } from "react";
import OtherProperties from "~/dashboard/otherproperties/OtherProperties";
import SettingServicePage from "~/reusable/SettingServicePage";

const AmenitiesPage = () => {
  const [setting, setSetting] = useState(true);
  const [propertyData, setPropertyData] = useState<any>();
  return (
    <>
      {setting ? (
        <OtherProperties
          setSetting={setSetting}
          propertyData={propertyData}
          setPropertyData={setPropertyData}
        />
      ) : (
        <SettingServicePage
          setSetting={setSetting}
          title="Other Properties"
          typeImage="Image & Banner"
          propertyData={propertyData}
        />
      )}
    </>
  );
};

export default AmenitiesPage;
