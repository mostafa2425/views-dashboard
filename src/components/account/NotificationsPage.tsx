import { motion } from 'motion/react';
import { Bell, Mail, MessageSquare, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

export function NotificationsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Notifications</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage how you receive notifications and updates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Email Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <Mail className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Email Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Choose what updates you want to receive via email
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Daily Summary</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive a daily digest of key metrics</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Weekly Reports</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get weekly performance summaries</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Monthly Analytics</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Monthly detailed analytics reports</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Push Notifications */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
              <Bell className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Push Notifications</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Real-time alerts for important events
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white">Critical Alerts</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Urgent issues requiring immediate attention</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white">New Reviews</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when new reviews are posted</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <TrendingUp className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white">Performance Milestones</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Celebrate when you reach targets</p>
                </div>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex items-start gap-3 flex-1">
                <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-gray-900 dark:text-white">Task Completions</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Updates on team task progress</p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        {/* Recent Notifications */}
        <Card className="p-6">
          <h3 className="text-gray-900 dark:text-white mb-4">Recent Notifications</h3>
          
          <div className="space-y-4">
            {[
              {
                title: 'New 5-star review received',
                time: '2 minutes ago',
                type: 'positive',
                icon: CheckCircle,
                read: false
              },
              {
                title: 'Weekly report is ready',
                time: '1 hour ago',
                type: 'info',
                icon: Mail,
                read: false
              },
              {
                title: 'Sentiment score improved by 12%',
                time: '3 hours ago',
                type: 'success',
                icon: TrendingUp,
                read: true
              },
              {
                title: 'Response needed: Customer inquiry',
                time: '5 hours ago',
                type: 'warning',
                icon: AlertCircle,
                read: true
              }
            ].map((notification, index) => (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-lg border transition-colors ${
                  notification.read
                    ? 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800'
                    : 'bg-indigo-50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  notification.type === 'positive' ? 'bg-green-100 dark:bg-green-900/20' :
                  notification.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/20' :
                  notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/20' :
                  'bg-orange-100 dark:bg-orange-900/20'
                }`}>
                  <notification.icon className={`w-5 h-5 ${
                    notification.type === 'positive' ? 'text-green-600 dark:text-green-400' :
                    notification.type === 'info' ? 'text-blue-600 dark:text-blue-400' :
                    notification.type === 'success' ? 'text-green-600 dark:text-green-400' :
                    'text-orange-600 dark:text-orange-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-gray-900 dark:text-white">{notification.title}</p>
                    {!notification.read && (
                      <Badge variant="secondary" className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300">
                        New
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
