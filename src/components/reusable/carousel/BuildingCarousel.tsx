import { useState } from "react";
import { queryRequest } from "@/requests-body/queries";
import Carousel from "react-multi-carousel";
import buildingImage from "@/assets/icons/addBuildingIcon.svg";

interface IbuidlingData {
  _id: string;
  name?: string;
  images?: { url?: string }[];
  code?: string;
}
interface ISelesctedBuilding {
  selectBuilding: string;
  setSelectBuilding: React.Dispatch<React.SetStateAction<string>>;
}

const BuildingCarousel = ({
  selectBuilding,
  setSelectBuilding,
}: ISelesctedBuilding) => {
  const success = (data: []) => {
    setBuildingData([{ name: "All", _id: "0" }, ...data]);
  };
  const [buidlingData, setBuildingData] = useState<IbuidlingData[]>([]);
  queryRequest({
    url: "/building?offset=0&limit=10000",
    method: "get",
    key: "buildingKey",
    cb: success
  });

  return (
    <div className="building_carousel">
      <Carousel
        responsive={{
          desktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4,
            slidesToSlide: 1,
          },
          tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 1,
          },
          mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1,
          },
        }}
        swipeable={true}
        draggable={true}
        showDots={true}
        ssr={true}
        infinite={false}
        arrows={true}
        keyBoardControl={true}
        customDot={<div></div>}
        customTransition="all .5s"
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {buidlingData.map((item, id) => {
          return (
            <div
              key={id}
              onClick={() => setSelectBuilding(item._id)}
              className={`item_carousel ${
                selectBuilding === item._id && "active_building"
              }`}
            >
              {item?.images && <img src={item?.images[0]?.url} alt="" />}
              {item.name === "All" && <img src={buildingImage} alt="" />}
              <span>{item.name}</span>
              <span className="code">{item?.code}</span>
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default BuildingCarousel;
