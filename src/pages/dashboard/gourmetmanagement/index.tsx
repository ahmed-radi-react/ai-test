import { useState } from "react";
import SettingServicePage from "~/reusable/SettingServicePage";
import GourmetManagement from "~/dashboard/gourmetmanagement/GourmetManagement";
import GourmetManagementSetting from "~/dashboard/gourmetmanagement/GourmetManagementSetting";

type Props = {};

const GourmetManagementPage = () => {
  const [setting, setSetting] = useState(true);
  return (
    <>
      {setting ? (
        <GourmetManagement setSetting={setSetting} />
      ) : (
        <GourmetManagementSetting
          setSetting={setSetting}
          title="Gourmet"
          typeImage="Image & Banner"
        />
      )}
    </>
  );
};

export default GourmetManagementPage;
