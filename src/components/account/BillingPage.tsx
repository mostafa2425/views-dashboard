import { motion } from 'motion/react';
import { CreditCard, Download, Calendar, Check, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

const invoices = [
  { id: 'INV-2024-11', date: 'Nov 1, 2024', amount: '$299', status: 'Paid' },
  { id: 'INV-2024-10', date: 'Oct 1, 2024', amount: '$299', status: 'Paid' },
  { id: 'INV-2024-09', date: 'Sep 1, 2024', amount: '$299', status: 'Paid' },
  { id: 'INV-2024-08', date: 'Aug 1, 2024', amount: '$299', status: 'Paid' }
];

export function BillingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Billing & Plans</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your subscription and billing information
        </p>
      </div>

      {/* Current Plan */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-gray-900 dark:text-white">Current Plan</h3>
              <Badge className="bg-indigo-600">Professional</Badge>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Next billing date: December 1, 2024
            </p>
          </div>
          <Button variant="outline">Change Plan</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Monthly Cost</p>
            <p className="text-2xl text-gray-900 dark:text-white">$299</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Properties</p>
            <p className="text-2xl text-gray-900 dark:text-white">Unlimited</p>
          </div>
          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Team Members</p>
            <p className="text-2xl text-gray-900 dark:text-white">10</p>
          </div>
        </div>
      </Card>

      {/* Available Plans */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Starter Plan */}
        <Card className="p-6">
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-2">Starter</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl text-gray-900 dark:text-white">$99</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Perfect for small businesses
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              'Up to 3 properties',
              '2 team members',
              'Basic analytics',
              'Email support',
              'Monthly reports'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full">
            Downgrade
          </Button>
        </Card>

        {/* Professional Plan (Current) */}
        <Card className="p-6 border-2 border-indigo-600 dark:border-indigo-500 relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge className="bg-indigo-600">Current Plan</Badge>
          </div>
          
          <div className="mb-6">
            <h3 className="text-gray-900 dark:text-white mb-2">Professional</h3>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl text-gray-900 dark:text-white">$299</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For growing hospitality businesses
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              'Unlimited properties',
              '10 team members',
              'Advanced analytics',
              'Priority support',
              'AI insights',
              'Custom reports'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700" disabled>
            Current Plan
          </Button>
        </Card>

        {/* Enterprise Plan */}
        <Card className="p-6">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-gray-900 dark:text-white">Enterprise</h3>
              <Zap className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl text-gray-900 dark:text-white">$799</span>
              <span className="text-gray-500 dark:text-gray-400">/month</span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              For large hotel chains
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {[
              'Unlimited everything',
              'Unlimited team members',
              'White-label solution',
              'Dedicated support',
              'Custom integrations',
              'SLA guarantee'
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
            Upgrade
          </Button>
        </Card>
      </div>

      {/* Payment Method */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <CreditCard className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Payment Method</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Manage your payment information
              </p>
            </div>
          </div>
          <Button variant="outline">Update</Button>
        </div>

        <div className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
          <div className="p-3 rounded bg-gray-900 dark:bg-gray-100">
            <CreditCard className="w-6 h-6 text-white dark:text-gray-900" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 dark:text-white">Visa ending in 4242</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Expires 12/2025</p>
          </div>
          <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
            Default
          </Badge>
        </div>
      </Card>

      {/* Billing History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-100 dark:bg-cyan-900/20">
              <Calendar className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white">Billing History</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Download your past invoices
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {invoices.map((invoice, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div>
                <p className="text-gray-900 dark:text-white">{invoice.id}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{invoice.date}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-gray-900 dark:text-white">{invoice.amount}</p>
                <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                  {invoice.status}
                </Badge>
                <Button variant="ghost" size="icon">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
