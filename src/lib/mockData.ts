export const mockMetrics = {
  overallRating: 4.6,
  ratingTrend: 2.3,
  totalReviews: 12847,
  reviewsTrend: 15.2,
  npsScore: 68,
  npsTrend: -3.1,
  sentimentScore: 82,
  sentimentTrend: 5.7,
  occupancy: 78.5,
  occupancyTrend: 4.2,
  adr: 285,
  adrTrend: 6.8,
  revpar: 223.7,
  revparTrend: 11.3,
  socialSOV: 34.2,
  socialSOVTrend: 8.5,
};

export const ratingTrend = [
  { date: 'Jan', rating: 4.2, reviews: 850 },
  { date: 'Feb', rating: 4.3, reviews: 920 },
  { date: 'Mar', rating: 4.4, reviews: 1050 },
  { date: 'Apr', rating: 4.5, reviews: 1180 },
  { date: 'May', rating: 4.5, reviews: 1100 },
  { date: 'Jun', rating: 4.6, reviews: 1250 },
  { date: 'Jul', rating: 4.6, reviews: 1380 },
];

export const sentimentDistribution = [
  { name: 'Positive', value: 68, color: '#06B6D4' }, // Cyan (brand accent)
  { name: 'Neutral', value: 22, color: '#818CF8' }, // Light indigo
  { name: 'Negative', value: 10, color: '#4F46E5' }, // Indigo (brand primary)
];

export const platformEngagement = [
  { platform: 'Booking.com', engagement: 5800, visitors: 62000 },
  { platform: 'TripAdvisor', engagement: 4200, visitors: 45000 },
  { platform: 'Expedia', engagement: 3100, visitors: 38000 },
  { platform: 'Agoda', engagement: 2400, visitors: 28000 },
  { platform: 'Wego', engagement: 1800, visitors: 22000 },
];

export const socialMediaEngagement = [
  { platform: 'Instagram', engagement: 8500, followers: 125000 },
  { platform: 'Facebook', engagement: 6200, followers: 98000 },
  { platform: 'Twitter', engagement: 3800, followers: 54000 },
  { platform: 'LinkedIn', engagement: 2100, followers: 32000 },
  { platform: 'TikTok', engagement: 4500, followers: 67000 },
];

export const emotionAnalysis = [
  { emotion: 'Joy', value: 85 },
  { emotion: 'Trust', value: 78 },
  { emotion: 'Anticipation', value: 65 },
  { emotion: 'Surprise', value: 45 },
  { emotion: 'Sadness', value: 15 },
  { emotion: 'Anger', value: 12 },
];

export const recentReviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjA0ODgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Grand Hotel Downtown',
    rating: 5,
    sentiment: 'positive',
    date: '2 hours ago',
    comment: 'Absolutely stunning experience! The staff was incredibly helpful...',
    platform: 'Google',
  },
  {
    id: 2,
    author: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NjIwOTE5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Seaside Resort & Spa',
    rating: 4,
    sentiment: 'positive',
    date: '5 hours ago',
    comment: 'Beautiful location with great amenities. Minor room service delay.',
    platform: 'TripAdvisor',
  },
  {
    id: 3,
    author: 'Emma Davis',
    avatar: 'https://images.unsplash.com/photo-1525786210598-d527194d3e9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIwNTg1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'City Center Boutique',
    rating: 2,
    sentiment: 'negative',
    date: '8 hours ago',
    comment: 'Disappointed with the cleanliness. Expected better for the price.',
    platform: 'Booking.com',
  },
  {
    id: 4,
    author: 'James Wilson',
    avatar: 'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyMDk0MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Mountain View Lodge',
    rating: 5,
    sentiment: 'positive',
    date: '12 hours ago',
    comment: 'Perfect getaway! The views are breathtaking and staff is amazing.',
    platform: 'Google',
  },
  {
    id: 5,
    author: 'Lisa Anderson',
    avatar: 'https://images.unsplash.com/photo-1652471949169-9c587e8898cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc2MjA0Mzc0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Grand Hotel Downtown',
    rating: 3,
    sentiment: 'neutral',
    date: '1 day ago',
    comment: 'Average experience. Good location but outdated facilities.',
    platform: 'Expedia',
  },
  {
    id: 6,
    author: 'Robert Martinez',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjAwMzkxNHww&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Seaside Resort & Spa',
    rating: 5,
    sentiment: 'positive',
    date: '1 day ago',
    comment: 'Exceptional service and stunning ocean views. The spa treatments were world-class!',
    platform: 'TripAdvisor',
  },
  {
    id: 7,
    author: 'Jennifer Park',
    avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwZXJzb24lMjBoZWFkc2hvdHxlbnwxfHx8fDE3NjIwMDc5OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'City Center Boutique',
    rating: 4,
    sentiment: 'positive',
    date: '2 days ago',
    comment: 'Charming hotel with great character. Room was cozy and well-appointed.',
    platform: 'Google',
  },
  {
    id: 8,
    author: 'David Thompson',
    avatar: 'https://images.unsplash.com/photo-1581065178047-8ee15951ede6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjA0ODgwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Mountain View Lodge',
    rating: 3,
    sentiment: 'neutral',
    date: '2 days ago',
    comment: 'Nice property but WiFi was spotty in some areas. Otherwise comfortable stay.',
    platform: 'Booking.com',
  },
  {
    id: 9,
    author: 'Amanda Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1600275669439-14e40452d20b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzYyMDAzNTI0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Grand Hotel Downtown',
    rating: 5,
    sentiment: 'positive',
    date: '3 days ago',
    comment: 'Loved everything about this hotel! The rooftop bar has amazing city views.',
    platform: 'Google',
  },
  {
    id: 10,
    author: 'Kevin Brown',
    avatar: 'https://images.unsplash.com/photo-1758518727984-17b37f2f0562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBidXNpbmVzc3xlbnwxfHx8fDE3NjIwOTE5NDN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Airport Business Hotel',
    rating: 4,
    sentiment: 'positive',
    date: '3 days ago',
    comment: 'Perfect for business travelers. Close to airport and very efficient service.',
    platform: 'Expedia',
  },
  {
    id: 11,
    author: 'Rachel Kim',
    avatar: 'https://images.unsplash.com/photo-1525786210598-d527194d3e9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjIwNTg1NTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'Seaside Resort & Spa',
    rating: 2,
    sentiment: 'negative',
    date: '4 days ago',
    comment: 'Beach was overcrowded and pool area needed maintenance. Not worth the premium price.',
    platform: 'TripAdvisor',
  },
  {
    id: 12,
    author: 'Steven White',
    avatar: 'https://images.unsplash.com/photo-1680557345345-6f9ef109d252?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBvdXRkb29yJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzYyMDk0MjE1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    property: 'City Center Boutique',
    rating: 5,
    sentiment: 'positive',
    date: '4 days ago',
    comment: 'Wonderful boutique experience. Staff remembered my name and preferences!',
    platform: 'Google',
  },
];

export const competitorData = [
  {
    name: 'Your Brand',
    rating: 4.6,
    reviews: 12847,
    sov: 35,
    sentiment: 82,
  },
  {
    name: 'Luxury Hotels Co.',
    rating: 4.4,
    reviews: 18200,
    sov: 42,
    sentiment: 78,
  },
  {
    name: 'Premium Stays',
    rating: 4.5,
    reviews: 9500,
    sov: 23,
    sentiment: 80,
  },
];

export const propertyPerformance = [
  { property: 'Grand Hotel Downtown', rating: 4.7, reviews: 3200, occupancy: 87, nps: 72 },
  { property: 'Seaside Resort & Spa', rating: 4.8, reviews: 4100, occupancy: 92, nps: 78 },
  { property: 'City Center Boutique', rating: 4.3, reviews: 2100, occupancy: 76, nps: 61 },
  { property: 'Mountain View Lodge', rating: 4.6, reviews: 1800, occupancy: 81, nps: 68 },
  { property: 'Airport Business Hotel', rating: 4.4, reviews: 1650, occupancy: 73, nps: 64 },
];

// Visit Time Analytics Data
export const visitTimeData = [
  { hour: '6 AM', visits: 12 },
  { hour: '8 AM', visits: 28 },
  { hour: '10 AM', visits: 45 },
  { hour: '12 PM', visits: 62 },
  { hour: '2 PM', visits: 54 },
  { hour: '4 PM', visits: 71 },
  { hour: '5 PM', visits: 124 },
  { hour: '6 PM', visits: 142 },
  { hour: '7 PM', visits: 135 },
  { hour: '8 PM', visits: 98 },
  { hour: '10 PM', visits: 42 },
  { hour: '12 AM', visits: 18 },
];

// Call Interaction Data
export const callInteractionData = {
  totalCalls: 1847,
  avgDuration: '4:12',
  sentimentBreakdown: [
    { sentiment: 'Positive', count: 1235, percentage: 67 },
    { sentiment: 'Neutral', count: 480, percentage: 26 },
    { sentiment: 'Negative', count: 132, percentage: 7 },
  ],
  peakCallTime: '5 PM - 8 PM',
  avgResponseTime: '1.8 min',
  topicsDiscussed: [
    { topic: 'Reservations', count: 542 },
    { topic: 'Check-in/out', count: 389 },
    { topic: 'Amenities', count: 278 },
    { topic: 'Complaints', count: 156 },
    { topic: 'General Info', count: 482 },
  ],
};

// Queue & Wait Time Data
export const queueWaitTimeData = [
  { day: 'Mon', avgWait: 3.2, maxWait: 8.5 },
  { day: 'Tue', avgWait: 2.8, maxWait: 7.1 },
  { day: 'Wed', avgWait: 3.5, maxWait: 9.2 },
  { day: 'Thu', avgWait: 3.1, maxWait: 8.0 },
  { day: 'Fri', avgWait: 4.2, maxWait: 12.3 },
  { day: 'Sat', avgWait: 5.8, maxWait: 15.7 },
  { day: 'Sun', avgWait: 5.2, maxWait: 14.2 },
];

export const waitTimeMetrics = {
  avgWaitTime: '3.8 min',
  longestWait: '15.7 min',
  staffEfficiency: 87,
  peakWaitDay: 'Saturday',
};

// AI Recommendations
export const aiRecommendations = [
  {
    id: 1,
    title: 'Increase reception staff between 5 PM – 8 PM',
    description: 'Peak visit times show 3x higher traffic during evening hours. Adding 2 additional staff members could reduce wait time by 45%.',
    impact: 'High',
    category: 'Staffing',
    expectedImpact: 'Reduce wait time by 45%',
  },
  {
    id: 2,
    title: 'Train staff on faster call resolutions',
    description: 'Average call duration of 4:12 min is 28% above industry standard. Targeted training could improve efficiency.',
    impact: 'Medium',
    category: 'Training',
    expectedImpact: 'Save 18 hours/week',
  },
  {
    id: 3,
    title: 'Allocate dedicated desk for VIP / repeat guests',
    description: 'Data shows 23% of guests are returning customers. A dedicated check-in desk could improve satisfaction by 35%.',
    impact: 'High',
    category: 'Service',
    expectedImpact: '+35% satisfaction',
  },
  {
    id: 4,
    title: 'Implement digital queue management',
    description: 'Weekend wait times exceed 5 minutes. A digital queuing system could reduce perceived wait time and improve guest experience.',
    impact: 'Medium',
    category: 'Technology',
    expectedImpact: '+22% guest satisfaction',
  },
  {
    id: 5,
    title: 'Optimize weekend staffing schedule',
    description: 'Saturday and Sunday show 85% higher wait times. Adjust staff schedules to match demand patterns.',
    impact: 'High',
    category: 'Staffing',
    expectedImpact: 'Reduce weekend waits by 52%',
  },
  {
    id: 6,
    title: 'Create pre-arrival check-in option',
    description: 'Allow guests to complete check-in formalities online before arrival to reduce front desk congestion.',
    impact: 'Low',
    category: 'Technology',
    expectedImpact: '+15% efficiency',
  },
];

export const aiInsights = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Instagram engagement spike detected',
    description: 'Your recent pool renovation posts have 340% higher engagement. Consider amplifying this content.',
    impact: 'High',
    priority: 1,
  },
  {
    id: 2,
    type: 'warning',
    title: 'Negative sentiment rising for City Center Boutique',
    description: 'Cleanliness mentions in reviews dropped 15% this week. Immediate action recommended.',
    impact: 'Critical',
    priority: 1,
  },
  {
    id: 3,
    type: 'insight',
    title: 'Competitor "Premium Stays" launching new campaign',
    description: 'Detected 45% increase in their social media spend. Monitor share of voice closely.',
    impact: 'Medium',
    priority: 2,
  },
  {
    id: 4,
    type: 'opportunity',
    title: 'Breakfast service is your top-rated feature',
    description: 'Mentioned positively in 78% of 5-star reviews. Feature this in marketing materials.',
    impact: 'High',
    priority: 2,
  },
];

export const forecastData = [
  { month: 'Nov', actual: 4.6, forecast: null },
  { month: 'Dec', actual: null, forecast: 4.7 },
  { month: 'Jan', actual: null, forecast: 4.7 },
  { month: 'Feb', actual: null, forecast: 4.8 },
];

export const ratingDistribution = [
  { stars: '5 Star', count: 8200, percentage: 64 },
  { stars: '4 Star', count: 3100, percentage: 24 },
  { stars: '3 Star', count: 900, percentage: 7 },
  { stars: '2 Star', count: 400, percentage: 3 },
  { stars: '1 Star', count: 247, percentage: 2 },
];

export const influencerLeaderboard = [
  { name: 'Sarah Travel', followers: '125K', engagement: '8.4%', mentions: 24, sentiment: 'positive', avatar: 'https://images.unsplash.com/photo-1626455555227-5aeb1b26a7b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBpbmZsdWVuY2VyJTIwd29tYW58ZW58MXx8fHwxNzYyMTAyODY5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Wanderlust Mike', followers: '89K', engagement: '6.2%', mentions: 18, sentiment: 'positive', avatar: 'https://images.unsplash.com/photo-1551811658-713e11044e87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwdHJhdmVsJTIwYmxvZ2dlcnxlbnwxfHx8fDE3NjIxMTQxMTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Luxury Lifestyle', followers: '210K', engagement: '4.1%', mentions: 15, sentiment: 'neutral', avatar: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBsaWZlc3R5bGUlMjBpbmZsdWVuY2VyfGVufDF8fHx8MTc2MjExNDExOHww&ixlib=rb-4.1.0&q=80&w=1080' },
  { name: 'Hotel Critic Pro', followers: '56K', engagement: '9.8%', mentions: 12, sentiment: 'positive', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzc21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjAyNjQ0MHww&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const branches = [
  'All Properties',
  'Grand Hotel Downtown',
  'Seaside Resort & Spa',
  'City Center Boutique',
  'Mountain View Lodge',
  'Airport Business Hotel',
];

export const properties = [
  {
    id: 1,
    name: 'City Suites Dubai',
    location: 'Downtown Dubai',
    city: 'Dubai',
    rating: 4.7,
    rooms: 150,
    status: 'active',
    selected: true,
  },
  {
    id: 2,
    name: 'Marina Residence Dubai',
    location: 'Dubai Marina',
    city: 'Dubai',
    rating: 4.8,
    rooms: 180,
    status: 'active',
    selected: false,
  },
  {
    id: 3,
    name: 'Skyline Tower Dubai',
    location: 'Business Bay',
    city: 'Dubai',
    rating: 4.9,
    rooms: 220,
    status: 'active',
    selected: false,
  },
  {
    id: 4,
    name: 'Beach Resort Abu Dhabi',
    location: 'Saadiyat Island',
    city: 'Abu Dhabi',
    rating: 4.5,
    rooms: 200,
    status: 'active',
    selected: false,
  },
  {
    id: 5,
    name: 'Mountain Lodge Ras Al Khaimah',
    location: 'Jebel Jais',
    city: 'Ras Al Khaimah',
    rating: 4.6,
    rooms: 120,
    status: 'active',
    selected: false,
  },
  {
    id: 6,
    name: 'Grand Plaza Dubai',
    location: 'Downtown Dubai',
    city: 'Dubai',
    rating: 4.4,
    rooms: 300,
    status: 'active',
    selected: false,
  },
  {
    id: 7,
    name: 'Heritage Suites Abu Dhabi',
    location: 'Corniche',
    city: 'Abu Dhabi',
    rating: 4.7,
    rooms: 160,
    status: 'active',
    selected: false,
  },
  {
    id: 8,
    name: 'Desert Oasis Ras Al Khaimah',
    location: 'Al Hamra',
    city: 'Ras Al Khaimah',
    rating: 4.3,
    rooms: 95,
    status: 'active',
    selected: false,
  },
];

// Branch comparison data
export const branchComparisonData = [
  {
    branch: 'Grand Hotel Downtown',
    rating: 4.7,
    nps: 72,
    reviews: 3200,
    sentiment: 85,
    trend: 5.2,
    color: '#4F46E5', // Indigo
    engagement: '8.4%',
    responseRate: '94%',
  },
  {
    branch: 'Seaside Resort & Spa',
    rating: 4.8,
    nps: 78,
    reviews: 4100,
    sentiment: 89,
    trend: 8.3,
    color: '#06B6D4', // Cyan
    engagement: '9.2%',
    responseRate: '96%',
  },
  {
    branch: 'City Center Boutique',
    rating: 4.3,
    nps: 61,
    reviews: 2100,
    sentiment: 72,
    trend: -2.1,
    color: '#8B5CF6', // Purple
    engagement: '6.8%',
    responseRate: '87%',
  },
  {
    branch: 'Mountain View Lodge',
    rating: 4.6,
    nps: 69,
    reviews: 2800,
    sentiment: 81,
    trend: 3.7,
    color: '#10B981', // Green
    engagement: '7.9%',
    responseRate: '92%',
  },
  {
    branch: 'Airport Express Hotel',
    rating: 4.1,
    nps: 58,
    reviews: 1850,
    sentiment: 68,
    trend: -1.3,
    color: '#F59E0B', // Amber
    engagement: '5.6%',
    responseRate: '85%',
  },
];

// Service area comparison (for radar chart)
export const serviceAreasComparison = [
  { area: 'Cleanliness', 'Grand Hotel Downtown': 92, 'Seaside Resort & Spa': 95, 'City Center Boutique': 78 },
  { area: 'Staff', 'Grand Hotel Downtown': 88, 'Seaside Resort & Spa': 91, 'City Center Boutique': 85 },
  { area: 'Value', 'Grand Hotel Downtown': 82, 'Seaside Resort & Spa': 85, 'City Center Boutique': 73 },
  { area: 'Location', 'Grand Hotel Downtown': 95, 'Seaside Resort & Spa': 88, 'City Center Boutique': 91 },
  { area: 'Amenities', 'Grand Hotel Downtown': 87, 'Seaside Resort & Spa': 93, 'City Center Boutique': 76 },
  { area: 'Comfort', 'Grand Hotel Downtown': 90, 'Seaside Resort & Spa': 94, 'City Center Boutique': 81 },
];

// Performance heatmap by time
export const performanceHeatmap = [
  { day: 'Mon', '6am': 3.8, '9am': 4.2, '12pm': 4.5, '3pm': 4.6, '6pm': 4.7, '9pm': 4.8 },
  { day: 'Tue', '6am': 4.0, '9am': 4.3, '12pm': 4.6, '3pm': 4.7, '6pm': 4.8, '9pm': 4.7 },
  { day: 'Wed', '6am': 4.1, '9am': 4.4, '12pm': 4.7, '3pm': 4.8, '6pm': 4.8, '9pm': 4.6 },
  { day: 'Thu', '6am': 4.2, '9am': 4.5, '12pm': 4.7, '3pm': 4.8, '6pm': 4.9, '9pm': 4.7 },
  { day: 'Fri', '6am': 4.3, '9am': 4.6, '12pm': 4.8, '3pm': 4.9, '6pm': 4.9, '9pm': 4.8 },
  { day: 'Sat', '6am': 4.1, '9am': 4.5, '12pm': 4.8, '3pm': 4.9, '6pm': 5.0, '9pm': 4.9 },
  { day: 'Sun', '6am': 3.9, '9am': 4.3, '12pm': 4.6, '3pm': 4.7, '6pm': 4.8, '9pm': 4.7 },
];

// Comments and topics data
export const commentsData = [
  {
    id: 1,
    author: 'Sarah Johnson',
    initials: 'SJ',
    rating: 5,
    sentiment: 'positive',
    platform: 'Google',
    date: '2 hours ago',
    comment: 'Absolutely stunning experience! The staff was incredibly helpful and the room was spotless. The breakfast buffet exceeded all expectations. Would highly recommend!',
    keywords: ['staff', 'room', 'breakfast', 'recommend'],
  },
  {
    id: 2,
    author: 'Michael Chen',
    initials: 'MC',
    rating: 4,
    sentiment: 'positive',
    platform: 'TripAdvisor',
    date: '5 hours ago',
    comment: 'Beautiful location with great amenities. The pool area is fantastic and the spa services are top-notch. Minor delay with room service but overall excellent stay.',
    keywords: ['location', 'amenities', 'pool', 'spa', 'room service'],
  },
  {
    id: 3,
    author: 'Emma Davis',
    initials: 'ED',
    rating: 2,
    sentiment: 'negative',
    platform: 'Booking.com',
    date: '8 hours ago',
    comment: 'Disappointed with the cleanliness of the room. Found hair in the bathroom and the carpets needed deep cleaning. Expected better for the price point.',
    keywords: ['cleanliness', 'bathroom', 'carpets', 'price'],
  },
  {
    id: 4,
    author: 'James Wilson',
    initials: 'JW',
    rating: 5,
    sentiment: 'positive',
    platform: 'Google',
    date: '12 hours ago',
    comment: 'Perfect getaway! The mountain views are breathtaking and the staff went above and beyond. The concierge helped plan our entire trip. Amazing experience!',
    keywords: ['views', 'staff', 'concierge', 'experience'],
  },
  {
    id: 5,
    author: 'Lisa Anderson',
    initials: 'LA',
    rating: 3,
    sentiment: 'neutral',
    platform: 'Expedia',
    date: '1 day ago',
    comment: 'Average experience. Good central location which was convenient for business meetings. The facilities are somewhat outdated and could use renovation.',
    keywords: ['location', 'business', 'facilities', 'renovation'],
  },
  {
    id: 6,
    author: 'David Martinez',
    initials: 'DM',
    rating: 5,
    sentiment: 'positive',
    platform: 'Google',
    date: '1 day ago',
    comment: 'Exceptional service from check-in to check-out. The attention to detail is remarkable. Loved the complimentary welcome drinks and the evening turndown service.',
    keywords: ['service', 'check-in', 'detail', 'drinks', 'turndown'],
  },
  {
    id: 7,
    author: 'Rachel Kim',
    initials: 'RK',
    rating: 1,
    sentiment: 'negative',
    platform: 'TripAdvisor',
    date: '2 days ago',
    comment: 'Terrible experience. Noisy air conditioning kept us up all night. Complained to front desk but issue was not resolved. Would not stay here again.',
    keywords: ['noise', 'air conditioning', 'front desk', 'complaint'],
  },
  {
    id: 8,
    author: 'Tom Bradley',
    initials: 'TB',
    rating: 4,
    sentiment: 'positive',
    platform: 'Booking.com',
    date: '2 days ago',
    comment: 'Great hotel with fantastic breakfast options. Room was spacious and comfortable. Only complaint is the parking situation - very limited spaces.',
    keywords: ['breakfast', 'room', 'comfortable', 'parking'],
  },
];

// Most mentioned topics
export const topicsData = [
  { topic: 'Staff / Service', count: 1850, sentiment: 'positive' },
  { topic: 'Cleanliness', count: 1620, sentiment: 'positive' },
  { topic: 'Location', count: 1450, sentiment: 'positive' },
  { topic: 'Breakfast', count: 1280, sentiment: 'positive' },
  { topic: 'Room Quality', count: 1120, sentiment: 'neutral' },
  { topic: 'Amenities', count: 980, sentiment: 'positive' },
  { topic: 'Value for Money', count: 850, sentiment: 'neutral' },
  { topic: 'Noise', count: 420, sentiment: 'negative' },
];

// Room types
export const roomTypes = ['Standard', 'Deluxe', 'Suite', 'Executive', 'Presidential'];

// Reviewer types
export const reviewerTypes = ['Couple', 'Family', 'Business', 'Solo', 'Group'];

// Review source distribution
export const reviewSourceData = [
  { source: 'Booking.com', value: 30, percentage: 30, color: '#4F46E5' },
  { source: 'Google Reviews', value: 25, percentage: 25, color: '#06B6D4' },
  { source: 'TripAdvisor', value: 19, percentage: 19, color: '#8B5CF6' },
  { source: 'Expedia', value: 13, percentage: 13, color: '#10B981' },
  { source: 'Facebook', value: 9, percentage: 9, color: '#F59E0B' },
  { source: 'Others', value: 4, percentage: 4, color: '#DC2626' },
];

// Mentions by region (for map visualization)
export const mentionsByRegion = [
  { region: 'North America', mentions: 5420, sentiment: 86 },
  { region: 'Europe', mentions: 4280, sentiment: 82 },
  { region: 'Asia Pacific', mentions: 2150, sentiment: 88 },
  { region: 'Latin America', mentions: 680, sentiment: 79 },
  { region: 'Middle East', mentions: 317, sentiment: 84 },
];
