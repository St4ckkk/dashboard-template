import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', loyal: 120, new: 80, unique: 130 },
  { month: 'Feb', loyal: 150, new: 100, unique: 180 },
  { month: 'Mar', loyal: 170, new: 140, unique: 190 },
  { month: 'Apr', loyal: 180, new: 160, unique: 200 },
  { month: 'May', loyal: 190, new: 190, unique: 240 },
  { month: 'Jun', loyal: 240, new: 170, unique: 230 },
  { month: 'Jul', loyal: 250, new: 180, unique: 260 },
  { month: 'Aug', loyal: 280, new: 240, unique: 280 },
  { month: 'Sep', loyal: 250, new: 280, unique: 250 },
  { month: 'Oct', loyal: 210, new: 220, unique: 230 },
  { month: 'Nov', loyal: 190, new: 160, unique: 200 },
  { month: 'Dec', loyal: 170, new: 150, unique: 210 },
];

export const VisitorInsightsChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <CartesianGrid vertical={false} stroke="#f5f5f5" />
        <XAxis 
          dataKey="month" 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12, fill: '#718096' }}
        />
        <YAxis 
          axisLine={false} 
          tickLine={false}
          tick={{ fontSize: 12, fill: '#718096' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }} 
        />
        <Line 
          type="monotone" 
          dataKey="loyal" 
          stroke="#9f7aea" 
          strokeWidth={3} 
          dot={false} 
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="new" 
          stroke="#f56565" 
          strokeWidth={3} 
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line 
          type="monotone" 
          dataKey="unique" 
          stroke="#48bb78" 
          strokeWidth={3} 
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};