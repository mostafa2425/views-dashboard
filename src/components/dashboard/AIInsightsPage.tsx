import { 
  Sparkles, 
  Clock, 
  Phone, 
  Users, 
  TrendingUp, 
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Target,
  Zap,
  BarChart3,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  visitTimeData,
  callInteractionData,
  queueWaitTimeData,
  waitTimeMetrics,
  aiRecommendations
} from '../../lib/mockData';
import { cn } from '../ui/utils';

export function AIInsightsPage() {
  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high':
        return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400';
      default:
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Staffing':
        return <Users className="w-4 h-4" />;
      case 'Training':
        return <Target className="w-4 h-4" />;
      case 'Service':
        return <CheckCircle2 className="w-4 h-4" />;
      case 'Technology':
        return <Zap className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const SENTIMENT_COLORS = ['#06B6D4', '#818CF8', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            AI-Powered Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Intelligent analytics to optimize operations and guest experience</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/50 dark:to-cyan-950/50 border border-indigo-200 dark:border-indigo-800">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-gray-700 dark:text-gray-300">AI Active</span>
        </div>
      </div>

      {/* Section 1: Visit Time Analytics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  Visit Time Analytics
                </CardTitle>
                <CardDescription>Peak guest visit periods and traffic patterns</CardDescription>
              </div>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400">
                AI Summary
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30 border border-indigo-200 dark:border-indigo-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-indigo-600 text-white">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Peak Activity Detected</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Most visits occur between <span className="text-indigo-600 dark:text-indigo-400">5 PM - 8 PM</span> with 142 peak visits at 6 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={visitTimeData}>
                  <defs>
                    <linearGradient id="visitGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                  <XAxis 
                    dataKey="hour" 
                    stroke="#9CA3AF" 
                    style={{ fontSize: '12px' }}
                  />
                  <YAxis 
                    stroke="#9CA3AF" 
                    style={{ fontSize: '12px' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visits"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    fill="url(#visitGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                <p className="text-green-600 dark:text-green-400 mb-1">Peak Times</p>
                <p className="text-gray-900 dark:text-white">5 PM - 8 PM</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                <p className="text-blue-600 dark:text-blue-400 mb-1">Low Traffic Times</p>
                <p className="text-gray-900 dark:text-white">6 AM - 10 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section 2: Call Interaction Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              Call Interaction Insights
            </CardTitle>
            <CardDescription>Speech analysis and sentiment tracking for reception calls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-950/30 dark:to-blue-950/30 border border-cyan-200 dark:border-cyan-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-600 text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Call Analysis Summary</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Reception tone is generally positive. Peak call duration <span className="text-cyan-600 dark:text-cyan-400">3–5 minutes</span>. Response time averaging 1.8 minutes.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sentiment Breakdown */}
              <div>
                <h4 className="text-gray-900 dark:text-white mb-3">Sentiment Distribution</h4>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={callInteractionData.sentimentBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="count"
                      >
                        {callInteractionData.sentimentBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2 mt-2">
                  {callInteractionData.sentimentBreakdown.map((item, index) => (
                    <div key={item.sentiment} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: SENTIMENT_COLORS[index] }}
                        />
                        <span className="text-gray-600 dark:text-gray-400">{item.sentiment}</span>
                      </div>
                      <span className="text-gray-900 dark:text-white">{item.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Call Metrics */}
              <div className="space-y-3">
                <h4 className="text-gray-900 dark:text-white mb-3">Key Metrics</h4>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Total Calls</p>
                  <p className="text-gray-900 dark:text-white">{callInteractionData.totalCalls.toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Avg Call Duration</p>
                  <p className="text-gray-900 dark:text-white">{callInteractionData.avgDuration}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Avg Response Time</p>
                  <p className="text-gray-900 dark:text-white">{callInteractionData.avgResponseTime}</p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <p className="text-gray-600 dark:text-gray-400 mb-1">Peak Call Time</p>
                  <p className="text-gray-900 dark:text-white">{callInteractionData.peakCallTime}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section 3: Queue & Wait Time Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Queue & Wait Time Analysis
            </CardTitle>
            <CardDescription>Average waiting times and reception efficiency metrics</CardDescription>
          </CardHeader>
          <CardContent>
            {/* KPI Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600 dark:text-gray-400">Average Wait Time</p>
                  <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <p className="text-gray-900 dark:text-white">{waitTimeMetrics.avgWaitTime}</p>
                <p className="text-indigo-600 dark:text-indigo-400 mt-1">Per guest</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600 dark:text-gray-400">Longest Recorded Wait</p>
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <p className="text-gray-900 dark:text-white">{waitTimeMetrics.longestWait}</p>
                <p className="text-red-600 dark:text-red-400 mt-1">On {waitTimeMetrics.peakWaitDay}</p>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-gray-600 dark:text-gray-400">Staff Efficiency</p>
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-gray-900 dark:text-white">{waitTimeMetrics.staffEfficiency}%</p>
                <p className="text-green-600 dark:text-green-400 mt-1">Above target</p>
              </div>
            </div>

            {/* Wait Time Chart */}
            <div className="mb-4">
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={queueWaitTimeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                    <XAxis 
                      dataKey="day" 
                      stroke="#9CA3AF" 
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis 
                      stroke="#9CA3AF" 
                      style={{ fontSize: '12px' }}
                      label={{ value: 'Minutes', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: '1px solid #E5E7EB',
                        borderRadius: '8px',
                      }}
                    />
                    <Bar dataKey="avgWait" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Avg Wait" />
                    <Bar dataKey="maxWait" fill="#06B6D4" radius={[8, 8, 0, 0]} name="Max Wait" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Insight */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-orange-600 text-white">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white mb-1">Weekend Pattern Detected</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Guests wait <span className="text-orange-600 dark:text-orange-400">85% longer during weekends</span> (Saturday & Sunday). Consider increasing weekend staffing.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Section 4: AI Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <h2 className="text-gray-900 dark:text-white">AI Recommendations</h2>
            <Badge variant="outline" className="ml-2">
              {aiRecommendations.length} Active
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiRecommendations.map((recommendation, index) => (
              <motion.div
                key={recommendation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={cn(
                        "p-2 rounded-lg text-white",
                        recommendation.impact === 'High' 
                          ? 'bg-gradient-to-br from-red-500 to-orange-500'
                          : recommendation.impact === 'Medium'
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                          : 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      )}>
                        {getCategoryIcon(recommendation.category)}
                      </div>
                      <div className="flex-1">
                        <Badge className={getImpactColor(recommendation.impact)} variant="secondary">
                          {recommendation.impact}
                        </Badge>
                      </div>
                    </div>

                    <h3 className="text-gray-900 dark:text-white mb-2">
                      {recommendation.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {recommendation.description}
                    </p>

                    <div className="pt-3 border-t border-gray-200 dark:border-gray-800">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-600 dark:text-gray-400">Expected Impact</span>
                        <span className="text-indigo-600 dark:text-indigo-400">
                          {recommendation.expectedImpact}
                        </span>
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        Apply Recommendation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
