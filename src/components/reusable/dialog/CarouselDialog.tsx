import { Dialog, DialogContent } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { ReactComponent as PrevIcon } from "@/assets/icons/prevIcon.svg";
import { ReactComponent as NextIcon } from "@/assets/icons/nextIcon.svg";
import { ReactComponent as BackIcon } from "@/assets/icons/BackRound.svg";
import { ICarouselDialog } from "~/types/types";

const CarouselDialog = ({
  addedbanner,
  data,
  parcel,
  maintenance,
  onClose,
}: ICarouselDialog) => {
  return (
    <Dialog
      open={addedbanner}
      className="bellboy_req"
      onClose={() => {
        onClose && onClose(false);
      }}
    >
      <DialogContent className="bellboy_req">
        <div
          className="carousel"
          onClick={() => {
            onClose && onClose(false);
          }}
        >
          <Carousel
            NextIcon={<NextIcon className="next" />}
            PrevIcon={<PrevIcon className="prev" />}
            navButtonsAlwaysVisible
          >
            {parcel || maintenance
              ? data?.map((item, index) => {
                  return (
                    <div className="img_div" key={index}>
                      <img src={item.images && item?.images[0]?.url} alt="" />
                    </div>
                    // <div className="img_div" key={index}>
                    //   <img src="https://images.unsplash.com/photo-1509043759401-136742328bb3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80" />
                    // </div>
                  );
                })
              : data?.map((item, index) => {
                  return (
                    <div className="img_div" key={index}>
                      <img
                        src={item.image || URL.createObjectURL(item.url)}
                        alt="banner images"
                      />
                    </div>
                  );
                })}
          </Carousel>
          <div className="footer_divs">
            <div className="back" onClick={() => onClose && onClose(false)}>
              <BackIcon />
              {parcel ? (
                <span>Back To Parcel Details</span>
              ) : maintenance ? (
                <span>Back To Maintenacne Details</span>
              ) : (
                <span>Back to Amenity Details</span>
              )}
            </div>
            <div className="carousel_footer">
              {/* {data?.map((item, index) => {
                return (
                  <div key={index}>
                    <img
                      src={item.image || URL.createObjectURL(item.url)}
                      alt="carousel image"
                    />
                  </div>
                );
              })} */}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarouselDialog;
