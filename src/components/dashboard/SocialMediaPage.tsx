import { Share2, Heart, MessageCircle, TrendingUp, Users, Info, Smile, Shield, Sparkles, Zap, Frown, Angry, MoreHorizontal, FileDown, Download, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { MetricCard } from '../MetricCard';
import { RadarChart } from '../charts/RadarChart';
import { Badge } from '../ui/badge';
import { motion } from 'motion/react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import {
  platformEngagement,
  socialMediaEngagement,
  emotionAnalysis,
  influencerLeaderboard,
} from '../../lib/mockData';
import { cn } from '../ui/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { toast } from 'sonner';
import { getPlatformLogo, getSocialPlatformLogo } from '../PlatformLogos';

export function SocialMediaPage() {
  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'Joy':
        return <Smile className="w-5 h-5 text-yellow-500" />;
      case 'Trust':
        return <Shield className="w-5 h-5 text-blue-500" />;
      case 'Anticipation':
        return <Sparkles className="w-5 h-5 text-purple-500" />;
      case 'Surprise':
        return <Zap className="w-5 h-5 text-orange-500" />;
      case 'Sadness':
        return <Frown className="w-5 h-5 text-gray-500" />;
      case 'Anger':
        return <Angry className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getEmotionEmoji = (emotion: string) => {
    switch (emotion) {
      case 'Joy':
        return '😊';
      case 'Trust':
        return '🛡️';
      case 'Anticipation':
        return '✨';
      case 'Surprise':
        return '⚡';
      case 'Sadness':
        return '😔';
      case 'Anger':
        return '😠';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-gray-900 dark:text-white mb-1">Social Media Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Track engagement, reach, and sentiment across all social platforms</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Followers"
          value="182K"
          trend={12.8}
          icon={Users}
          infoTooltip="Combined follower count across all connected social media platforms including Instagram, Facebook, Twitter, LinkedIn, and TikTok."
        />
        <MetricCard
          title="Engagement Rate"
          value="7.2%"
          trend={5.3}
          icon={Heart}
          infoTooltip="Average engagement rate across all social platforms. Calculated as (likes + comments + shares) / total reach × 100."
        />
        <MetricCard
          title="Total Mentions"
          value="3,847"
          trend={18.5}
          icon={MessageCircle}
          infoTooltip="Number of times your brand has been mentioned on social media platforms, including direct tags and hashtags."
        />
        <MetricCard
          title="Share of Voice"
          value="35%"
          trend={-2.1}
          icon={Share2}
          infoTooltip="Your brand's percentage of total social media conversations in your industry compared to competitors. Higher percentage indicates stronger market presence."
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Engagement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Engagement by Platform</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Comparison of total engagement (likes, comments, shares, saves) across all social media platforms.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Total engagement across social channels</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformEngagement}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" opacity={0.3} />
                  <XAxis dataKey="platform" stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: '12px' }} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="engagement" 
                    fill="url(#gradient-bar)" 
                    radius={[8, 8, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="gradient-bar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#06B6D4" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emotion Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Emotion Analysis</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">AI-powered emotion detection analyzing the emotional tone of social media conversations about your brand across six key emotions.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Emotional sentiment from social conversations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] mb-4">
                <RadarChart data={emotionAnalysis} />
              </div>
              {/* Emotion Legend with Icons */}
              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                {emotionAnalysis.map((item) => (
                  <div key={item.emotion} className="flex items-center gap-2">
                    <span className="text-2xl">{getEmotionEmoji(item.emotion)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{item.emotion}</span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.value}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Influencer Leaderboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Top Influencers</CardTitle>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                          <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Top social media influencers and content creators who have mentioned your brand, ranked by engagement rate and reach.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>Most influential accounts mentioning your brand</CardDescription>
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
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {influencerLeaderboard.map((influencer, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={influencer.avatar} alt={influencer.name} />
                        <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 text-white text-xs font-bold border-2 border-white dark:border-gray-900">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{influencer.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{influencer.followers} followers</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-900 dark:text-white">Engagement: {influencer.engagement}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{influencer.mentions} mentions</p>
                    </div>
                    <Badge className={cn(
                      influencer.sentiment === 'positive' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400'
                        : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                    )}>
                      {influencer.sentiment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Platform Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Platform Details</CardTitle>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                          <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Detailed performance metrics for each social media platform including follower counts, total engagement, and engagement rates.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>Detailed metrics for each booking platform</CardDescription>
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platformEngagement.map((platform) => (
                <div
                  key={platform.platform}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
                      {getPlatformLogo(platform.platform, 'w-8 h-8 object-contain')}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{platform.platform}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{platform.visitors.toLocaleString()} visitors</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                      <span className="text-gray-900 dark:text-white">{platform.engagement.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Engagement Rate</span>
                      <span className="text-green-600 dark:text-green-400">
                        {((platform.engagement / platform.visitors) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Social Media Platform Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle>Social Media Platforms</CardTitle>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                          <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-sm">Track your social media presence across major platforms including Instagram, Facebook, Twitter, LinkedIn, and TikTok.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <CardDescription>Performance metrics for social media channels</CardDescription>
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
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialMediaEngagement.map((platform) => (
                <div
                  key={platform.platform}
                  className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
                      {getSocialPlatformLogo(platform.platform, 'w-8 h-8 object-contain')}
                    </div>
                    <div>
                      <p className="text-gray-900 dark:text-white font-medium">{platform.platform}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{platform.followers.toLocaleString()} followers</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Engagement</span>
                      <span className="text-gray-900 dark:text-white">{platform.engagement.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Engagement Rate</span>
                      <span className="text-green-600 dark:text-green-400">
                        {((platform.engagement / platform.followers) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
