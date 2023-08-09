import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import imagebanner from "@/assets/images/white.png";
import { ReactComponent as PrevIcon } from "@/assets/icons/prevIcon.svg";
import { ReactComponent as NextIcon } from "@/assets/icons/nextIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackRound.svg";
import { IDetailData } from "~/types/types";
import { ReactComponent as TenantBuildingIcon } from "@/assets/icons/BuildingTenants.svg";
import { ReactComponent as UserBuildingIcon } from "@/assets/icons/BuildingUsers.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { amenities } from "@/utils/constant";

interface IDetails {
  dataInfo?: IDetailData;
  classname?: string;
  serviceBuilding?: string;
  setOpenAddApartment?: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose?: (value: boolean) => void;
}

const Detailsdialog = ({
  dataInfo,
  classname,
  serviceBuilding,
  setOpenAddApartment,
  handleClose,
}: IDetails) => {
  const [addedbanner, SetAddedBanner] = useState(false);
  const [service, setService] = useState<{ flow?: string }[]>();

  const { pathname } = useLocation();

  const handleClickBanner = () => {
    SetAddedBanner(true);
  };
  useEffect(() => {
    setService(
      dataInfo?.services?.reduce(
        (
          accumulator: { id: number; flow: string; count: number }[],
          item,
          index
        ) => {
          const existingItem = accumulator.find(
            (element) => element.flow === item.flow
          );

          if (existingItem) {
            existingItem.count++;
          } else {
            accumulator.push({
              id: accumulator.length + 1,
              flow: item.flow,
              count: 1,
            });
          }

          return accumulator;
        },
        []
      )
    );
  }, [dataInfo]);

  const [activeIndex, setActiveIndex] = useState(0);
  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === (dataInfo?.banners?.length ?? 0) - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? (dataInfo?.banners?.length ?? 0) - 1 : prevIndex - 1
    );
  };
  const naviagtion = useNavigate();

  const handleOpenAddBuilding = () => {
    if (setOpenAddApartment && handleClose) {
      setOpenAddApartment(true);
      handleClose(false);
    }
  };

  return (
    <>
      {!addedbanner ? (
        <div className="details_amenitie">
          <div>
            {!classname && (
              <div className="banner_div">
                {dataInfo?.images && dataInfo?.banners && (
                  <div className="info_banner" onClick={handleClickBanner}>
                    <span>
                      {dataInfo?.banners?.length - 1} more Images added
                    </span>
                  </div>
                )}
                {dataInfo && dataInfo.banners && dataInfo.banners[0] ? (
                  <img
                    src={
                      dataInfo && dataInfo.banners[0] && dataInfo.banners[0].url
                    }
                    alt="banner image"
                  />
                ) : (
                  <img src={imagebanner} alt="banner image" />
                )}
              </div>
            )}
            <div
              className={`image_div ${
                classname && !serviceBuilding ? "building_detail" : ""
              }`}
            >
              {dataInfo && dataInfo?.images && dataInfo.images[0].url ? (
                <img
                  src={dataInfo && dataInfo.images[0].url}
                  alt="image amenitie"
                />
              ) : (
                <img src={imagebanner} alt="banner image" />
              )}
            </div>
          </div>
          <div
            className={`padel_court_info ${
              classname && !serviceBuilding ? "" : ""
            }`}
          >
            <div className="header_content">
              <span className="content_title">{dataInfo && dataInfo.name}</span>
              <Button
                className="editAmenity_btn"
                onClick={() => {
                  if (pathname === "/building/buildinglist") {
                    naviagtion(`/building/addbuilding`, {
                      state: dataInfo,
                    });
                  } else {
                    naviagtion(`/${amenities}/addamenity`, { state: dataInfo });
                  }
                }}
              >
                {(pathname === "/building/buildinglist" && "Edit Building") ||
                  (pathname === `/${amenities}/amenitieslist` &&
                    "Edit Amenity")}
              </Button>
            </div>
            <span>{dataInfo && dataInfo.description}</span>
            {!classname && <span>Time Availability</span>}
            {!classname && <span className="day">Afternoon, Evening</span>}
            {!classname && (
              <span className="week">SUN,MON,TUE,WED,THU,FRI</span>
            )}
            {!classname && (
              <div className="limitation_div">
                {dataInfo?.bookable && <div>Bookable</div>}
                {dataInfo?.requireManualApproval && (
                  <div>Require Manual Approval</div>
                )}
                <div>
                  <span className="num">
                    {dataInfo?.maximumBookingPerMonth}/ Month
                  </span>{" "}
                  - Booking Limitation per Apartment
                </div>
              </div>
            )}
          </div>
          {!classname && dataInfo?.hasSubCategories === true && (
            <div className="sub_category">
              <span className="sub_span">Sub Category</span>
              <div>
                <img src={imagebanner} alt="image" />
              </div>
              <span className="padel">Padel Court</span>
              <span className="info">
                Lorem ipsum dolor sit amet consectetur. Tortor cras placerat
                platea lacus sollicitudin egestas a. Et at montes eu in velit
                aenean libero. Nullam facilisis velit arcu morbi orci neque
                proin.
              </span>
              <span className="time">Time Availability</span>
              <span className="day">Afternoon, Evening</span>
              <span className="week">SUN,MON,TUE,WED,THU,FRI</span>
            </div>
          )}
          {!!dataInfo?.guideLinesAndInstructions && (
            <div>
              <span
                className="guildlines_instraction"
                dangerouslySetInnerHTML={{
                  __html: dataInfo?.guideLinesAndInstructions.replace(
                    /\s•\s/g,
                    "<br />•"
                  ),
                }}
              ></span>
            </div>
          )}
          {classname && (
            <div>
              <div
                className={`building_details_div ${
                  classname && !serviceBuilding ? "" : "serviceb"
                }`}
              >
                <div className="text">
                  <span className="service">Services</span>
                  <span className="info">
                    The covered services in this Building.
                  </span>
                  <div className="building_div_services">
                    {service?.map((item, index) => {
                      return (
                        <div key={index} className="item">
                          {item.flow}
                        </div>
                      );
                    })}
                  </div>
                </div>
                <span className="edit">Edit</span>
              </div>
              {!serviceBuilding && (
                <div className="building_user_tenant">
                  <div className="item">
                    <UserBuildingIcon />
                    <span>Building Users</span>
                  </div>
                  <div className="item">
                    <TenantBuildingIcon />
                    <span>Building Tenants</span>
                  </div>
                  <div className="item" onClick={handleOpenAddBuilding}>
                    <TenantBuildingIcon />
                    <span>Add Apartment</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="carousel">
          <Carousel
            index={activeIndex}
            NextIcon={<NextIcon className="next" onClick={handleNext} />}
            PrevIcon={<PrevIcon className="prev" onClick={handlePrev} />}
            navButtonsAlwaysVisible
          >
            {dataInfo?.banners && (
              <div className="img_div">
                <img
                  src={dataInfo?.banners[activeIndex].url}
                  alt="banner images"
                />
              </div>
            )}
          </Carousel>

          <div className="footer_divs">
            <div className="back">
              <BackIcon />
              <span>Back to Amenity Details</span>
            </div>
            <div className="carousel_footer">
              {dataInfo?.banners &&
                dataInfo?.banners.map((item: any, index) => {
                  return (
                    <div key={index} onClick={() => setActiveIndex(index)}>
                      <img src={item.url} alt={`carousel image ${index}`} />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detailsdialog;
