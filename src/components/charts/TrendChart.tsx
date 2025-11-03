import { LineChart, Line, Area, AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TrendChartProps {
  data: any[];
  dataKey: string;
  xAxisKey: string;
  color?: string;
  showArea?: boolean;
}

export function TrendChart({ data, dataKey, xAxisKey, color = '#4F46E5', showArea = true }: TrendChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-lg">
          <p className="text-gray-900 dark:text-white">{payload[0].value}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{payload[0].payload[xAxisKey]}</p>
        </div>
      );
    }
    return null;
  };

  if (showArea) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.3} />
              <stop offset="95%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
          <XAxis 
            dataKey={xAxisKey} 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#9CA3AF" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${dataKey})`}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
        <XAxis 
          dataKey={xAxisKey} 
          stroke="#9CA3AF" 
          style={{ fontSize: '12px' }}
        />
        <YAxis 
          stroke="#9CA3AF" 
          style={{ fontSize: '12px' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
