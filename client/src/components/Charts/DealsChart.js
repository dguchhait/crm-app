import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", deals: 12 },
  { name: "Feb", deals: 8 },
  { name: "Mar", deals: 20 },
];

const DealsChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="deals" fill="#4F46E5" />
    </BarChart>
  </ResponsiveContainer>
);

export default DealsChart;
