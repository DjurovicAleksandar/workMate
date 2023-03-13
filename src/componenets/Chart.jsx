import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const Chart = () => {
  const data = [
    { year: "2019", finishedTasks: 50 },
    { year: "2020", finishedTasks: 150 },
    { year: "2021", finishedTasks: 180 },
  ];

  return (
    <LineChart
      width={600}
      height={250}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <XAxis dataKey="year" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 5" />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="finishedTasks"
        stroke="#ff69b4"
        activeDot={{ r: 20 }}
      />
    </LineChart>
  );
};

export default Chart;
