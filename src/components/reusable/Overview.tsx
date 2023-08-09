import { Box } from "@mui/system";
import { ReactComponent as MoreIcon } from "@/assets/icons/moreMenu.svg";
import { Pie, PieChart, ResponsiveContainer } from "recharts";
import { IOverview, overViewCarosule } from "@/utils/constant";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
interface IOverviewList {
  title: string;
  data: IOverview[];
}

const Overview = ({ title, data }: IOverviewList) => {
  return (
    <div className="overviewDiv">
      <span className="overview_span">{title} Overview</span>
      <div className={`task_div ${title === "Parcels" ? "parcel_div" : ""}`}>
        {title === "Parcels" ? (
          <Carousel
            responsive={overViewCarosule}
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
            {data?.map(({ Img, ...item }, index) => {
              return (
                <Box
                  key={index}
                  boxShadow="0px 0px 40px 2px rgba(0, 0, 0, 0.08)"
                  className="boxtask"
                  display="block"
                >
                  <div className="overviewIcon">
                    <Img />
                    <MoreIcon />
                  </div>
                  <div className="donut_chart_div">
                    <div className="overview_span">
                      <span className="tasknum">{item.taskNumber}</span>
                      <span className="amenities_type">
                        {item.amenitiesType}
                      </span>
                    </div>
                    <div style={{ width: "20px", height: "32px" }}>
                      <ResponsiveContainer>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                value: item.valuecompleted,
                                fill: "#34c759",
                              },
                              {
                                value: item.valueprogress,
                                fill: "#B5B5B5",
                              },
                            ]}
                            dataKey="value"
                            cx={4.5}
                            cy={4.5}
                            innerRadius={7}
                            outerRadius={10}
                          ></Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Box>
              );
            })}
          </Carousel>
        ) : (
          data.map(({ Img, ...item }, index) => {
            return (
              <Box
                key={index}
                boxShadow="0px 0px 40px 2px rgba(0, 0, 0, 0.08)"
                className="boxtask"
              >
                <div className="overviewIcon">
                  <Img />
                  <MoreIcon />
                </div>
                <div className="donut_chart_div">
                  <div className="overview_span">
                    <span className="tasknum">{item.taskNumber}</span>
                    <span className="amenities_type">{item.amenitiesType}</span>
                  </div>
                  <div style={{ width: "20px", height: "32px" }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={[
                            { value: item.valuecompleted, fill: "#34c759" },
                            { value: item.valueprogress, fill: "#B5B5B5" },
                          ]}
                          dataKey="value"
                          cx={4.5}
                          cy={4.5}
                          innerRadius={7}
                          outerRadius={10}
                        ></Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Box>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Overview;
