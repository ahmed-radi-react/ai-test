import { FC } from "react";
import { ReactComponent as Question_Icon } from "@/assets/icons/question_icon.svg";
import { ReactComponent as CloseCircle } from "@/assets/icons/close-circle.svg";
import { IData, THomePageHEaderProps, TService } from "../../types/types";
import { Button } from "@mui/material";
import HomePageSelect from "./HomePageSelect";

const HomePageHeader: FC<THomePageHEaderProps> = ({
  handleClick,
  servicedData,
  homePageSorttable,
  index,
  services,
  handleRemoveService,
  setHomePageSorttable,
  count,
}) => {
  return (
    <>
      <div className="home_page_requests">
        <div className="question_icon">
          <Question_Icon />
        </div>
        <div className="home_header">
          <p>Requests</p>
          {/* <div>
                    Every large design company whether it’s a multi-national
                    branding.
                  </div> */}
        </div>
      </div>
      <div className="home_page_select_header">
        <>
          <div className="selcted_values">
            <>
              <Button
                className={`activesort`}
                onClick={() => handleClick && handleClick("All")}
              >
                <span>All</span>
                <div>{count}</div>
              </Button>
              {!(homePageSorttable === "All") && (
                <div key={index} className="selected_value">
                  <span className="selected_value_title">
                    {
                      (services as TService[])?.find(
                        (service: { flow: string }) =>
                          service?.flow === homePageSorttable
                      )?.name
                    }
                  </span>
                  <div className="circle_icon" onClick={handleRemoveService}>
                    <CloseCircle />
                  </div>
                </div>
              )}

              <HomePageSelect
                setHomePageSorttable={setHomePageSorttable}
                services={services as TService[]}
              />
            </>
            {/* <span>{services.find(val=>val.id === selectedValue)}</span> */}
          </div>
        </>
      </div>
    </>
  );
};

export default HomePageHeader;
