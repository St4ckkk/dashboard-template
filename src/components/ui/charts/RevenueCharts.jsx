import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Monday', online: 10, offline: 12 },
  { name: 'Tuesday', online: 15, offline: 10 },
  { name: 'Wednesday', online: 8, offline: 20 },
  { name: 'Thursday', online: 18, offline: 8 },
  { name: 'Friday', online: 12, offline: 11 },
  { name: 'Saturday', online: 16, offline: 9 },
  { name: 'Sunday', online: 17, offline: 10 },
];

export const RevenueChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        barGap={8}
      >
        <CartesianGrid vertical={false} stroke="#f5f5f5" />
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#718096' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: '#718096' }}
          domain={[0, 25]}
          tickCount={6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
          formatter={(value) => [`$${value}k`, null]}
        />
        <Bar dataKey="online" fill="#3182ce" radius={[4, 4, 0, 0]} />
        <Bar dataKey="offline" fill="#48bb78" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
