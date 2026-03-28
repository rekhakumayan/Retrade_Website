'use client';

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
} from 'recharts';

const RevenueChart = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={190}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12 }}
        />
        <Bar
          dataKey="value"
          fill="var(--color-cta)"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default RevenueChart;