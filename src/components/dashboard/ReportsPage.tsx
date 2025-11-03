import { FileText, Download, Calendar, Filter, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';

export function ReportsPage() {
  const reports = [
    {
      name: 'Monthly Performance Report',
      description: 'Comprehensive overview of all metrics',
      date: 'October 2025',
      status: 'Ready',
      size: '2.4 MB',
      type: 'PDF',
    },
    {
      name: 'Competitor Analysis Q3',
      description: 'Detailed competitor benchmarking',
      date: 'September 2025',
      status: 'Ready',
      size: '1.8 MB',
      type: 'PDF',
    },
    {
      name: 'Social Media Insights',
      description: 'Platform-specific engagement metrics',
      date: 'October 2025',
      status: 'Ready',
      size: '3.2 MB',
      type: 'PDF',
    },
    {
      name: 'Customer Sentiment Analysis',
      description: 'AI-powered sentiment trends and insights',
      date: 'October 2025',
      status: 'Generating',
      size: 'TBD',
      type: 'PDF',
    },
  ];

  const scheduledReports = [
    { name: 'Weekly Dashboard Summary', frequency: 'Every Monday', recipients: 5 },
    { name: 'Monthly Executive Report', frequency: '1st of each month', recipients: 3 },
    { name: 'Quarterly Performance Review', frequency: 'End of quarter', recipients: 8 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1">Reports & Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">Generate and download comprehensive performance reports</p>
        </div>
        <Button className="gap-2 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600">
          <FileText className="w-4 h-4" />
          Generate New Report
        </Button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-950 dark:to-cyan-950">
                  <TrendingUp className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <h3 className="text-gray-900 dark:text-white mb-1">Executive Summary</h3>
              <p className="text-gray-600 dark:text-gray-400">High-level performance overview</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-950 dark:to-emerald-950">
                  <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <h3 className="text-gray-900 dark:text-white mb-1">Custom Date Range</h3>
              <p className="text-gray-600 dark:text-gray-400">Select specific time period</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-950 dark:to-pink-950">
                  <Filter className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <h3 className="text-gray-900 dark:text-white mb-1">Property Specific</h3>
              <p className="text-gray-600 dark:text-gray-400">Filter by location or brand</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Available Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Available Reports</CardTitle>
            <CardDescription>Recently generated reports ready for download</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {reports.map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-cyan-100 dark:from-indigo-950 dark:to-cyan-950 flex items-center justify-center">
                      <FileText className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{report.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">{report.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500 dark:text-gray-500">{report.date}</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-500">{report.size}</span>
                        <Badge variant="outline" className="text-xs">
                          {report.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={
                        report.status === 'Ready'
                          ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400'
                      }
                    >
                      {report.status}
                    </Badge>
                    {report.status === 'Ready' && (
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Scheduled Reports */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Scheduled Reports</CardTitle>
                <CardDescription>Automated report delivery to stakeholders</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Add Schedule
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledReports.map((schedule, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white">{schedule.name}</p>
                      <p className="text-gray-500 dark:text-gray-400">{schedule.frequency}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-gray-600 dark:text-gray-400">{schedule.recipients} recipients</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Export Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/30 dark:to-cyan-950/30">
          <CardHeader>
            <CardTitle>Export Data</CardTitle>
            <CardDescription>Download raw data in various formats</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Export as CSV
              </Button>
              <Button variant="outline" className="flex-1">
                Export as Excel
              </Button>
              <Button variant="outline" className="flex-1">
                Export as JSON
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
