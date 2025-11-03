import { 
  LayoutDashboard, 
  Star, 
  Palette, 
  Users, 
  ClipboardList,
  Sparkles,
  FileText,
  Settings,
  TrendingUp
} from 'lucide-react';
import { cn } from '../ui/utils';

interface SidebarProps {
  activePage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'reputation', label: 'Reviews', icon: Star },
  { id: 'social', label: 'Branding', icon: Palette },
  { id: 'competitors', label: 'Competitors', icon: Users },
  { id: 'operations', label: 'Operations', icon: ClipboardList },
  { id: 'ai-insights', label: 'AI Insights', icon: Sparkles, highlight: true },
  { id: 'reports', label: 'Reports', icon: FileText },
];

const bottomItems = [
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activePage, onPageChange }: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-white dark:bg-gray-950 dark:border-gray-800 flex flex-col">
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200',
                'hover:bg-indigo-50 dark:hover:bg-indigo-950/30',
                isActive && 'bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/50 dark:to-cyan-950/50 border-l-4 border-indigo-600 dark:border-indigo-400 pl-2.5'
              )}
            >
              <Icon className={cn(
                'w-5 h-5',
                isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400'
              )} />
              <span className={cn(
                'flex-1 text-left',
                isActive ? 'text-indigo-900 dark:text-indigo-200 font-medium' : 'text-gray-700 dark:text-gray-300'
              )}>
                {item.label}
              </span>
              {item.highlight && (
                <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs">
                  New
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t dark:border-gray-800 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onPageChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all',
                'hover:bg-indigo-50 dark:hover:bg-indigo-950/30',
                isActive && 'bg-indigo-50 dark:bg-indigo-950/30'
              )}
            >
              <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
