import { Box, Button } from "@mui/material";
import { Container } from "@mui/system";
import basketballImage from "@/assets/images/basketball.png";
import footballImage from "@/assets/images/football.png";
import { ReactComponent as EditIcon } from "@/assets/icons/edit.svg";

import { useContext, useState } from "react";
import BackNavigate from "./BackNavigate";
import { useLocation } from "react-router-dom";
import { dataTest } from "@/utils/constant";
import { ReactComponent as CloseIcon } from "@/assets/icons/close.svg";
import { ReactComponent as Elipse } from "@/assets/icons/elipse.svg";
import CarouselDialog from "./dialog/CarouselDialog";
import List from "./List";
import { ContentContextGeneralLayout } from "@/context/GeneralLayoutContext";
interface IsetSetting {
  setSetting: (value: boolean) => void;
  title: string;
  typeImage: string;
  amenitiesData?: any;
  maintenanceData?: any;
  parcelData?: any;
  propertyData?: any;
}

const SettingServicePage = ({
  setSetting,
  title,
  typeImage,
  amenitiesData,
  maintenanceData,
  parcelData,
  propertyData,
}: IsetSetting) => {
  const [selectedImage, setSelectedImage] = useState<File>();
  const [selectedBanerImage, setSelectedBanerImage] = useState<any>();
  const handleClick = () => {
    setSetting(true);
  };
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const imageBanerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedBanerImage(e.target.files[0]);
    }
  };
  const [addedbanner, SetAddedBanner] = useState(false);
  const handleClickBanner = () => {
    SetAddedBanner(true);
  };
  const location = useLocation();
  const value = useContext(ContentContextGeneralLayout);
  const handleClose = () => {
    SetAddedBanner(false);
  };
  return (
    <Container className="setting_container">
      <BackNavigate title={value?.breadcrumb?.text} setSetting={setSetting} />
      <div className="setting_header">
        <span className="header_span">{title} General Setting</span>
        <div className="btn">
          <Button
            variant="contained"
            onClick={handleClick}
            className="cancel_btn"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            className="save_btn"
          >
            Save Changes
          </Button>
        </div>
      </div>
      <Box
        bgcolor={"white"}
        borderRadius="10px"
        display={"flex"}
        flexDirection="column"
        padding={"19px 19px 29px 19px"}
      >
        <span className="box_span">{typeImage}</span>
        <span className="box_info">
          Images to be displayed on the app icon & banner
        </span>
        <div className="img_div">
          <div className="uploadimage setting">
            <div className="opacity"></div>
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : footballImage
              }
              alt="Thumb"
            />
            <label className="editdiv">
              <input
                type="file"
                className="fileinput display_upload"
                onChange={imageChange}
                accept="image/gif, image/jpeg, image/png"
              />
              <EditIcon />
            </label>
          </div>
          {!location.pathname.includes("parcels") && (
            <div className="image_add_div">
              <div className="more_img_info" onClick={handleClickBanner}>
                <span>+3 more Images added</span>
              </div>
              <div className="uploadimage setting setbanner">
                <div className="opacity"></div>
                <img
                  src={
                    selectedBanerImage
                      ? URL.createObjectURL(selectedBanerImage)
                      : basketballImage
                  }
                  alt="Thumb"
                />
                <label className="editdiv">
                  <input
                    type="file"
                    className="fileinput display_upload"
                    onChange={imageBanerChange}
                  />
                  <EditIcon />
                </label>
              </div>
              <span className="about more">
                Add at least 4 Images to be displayed on the app banner
              </span>
            </div>
          )}
        </div>
        {!!addedbanner && (
          <div className="close" onClick={handleClose}>
            <Elipse />
            <CloseIcon />
          </div>
        )}
        <CarouselDialog addedbanner={addedbanner} data={dataTest} />
      </Box>
      {amenitiesData ? (
        <List
          data={amenitiesData}
          addbutton={"Add New Amenity"}
          showAll={"Show All Amenities"}
          addNavigate={"addamenity"}
          showNavigate={"amenitieslist"}
        />
      ) : maintenanceData ? (
        <List
          data={maintenanceData}
          addbutton={"Add Maintenance"}
          showAll={"Show All Maintenance"}
          addNavigate={"addmaintenance"}
          showNavigate={"maintenancelist"}
        />
      ) : propertyData ? (
        <List
          data={propertyData}
          addbutton={"Add Property"}
          showAll={"Show All Properties"}
          addNavigate={"addotherproperties"}
          showNavigate={"otherpropertieslist"}
        />
      ) : (
        <List
          data={parcelData}
          addbutton={"Add Parcel Request"}
          showAll={"Show All Parcels"}
          addNavigate={"addparcels"}
          showNavigate={"management"}
        />
      )}
    </Container>
  );
};

export default SettingServicePage;
