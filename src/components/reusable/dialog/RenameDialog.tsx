import { Button, CircularProgress, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import imagebanner from "@/assets/images/white.png";
import { mutationRequest } from "@/requests-body/queries";
import { ReactComponent as PrevIcon } from "@/assets/icons/prevIcon.svg";
import { ReactComponent as NextIcon } from "@/assets/icons/nextIcon.svg";
import { ReactComponent as CongratsIcon } from "@/assets/icons/CongratsSvg.svg";
import { IDetailData } from "~/types/types";
import { ContentContextServiceList } from "@/context/ServiceListContext";

interface IDetails {
  url: string;
  dataInfo?: IDetailData;
  classname?: string;
}
const RenameDialog = ({ url, dataInfo, classname }: IDetails) => {
  const { mutate } = mutationRequest({
    url: `/${url}${url === "building" ? "" : `/${dataInfo?._id}`}`,
    method: "put",
    isAuth: true,
  });
  const value = useContext(ContentContextServiceList);
  const [addedbanner, SetAddedBanner] = useState(false);
  const [editName, setEditName] = useState(dataInfo?.name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleClickBanner = () => {
    SetAddedBanner(true);
  };

  const handleUpdate = () => {
    mutate.mutate({ ...dataInfo, name: editName });
  };
  useEffect(() => {
    if (mutate.isSuccess && value?.setData) {
      value?.setOpenContent(0);
      if (value?.setHideMessage) {
        value?.setHideMessage(true);
      }
      if (value?.setMessageSort) {
        value?.setMessageSort({
          icon: CongratsIcon,
          message: `${
            url.includes("amenity") ? "Amenity" : "Maintenance"
          } has been renamed successfully`,
          title: "Done",
          style: "rename",
        });
        setTimeout(() => {
          if (value?.setHideMessage) {
            value?.setHideMessage(false);
          }
        }, 3000);
      }

      const item = value?.data?.find((elem) => elem._id === dataInfo?._id);

      value?.setData((prev) => {
        if (prev) {
          let item = prev.findIndex((elem) => elem._id === dataInfo?._id);

          prev.splice(item, 1, { ...prev[item], name: editName as string });
          return prev;
          // const item = prev?.findIndex((item) => item._id === dataInfo?._id)
          // return [...prev]
        }
      });
    }
  }, [mutate.isSuccess]);
  return (
    <>
      {!addedbanner ? (
        <div className="details_amenitie">
          <div>
            {!classname && (
              <div className="banner_div">
                {dataInfo?.images && (
                  <div className="info_banner" onClick={handleClickBanner}>
                    <span>
                      {dataInfo?.images?.length - 1} more Images added
                    </span>
                  </div>
                )}
                {dataInfo && dataInfo?.banners && dataInfo?.banners[0] ? (
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
            <div className={`image_div ${classname ? "image_building" : ""}`}>
              {dataInfo && dataInfo?.images && dataInfo.images[0].url ? (
                <img
                  src={dataInfo && dataInfo.images[0].url}
                  alt="image amenitie"
                />
              ) : (
                <img src={imagebanner} alt="banner image" />
              )}
            </div>
            <Button className="editAmenity_btn">
              Edit {classname ? " Building" : "Amenity"}
            </Button>
          </div>
          <div className="rename_dialog">
            {dataInfo?.name && (
              <TextField
                className="input"
                defaultValue={dataInfo?.name}
                autoFocus
                onChange={handleChange}
              />
            )}

            <span className="desc">{dataInfo?.description}</span>
            <Button
              variant="contained"
              className={`btn ${editName ? "update" : ""}`}
              onClick={handleUpdate}
            >
              Update
            </Button>
          </div>
        </div>
      ) : (
        <div className="carousel">
          <Carousel
            NextIcon={<NextIcon className="next" />}
            PrevIcon={<PrevIcon className="prev" />}
            navButtonsAlwaysVisible
          >
            {dataInfo?.banners &&
              dataInfo?.banners.map((item, index) => {
                return (
                  <div className="img_div" key={index}>
                    <img src={item.url} alt="banner images" />
                  </div>
                );
              })}
          </Carousel>
          <div className="carousel_footer">
            {dataInfo?.images &&
              dataInfo?.images.map((item, index) => {
                return (
                  <div key={index}>
                    <img src={item.url} alt="carousel image" />
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </>
  );
};

export default RenameDialog;
