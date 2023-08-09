import { Button } from "@mui/material";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { chartButton, trueValues } from "@/utils/constant";
interface IDashboardChart{
    title:string
}

const DashboardChart = ({title}:IDashboardChart) => {
  const [sortbtn, setSortBtn] = useState(0);
  const handleClick = (index: number) => {
    setSortBtn(index);
  };

  return (
    <div className="chart">
      <div className="sorting_chart">
        <span className="chart_span">{title} Overview</span>
        <div className="sortdiv">
          {chartButton.map((item, index) => {
            return (
              <Button
                key={index}
                variant="text"
                onClick={() => handleClick(index)}
                className={sortbtn === index ? "activebtn" : ""}
              >
                {item.label}
              </Button>
            );
          })}
        </div>
      </div>
      <BarChart
        width={765}
        height={330}
        data={trueValues}
        margin={{
          top: 20,
          right: 80,
          left: -40,
          bottom: 5,
        }}
        className="chart"
      >
        <CartesianGrid stroke="none" />
        <Legend
          verticalAlign="top"
          align="right"
          layout="vertical"
          iconType={"circle"}
          // payload={
          //   [
          //     {id:'pv',type:'circle',value:'Task Pending'},
          //     {id:'uv',type:'circle',value:'In progress'},

          //   ]
          // }
        />
        <XAxis
          dataKey="name"
          orientation={"bottom"}
          strokeWidth={0}
          stroke={"#989898"}
          fontSize={"8px"}
          fontWeight={400}
        />
        <YAxis
          textAnchor="end "
          strokeWidth={0}
          tickCount={20}
          tick={true}
          interval={0}
          domain={["dataMin", "dataMax"]}
          allowDecimals={false}
          stroke={"#989898"}
          fontSize={"8px"}
          fontWeight={400}
          padding={{ top: 16, bottom: 0 }}
        />
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="uv"
          name="In progress"
          stackId="a"
          fill="#34C759"
          radius={[0, 0, 10, 10]}
          barSize={14}
        />
        <Bar
          dataKey="pv"
          fill="#1D4599"
          stackId="a"
          name=" Task Pending"
          radius={[10, 10, 0, 0]}
          barSize={14}
        />
      </BarChart>
    </div>
  );
};

export default DashboardChart;
