import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', current: 75, previous: 65 },
  { month: 'Feb', current: 68, previous: 62 },
  { month: 'Mar', current: 72, previous: 70 },
  { month: 'Apr', current: 65, previous: 60 },
  { month: 'May', current: 78, previous: 65 },
  { month: 'Jun', current: 82, previous: 68 },
  { month: 'Jul', current: 85, previous: 75 },
  { month: 'Aug', current: 80, previous: 70 },
  { month: 'Sep', current: 72, previous: 72 },
  { month: 'Oct', current: 78, previous: 74 },
  { month: 'Nov', current: 85, previous: 76 },
  { month: 'Dec', current: 90, previous: 80 },
];

export const SatisfactionChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0BC5EA" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#0BC5EA" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4299E1" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4299E1" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
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
          domain={[40, 100]}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: 'white', 
            border: 'none',
            borderRadius: '4px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          formatter={(value) => [`${value}%`, null]}
        />
        <Area 
          type="monotone" 
          dataKey="previous" 
          stroke="#4299E1" 
          fillOpacity={1} 
          fill="url(#colorPrevious)" 
          strokeWidth={2}
        />
        <Area 
          type="monotone" 
          dataKey="current" 
          stroke="#0BC5EA" 
          fillOpacity={1} 
          fill="url(#colorCurrent)" 
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};