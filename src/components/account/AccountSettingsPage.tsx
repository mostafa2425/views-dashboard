import { motion } from 'motion/react';
import { Shield, Key, Smartphone, Globe, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { useState } from 'react';

export function AccountSettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Account Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account security and preferences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Password & Security */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <Key className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Password & Security</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Update your password and security settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter current password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter new password"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Update Password
            </Button>
          </div>
        </Card>

        {/* Two-Factor Authentication */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
              <Smartphone className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Two-Factor Authentication</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">SMS Authentication</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive codes via text message</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Authenticator App</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Use an app to generate codes</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Account Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Preferences</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Customize your account experience
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Email Notifications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">Marketing Communications</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive product updates and offers</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card className="p-6 border-red-200 dark:border-red-900">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/20">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-red-600 dark:text-red-400">Danger Zone</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Irreversible account actions
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <Button variant="outline" className="w-full border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20">
              Deactivate Account
            </Button>
            <Button variant="outline" className="w-full border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20">
              Delete Account Permanently
            </Button>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
