import { Pie, PieChart, ResponsiveContainer } from "recharts";

interface Props {
  completed: number
  tasksNumber: number
}

function ProgressBar({ completed, tasksNumber }: Props) {
  return (
    <div style={{ width: "20px", height: "19px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={[
              { value: Number(`${completed}`), fill: "#34c759" },
              { value: Number(`${tasksNumber - completed}`), fill: "#B5B5B5" },
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
  )
}

export default ProgressBar