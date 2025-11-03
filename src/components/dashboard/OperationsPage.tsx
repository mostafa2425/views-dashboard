import { ClipboardList, Users, Clock, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MetricCard } from '../MetricCard';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { propertyPerformance } from '../../lib/mockData';
import { Progress } from '../ui/progress';
import { cn } from '../ui/utils';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export function OperationsPage() {
  const [hoveredCell, setHoveredCell] = useState<{ property: string; hour: number; breaches: number } | null>(null);

  const slaData = [
    { property: 'Grand Hotel Downtown', responseTime: 1.2, target: 2.0, status: 'excellent' },
    { property: 'Seaside Resort & Spa', responseTime: 1.8, target: 2.0, status: 'good' },
    { property: 'City Center Boutique', responseTime: 3.2, target: 2.0, status: 'breach' },
    { property: 'Mountain View Lodge', responseTime: 2.1, target: 2.0, status: 'warning' },
    { property: 'Airport Business Hotel', responseTime: 1.5, target: 2.0, status: 'good' },
  ];

  // Number of Visitors Heatmap Data - Properties x Hours (0-23)
  const properties = ['Grand Hotel', 'Seaside Resort', 'City Center', 'Mountain View', 'Airport Hotel'];
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  // Generate realistic visitor data - more visitors during peak hours
  const generateVisitorData = () => {
    return properties.map((property, propIndex) => {
      return hours.map((hour) => {
        // Peak hours: 9-12 (morning check-in/activity), 18-21 (evening check-in/dining)
        const isMorningPeak = hour >= 9 && hour <= 12;
        const isEveningPeak = hour >= 18 && hour <= 21;
        const isLateNight = hour >= 0 && hour <= 5;
        const isAfternoon = hour >= 13 && hour <= 17;
        
        // Different properties have different base visitor rates
        let baseVisitorRate = 30;
        if (propIndex === 0) baseVisitorRate = 50; // Grand Hotel - most popular
        else if (propIndex === 1) baseVisitorRate = 45; // Seaside Resort
        else if (propIndex === 2) baseVisitorRate = 40; // City Center
        else if (propIndex === 3) baseVisitorRate = 35; // Mountain View
        else baseVisitorRate = 42; // Airport Hotel
        
        if (isMorningPeak) baseVisitorRate *= 1.8;
        else if (isEveningPeak) baseVisitorRate *= 2.2;
        else if (isAfternoon) baseVisitorRate *= 1.3;
        else if (isLateNight) baseVisitorRate *= 0.2;
        else baseVisitorRate *= 0.6; // Early morning/late night
        
        // Add some randomness
        const visitors = Math.max(5, Math.floor(baseVisitorRate + (Math.random() * 20 - 10)));
        return visitors;
      });
    });
  };

  const visitorData = generateVisitorData();
  const maxVisitors = Math.max(...visitorData.flat());

  const staffPerformance = [
    { name: 'Sarah Mitchell', role: 'Guest Relations', responses: 145, avgRating: 4.9, responseTime: 1.1 },
    { name: 'Michael Chen', role: 'Front Desk', responses: 132, avgRating: 4.7, responseTime: 1.4 },
    { name: 'Emma Davis', role: 'Concierge', responses: 98, avgRating: 4.8, responseTime: 1.2 },
    { name: 'James Wilson', role: 'Manager', responses: 87, avgRating: 4.9, responseTime: 0.9 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'good':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
      case 'warning':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400';
      case 'breach':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getVisitorHeatmapColor = (visitors: number) => {
    // Higher visitors = better (green), lower = worse (red)
    if (visitors >= 80) return 'bg-green-500 dark:bg-green-900';
    if (visitors >= 60) return 'bg-green-200 dark:bg-green-950/60';
    if (visitors >= 40) return 'bg-yellow-100 dark:bg-yellow-950/40';
    if (visitors >= 20) return 'bg-orange-100 dark:bg-orange-950/50';
    return 'bg-red-100 dark:bg-red-950/30';
  };

  const getVisitorHeatmapTextColor = (visitors: number) => {
    if (visitors >= 80) return 'text-white';
    return 'text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Operations Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor operational metrics, SLA compliance, and team performance</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Avg Occupancy Rate"
          value="82%"
          trend={5.3}
          icon={Users}
        />
        <MetricCard
          title="Avg Response Time"
          value="2.3h"
          trend={-12.5}
          icon={Clock}
        />
        <MetricCard
          title="SLA Compliance"
          value="94%"
          trend={3.2}
          icon={CheckCircle}
        />
        <MetricCard
          title="Active Incidents"
          value="3"
          trend={-40.0}
          icon={AlertCircle}
        />
      </div>

      {/* Two Column Layout for SLA Performance and Heatmap - Auto-Layout */}
      <div className="flex gap-6 overflow-x-auto">
        {/* SLA Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="w-[580px] h-[360px] flex flex-col flex-shrink-0">
            <CardHeader className="p-6 pb-4">
              <CardTitle>SLA Performance by Property</CardTitle>
              <CardDescription>Response time compliance and breach monitoring</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 overflow-auto">
              <div className="space-y-3">
                {slaData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-800"
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-900 dark:text-white text-sm">{item.property}</p>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1 text-xs">
                            <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                            <span className="text-gray-900 dark:text-white">{item.responseTime}h / {item.target}h</span>
                          </div>
                          <Progress 
                            value={(item.responseTime / item.target) * 100} 
                            className={cn(
                              'h-2',
                              item.status === 'breach' && '[&>div]:bg-red-600',
                              item.status === 'warning' && '[&>div]:bg-yellow-600'
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Number of Visitors Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="w-[580px] h-[360px] flex flex-col flex-shrink-0">
            <CardHeader className="p-6 pb-4">
              <CardTitle>Number of Visitors Heatmap</CardTitle>
              <CardDescription>Visitor traffic by property and hour of day</CardDescription>
            </CardHeader>
            <CardContent className="p-6 pt-0 flex-1 overflow-auto">
              <TooltipProvider>
                <div className="h-full flex flex-col">
                  {/* Hour Labels */}
                  <div className="flex mb-2">
                    <div className="w-24 flex-shrink-0" /> {/* Spacer for property names */}
                    <div className="flex-1 flex justify-between px-1">
                      {[0, 6, 12, 18, 23].map((hour) => (
                        <div key={hour} className="text-[10px] text-gray-500 dark:text-gray-400 text-center" style={{ width: '20%' }}>
                          {hour}:00
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Heatmap Grid */}
                  <div className="space-y-1 flex-1">
                    {properties.map((property, propIndex) => (
                      <div key={property} className="flex items-center gap-2">
                        <div className="w-24 flex-shrink-0 text-[10px] text-gray-700 dark:text-gray-300 truncate">
                          {property}
                        </div>
                        <div className="flex-1 flex gap-[2px]">
                          {hours.map((hour) => {
                            const visitors = visitorData[propIndex][hour];
                            return (
                              <Tooltip key={hour}>
                                <TooltipTrigger asChild>
                                  <div
                                    className={cn(
                                      'flex-1 h-7 rounded cursor-pointer transition-all hover:ring-2 hover:ring-indigo-500 dark:hover:ring-cyan-500',
                                      getVisitorHeatmapColor(visitors),
                                      'flex items-center justify-center'
                                    )}
                                    onMouseEnter={() => setHoveredCell({ property, hour, breaches: visitors })}
                                    onMouseLeave={() => setHoveredCell(null)}
                                  >
                                    <span className={cn('text-[9px]', getVisitorHeatmapTextColor(visitors))}>
                                      {visitors}
                                    </span>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <div className="text-xs">
                                    <p className="font-semibold">{property}</p>
                                    <p className="text-gray-500 dark:text-gray-400">{hour}:00 - {hour}:59</p>
                                    <p className="text-indigo-600 dark:text-cyan-400 mt-1">
                                      {visitors} {visitors === 1 ? 'visitor' : 'visitors'}
                                    </p>
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-3 mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-[10px] text-gray-600 dark:text-gray-400">Visitors:</span>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-red-100 dark:bg-red-950/30" />
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">&lt;20</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-orange-100 dark:bg-orange-950/50" />
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">20-39</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-yellow-100 dark:bg-yellow-950/40" />
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">40-59</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-green-200 dark:bg-green-950/60" />
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">60-79</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded bg-green-500 dark:bg-green-900" />
                        <span className="text-[10px] text-gray-600 dark:text-gray-400">80+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TooltipProvider>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Property Performance Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Property Performance Heatmap</CardTitle>
            <CardDescription>Multi-metric performance overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Property</th>
                    <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Rating</th>
                    <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Reviews</th>
                    <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">Occupancy</th>
                    <th className="text-center py-3 px-4 text-gray-700 dark:text-gray-300">NPS</th>
                  </tr>
                </thead>
                <tbody>
                  {propertyPerformance.map((property, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{property.property}</td>
                      <td className="py-3 px-4">
                        <div className={cn(
                          'text-center py-1 px-2 rounded',
                          property.rating >= 4.6 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                          property.rating >= 4.4 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        )}>
                          {property.rating}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={cn(
                          'text-center py-1 px-2 rounded',
                          property.reviews >= 3000 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                          property.reviews >= 2000 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                          'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400'
                        )}>
                          {property.reviews.toLocaleString()}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={cn(
                          'text-center py-1 px-2 rounded',
                          property.occupancy >= 85 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                          property.occupancy >= 75 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        )}>
                          {property.occupancy}%
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className={cn(
                          'text-center py-1 px-2 rounded',
                          property.nps >= 70 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                          property.nps >= 60 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                          'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                        )}>
                          {property.nps}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Staff Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Staff</CardTitle>
            <CardDescription>Team members with exceptional customer service metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffPerformance.map((staff, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
                      {staff.name[0]}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{staff.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">{staff.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400">Responses</p>
                      <p className="text-gray-900 dark:text-white">{staff.responses}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400">Avg Rating</p>
                      <p className="text-green-600 dark:text-green-400">{staff.avgRating}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500 dark:text-gray-400">Avg Time</p>
                      <p className="text-gray-900 dark:text-white">{staff.responseTime}h</p>
                    </div>
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Excellent
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Operational Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertCircle className="w-5 h-5" />
              Active Operational Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                <p className="text-gray-900 dark:text-white mb-1">SLA Breach at City Center Boutique</p>
                <p className="text-gray-600 dark:text-gray-400">Response time exceeded 2 hours. 5 reviews pending response.</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800">
                <p className="text-gray-900 dark:text-white mb-1">Low Occupancy Warning - Airport Business Hotel</p>
                <p className="text-gray-600 dark:text-gray-400">Occupancy dropped below 75% threshold. Consider promotional campaign.</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800">
                <p className="text-gray-900 dark:text-white mb-1">Staff Capacity Alert</p>
                <p className="text-gray-600 dark:text-gray-400">Peak review volume expected this weekend. Consider additional support staff.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
