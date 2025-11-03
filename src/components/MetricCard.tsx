import { ArrowDown, ArrowUp, Info, LucideIcon, Minus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from './ui/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: number;
  icon?: LucideIcon;
  className?: string;
  delay?: number;
  infoTooltip?: string;
}

export function MetricCard({ title, value, trend, icon: Icon, className, delay = 0, infoTooltip }: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return 'text-gray-500';
    return trend > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = () => {
    if (!trend || trend === 0) return <Minus className="w-4 h-4" />;
    return trend > 0 ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        'p-6 rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow',
        className
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <p className="text-gray-600 dark:text-gray-400">{title}</p>
          {infoTooltip && (
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                    <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="max-w-xs">
                  <p className="text-sm">{infoTooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/50 dark:to-cyan-950/50">
            <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <p className="text-gray-900 dark:text-white font-bold">{value}</p>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1', getTrendColor())}>
            {getTrendIcon()}
            <span className="text-sm font-semibold">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}
