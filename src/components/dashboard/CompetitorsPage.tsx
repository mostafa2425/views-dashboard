import { Users, TrendingUp, Star, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { competitorData } from '../../lib/mockData';
import { Progress } from '../ui/progress';

export function CompetitorsPage() {
  const radarData = competitorData.map(comp => ({
    metric: comp.name,
    rating: (comp.rating / 5) * 100,
    reviews: (comp.reviews / 20000) * 100,
    sentiment: comp.sentiment,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Competitor Analysis</h1>
        <p className="text-gray-600 dark:text-gray-400">Monitor your position against key competitors in the market</p>
      </div>

      {/* Competitor Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {competitorData.map((competitor, index) => (
          <motion.div
            key={competitor.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={index === 0 ? 'border-2 border-indigo-600 dark:border-indigo-400' : ''}>
              {index === 0 && (
                <div className="px-4 pt-3">
                  <Badge className="bg-indigo-600 text-white">Your Brand</Badge>
                </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {competitor.name}
                  {index === 0 && <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Average Rating</span>
                    <span className="text-gray-900 dark:text-white">{competitor.rating.toFixed(1)}</span>
                  </div>
                  <Progress value={(competitor.rating / 5) * 100} className="h-2" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Total Reviews</span>
                    <span className="text-gray-900 dark:text-white">{competitor.reviews.toLocaleString()}</span>
                  </div>
                  <Progress value={(competitor.reviews / 20000) * 100} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Share of Voice</span>
                    <span className="text-gray-900 dark:text-white">{competitor.sov}%</span>
                  </div>
                  <Progress value={competitor.sov} className="h-2" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Sentiment Score</span>
                    <span className="text-gray-900 dark:text-white">{competitor.sentiment}%</span>
                  </div>
                  <Progress value={competitor.sentiment} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Comparison */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Rating Comparison</CardTitle>
              <CardDescription>How you stack up against competitors</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis domain={[0, 5]} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="rating" radius={[8, 8, 0, 0]}>
                    {competitorData.map((entry, index) => (
                      <Bar
                        key={index}
                        dataKey="rating"
                        fill={index === 0 ? '#4F46E5' : '#9CA3AF'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Share of Voice */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Share of Voice</CardTitle>
              <CardDescription>Market presence comparison</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={competitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis domain={[0, 50]} stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar dataKey="sov" fill="#06B6D4" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Detailed Metrics Comparison</CardTitle>
            <CardDescription>Side-by-side performance analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Brand</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Rating</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Reviews</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Share of Voice</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Sentiment</th>
                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorData.map((competitor, index) => (
                    <tr
                      key={competitor.name}
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
                            {competitor.name[0]}
                          </div>
                          <span className="text-gray-900 dark:text-white">{competitor.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-900 dark:text-white">{competitor.rating.toFixed(1)}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {competitor.reviews.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {competitor.sov}%
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">
                        {competitor.sentiment}%
                      </td>
                      <td className="py-3 px-4">
                        {index === 0 ? (
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                            Leading
                          </Badge>
                        ) : index === 1 ? (
                          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400">
                            Competing
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                            Monitoring
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Market Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              Market Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Your Position</p>
                <p className="text-gray-900 dark:text-white mb-2">Leading in rating & sentiment</p>
                <p className="text-green-600 dark:text-green-400">Competitive advantage maintained</p>
              </div>
              <div className="p-4 rounded-lg bg-white dark:bg-gray-900">
                <p className="text-gray-600 dark:text-gray-400 mb-1">Opportunity</p>
                <p className="text-gray-900 dark:text-white mb-2">Increase share of voice by 7%</p>
                <p className="text-orange-600 dark:text-orange-400">To match market leader</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
