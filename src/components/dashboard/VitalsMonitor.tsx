import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const data = [
  { time: '00:00', heart: 65, oxy: 96 },
  { time: '04:00', heart: 68, oxy: 97 },
  { time: '08:00', heart: 72, oxy: 98 },
  { time: '12:00', heart: 70, oxy: 97 },
  { time: '16:00', heart: 75, oxy: 98 },
  { time: '20:00', heart: 72, oxy: 98 },
  { time: '23:59', heart: 69, oxy: 97 },
];

export const VitalsMonitor: React.FC = () => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorHeart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorOxy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: 'var(--color-outline)', fontSize: 10, fontWeight: 700 }}
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-primary)', 
              borderRadius: '12px', 
              border: 'none', 
              color: '#fff',
              fontSize: '10px'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="heart" 
            stroke="var(--color-secondary)" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorHeart)" 
          />
          <Area 
            type="monotone" 
            dataKey="oxy" 
            stroke="var(--color-primary)" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorOxy)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
