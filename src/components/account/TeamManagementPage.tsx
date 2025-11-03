import { motion } from 'motion/react';
import { Users, UserPlus, Mail, Shield, MoreVertical, Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

const teamMembers = [
  {
    name: 'Ibrahim Al-Mansour',
    email: 'ibrahim@viewsanalytics.com',
    role: 'Owner',
    status: 'active',
    avatar: 'S',
    color: 'from-indigo-600 to-cyan-500'
  },
  {
    name: 'Ahmed Hassan',
    email: 'ahmed@viewsanalytics.com',
    role: 'Admin',
    status: 'active',
    avatar: 'A',
    color: 'from-purple-600 to-pink-500'
  },
  {
    name: 'Fatima Ali',
    email: 'fatima@viewsanalytics.com',
    role: 'Manager',
    status: 'active',
    avatar: 'F',
    color: 'from-blue-600 to-cyan-500'
  },
  {
    name: 'Mohammed Khan',
    email: 'mohammed@viewsanalytics.com',
    role: 'Editor',
    status: 'active',
    avatar: 'M',
    color: 'from-green-600 to-teal-500'
  },
  {
    name: 'Sara Abdullah',
    email: 'sara@viewsanalytics.com',
    role: 'Viewer',
    status: 'pending',
    avatar: 'S',
    color: 'from-orange-600 to-red-500'
  }
];

export function TeamManagementPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-gray-900 dark:text-white mb-2">Team Management</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage your team members and their permissions
          </p>
        </div>
        <Button className="gap-2 bg-indigo-600 hover:bg-indigo-700">
          <UserPlus className="w-4 h-4" />
          Invite Member
        </Button>
      </div>

      {/* Team Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/20">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Members</p>
              <p className="text-2xl text-gray-900 dark:text-white">5</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900/20">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Active</p>
              <p className="text-2xl text-gray-900 dark:text-white">4</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
              <Mail className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl text-gray-900 dark:text-white">1</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
              <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Admins</p>
              <p className="text-2xl text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Members List */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-gray-900 dark:text-white">Team Members</h3>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search members..."
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-4">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className={`bg-gradient-to-br ${member.color} text-white`}>
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-gray-900 dark:text-white">{member.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge
                  variant={member.role === 'Owner' ? 'default' : 'secondary'}
                  className={
                    member.role === 'Owner'
                      ? 'bg-indigo-600'
                      : member.role === 'Admin'
                      ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
                      : member.role === 'Manager'
                      ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                      : member.role === 'Editor'
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }
                >
                  {member.role}
                </Badge>

                <Badge
                  variant="secondary"
                  className={
                    member.status === 'active'
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300'
                      : 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
                  }
                >
                  {member.status}
                </Badge>

                {member.role !== 'Owner' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Role</DropdownMenuItem>
                      <DropdownMenuItem>Resend Invitation</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600 dark:text-red-400">
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Roles & Permissions */}
      <Card className="p-6">
        <h3 className="text-gray-900 dark:text-white mb-4">Roles & Permissions</h3>
        <div className="space-y-3">
          {[
            { role: 'Owner', description: 'Full access to all features and settings', color: 'indigo' },
            { role: 'Admin', description: 'Manage team, settings, and all data', color: 'purple' },
            { role: 'Manager', description: 'View and edit data, manage operations', color: 'blue' },
            { role: 'Editor', description: 'Edit and publish content', color: 'green' },
            { role: 'Viewer', description: 'View-only access to dashboards', color: 'gray' }
          ].map((role, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className={`w-2 h-2 rounded-full bg-${role.color}-500`} />
              <div>
                <p className="text-gray-900 dark:text-white">{role.role}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{role.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
