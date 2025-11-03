import { motion } from 'motion/react';
import { User, Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Separator } from '../ui/separator';

export function ProfilePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-gray-900 dark:text-white mb-2">Profile</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your personal information and preferences
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Picture Card */}
        <Card className="p-6 lg:col-span-1">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="w-32 h-32">
                <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white text-3xl">
                  S
                </AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white transition-colors">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center">
              <h3 className="text-gray-900 dark:text-white">Ibrahim</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Account Owner</p>
            </div>
            <Button variant="outline" className="w-full">
              Change Photo
            </Button>
          </div>
        </Card>

        {/* Personal Information Card */}
        <Card className="p-6 lg:col-span-2">
          <h3 className="text-gray-900 dark:text-white mb-4">Personal Information</h3>
          
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="firstName"
                    defaultValue="Ibrahim"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="lastName"
                    defaultValue="Al-Mansour"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  defaultValue="ibrahim@viewsanalytics.com"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  defaultValue="+966 50 123 4567"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  defaultValue="Riyadh, Saudi Arabia"
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="joinDate">Member Since</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  id="joinDate"
                  defaultValue="January 2024"
                  className="pl-10"
                  disabled
                />
              </div>
            </div>

            <Separator />

            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline">Cancel</Button>
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                Save Changes
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
