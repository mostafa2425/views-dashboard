import { ChevronDown, User, Settings, CreditCard, Users, BellRing, HelpCircle, Shield, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface UserAccountDropdownProps {
  onNavigate: (page: string) => void;
}

export function UserAccountDropdown({ onNavigate }: UserAccountDropdownProps) {
  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect to login
    alert('Logging out...');
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button 
          type="button"
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Account menu"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage 
              src="https://images.unsplash.com/photo-1616147147027-60d49d3582c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTYXVkaSUyMGJ1c2luZXNzbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MjE2OTMyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Ibrahim"
            />
            <AvatarFallback className="bg-gradient-to-br from-indigo-600 to-cyan-500 text-white">
              IB
            </AvatarFallback>
          </Avatar>
          <span className="hidden md:inline text-gray-900 dark:text-white">Ibrahim</span>
          <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-xl rounded-lg"
        sideOffset={8}
      >
        <DropdownMenuLabel className="px-2 py-2">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">Ibrahim</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">ibrahim@viewsanalytics.com</p>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Account Section */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={() => onNavigate('profile')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onNavigate('account-settings')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <Settings className="w-4 h-4 mr-2" />
            Account Settings
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onNavigate('notifications')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <BellRing className="w-4 h-4 mr-2" />
            Notifications
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Organization Section */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={() => onNavigate('team-management')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Team Management
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onNavigate('billing')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Billing & Plans
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Support Section */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={() => onNavigate('security')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <Shield className="w-4 h-4 mr-2" />
            Security
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onNavigate('help-support')}
            className="cursor-pointer text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-gray-900 dark:focus:text-white"
          >
            <HelpCircle className="w-4 h-4 mr-2" />
            Help & Support
          </DropdownMenuItem>
        </div>
        
        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
        
        {/* Logout */}
        <div className="py-1">
          <DropdownMenuItem 
            onClick={handleLogout}
            className="cursor-pointer text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20 focus:text-red-700 dark:focus:text-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
