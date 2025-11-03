import { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Sector } from 'recharts';
import { reviewSourceData } from '../../lib/mockData';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export function ReviewSourcesChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="text-gray-900 dark:text-white">{payload[0].name}</p>
          <p className="text-gray-600 dark:text-gray-400">{payload[0].value}%</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <div className="flex flex-col gap-3 justify-center h-full">
        {payload.map((entry: any, index: number) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={`legend-${index}`}
              className="flex items-center gap-3 cursor-pointer transition-all"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              style={{
                opacity: activeIndex === null || isActive ? 1 : 0.5,
              }}
            >
              <div
                className="w-3 h-3 rounded-full flex-shrink-0 transition-transform"
                style={{ 
                  backgroundColor: entry.color,
                  transform: isActive ? 'scale(1.2)' : 'scale(1)',
                }}
              />
              <span className="text-sm text-gray-700 dark:text-gray-300 flex-1">
                {entry.value}
              </span>
              <span className="text-sm text-gray-900 dark:text-white">
                {reviewSourceData[index].percentage}%
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            activeIndex={activeIndex !== null ? activeIndex : undefined}
            activeShape={renderActiveShape}
            data={reviewSourceData}
            cx="35%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={80}
            innerRadius={45}
            fill="#8884d8"
            dataKey="value"
            nameKey="source"
            paddingAngle={2}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {reviewSourceData.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            content={renderCustomLegend}
            verticalAlign="middle"
            align="right"
            layout="vertical"
            wrapperStyle={{
              paddingLeft: '48px',
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
