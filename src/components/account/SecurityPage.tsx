import { motion } from 'motion/react';
import { Shield, Smartphone, Clock, MapPin, Monitor, Check, AlertTriangle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';

const activeSessions = [
  {
    device: 'MacBook Pro',
    location: 'Riyadh, Saudi Arabia',
    ip: '185.123.45.67',
    lastActive: '2 minutes ago',
    current: true
  },
  {
    device: 'iPhone 14 Pro',
    location: 'Riyadh, Saudi Arabia',
    ip: '185.123.45.68',
    lastActive: '1 hour ago',
    current: false
  },
  {
    device: 'iPad Air',
    location: 'Jeddah, Saudi Arabia',
    ip: '185.123.45.69',
    lastActive: '2 days ago',
    current: false
  }
];

const securityLogs = [
  {
    action: 'Successful login',
    location: 'Riyadh, Saudi Arabia',
    time: '2 minutes ago',
    status: 'success'
  },
  {
    action: 'Password changed',
    location: 'Riyadh, Saudi Arabia',
    time: '3 days ago',
    status: 'success'
  },
  {
    action: 'Failed login attempt',
    location: 'Unknown location',
    time: '5 days ago',
    status: 'warning'
  },
  {
    action: '2FA enabled',
    location: 'Riyadh, Saudi Arabia',
    time: '1 week ago',
    status: 'success'
  }
];

export function SecurityPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Security</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account security and privacy settings
        </p>
      </div>

      {/* Security Status */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
            <Shield className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-gray-900 dark:text-white mb-1">Your account is secure</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              All recommended security features are enabled
            </p>
          </div>
          <Badge className="bg-green-600">Protected</Badge>
        </div>
      </Card>

      {/* Security Features */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-6">Security Features</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
              <div>
                <p className="text-gray-900 dark:text-white">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Extra security for your account login
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                Enabled
              </Badge>
              <Switch defaultChecked />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <Smartphone className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
              <div>
                <p className="text-gray-900 dark:text-white">SMS Verification</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive verification codes via SMS
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div>
                <p className="text-gray-900 dark:text-white">Login Alerts</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Get notified of new login attempts
                </p>
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <div className="flex items-start gap-3 flex-1">
              <MapPin className="w-5 h-5 text-cyan-600 dark:text-cyan-400 mt-0.5" />
              <div>
                <p className="text-gray-900 dark:text-white">Location-Based Security</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Block logins from unusual locations
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </Card>

      {/* Active Sessions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <Monitor className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Active Sessions</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage devices where you're logged in
              </p>
            </div>
          </div>
          <Button variant="outline" className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900">
            Sign Out All
          </Button>
        </div>

        <div className="space-y-3">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-gray-900 dark:text-white">{session.device}</p>
                    {session.current && (
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </span>
                    <span>IP: {session.ip}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </span>
                  </div>
                </div>
              </div>
              {!session.current && (
                <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">
                  Sign Out
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Security Log */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
            <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h3 className="text-gray-900 dark:text-white">Security Activity Log</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Recent security events on your account
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {securityLogs.map((log, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className={`p-2 rounded-lg ${
                log.status === 'success' 
                  ? 'bg-green-100 dark:bg-green-900/20' 
                  : 'bg-orange-100 dark:bg-orange-900/20'
              }`}>
                {log.status === 'success' ? (
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white">{log.action}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {log.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {log.time}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Account Recovery */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Account Recovery</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Set up recovery options in case you lose access to your account
        </p>
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1">
            Add Recovery Email
          </Button>
          <Button variant="outline" className="flex-1">
            Add Recovery Phone
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
