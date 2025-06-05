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
  { name: 'Jan', volume: 200, services: 120 },
  { name: 'Feb', volume: 250, services: 150 },
  { name: 'Mar', volume: 180, services: 90 },
  { name: 'Apr', volume: 210, services: 130 },
  { name: 'May', volume: 190, services: 100 },
  { name: 'Jun', volume: 240, services: 140 },
];

export const VolumeServiceChart = () => {
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
          domain={[0, 300]}
          tickCount={6}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}
        />
        <Bar dataKey="volume" fill="#3182ce" radius={[4, 4, 0, 0]} />
        <Bar dataKey="services" fill="#48bb78" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
