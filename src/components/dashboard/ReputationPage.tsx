import { 
  Star, 
  TrendingUp, 
  TrendingDown,
  MessageSquare, 
  ThumbsUp, 
  Filter, 
  ChevronDown,
  ChevronRight,
  X, 
  Check,
  Calendar,
  MapPin,
  Plus,
  Search,
  Download,
  Users,
  Eye,
  BarChart3,
  Share2,
  MoreHorizontal,
  FileDown,
  ExternalLink,
  Info,
  Mail,
  Phone as PhoneIcon,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MetricCard } from '../MetricCard';
import { TrendChart } from '../charts/TrendChart';
import { RadarChart as CustomRadarChart } from '../charts/RadarChart';
import { ReviewSourcesChart } from '../charts/ReviewSourcesChart';
import { RegionMap } from '../charts/RegionMap';
// Updated to use new chart with legend
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ComposedChart,
  Line,
  LineChart,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import {
  mockMetrics,
  ratingTrend,
  branchComparisonData,
  serviceAreasComparison,
  performanceHeatmap,
  commentsData,
  topicsData,
  roomTypes,
  reviewerTypes,
  sentimentDistribution,
  reviewSourceData,
  mentionsByRegion,
} from '../../lib/mockData';
import { cn } from '../ui/utils';
import { Button } from '../ui/button';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { Calendar as CalendarComponent } from '../ui/calendar';
import { Separator } from '../ui/separator';
import type { DateRange } from 'react-day-picker@8.10.1';
import { ScrollArea } from '../ui/scroll-area';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Checkbox } from '../ui/checkbox';
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

export function ReputationPage() {
  // Global filters state
  const [selectedBranches, setSelectedBranches] = useState<string[]>([]);
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedReviewerTypes, setSelectedReviewerTypes] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('30d');
  const [dateRange, setDateRange] = useState<any>(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [showMoreMetrics, setShowMoreMetrics] = useState(false);
  
  // Temporary filters (before applying)
  const [tempBranches, setTempBranches] = useState<string[]>([]);
  const [tempRoomTypes, setTempRoomTypes] = useState<string[]>([]);
  const [tempReviewerTypes, setTempReviewerTypes] = useState<string[]>([]);
  const [tempTimeRange, setTempTimeRange] = useState('30d');
  const [customDateRange, setCustomDateRange] = useState<DateRange | undefined>(undefined);

  // Comments tab
  const [activeCommentsTab, setActiveCommentsTab] = useState('recent');
  
  // Selected branches for comparison
  const [comparisonBranches, setComparisonBranches] = useState<string[]>([
    'Grand Hotel Downtown',
    'Seaside Resort & Spa',
  ]);

  // Add Branch Dialog
  const [addBranchDialogOpen, setAddBranchDialogOpen] = useState(false);
  const [newBranchData, setNewBranchData] = useState({
    branch: '',
    location: '',
    rating: '',
    nps: '',
    reviews: '',
    sentiment: '',
    trend: '',
    color: '#4F46E5',
    engagement: '',
    responseRate: '',
    contactPhone: '',
    contactEmail: '',
  });

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'negative': return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    // Return platform-specific styling
    return platform;
  };

  const toggleBranch = (branch: string) => {
    setTempBranches(prev =>
      prev.includes(branch) ? prev.filter(b => b !== branch) : [...prev, branch]
    );
  };

  const toggleRoomType = (type: string) => {
    setTempRoomTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const toggleReviewerType = (type: string) => {
    setTempReviewerTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const applyFilters = () => {
    setSelectedBranches(tempBranches);
    setSelectedRoomTypes(tempRoomTypes);
    setSelectedReviewerTypes(tempReviewerTypes);
    setTimeRange(tempTimeRange);
    setFilterOpen(false);
  };

  const clearFilters = () => {
    setSelectedBranches([]);
    setSelectedRoomTypes([]);
    setSelectedReviewerTypes([]);
    setTimeRange('30d');
    setTempBranches([]);
    setTempRoomTypes([]);
    setTempReviewerTypes([]);
    setTempTimeRange('30d');
  };

  const handleFilterOpenChange = (open: boolean) => {
    if (open) {
      setTempBranches(selectedBranches);
      setTempRoomTypes(selectedRoomTypes);
      setTempReviewerTypes(selectedReviewerTypes);
      setTempTimeRange(timeRange);
    }
    setFilterOpen(open);
  };

  const activeFilterCount = selectedBranches.length + selectedRoomTypes.length + selectedReviewerTypes.length;

  // Filter comments based on search and active tab
  const filteredComments = commentsData.filter(comment => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        comment.comment.toLowerCase().includes(query) ||
        comment.author.toLowerCase().includes(query) ||
        comment.keywords.some(k => k.toLowerCase().includes(query))
      );
    }
    
    switch (activeCommentsTab) {
      case 'negative':
        return comment.sentiment === 'negative';
      case 'mentioned':
        return comment.keywords.length > 3;
      default:
        return true;
    }
  });

  const addComparisonBranch = () => {
    setAddBranchDialogOpen(true);
  };

  const handleAddBranch = () => {
    // Validate required fields
    if (!newBranchData.branch || !newBranchData.rating || !newBranchData.nps) {
      toast.error('Please fill in all required fields');
      return;
    }

    // In a real app, you would save this to your backend
    // For now, we'll just show a success message
    toast.success(`Branch "${newBranchData.branch}" added successfully!`);
    
    // Reset form and close dialog
    setNewBranchData({
      branch: '',
      location: '',
      rating: '',
      nps: '',
      reviews: '',
      sentiment: '',
      trend: '',
      color: '#4F46E5',
      engagement: '',
      responseRate: '',
      contactPhone: '',
      contactEmail: '',
    });
    setAddBranchDialogOpen(false);
  };

  const handleBranchInputChange = (field: string, value: string) => {
    setNewBranchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header with Global Filters */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 dark:text-white mb-1">Reviews</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive review monitoring and analysis across all platforms
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters} className="gap-2">
                <X className="w-4 h-4" />
                Clear ({activeFilterCount})
              </Button>
            )}
            
            <Popover open={filterOpen} onOpenChange={handleFilterOpenChange}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 px-1.5 min-w-[20px] h-5">
                      {activeFilterCount}
                    </Badge>
                  )}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end" className="w-[400px] p-0 border-gray-200 dark:border-gray-800">
                <div className="p-6">
                  <h2 className="text-xl mb-6">Filters</h2>

                  <div className="space-y-6">
                    {/* Date */}
                    <div className="space-y-2">
                      <Label className="text-sm">Date</Label>
                      <Select value={tempTimeRange} onValueChange={setTempTimeRange}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select date range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7d">Last 7 days</SelectItem>
                          <SelectItem value="30d">Last 30 days</SelectItem>
                          <SelectItem value="90d">Last 90 days</SelectItem>
                          <SelectItem value="thisMonth">This month</SelectItem>
                          <SelectItem value="lastMonth">Last month</SelectItem>
                          <SelectItem value="custom">Custom range</SelectItem>
                        </SelectContent>
                      </Select>
                      
                      {/* Custom Date Range Picker */}
                      {tempTimeRange === 'custom' && (
                        <motion.div 
                          className="mt-3 -mx-3 p-3 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-950"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-center">
                            <CalendarComponent
                              mode="range"
                              selected={customDateRange}
                              onSelect={setCustomDateRange}
                              numberOfMonths={1}
                              className="rounded-md"
                            />
                          </div>
                          {customDateRange?.from && (
                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
                              <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {customDateRange.from.toLocaleDateString()} 
                                  {customDateRange.to && ` - ${customDateRange.to.toLocaleDateString()}`}
                                </span>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {/* Time Range */}
                    <div className="space-y-3">
                      <Label className="text-sm">Time Range</Label>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          type="time"
                          placeholder="From"
                          className="text-sm"
                        />
                        <Input
                          type="time"
                          placeholder="To"
                          className="text-sm"
                        />
                      </div>
                    </div>

                    {/* Location / Branch */}
                    <div className="space-y-2">
                      <Label className="text-sm">Location/Branch</Label>
                      <Select>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Filter by location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          {branchComparisonData.map((branch) => (
                            <SelectItem key={branch.branch} value={branch.branch.toLowerCase()}>
                              {branch.branch}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Room Type */}
                    <div className="space-y-3">
                      <Label className="text-sm">Room Type</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {roomTypes.map((type) => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox
                              id={type.toLowerCase()}
                              checked={tempRoomTypes.includes(type)}
                              onCheckedChange={() => toggleRoomType(type)}
                            />
                            <label
                              htmlFor={type.toLowerCase()}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {type}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-8">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-full"
                      onClick={() => {
                        setTempBranches([]);
                        setTempRoomTypes([]);
                        setTempReviewerTypes([]);
                        setTempTimeRange('30d');
                      }}
                    >
                      Clear all
                    </Button>
                    <Button
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full"
                      onClick={applyFilters}
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Comparison Mode Toggle */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800">
              <Switch
                id="comparison-mode"
                checked={comparisonMode}
                onCheckedChange={setComparisonMode}
              />
              <Label htmlFor="comparison-mode" className="cursor-pointer">
                Comparison Mode
              </Label>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs for Main Sections */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-gray-100 dark:bg-gray-900">
          <TabsTrigger value="overview">Total Views</TabsTrigger>
          <TabsTrigger value="branches">Branch Comparisons</TabsTrigger>
          <TabsTrigger value="comments">Comments Analysis</TabsTrigger>
        </TabsList>

        {/* SECTION C: Total Views Dashboard */}
        <TabsContent value="overview" className="space-y-6">
          {/* Summary Metrics */}
          <div>
            {/* View More/Less Button - Above Cards */}
            <div className="flex justify-end mb-3">
              <motion.button
                onClick={() => setShowMoreMetrics(!showMoreMetrics)}
                className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group"
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-sm font-medium">
                  {showMoreMetrics ? 'View Less' : 'View More Metrics'}
                </span>
                <motion.div
                  animate={{ rotate: showMoreMetrics ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="group-hover:translate-x-0.5 transition-transform"
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard
                title="Total Mentions"
                value="12,847"
                trend={15.2}
                icon={Eye}
                delay={0}
                infoTooltip="Total number of times your brand, property, or products have been mentioned across all connected platforms including social media, review sites, and news sources."
              />
              <MetricCard
                title="Engagement Rate"
                value="8.4%"
                trend={12.5}
                icon={TrendingUp}
                delay={0.1}
                infoTooltip="Percentage of total mentions that received interactions (likes, comments, shares). Higher rates indicate stronger audience engagement."
              />
              <MetricCard
                title="Review Volume"
                value="1,847"
                trend={18.3}
                icon={MessageSquare}
                delay={0.2}
                infoTooltip="Total count of customer reviews submitted across all review platforms in the selected time period."
              />
              <MetricCard
                title="Average Rating"
                value="4.6"
                trend={2.3}
                icon={Star}
                delay={0.3}
                infoTooltip="Mean rating score calculated from all customer reviews across platforms. Scale of 1-5 stars."
              />
            </div>

            {/* Expandable Additional Metrics */}
            <AnimatePresence>
              {showMoreMetrics && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                      title="NPS Score"
                      value="68"
                      trend={-3.1}
                      icon={ThumbsUp}
                      delay={0}
                      infoTooltip="Net Promoter Score: Percentage of promoters minus detractors. Measures customer loyalty and likelihood to recommend your brand. Score ranges from -100 to +100."
                    />
                    <MetricCard
                      title="Sentiment Score"
                      value="82%"
                      trend={5.7}
                      icon={ThumbsUp}
                      delay={0.1}
                      infoTooltip="Overall positive sentiment percentage based on AI analysis of review content and customer feedback tone."
                    />
                    <MetricCard
                      title="Response Rate"
                      value="94%"
                      trend={8.2}
                      icon={MessageSquare}
                      delay={0.2}
                      infoTooltip="Percentage of reviews and customer inquiries that received a response from your team. Higher rates improve customer satisfaction."
                    />
                    <MetricCard
                      title="Avg Response Time"
                      value="2.3h"
                      trend={-12.5}
                      icon={TrendingUp}
                      delay={0.3}
                      infoTooltip="Average time taken to respond to customer reviews and feedback. Lower values indicate better customer service responsiveness."
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Multi-Chart Canvas - Auto-Layout */}
          <AnimatePresence mode="wait">
            {!comparisonMode ? (
              <motion.div
                key="normal-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-wrap gap-6"
              >
                {/* Review Trends Over Time */}
                <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                  <div className="space-y-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base">Review Trends</h3>
                          <TooltipProvider delayDuration={100}>
                            <UITooltip>
                              <TooltipTrigger asChild>
                                <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                                  <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent className="max-w-xs">
                                <p className="text-sm">Tracks your average rating and sentiment trends over time to identify patterns and improvements in customer perception.</p>
                              </TooltipContent>
                            </UITooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Rating and sentiment over time</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="w-full h-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={ratingTrend}>
                          <defs>
                            <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#03C5C1" stopOpacity={0.4}/>
                              <stop offset="95%" stopColor="#03C5C1" stopOpacity={0.05}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                          <XAxis dataKey="date" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                          <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} domain={[3.5, 5]} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid #E5E7EB',
                              borderRadius: '8px',
                            }}
                          />
                          <Area 
                            type="monotone" 
                            dataKey="rating" 
                            stroke="#03C5C1" 
                            strokeWidth={2}
                            fillOpacity={1} 
                            fill="url(#colorRating)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </Card>

                {/* Review Source Distribution */}
                <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                  <div className="space-y-1 pb-6">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base">Review Sources</h3>
                      <TooltipProvider delayDuration={100}>
                        <UITooltip>
                          <TooltipTrigger asChild>
                            <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                              <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                            </button>
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Shows the breakdown of reviews across different platforms including Google, TripAdvisor, Booking.com, and direct sources.</p>
                          </TooltipContent>
                        </UITooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Distribution by platform</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <ReviewSourcesChart />
                  </div>
                </Card>

                {/* Engaged Audience */}
                <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                  <div className="space-y-1 pb-6">
                    <h3 className="text-base">Engaged Audience</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Most engaged audiences by country.</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <RegionMap data={mentionsByRegion} />
                  </div>
                </Card>

                {/* Activity Heatmap */}
                <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                  <div className="space-y-1 pb-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base">Activity Heatmap</h3>
                        <TooltipProvider delayDuration={100}>
                          <UITooltip>
                            <TooltipTrigger asChild>
                              <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                                <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs">
                              <p className="text-sm">Visualizes review activity patterns by day of week and time, helping identify peak engagement periods and optimal response times.</p>
                            </TooltipContent>
                          </UITooltip>
                        </TooltipProvider>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                      </Button>
                    </div>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Performance by time of day</p>
                  </div>
                  <div className="flex-1 overflow-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-800">
                          <th className="text-left py-2 px-3 text-[11px] text-gray-700 dark:text-gray-300">Day</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">6am</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">9am</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">12pm</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">3pm</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">6pm</th>
                          <th className="text-center py-2 px-2 text-[11px] text-gray-700 dark:text-gray-300">9pm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceHeatmap.map((row, idx) => (
                          <tr
                            key={idx}
                            className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900"
                          >
                            <td className="py-2 px-3 text-[11px] text-gray-900 dark:text-white">{row.day}</td>
                            {Object.entries(row).slice(1).map(([time, value], i) => {
                              const numValue = value as number;
                              const cellColor = cn(
                                'text-center py-1 px-2 rounded text-[10px]',
                                numValue >= 4.6 ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400' :
                                numValue >= 4.2 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400' :
                                'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
                              );
                              return (
                                <td key={i} className="py-2 px-2">
                                  <div className={cellColor}>
                                    {numValue}
                                  </div>
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                key="comparison-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Comparison Header */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900 dark:text-white mb-1">Branch Comparison Mode</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Comparing {comparisonBranches.length} locations side-by-side
                    </p>
                  </div>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-2"
                        disabled={comparisonBranches.length >= branchComparisonData.length}
                      >
                        <Plus className="w-4 h-4" />
                        Add Branch
                        {comparisonBranches.length >= branchComparisonData.length && (
                          <Badge variant="secondary" className="ml-1">All Added</Badge>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-[300px] p-0">
                      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                        <h4 className="text-gray-900 dark:text-white">Select Branch to Add</h4>
                        <p className="text-gray-500 dark:text-gray-400 mt-0.5">
                          Choose a location to compare
                        </p>
                      </div>
                      <ScrollArea className="max-h-[300px]">
                        <div className="p-2">
                          {branchComparisonData
                            .filter(branch => !comparisonBranches.includes(branch.branch))
                            .map((branch) => (
                              <button
                                key={branch.branch}
                                onClick={() => {
                                  setComparisonBranches([...comparisonBranches, branch.branch]);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: branch.color }}
                                  />
                                  <div className="text-left">
                                    <p className="text-gray-900 dark:text-white">{branch.branch}</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                      <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                        <Star className="w-3 h-3" />
                                        {branch.rating}
                                      </span>
                                      <span className="text-gray-400">•</span>
                                      <span className="text-gray-500 dark:text-gray-400">
                                        {branch.reviews} reviews
                                      </span>
                                    </div>
                                  </div>
                                </div>
                                <Plus className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
                              </button>
                            ))}
                          {branchComparisonData.filter(b => !comparisonBranches.includes(b.branch)).length === 0 && (
                            <div className="px-3 py-8 text-center">
                              <Check className="w-8 h-8 mx-auto text-green-600 mb-2" />
                              <p className="text-gray-600 dark:text-gray-400">
                                All branches added to comparison
                              </p>
                            </div>
                          )}
                        </div>
                      </ScrollArea>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Comparison Metrics Cards */}
                <AnimatePresence mode="popLayout">
                  <div className="flex flex-wrap gap-6">
                    {branchComparisonData
                      .filter(branch => comparisonBranches.includes(branch.branch))
                      .map((branch, index) => (
                        <motion.div
                          key={branch.branch}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                          transition={{ delay: index * 0.1 }}
                          layout
                        >
                          <Card 
                            className="relative overflow-hidden group rounded-xl"
                            style={{ borderTop: `4px solid ${branch.color}` }}
                          >
                            {/* Remove Button - Always visible when > 2 branches */}
                            {comparisonBranches.length > 2 && (
                              <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                  setComparisonBranches(
                                    comparisonBranches.filter(b => b !== branch.branch)
                                  );
                                }}
                                className="absolute top-4 right-4 z-10 w-7 h-7 rounded-full bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-300 dark:hover:border-red-800 transition-all group/btn"
                                title="Remove from comparison"
                              >
                                <X className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover/btn:text-red-600 dark:group-hover/btn:text-red-400" />
                              </motion.button>
                            )}
                            
                            <CardHeader className="pb-3">
                              <div className="flex items-center justify-between pr-6">
                                <CardTitle className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4" style={{ color: branch.color }} />
                                  {branch.branch}
                                </CardTitle>
                                <div className="flex items-center gap-1">
                                  {branch.trend > 0 ? (
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                  )}
                                  <span className={cn(
                                    branch.trend > 0 ? 'text-green-600' : 'text-red-600'
                                  )}>
                                    {Math.abs(branch.trend)}%
                                  </span>
                                </div>
                              </div>
                            </CardHeader>
                          <CardContent className="pt-0">
                            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                              <div>
                                <p className="text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                                <div className="flex items-center gap-1.5">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-gray-900 dark:text-white">{branch.rating}</span>
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400 mb-1">Reviews</p>
                                <span className="text-gray-900 dark:text-white">{branch.reviews}</span>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400 mb-1">Engagement</p>
                                <span className="text-gray-900 dark:text-white">{branch.engagement}</span>
                              </div>
                              <div>
                                <p className="text-gray-500 dark:text-gray-400 mb-1">Response Rate</p>
                                <span className="text-gray-900 dark:text-white">{branch.responseRate}</span>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </AnimatePresence>

                {/* Comparison Charts */}
                <div className="flex flex-wrap gap-6">
                  {/* Multi-Branch Rating Comparison */}
                  <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                    <div className="space-y-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base">Rating Comparison</h3>
                            <Badge variant="outline" className="gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              out of 5.0
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.success('Share link copied to clipboard')}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success('Exporting as PNG...')}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export as PNG
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Exporting as CSV...')}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Data (CSV)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Opening detailed view...')}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                See More Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400">Average customer ratings across locations</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-full -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={branchComparisonData.filter(b => comparisonBranches.includes(b.branch))}
                            margin={{ top: 5, right: 5, left: -15, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" opacity={0.3} />
                            <XAxis 
                              dataKey="branch" 
                              stroke="#6B7280"
                              angle={-12} 
                              textAnchor="end" 
                              height={60}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                            />
                            <YAxis 
                              stroke="#6B7280"
                              domain={[0, 5]} 
                              ticks={[0, 1, 2, 3, 4, 5]}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                              width={40}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              }}
                              cursor={{ fill: 'rgba(99, 102, 241, 0.1)' }}
                              formatter={(value: any, name: string, props: any) => [
                                <div key="tooltip" className="flex flex-col gap-1">
                                  <span className="flex items-center gap-1.5">
                                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                                    <span className="font-bold text-gray-900">{value.toFixed(1)}</span>
                                    <span className="text-gray-500">/ 5.0</span>
                                  </span>
                                  <span className="text-gray-600">
                                    {props.payload.reviews} reviews
                                  </span>
                                </div>
                              ]}
                              labelFormatter={(label) => <strong className="text-gray-900">{label}</strong>}
                            />
                            <Bar dataKey="rating" radius={[6, 6, 0, 0]} maxBarSize={60}>
                              {branchComparisonData.filter(b => comparisonBranches.includes(b.branch)).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>

                  {/* Review Volume Comparison */}
                  <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                    <div className="space-y-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base">Review Volume</h3>
                            <Badge variant="outline" className="gap-1">
                              {branchComparisonData
                                .filter(b => comparisonBranches.includes(b.branch))
                                .reduce((sum, b) => sum + b.reviews, 0)} total
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.success('Share link copied to clipboard')}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success('Exporting as PNG...')}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export as PNG
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Exporting as CSV...')}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Data (CSV)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Opening detailed view...')}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                See More Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400">Distribution across locations</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={branchComparisonData.filter(b => comparisonBranches.includes(b.branch))}
                              cx="50%"
                              cy="45%"
                              labelLine={{
                                stroke: '#6B7280',
                                strokeWidth: 1.5,
                              }}
                              label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                              outerRadius={70}
                              innerRadius={32}
                              fill="#8884d8"
                              dataKey="reviews"
                              paddingAngle={2}
                            >
                              {branchComparisonData
                                .filter(b => comparisonBranches.includes(b.branch))
                                .map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                    strokeWidth={2}
                                    stroke="#ffffff"
                                  />
                                ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              }}
                              formatter={(value: any, name: string, props: any) => [
                                <div key="tooltip" className="flex flex-col gap-1">
                                  <span className="font-bold text-gray-900">{value} reviews</span>
                                  <span className="text-gray-600">
                                    {((value / branchComparisonData
                                      .filter(b => comparisonBranches.includes(b.branch))
                                      .reduce((sum, b) => sum + b.reviews, 0)) * 100).toFixed(1)}% of total
                                  </span>
                                </div>
                              ]}
                              labelFormatter={(label) => <strong className="text-gray-900">{label}</strong>}
                            />
                            <Legend 
                              verticalAlign="bottom" 
                              height={40}
                              iconType="circle"
                              wrapperStyle={{ fontSize: '12px', paddingTop: '8px', fontWeight: 500 }}
                              formatter={(value, entry: any) => (
                                <span className="text-gray-700 dark:text-gray-300">
                                  {entry.payload.branch}
                                </span>
                              )}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>

                  {/* Engagement Rate Comparison */}
                  <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                    <div className="space-y-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base">Engagement Performance</h3>
                            <ThumbsUp className="w-4 h-4 text-cyan-500" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.success('Share link copied to clipboard')}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success('Exporting as PNG...')}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export as PNG
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Exporting as CSV...')}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Data (CSV)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Opening detailed view...')}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                See More Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400">Customer engagement rates across branches</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-full -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={branchComparisonData
                              .filter(b => comparisonBranches.includes(b.branch))
                              .map(b => ({ 
                                ...b, 
                                engagementValue: parseFloat(b.engagement.replace('%', ''))
                              }))}
                            margin={{ top: 5, right: 5, left: -15, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" opacity={0.3} />
                            <XAxis 
                              dataKey="branch" 
                              stroke="#6B7280"
                              angle={-12} 
                              textAnchor="end" 
                              height={60}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                            />
                            <YAxis 
                              stroke="#6B7280"
                              domain={[0, 100]}
                              ticks={[0, 25, 50, 75, 100]}
                              tickFormatter={(value) => `${value}%`}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                              width={40}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              }}
                              cursor={{ fill: 'rgba(6, 182, 212, 0.1)' }}
                              formatter={(value: any, name: string, props: any) => [
                                <div key="tooltip" className="flex flex-col gap-1">
                                  <span className="flex items-center gap-1.5">
                                    <ThumbsUp className="w-3.5 h-3.5 text-cyan-500" />
                                    <span className="font-bold text-gray-900">{value}%</span>
                                    <span className="text-gray-500">engagement</span>
                                  </span>
                                  <span className="text-gray-600">
                                    {props.payload.reviews} total reviews
                                  </span>
                                </div>
                              ]}
                              labelFormatter={(label) => <strong className="text-gray-900">{label}</strong>}
                            />
                            <Bar 
                              dataKey="engagementValue" 
                              fill="#06B6D4" 
                              radius={[6, 6, 0, 0]}
                              maxBarSize={60}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>

                  {/* Response Rate Comparison */}
                  <Card className="w-[580px] h-[360px] p-6 rounded-xl flex flex-col">
                    <div className="space-y-1 pb-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-base">Response Rates</h3>
                            <MessageSquare className="w-4 h-4 text-green-500" />
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => toast.success('Share link copied to clipboard')}
                          >
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => toast.success('Exporting as PNG...')}>
                                <FileDown className="mr-2 h-4 w-4" />
                                Export as PNG
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.success('Exporting as CSV...')}>
                                <Download className="mr-2 h-4 w-4" />
                                Export Data (CSV)
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => toast.info('Opening detailed view...')}>
                                <ExternalLink className="mr-2 h-4 w-4" />
                                See More Details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-[13px] text-gray-500 dark:text-gray-400">Response speed across branches</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full h-full -mx-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart 
                            data={branchComparisonData
                              .filter(b => comparisonBranches.includes(b.branch))
                              .map((b, idx) => ({ 
                                branch: b.branch, 
                                responseRateValue: parseFloat(b.responseRate.replace('%', '')),
                                color: b.color,
                                reviews: b.reviews,
                              }))}
                            margin={{ top: 5, right: 5, left: -15, bottom: 40 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" opacity={0.3} />
                            <XAxis 
                              dataKey="branch" 
                              stroke="#6B7280"
                              angle={-12} 
                              textAnchor="end" 
                              height={60}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                            />
                            <YAxis 
                              stroke="#6B7280"
                              domain={[0, 100]}
                              ticks={[0, 25, 50, 75, 100]}
                              tickFormatter={(value) => `${value}%`}
                              tick={{ fontSize: 12, fontWeight: 500 }}
                              width={40}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                                border: '1px solid #E5E7EB',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                              }}
                              cursor={{ fill: 'rgba(34, 197, 94, 0.1)' }}
                              formatter={(value: any, name: string, props: any) => [
                                <div key="tooltip" className="flex flex-col gap-1">
                                  <span className="flex items-center gap-1.5">
                                    <MessageSquare className="w-3.5 h-3.5 text-green-500" />
                                    <span className="font-bold text-gray-900">{value}%</span>
                                    <span className="text-gray-500">response rate</span>
                                  </span>
                                  <span className="text-gray-600">
                                    Out of {props.payload.reviews} reviews
                                  </span>
                                </div>
                              ]}
                              labelFormatter={(label) => <strong className="text-gray-900">{label}</strong>}
                            />
                            <Bar dataKey="responseRateValue" radius={[6, 6, 0, 0]} maxBarSize={60}>
                              {branchComparisonData
                                .filter(b => comparisonBranches.includes(b.branch))
                                .map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </TabsContent>

        {/* SECTION A: Branch Comparisons */}
        <TabsContent value="branches" className="space-y-6">
          {/* Branch Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {branchComparisonData.map((branch) => (
              <motion.div
                key={branch.branch}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  style={{
                    borderTop: `4px solid ${branch.color}`,
                  }}
                >
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{branch.branch}</span>
                      <div className="flex items-center gap-1">
                        {branch.trend > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={cn(
                          branch.trend > 0 ? 'text-green-600' : 'text-red-600'
                        )}>
                          {Math.abs(branch.trend)}%
                        </span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Rating</p>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-900 dark:text-white">{branch.rating}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">NPS</p>
                        <p className="text-gray-900 dark:text-white">{branch.nps}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Reviews</p>
                        <p className="text-gray-900 dark:text-white">{branch.reviews.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400 mb-1">Sentiment</p>
                        <p className="text-gray-900 dark:text-white">{branch.sentiment}%</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            
            {/* Add Branch Card */}
            {comparisonBranches.length < branchComparisonData.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="h-full border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-500 transition-colors cursor-pointer flex items-center justify-center"
                  onClick={addComparisonBranch}
                >
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Plus className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-2" />
                    <p className="text-gray-600 dark:text-gray-400">Add Branch</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Comparison Charts - Auto-layout */}
          <div className="flex flex-wrap gap-6 px-6">
            {/* Rating vs NPS Comparison */}
            <Card className="w-[580px] h-[360px] p-6 rounded-xl bg-white dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  {/* Header - fixed position */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 dark:text-white mb-1.5">Rating vs NPS by Branch</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Performance comparison across locations</p>
                  </div>
                  
                  {/* Chart area - aligned to bottom */}
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart data={branchComparisonData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                        <XAxis 
                          dataKey="branch" 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '11px' }}
                          angle={-15}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                          }}
                        />
                        <Legend />
                        <Bar dataKey="rating" fill="#4F46E5" radius={[8, 8, 0, 0]} name="Rating" />
                        <Line 
                          type="monotone" 
                          dataKey="nps" 
                          stroke="#06B6D4" 
                          strokeWidth={3}
                          name="NPS"
                          dot={{ fill: '#06B6D4', r: 5 }}
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

            {/* Service Areas Radar */}
            <Card className="w-[580px] h-[360px] p-6 rounded-xl bg-white dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  {/* Header - fixed position */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 dark:text-white mb-1.5">Service Areas Comparison</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Performance across key service metrics</p>
                  </div>
                  
                  {/* Chart area - aligned to bottom */}
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={serviceAreasComparison}>
                        <PolarGrid stroke="#E5E7EB" />
                        <PolarAngleAxis dataKey="area" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <PolarRadiusAxis stroke="#9CA3AF" style={{ fontSize: '10px' }} />
                        <Radar 
                          name="Grand Hotel Downtown" 
                          dataKey="Grand Hotel Downtown" 
                          stroke="#4F46E5" 
                          fill="#4F46E5" 
                          fillOpacity={0.3} 
                        />
                        <Radar 
                          name="Seaside Resort & Spa" 
                          dataKey="Seaside Resort & Spa" 
                          stroke="#06B6D4" 
                          fill="#06B6D4" 
                          fillOpacity={0.3} 
                        />
                        <Radar 
                          name="City Center Boutique" 
                          dataKey="City Center Boutique" 
                          stroke="#8B5CF6" 
                          fill="#8B5CF6" 
                          fillOpacity={0.3} 
                        />
                        <Legend />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
          </div>
        </TabsContent>

        {/* SECTION B: Comments Analysis */}
        <TabsContent value="comments" className="space-y-6">
          {/* Sentiment and Topics - Auto-layout */}
          <div className="flex flex-wrap gap-6 px-6">
            {/* Sentiment Overview */}
            <Card className="w-[380px] h-[360px] p-6 rounded-xl bg-white dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  {/* Header - fixed position */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 dark:text-white mb-1.5">Sentiment Split</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Overall sentiment distribution</p>
                  </div>
                  
                  {/* Chart area - aligned to bottom */}
                  <div className="flex-1 min-h-0 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sentimentDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>

            {/* Most Mentioned Topics */}
            <Card className="w-[580px] h-[360px] p-6 rounded-xl bg-white dark:bg-slate-800 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                <div className="flex flex-col h-full">
                  {/* Header - fixed position */}
                  <div className="mb-6">
                    <h3 className="text-gray-900 dark:text-white mb-1.5">Most Mentioned Topics</h3>
                    <p className="text-[13px] text-gray-500 dark:text-gray-400">Frequency of topics in reviews</p>
                  </div>
                  
                  {/* Chart area - aligned to bottom */}
                  <div className="flex-1 min-h-0">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={topicsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                        <XAxis type="number" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                        <YAxis 
                          dataKey="topic" 
                          type="category" 
                          stroke="#9CA3AF" 
                          style={{ fontSize: '12px' }}
                          width={120}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #E5E7EB',
                            borderRadius: '8px',
                          }}
                        />
                        <Bar 
                          dataKey="count" 
                          radius={[0, 8, 8, 0]}
                        >
                          {topicsData.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={
                                entry.sentiment === 'positive' ? '#10B981' :
                                entry.sentiment === 'negative' ? '#EF4444' :
                                '#6B7280'
                              }
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
          </div>

          {/* Comments Stream */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Comment Stream</CardTitle>
                  <CardDescription>Guest feedback and reviews</CardDescription>
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search comments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeCommentsTab} onValueChange={setActiveCommentsTab}>
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="mentioned">Most Mentioned</TabsTrigger>
                  <TabsTrigger value="negative">Negative Focus</TabsTrigger>
                </TabsList>

                <TabsContent value={activeCommentsTab} className="mt-4">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="space-y-4">
                      {filteredComments.map((comment) => (
                        <motion.div
                          key={comment.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all cursor-pointer group"
                        >
                          <div className="flex items-start gap-4">
                            <div 
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white flex-shrink-0"
                            >
                              {comment.initials}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-3">
                                  <p className="text-gray-900 dark:text-white">{comment.author}</p>
                                  <div className="flex">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                      <Star
                                        key={i}
                                        className={cn(
                                          'w-3 h-3',
                                          i < comment.rating
                                            ? 'fill-yellow-400 text-yellow-400'
                                            : 'text-gray-300 dark:text-gray-600'
                                        )}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getSentimentColor(comment.sentiment)}>
                                    {comment.sentiment}
                                  </Badge>
                                  <Badge variant="outline">{comment.platform}</Badge>
                                </div>
                              </div>
                              <p className="text-gray-600 dark:text-gray-400 mb-2 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
                                {comment.comment}
                              </p>
                              <div className="flex items-center gap-2 flex-wrap">
                                {comment.keywords.map((keyword, idx) => (
                                  <Badge 
                                    key={idx} 
                                    variant="secondary"
                                    className="text-[11px] bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"
                                  >
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                              <p className="text-gray-400 dark:text-gray-600 mt-2">{comment.date}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Branch Dialog */}
      <Dialog open={addBranchDialogOpen} onOpenChange={setAddBranchDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] p-0 gap-0">
          <div className="p-6 space-y-4 border-b border-gray-200 dark:border-gray-800">
            <DialogHeader className="p-0 space-y-2">
              <DialogTitle>Add New Branch</DialogTitle>
              <DialogDescription>
                Enter the details of the new hotel branch to add to your comparison dashboard.
              </DialogDescription>
            </DialogHeader>
          </div>
          
          <ScrollArea className="flex-1 max-h-[calc(85vh-180px)]">
            <div className="p-6 space-y-6">
            {/* Branch Name */}
            <div className="grid gap-2">
              <Label htmlFor="branch-name" className="flex items-center gap-2">
                Branch Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="branch-name"
                placeholder="e.g., Downtown Plaza Hotel"
                value={newBranchData.branch}
                onChange={(e) => handleBranchInputChange('branch', e.target.value)}
              />
            </div>

            {/* Location */}
            <div className="grid gap-2">
              <Label htmlFor="location" className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                Location
              </Label>
              <Input
                id="location"
                placeholder="e.g., Downtown Dubai, UAE"
                value={newBranchData.location}
                onChange={(e) => handleBranchInputChange('location', e.target.value)}
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contactPhone" className="flex items-center gap-2">
                  <PhoneIcon className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Contact Phone
                </Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  placeholder="+971 4 123 4567"
                  value={newBranchData.contactPhone}
                  onChange={(e) => handleBranchInputChange('contactPhone', e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contactEmail" className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  Contact Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="info@hotel.com"
                  value={newBranchData.contactEmail}
                  onChange={(e) => handleBranchInputChange('contactEmail', e.target.value)}
                />
              </div>
            </div>

            <Separator />

            {/* Performance Metrics Header */}
            <div className="pt-2">
              <h4 className="text-gray-900 dark:text-white mb-1">Performance Metrics</h4>
              <p className="text-gray-500 dark:text-gray-400">Enter the current performance data for this branch</p>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Rating */}
              <div className="grid gap-2">
                <Label htmlFor="rating" className="flex items-center gap-2">
                  Rating (1-5) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                  value={newBranchData.rating}
                  onChange={(e) => handleBranchInputChange('rating', e.target.value)}
                />
              </div>

              {/* NPS Score */}
              <div className="grid gap-2">
                <Label htmlFor="nps" className="flex items-center gap-2">
                  NPS Score (0-100) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="nps"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="72"
                  value={newBranchData.nps}
                  onChange={(e) => handleBranchInputChange('nps', e.target.value)}
                />
              </div>

              {/* Reviews Count */}
              <div className="grid gap-2">
                <Label htmlFor="reviews">Total Reviews</Label>
                <Input
                  id="reviews"
                  type="number"
                  min="0"
                  placeholder="3200"
                  value={newBranchData.reviews}
                  onChange={(e) => handleBranchInputChange('reviews', e.target.value)}
                />
              </div>

              {/* Sentiment */}
              <div className="grid gap-2">
                <Label htmlFor="sentiment">Sentiment (%)</Label>
                <Input
                  id="sentiment"
                  type="number"
                  min="0"
                  max="100"
                  placeholder="85"
                  value={newBranchData.sentiment}
                  onChange={(e) => handleBranchInputChange('sentiment', e.target.value)}
                />
              </div>

              {/* Trend */}
              <div className="grid gap-2">
                <Label htmlFor="trend">Trend (%)</Label>
                <Input
                  id="trend"
                  type="number"
                  step="0.1"
                  placeholder="5.2"
                  value={newBranchData.trend}
                  onChange={(e) => handleBranchInputChange('trend', e.target.value)}
                />
              </div>

              {/* Engagement Rate */}
              <div className="grid gap-2">
                <Label htmlFor="engagement">Engagement Rate</Label>
                <Input
                  id="engagement"
                  placeholder="8.4%"
                  value={newBranchData.engagement}
                  onChange={(e) => handleBranchInputChange('engagement', e.target.value)}
                />
              </div>

              {/* Response Rate */}
              <div className="grid gap-2">
                <Label htmlFor="responseRate">Response Rate</Label>
                <Input
                  id="responseRate"
                  placeholder="94%"
                  value={newBranchData.responseRate}
                  onChange={(e) => handleBranchInputChange('responseRate', e.target.value)}
                />
              </div>

              {/* Branch Color */}
              <div className="grid gap-2">
                <Label htmlFor="color">Branch Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={newBranchData.color}
                    onChange={(e) => handleBranchInputChange('color', e.target.value)}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={newBranchData.color}
                    onChange={(e) => handleBranchInputChange('color', e.target.value)}
                    placeholder="#4F46E5"
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Quick Color Presets */}
            <div className="grid gap-2">
              <Label>Quick Color Presets</Label>
              <div className="flex gap-2">
                {[
                  { name: 'Indigo', value: '#4F46E5' },
                  { name: 'Cyan', value: '#06B6D4' },
                  { name: 'Purple', value: '#8B5CF6' },
                  { name: 'Green', value: '#10B981' },
                  { name: 'Amber', value: '#F59E0B' },
                  { name: 'Rose', value: '#F43F5E' },
                ].map((preset) => (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => handleBranchInputChange('color', preset.value)}
                    className={cn(
                      "w-10 h-10 rounded-lg border-2 transition-all hover:scale-110",
                      newBranchData.color === preset.value 
                        ? "border-gray-900 dark:border-white ring-2 ring-offset-2 ring-gray-900 dark:ring-white" 
                        : "border-gray-300 dark:border-gray-700"
                    )}
                    style={{ backgroundColor: preset.value }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>
            </div>
          </ScrollArea>

          <div className="p-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setAddBranchDialogOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleAddBranch}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Add Branch
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
