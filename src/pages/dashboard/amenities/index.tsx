import { useState } from "react";
import Amenities from "~/dashboard/amenities/Amenities";
import SettingServicePage from "~/reusable/SettingServicePage";
import ContentContextServiceListProvider from "@/context/ServiceListContext";

const AmenitiesPage = () => {
  const [setting, setSetting] = useState(true);
  const [amenitiesData, setAmenitiesData] = useState<any>();
  return (
    <>
      {setting ? (
        <ContentContextServiceListProvider>
          <Amenities
            setSetting={setSetting}
            setAmenitiesDataForParent={setAmenitiesData}
          />
        </ContentContextServiceListProvider>
      ) : (
        <SettingServicePage
          setSetting={setSetting}
          title="Amenities"
          typeImage="Image & Banner"
          amenitiesData={amenitiesData}
        />
      )}
    </>
  );
};

export default AmenitiesPage;
