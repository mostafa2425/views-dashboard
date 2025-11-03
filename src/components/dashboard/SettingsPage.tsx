import { Settings, Bell, Shield, Users, Database, Mail } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { motion } from 'motion/react';
import { Separator } from '../ui/separator';

export function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account and application preferences</p>
      </div>

      {/* Account Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your personal information and preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name</Label>
                <Input defaultValue="Ibrahim" className="mt-1" />
              </div>
              <div>
                <Label>Last Name</Label>
                <Input defaultValue="Analytics" className="mt-1" />
              </div>
            </div>
            <div>
              <Label>Email Address</Label>
              <Input type="email" defaultValue="ibrahim@viewsanalytics.com" className="mt-1" />
            </div>
            <div>
              <Label>Role</Label>
              <Input defaultValue="Brand Manager" className="mt-1" disabled />
            </div>
            <Separator />
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your account</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Review Alerts</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when new reviews are posted</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Crisis Alerts</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Immediate alerts for negative sentiment spikes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Weekly Summary</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive weekly performance summaries</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>AI Insights</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about AI-powered recommendations</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Data & Privacy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Data & Privacy
            </CardTitle>
            <CardDescription>Control your data and privacy settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Data Collection</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allow analytics data collection for improvements</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <Label>Share with Team</Label>
                <p className="text-sm text-gray-500 dark:text-gray-400">Share dashboard access with team members</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div>
              <Label>Data Retention</Label>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">How long to keep historical data</p>
              <select className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
                <option>1 Year</option>
                <option>2 Years</option>
                <option>5 Years</option>
                <option>Indefinite</option>
              </select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Integrations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              Connected Services
            </CardTitle>
            <CardDescription>Manage integrations with external platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  B
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">Brand24</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white">
                  S
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">SE Ranking</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Configure</Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white">
                  C
                </div>
                <div>
                  <p className="text-gray-900 dark:text-white">CRM Platform</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Not connected</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Connect</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600 dark:text-red-400">Danger Zone</CardTitle>
            <CardDescription>Irreversible and destructive actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30">
              <div>
                <Label className="text-red-900 dark:text-red-200">Delete Account</Label>
                <p className="text-sm text-red-600 dark:text-red-400">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
