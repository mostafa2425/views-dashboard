import { Bell, Download, Globe, Moon, Search, Sun, AlertCircle, TrendingUp, MessageSquare, Star, CheckCheck, Building2, MapPin, ChevronDown, Check, BarChart3, Users, TrendingDown, Settings, FileText, Lightbulb, Clock, ArrowRight, Plus, Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useTheme } from '../../lib/theme-context';
import { branches, properties } from '../../lib/mockData';
import { UserAccountDropdown } from './UserAccountDropdown';
import viewsLogo from 'figma:asset/73ae0d346cd52d4c6526ca6ff8822a18e7f5546b.png';
import marriottLogo from 'figma:asset/09b4f104b20c38a8d54fdb172a057bc78b7366de.png';
import { ScrollArea } from '../ui/scroll-area';
import { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command';
import { toast } from 'sonner@2.0.3';

interface HeaderProps {
  selectedBranch: string;
  onBranchChange: (branch: string) => void;
  onNavigate: (page: string) => void;
}

export function Header({ selectedBranch, onBranchChange, onNavigate }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [propertyList, setPropertyList] = useState(properties);
  const [propertyDropdownOpen, setPropertyDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [logoDialogOpen, setLogoDialogOpen] = useState(false);
  const [partnerLogo, setPartnerLogo] = useState(marriottLogo);
  const [isDragging, setIsDragging] = useState(false);
  
  const selectedProperty = propertyList.find(p => p.selected) || propertyList[0];
  const totalLocations = propertyList.length;
  
  const groupedProperties = propertyList.reduce((acc, property) => {
    if (!acc[property.city]) {
      acc[property.city] = [];
    }
    acc[property.city].push(property);
    return acc;
  }, {} as Record<string, typeof propertyList>);

  const handlePropertySelect = (propertyId: number) => {
    setPropertyList(propertyList.map(p => ({
      ...p,
      selected: p.id === propertyId
    })));
    setPropertyDropdownOpen(false);
  };

  // Keyboard shortcut for search (Cmd/Ctrl + K)
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setSearchOpen((open) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const handleSearchSelect = (callback: () => void) => {
    setSearchOpen(false);
    callback();
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Negative Review Alert',
      message: 'New 1-star review at Grand Hotel Downtown',
      time: '5 min ago',
      unread: true,
      icon: AlertCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-950/30'
    },
    {
      id: 2,
      type: 'success',
      title: 'Rating Improved',
      message: 'Seaside Resort rating increased to 4.8',
      time: '1 hour ago',
      unread: true,
      icon: TrendingUp,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-950/30'
    },
    {
      id: 3,
      type: 'message',
      title: 'New Comment Response',
      message: 'Customer replied to your response',
      time: '3 hours ago',
      unread: true,
      icon: MessageSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-950/30'
    },
    {
      id: 4,
      type: 'review',
      title: '5-Star Review Received',
      message: 'Guest loved their stay at Mountain Lodge',
      time: '5 hours ago',
      unread: false,
      icon: Star,
      color: 'text-yellow-600 dark:text-yellow-400',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/30'
    },
    {
      id: 5,
      type: 'alert',
      title: 'Response Time Alert',
      message: '3 reviews pending response for 48+ hours',
      time: '1 day ago',
      unread: false,
      icon: AlertCircle,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-50 dark:bg-orange-950/30'
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, unread: false } : n
    ));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPartnerLogo(event.target.result as string);
          setLogoDialogOpen(false);
          toast.success('Partner logo updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('File size must be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPartnerLogo(event.target.result as string);
          setLogoDialogOpen(false);
          toast.success('Partner logo updated successfully!');
        }
      };
      reader.readAsDataURL(file);
    } else {
      toast.error('Please upload an image file (PNG, JPG, or SVG)');
    }
  };

  const resetLogo = () => {
    setPartnerLogo(marriottLogo);
    setLogoDialogOpen(false);
    toast.info('Partner logo reset to default');
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-gradient-to-r from-indigo-50 to-cyan-50 dark:from-indigo-950/50 dark:to-cyan-950/50 backdrop-blur-lg dark:border-indigo-900/50 border-indigo-100/50 h-[80px]">
      <div className="flex items-center justify-between px-6 h-full">
        {/* Left: Logo & Branch Selector */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4">
            {/* Views Logo */}
            <img 
              src={viewsLogo} 
              alt="Views Analytics" 
              className="h-[50px] w-[50px] object-contain mix-blend-multiply dark:mix-blend-screen"
            />
            <div>
              <h1 className="font-bold text-gray-900 dark:text-white">Views</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Analytics</p>
            </div>
            
            {/* Partner Logo Separator */}
            <div className="mx-1 h-12 w-px bg-gray-300 dark:bg-gray-600" />
            
            {/* Partner Hotel Logo */}
            <div className="relative group">
              <div 
                className="h-20 w-20 bg-contain bg-center bg-no-repeat mix-blend-darken dark:mix-blend-lighten"
                style={{ backgroundImage: `url(${partnerLogo})` }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setLogoDialogOpen(true)}
                className="absolute -bottom-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 border-2 border-indigo-500 dark:border-indigo-400 shadow-md z-10"
              >
                <Plus className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
              </Button>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200 dark:bg-gray-700" />

          <Popover open={propertyDropdownOpen} onOpenChange={setPropertyDropdownOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={propertyDropdownOpen}
                className="w-[280px] justify-between border-none bg-white/60 dark:bg-gray-900/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/50"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="truncate">{selectedProperty.name}</span>
                </div>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[520px] p-0" align="start">
              <div className="border-b border-gray-200 dark:border-gray-800 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Building2 className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    Select Property ({totalLocations} locations)
                  </h3>
                </div>
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="p-2">
                  {Object.entries(groupedProperties).map(([city, cityProperties]) => (
                    <div key={city} className="mb-4">
                      <div className="px-3 py-2">
                        <h4 className="text-sm text-gray-500 dark:text-gray-400">{city}</h4>
                      </div>
                      {cityProperties.map((property) => (
                        <button
                          key={property.id}
                          onClick={() => handlePropertySelect(property.id)}
                          className="w-full p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 flex items-start gap-3 text-left transition-colors"
                        >
                          <div className="w-12 h-12 rounded-lg bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center flex-shrink-0">
                            <Building2 className="w-6 h-6 text-white" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium text-gray-900 dark:text-white">
                                {property.name}
                              </h5>
                              {property.selected && (
                                <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{property.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-3 text-sm">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-gray-900 dark:text-white">{property.rating}</span>
                              </div>
                              <span className="text-gray-500 dark:text-gray-400">•</span>
                              <span className="text-gray-600 dark:text-gray-400">{property.rooms} rooms</span>
                              <span className="text-gray-500 dark:text-gray-400">•</span>
                              <Badge variant="secondary" className="bg-gray-900 text-white dark:bg-white dark:text-gray-900 text-xs px-2 py-0 h-5">
                                {property.status}
                              </Badge>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>
        </div>

        {/* Center: Search */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-3 px-4 py-2 rounded-lg border border-indigo-200 dark:border-indigo-900/50 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-colors group"
          >
            <Search className="w-4 h-4" />
            <span className="flex-1 text-left">Search metrics, reviews, insights...</span>
            <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>

        {/* Search Command Dialog */}
        <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
          <DialogContent className="p-0 max-w-2xl gap-0 overflow-hidden">
            <DialogTitle className="sr-only">Search</DialogTitle>
            <DialogDescription className="sr-only">
              Search for pages, metrics, properties, and more. Use arrow keys to navigate and Enter to select.
            </DialogDescription>
            <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-gray-500 dark:[&_[cmdk-group-heading]]:text-gray-400 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
              <CommandInput placeholder="Type to search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                
                <CommandGroup heading="Quick Actions">
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('dashboard'))}>
                    <BarChart3 className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Dashboard Overview</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('reputation'))}>
                    <Star className="mr-2 h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span>Reviews</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('social'))}>
                    <MessageSquare className="mr-2 h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                    <span>Social Media</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('competitors'))}>
                    <TrendingDown className="mr-2 h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <span>Competitor Analysis</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('operations'))}>
                    <Users className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                    <span>Operations</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('ai-insights'))}>
                    <Lightbulb className="mr-2 h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span>AI Insights</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('reports'))}>
                    <FileText className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span>Reports</span>
                  </CommandItem>
                  <CommandItem onSelect={() => handleSearchSelect(() => onNavigate('settings'))}>
                    <Settings className="mr-2 h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <span>Settings</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Recent Searches">
                  <CommandItem>
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Negative reviews last week</span>
                  </CommandItem>
                  <CommandItem>
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Grand Hotel Downtown sentiment</span>
                  </CommandItem>
                  <CommandItem>
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    <span>Competitor ratings comparison</span>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Metrics">
                  <CommandItem>
                    <TrendingUp className="mr-2 h-4 w-4 text-green-600" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Overall Rating</span>
                      <Badge variant="secondary" className="ml-2">4.6</Badge>
                    </div>
                  </CommandItem>
                  <CommandItem>
                    <Star className="mr-2 h-4 w-4 text-yellow-600" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Total Reviews</span>
                      <Badge variant="secondary" className="ml-2">12,847</Badge>
                    </div>
                  </CommandItem>
                  <CommandItem>
                    <TrendingUp className="mr-2 h-4 w-4 text-cyan-600" />
                    <div className="flex items-center justify-between flex-1">
                      <span>NPS Score</span>
                      <Badge variant="secondary" className="ml-2">68</Badge>
                    </div>
                  </CommandItem>
                  <CommandItem>
                    <MessageSquare className="mr-2 h-4 w-4 text-indigo-600" />
                    <div className="flex items-center justify-between flex-1">
                      <span>Sentiment Score</span>
                      <Badge variant="secondary" className="ml-2">82%</Badge>
                    </div>
                  </CommandItem>
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Properties">
                  {propertyList.slice(0, 4).map((property) => (
                    <CommandItem key={property.id} onSelect={() => handleSearchSelect(() => handlePropertySelect(property.id))}>
                      <Building2 className="mr-2 h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                      <div className="flex items-center justify-between flex-1">
                        <div className="flex flex-col">
                          <span>{property.name}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{property.location}</span>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm">{property.rating}</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </DialogContent>
        </Dialog>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <>
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full" />
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 min-w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {unreadCount}
                    </Badge>
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px] p-0">
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
                <div>
                  <DropdownMenuLabel className="p-0">Notifications</DropdownMenuLabel>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-xs gap-1.5"
                    onClick={markAllAsRead}
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </Button>
                )}
              </div>
              
              <ScrollArea className="h-[400px]">
                <div className="p-2">
                  {notifications.map((notification) => {
                    const Icon = notification.icon;
                    return (
                      <DropdownMenuItem
                        key={notification.id}
                        className="p-3 cursor-pointer focus:bg-gray-50 dark:focus:bg-gray-900 rounded-lg mb-1"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div className="flex gap-3 w-full">
                          <div className={`w-10 h-10 rounded-full ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 ${notification.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </h4>
                              {notification.unread && (
                                <span className="w-2 h-2 bg-indigo-600 rounded-full flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                              {notification.message}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    );
                  })}
                </div>
              </ScrollArea>
              
              <div className="border-t border-gray-200 dark:border-gray-800 p-2">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center text-sm"
                  onClick={() => onNavigate('notifications')}
                >
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Globe className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>العربية</DropdownMenuItem>
              <DropdownMenuItem>Español</DropdownMenuItem>
              <DropdownMenuItem>Français</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>

          <UserAccountDropdown onNavigate={onNavigate} />
        </div>
      </div>

      {/* Logo Upload Dialog */}
      <Dialog open={logoDialogOpen} onOpenChange={setLogoDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>Change Partner Logo</DialogTitle>
          <DialogDescription>
            Upload a new logo or replace the existing one. Recommended size: 200x200px (PNG or JPG)
          </DialogDescription>
          
          <div className="space-y-4 mt-4">
            {/* Current Logo Preview */}
            <div className="flex flex-col items-center gap-3 p-4 border rounded-lg bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400">Current Logo</p>
              <div 
                className="h-24 w-24 bg-contain bg-center bg-no-repeat mix-blend-darken dark:mix-blend-lighten"
                style={{ backgroundImage: `url(${partnerLogo})` }}
              />
            </div>

            {/* Upload Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                isDragging 
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/20' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500'
              }`}
            >
              <input
                type="file"
                id="logo-upload"
                accept="image/*"
                onChange={handleLogoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="space-y-2">
                <Upload className="w-10 h-10 mx-auto text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    PNG, JPG or SVG (max. 2MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <Button
                variant="outline"
                onClick={resetLogo}
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                Reset to Default
              </Button>
              <Button
                onClick={() => setLogoDialogOpen(false)}
                className="flex-1"
              >
                Done
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
