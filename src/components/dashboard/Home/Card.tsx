import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { dataChartHomePage } from "@/utils/constant";
import { ICard } from "~/types/types";

const Card = ({ header, number, color, gradient, percentage, Icon }: ICard) => {
  return (
    <div className="view__chart-content">
      <div className="top">
        <div className="top__content">
          <p className="top__content-title">{header}</p>
          <h2 className="top__content-subtitle">
            {new Intl.NumberFormat("en-US", {
              notation: "compact",
              compactDisplay: "short",
            }).format(number)}
          </h2>
        </div>
        <div className="top__icon">
          <Icon />
        </div>
      </div>
      <div className="bottom">
        <div className="bottom__chart">
          <div style={{ width: "81px", height: "24px" }}>
            <ResponsiveContainer>
              <AreaChart
                width={81}
                height={24}
                data={dataChartHomePage}
                syncId="anyId"
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id={`myGradient${color}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={color} />
                    <stop offset="100%" stopColor={gradient} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="pv"
                  stroke={color}
                  fill={`url(#myGradient${color})`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bottom__number">
          <p>
            {new Intl.NumberFormat("en-US", {
              style: "percent",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              signDisplay: "always",
            }).format(parseInt(percentage) / 100)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
