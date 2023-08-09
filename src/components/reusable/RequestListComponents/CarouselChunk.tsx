import { FC } from "react";
import { TCarouseChunkProps } from "~/types/types";
import BackNavigate from "../BackNavigate";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { RequestListResponsive } from "@/utils/constant";
import { ReactComponent as TickCircle } from "@/assets/icons/tick-circle.svg";
import { ReactComponent as AllCardIcon } from "@/assets/icons/all_request_icon.svg";
import { Skeleton } from "@mui/material";

const CarouselChunk: FC<TCarouseChunkProps> = ({
  title,
  dashboard,
  sortedData,
  sorttable,
  setSorttable,
  handleClick,
}) => {
  return !(title === "Home" || title === "Building") ? (
    <div className="header_table_page">
      {!dashboard && <BackNavigate title={title} />}
      <div className="requestlist">
        <div className="request_header">
          <span>{title} Requests</span>
        </div>
      </div>

      <div className="table_header">
        <div className="sort_div">
          {title !== "Home" && (
            <>
              <div className="carousel_div">
                <Carousel
                  responsive={RequestListResponsive}
                  swipeable={true}
                  draggable={true}
                  showDots={false}
                  ssr={true}
                  infinite={false}
                  autoPlay={false}
                  arrows={true}
                  keyBoardControl={true}
                  customTransition="all .5s"
                  transitionDuration={500}
                  containerClass="carousel-container"
                  dotListClass="custom-dot-list-style"
                  itemClass="carousel-item-padding-40-px"
                >
                  {sortedData?.map((item) => {
                    if (item.label === "All") {
                      return (
                        <div
                          key={item?.id}
                          className={`slide-item ${
                            sorttable === item?.label ? "active" : ""
                          } ${item?.label === "All" ? "all_card" : ""}`}
                          onClick={() => {
                            setSorttable(item?.label);
                            handleClick(item?.label);
                          }}
                        >
                          <span className="radio-icon-container">
                            {sorttable === item.label ? (
                              <TickCircle />
                            ) : (
                              <span className="radio-icon"></span>
                            )}
                          </span>
                          <div className="slide-item__image-container">
                            {item.label === "All" ? (
                              <AllCardIcon />
                            ) : item.image ? (
                              <img src={item?.image} />
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={100}
                                height={100}
                              />
                            )}
                          </div>
                          <span className="slide-item__name" title={item.label}>
                            {item.label}
                          </span>
                        </div>
                      );
                    } else if (item.image) {
                      return (
                        <div
                          key={item?.id}
                          className={`slide-item ${
                            sorttable === item?.label ? "active" : ""
                          } ${item?.label === "All" ? "all_card" : ""}`}
                          onClick={() => {
                            setSorttable(item?.label);
                            handleClick(item?.label);
                          }}
                        >
                          <span className="radio-icon-container">
                            {sorttable === item.label ? (
                              <TickCircle />
                            ) : (
                              <span className="radio-icon"></span>
                            )}
                          </span>
                          <div className="slide-item__image-container">
                            {item.label === "All" ? (
                              <AllCardIcon />
                            ) : item.image ? (
                              <img src={item?.image} />
                            ) : (
                              <Skeleton
                                variant="rectangular"
                                width={100}
                                height={100}
                              />
                            )}
                          </div>
                          <span className="slide-item__name" title={item.label}>
                            {item.label}
                          </span>
                        </div>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default CarouselChunk;
