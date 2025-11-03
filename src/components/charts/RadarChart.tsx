import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface RadarChartProps {
  data: Array<{ emotion: string; value: number }>;
}

export function RadarChart({ data }: RadarChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="text-gray-900 dark:text-white">{payload[0].payload.emotion}</p>
          <p className="text-gray-600 dark:text-gray-400">{payload[0].value}/100</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsRadar data={data}>
        <PolarGrid stroke="#E5E7EB" />
        <PolarAngleAxis 
          dataKey="emotion" 
          tick={{ fill: '#9CA3AF', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: '#9CA3AF', fontSize: 10 }}
        />
        <Radar
          name="Emotions"
          dataKey="value"
          stroke="#4F46E5"
          fill="#4F46E5"
          fillOpacity={0.3}
          animationDuration={1000}
        />
        <Tooltip content={<CustomTooltip />} />
      </RechartsRadar>
    </ResponsiveContainer>
  );
}
