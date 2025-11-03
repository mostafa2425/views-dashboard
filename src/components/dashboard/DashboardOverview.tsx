import { Star, MessageSquare, TrendingUp, Heart, ArrowUpRight, AlertCircle, ChevronRight, Building2, DollarSign, BarChart3, Share2, MoreHorizontal, FileDown, Download, ExternalLink, X, Info, FileText, FileSpreadsheet, FileJson, ChevronDown } from 'lucide-react';
import { MetricCard } from '../MetricCard';
import { TrendChart } from '../charts/TrendChart';
import { SentimentChart } from '../charts/SentimentChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import {
  mockMetrics,
  ratingTrend,
  sentimentDistribution,
  platformEngagement,
  recentReviews,
} from '../../lib/mockData';
import { cn } from '../ui/utils';
import { useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { ScrollArea } from '../ui/scroll-area';
import { getPlatformLogo } from '../PlatformLogos';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface DashboardOverviewProps {
  onNavigate?: (page: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps = {}) {
  const [showMoreMetrics, setShowMoreMetrics] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  
  // Prepare data for export
  const prepareExportData = () => {
    return {
      metadata: {
        title: 'Views Analytics Dashboard Export',
        exportDate: new Date().toLocaleDateString(),
        exportTime: new Date().toLocaleTimeString(),
      },
      keyMetrics: {
        overallRating: { value: mockMetrics.overallRating.toFixed(1), trend: mockMetrics.ratingTrend },
        totalReviews: { value: mockMetrics.totalReviews, trend: mockMetrics.reviewsTrend },
        npsScore: { value: mockMetrics.npsScore, trend: mockMetrics.npsTrend },
        sentimentScore: { value: mockMetrics.sentimentScore, trend: mockMetrics.sentimentTrend },
        occupancy: { value: mockMetrics.occupancy, trend: mockMetrics.occupancyTrend },
        adr: { value: mockMetrics.adr, trend: mockMetrics.adrTrend },
        revpar: { value: mockMetrics.revpar.toFixed(1), trend: mockMetrics.revparTrend },
        socialSOV: { value: mockMetrics.socialSOV, trend: mockMetrics.socialSOVTrend },
      },
      ratingTrend,
      sentimentDistribution,
      platformEngagement,
      recentReviews,
    };
  };
  
  const handleExportCSV = () => {
    const csvData = [
      ['Views Analytics Dashboard Export', '', '', ''],
      ['Export Date:', new Date().toLocaleDateString(), '', ''],
      ['', '', '', ''],
      ['KEY METRICS', '', '', ''],
      ['Metric', 'Value', 'Trend', 'Change'],
      ['Overall Rating', mockMetrics.overallRating.toFixed(1), mockMetrics.ratingTrend > 0 ? 'Up' : 'Down', `${mockMetrics.ratingTrend}%`],
      ['Total Reviews', mockMetrics.totalReviews.toLocaleString(), mockMetrics.reviewsTrend > 0 ? 'Up' : 'Down', `${mockMetrics.reviewsTrend}%`],
      ['NPS Score', mockMetrics.npsScore, mockMetrics.npsTrend > 0 ? 'Up' : 'Down', `${mockMetrics.npsTrend}%`],
      ['Sentiment Score', `${mockMetrics.sentimentScore}%`, mockMetrics.sentimentTrend > 0 ? 'Up' : 'Down', `${mockMetrics.sentimentTrend}%`],
      ['Occupancy', `${mockMetrics.occupancy}%`, mockMetrics.occupancyTrend > 0 ? 'Up' : 'Down', `${mockMetrics.occupancyTrend}%`],
      ['ADR', `$${mockMetrics.adr}`, mockMetrics.adrTrend > 0 ? 'Up' : 'Down', `${mockMetrics.adrTrend}%`],
      ['RevPAR', `$${mockMetrics.revpar.toFixed(1)}`, mockMetrics.revparTrend > 0 ? 'Up' : 'Down', `${mockMetrics.revparTrend}%`],
      ['Social SOV', `${mockMetrics.socialSOV}%`, mockMetrics.socialSOVTrend > 0 ? 'Up' : 'Down', `${mockMetrics.socialSOVTrend}%`],
      ['', '', '', ''],
      ['RATING TREND', '', '', ''],
      ['Date', 'Rating', '', ''],
      ...ratingTrend.map(item => [item.date, item.rating.toString(), '', '']),
      ['', '', '', ''],
      ['SENTIMENT DISTRIBUTION', '', '', ''],
      ['Category', 'Count', 'Percentage', ''],
      ...sentimentDistribution.map(item => [item.name, item.value.toString(), `${((item.value / sentimentDistribution.reduce((a, b) => a + b.value, 0)) * 100).toFixed(1)}%`, '']),
      ['', '', '', ''],
      ['PLATFORM ENGAGEMENT', '', '', ''],
      ['Platform', 'Visitors', 'Engagement', ''],
      ...platformEngagement.map(platform => [platform.platform, platform.visitors.toLocaleString(), platform.engagement.toLocaleString(), '']),
      ['', '', '', ''],
      ['RECENT REVIEWS', '', '', ''],
      ['Author', 'Rating', 'Sentiment', 'Date', 'Platform', 'Comment'],
      ...recentReviews.map(review => [
        review.author,
        review.rating.toString(),
        review.sentiment,
        review.date,
        review.platform,
        `"${review.comment.replace(/"/g, '""')}"`
      ])
    ];

    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `views-analytics-dashboard-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Dashboard exported as CSV successfully!');
  };
  
  const handleExportExcel = () => {
    // Export as Excel-compatible CSV with BOM for proper encoding
    const csvData = [
      ['Views Analytics Dashboard Export'],
      [`Export Date: ${new Date().toLocaleDateString()}`],
      [],
      ['KEY METRICS'],
      ['Metric', 'Value', 'Trend %'],
      ['Overall Rating', mockMetrics.overallRating.toFixed(1), mockMetrics.ratingTrend],
      ['Total Reviews', mockMetrics.totalReviews, mockMetrics.reviewsTrend],
      ['NPS Score', mockMetrics.npsScore, mockMetrics.npsTrend],
      ['Sentiment Score', mockMetrics.sentimentScore, mockMetrics.sentimentTrend],
      ['Occupancy %', mockMetrics.occupancy, mockMetrics.occupancyTrend],
      ['ADR $', mockMetrics.adr, mockMetrics.adrTrend],
      ['RevPAR $', mockMetrics.revpar.toFixed(1), mockMetrics.revparTrend],
      ['Social SOV %', mockMetrics.socialSOV, mockMetrics.socialSOVTrend],
      [],
      ['RATING TREND'],
      ['Date', 'Rating'],
      ...ratingTrend.map(item => [item.date, item.rating]),
      [],
      ['SENTIMENT DISTRIBUTION'],
      ['Category', 'Count'],
      ...sentimentDistribution.map(item => [item.name, item.value]),
      [],
      ['PLATFORM ENGAGEMENT'],
      ['Platform', 'Followers', 'Engagement'],
      ...platformEngagement.map(p => [p.platform, p.followers, p.engagement]),
    ];

    const csvContent = '\uFEFF' + csvData.map(row => row.join('\t')).join('\n');
    const blob = new Blob([csvContent], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `views-analytics-dashboard-${new Date().toISOString().split('T')[0]}.xls`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Dashboard exported as Excel successfully!');
  };
  
  const handleExportJSON = () => {
    const data = prepareExportData();
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `views-analytics-dashboard-${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Dashboard exported as JSON successfully!');
  };
  
  const handleExportPDF = () => {
    // Create a printable HTML version
    const data = prepareExportData();
    
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error('Please allow popups to export PDF');
      return;
    }
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Views Analytics Dashboard Report</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; color: #333; }
            h1 { color: #4F46E5; border-bottom: 3px solid #06B6D4; padding-bottom: 10px; }
            h2 { color: #4F46E5; margin-top: 30px; border-bottom: 1px solid #e5e7eb; padding-bottom: 8px; }
            .metadata { background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 30px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            th { background: #4F46E5; color: white; padding: 12px; text-align: left; }
            td { padding: 10px; border-bottom: 1px solid #e5e7eb; }
            tr:hover { background: #f9fafb; }
            .metric-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
            .metric-card { background: #f9fafb; padding: 20px; border-radius: 8px; border-left: 4px solid #4F46E5; }
            .metric-value { font-size: 32px; font-weight: bold; color: #4F46E5; }
            .metric-label { color: #6b7280; margin-bottom: 8px; }
            .trend-positive { color: #10b981; }
            .trend-negative { color: #ef4444; }
            @media print {
              body { padding: 20px; }
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>📊 Views Analytics Dashboard Report</h1>
          
          <div class="metadata">
            <strong>Export Date:</strong> ${data.metadata.exportDate} ${data.metadata.exportTime}<br>
            <strong>Report Period:</strong> Last 30 days
          </div>
          
          <h2>Key Performance Metrics</h2>
          <div class="metric-grid">
            <div class="metric-card">
              <div class="metric-label">Overall Rating</div>
              <div class="metric-value">${data.keyMetrics.overallRating.value}</div>
              <div class="${data.keyMetrics.overallRating.trend > 0 ? 'trend-positive' : 'trend-negative'}">
                ${data.keyMetrics.overallRating.trend > 0 ? '↑' : '↓'} ${Math.abs(data.keyMetrics.overallRating.trend)}%
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Total Reviews</div>
              <div class="metric-value">${data.keyMetrics.totalReviews.value.toLocaleString()}</div>
              <div class="${data.keyMetrics.totalReviews.trend > 0 ? 'trend-positive' : 'trend-negative'}">
                ${data.keyMetrics.totalReviews.trend > 0 ? '↑' : '↓'} ${Math.abs(data.keyMetrics.totalReviews.trend)}%
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-label">NPS Score</div>
              <div class="metric-value">${data.keyMetrics.npsScore.value}</div>
              <div class="${data.keyMetrics.npsScore.trend > 0 ? 'trend-positive' : 'trend-negative'}">
                ${data.keyMetrics.npsScore.trend > 0 ? '↑' : '↓'} ${Math.abs(data.keyMetrics.npsScore.trend)}%
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-label">Sentiment Score</div>
              <div class="metric-value">${data.keyMetrics.sentimentScore.value}%</div>
              <div class="${data.keyMetrics.sentimentScore.trend > 0 ? 'trend-positive' : 'trend-negative'}">
                ${data.keyMetrics.sentimentScore.trend > 0 ? '↑' : '↓'} ${Math.abs(data.keyMetrics.sentimentScore.trend)}%
              </div>
            </div>
          </div>
          
          <h2>Sentiment Distribution</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              ${data.sentimentDistribution.map(item => {
                const total = data.sentimentDistribution.reduce((a, b) => a + b.value, 0);
                const percentage = ((item.value / total) * 100).toFixed(1);
                return `<tr>
                  <td>${item.name}</td>
                  <td>${item.value.toLocaleString()}</td>
                  <td>${percentage}%</td>
                </tr>`;
              }).join('')}
            </tbody>
          </table>
          
          <h2>Platform Engagement</h2>
          <table>
            <thead>
              <tr>
                <th>Platform</th>
                <th>Visitors</th>
                <th>Engagement</th>
              </tr>
            </thead>
            <tbody>
              ${data.platformEngagement.map(platform => `
                <tr>
                  <td>${platform.platform}</td>
                  <td>${platform.visitors.toLocaleString()}</td>
                  <td>${platform.engagement.toLocaleString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          
          <div class="no-print" style="margin-top: 40px; text-align: center;">
            <button onclick="window.print()" style="background: #4F46E5; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
              Print / Save as PDF
            </button>
            <button onclick="window.close()" style="background: #6b7280; color: white; padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; margin-left: 10px;">
              Close
            </button>
          </div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    toast.success('PDF export window opened. Click "Print" to save as PDF.');
  };
  
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400';
      case 'negative': return 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    
    // Hotel booking platforms
    if (platformLower.includes('booking')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <rect width="24" height="24" rx="2" fill="white"/>
          <path d="M6 7h5c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H8v2h3c1.1 0 2 .9 2 2v0c0 1.1-.9 2-2 2H6V7zm2 2v2h3V9H8zm0 4v2h3v-2H8z" fill="currentColor"/>
          <path d="M14 12c0-2.2 1.8-4 4-4s4 1.8 4 4-1.8 4-4 4-4-1.8-4-4zm2 0c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2z" fill="currentColor"/>
        </svg>
      );
    } else if (platformLower.includes('tripadvisor')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M7.5 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
          <circle cx="7.5" cy="12" r="0.5"/>
          <path d="M16.5 9.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5zm0 3.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25z"/>
          <circle cx="16.5" cy="12" r="0.5"/>
        </svg>
      );
    } else if (platformLower.includes('expedia')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 7h14v2H5V7zm0 4h14v2H5v-2zm0 4h10v2H5v-2z"/>
          <path d="M17 15l3 3-3 3v-6z"/>
        </svg>
      );
    } else if (platformLower.includes('wego')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 8l1.5 6L9 8h2l1.5 6L14 8h2l-2.5 8h-2l-1.5-5-1.5 5h-2L4 8h2z"/>
        </svg>
      );
    } else if (platformLower.includes('agoda')) {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 6L7 18h2.5l1-2.5h5l1 2.5H19L14 6h-2zm0 3l1.5 4.5h-3L12 9z"/>
        </svg>
      );
    }
    
    // Social media platforms (fallback)
    switch (platformLower) {
      case 'instagram':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        );
      case 'facebook':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        );
      case 'twitter':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        );
      case 'linkedin':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        );
      case 'tiktok':
        return (
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
          </svg>
        );
      default:
        return <Share2 className="w-5 h-5" />;
    }
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    
    // Hotel booking platforms
    if (platformLower.includes('booking')) {
      return 'from-blue-700 to-blue-600';
    } else if (platformLower.includes('tripadvisor')) {
      return 'from-green-500 to-emerald-500';
    } else if (platformLower.includes('expedia')) {
      return 'from-yellow-500 to-yellow-600';
    } else if (platformLower.includes('wego')) {
      return 'from-red-600 to-red-500';
    } else if (platformLower.includes('agoda')) {
      return 'from-pink-600 to-pink-500';
    }
    
    // Social media platforms (fallback)
    switch (platformLower) {
      case 'instagram':
        return 'from-pink-500 via-purple-500 to-orange-500';
      case 'facebook':
        return 'from-blue-600 to-blue-500';
      case 'twitter':
        return 'from-gray-900 to-gray-700';
      case 'linkedin':
        return 'from-blue-700 to-blue-600';
      case 'tiktok':
        return 'from-gray-900 via-pink-500 to-cyan-400';
      default:
        return 'from-indigo-100 to-cyan-100 dark:from-indigo-950 dark:to-cyan-950';
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-gray-900 dark:text-white mb-1">Good Evening, Ibrahim 👋</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's how your brand's performing today</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs defaultValue="30d" className="w-auto">
            <TabsList>
              <TabsTrigger value="30d">Last 30 days</TabsTrigger>
              <TabsTrigger value="90d">Last 90 days</TabsTrigger>
              <TabsTrigger value="ytd">YTD</TabsTrigger>
            </TabsList>
          </Tabs>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-indigo-200 dark:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:border-indigo-300 dark:hover:border-indigo-700"
              >
                <Download className="w-4 h-4" />
                Export
                <ChevronDown className="w-3.5 h-3.5 ml-0.5 opacity-60" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
                <FileText className="mr-2 h-4 w-4 text-green-600 dark:text-green-400" />
                <span>Export as CSV</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportExcel} className="cursor-pointer">
                <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>Export as Excel</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportJSON} className="cursor-pointer">
                <FileJson className="mr-2 h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>Export as JSON</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
                <FileDown className="mr-2 h-4 w-4 text-red-600 dark:text-red-400" />
                <span>Export as PDF</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      {/* Alert Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-4 rounded-xl bg-gradient-to-r from-cyan-50 to-indigo-50 dark:from-cyan-950/30 dark:to-indigo-950/30 border border-cyan-200 dark:border-cyan-800"
      >
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500 text-white">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-gray-900 dark:text-white mb-1">Engagement spiked on Instagram this week!</p>
            <p className="text-gray-600 dark:text-gray-400">Your pool renovation posts have 340% higher engagement than average.</p>
          </div>
          <button className="text-indigo-600 dark:text-indigo-400 hover:underline">View Details</button>
        </div>
      </motion.div>

      {/* Key Metrics */}
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
            title="Overall Rating"
            value={mockMetrics.overallRating.toFixed(1)}
            trend={mockMetrics.ratingTrend}
            icon={Star}
            delay={0}
            infoTooltip="Average rating across all review platforms. Scale of 1-5 stars. Updated daily from Brand24, Google, and TripAdvisor data."
          />
          <MetricCard
            title="Total Reviews"
            value={mockMetrics.totalReviews.toLocaleString()}
            trend={mockMetrics.reviewsTrend}
            icon={MessageSquare}
            delay={0.1}
            infoTooltip="Total number of reviews collected from all connected platforms including Google Reviews, TripAdvisor, Booking.com, and social media mentions."
          />
          <MetricCard
            title="NPS Score"
            value={mockMetrics.npsScore}
            trend={mockMetrics.npsTrend}
            icon={TrendingUp}
            delay={0.2}
            infoTooltip="Net Promoter Score: Calculated by subtracting the percentage of detractors from promoters. Scale of -100 to +100. Scores above 50 are excellent."
          />
          <MetricCard
            title="Sentiment Score"
            value={`${mockMetrics.sentimentScore}%`}
            trend={mockMetrics.sentimentTrend}
            icon={Heart}
            delay={0.3}
            infoTooltip="Overall sentiment analysis of guest reviews and social media mentions. Calculated using AI-powered sentiment analysis from Brand24 and natural language processing."
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
                  title="Occupancy"
                  value={`${mockMetrics.occupancy}%`}
                  trend={mockMetrics.occupancyTrend}
                  icon={Building2}
                  delay={0}
                  infoTooltip="Average occupancy rate across all properties. Calculated as occupied rooms divided by total available rooms. Industry benchmark is 65-75%."
                />
                <MetricCard
                  title="ADR"
                  value={`$${mockMetrics.adr}`}
                  trend={mockMetrics.adrTrend}
                  icon={DollarSign}
                  delay={0.1}
                  infoTooltip="Average Daily Rate: The average rental income per paid occupied room. Key revenue metric for hospitality performance tracking."
                />
                <MetricCard
                  title="RevPAR"
                  value={`$${mockMetrics.revpar.toFixed(1)}`}
                  trend={mockMetrics.revparTrend}
                  icon={BarChart3}
                  delay={0.2}
                  infoTooltip="Revenue Per Available Room: Calculated by multiplying ADR by occupancy rate. Primary KPI for measuring hotel revenue performance."
                />
                <MetricCard
                  title="Social SOV"
                  value={`${mockMetrics.socialSOV}%`}
                  trend={mockMetrics.socialSOVTrend}
                  icon={Share2}
                  delay={0.3}
                  infoTooltip="Social Share of Voice: Percentage of brand mentions compared to competitors across social media platforms. Tracked via Brand24 monitoring."
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Trend */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Rating Trend</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Displays the average customer rating trend over the selected time period. Data aggregated from all review platforms.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Average rating over time</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <TrendChart
                data={ratingTrend}
                dataKey="rating"
                xAxisKey="date"
                color="#4F46E5"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Sentiment Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>Sentiment Distribution</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">AI-powered sentiment analysis categorizing reviews and mentions as positive, neutral, or negative based on content analysis.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Review sentiment breakdown</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <SentimentChart data={sentimentDistribution} />
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Platform Engagement & Recent Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Platform Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>Platform Engagement</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Shows total reviews, bookings, and engagement metrics across major hotel booking platforms including follower counts and interaction rates.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Performance metrics by booking platform</CardDescription>
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
                {platformEngagement.map((platform, index) => (
                  <motion.div 
                    key={platform.platform} 
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white shadow-md",
                        getPlatformColor(platform.platform)
                      )}>
                        {getPlatformIcon(platform.platform)}
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white">{platform.platform}</p>
                        <p className="text-gray-500 dark:text-gray-400">{platform.visitors.toLocaleString()} visitors</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="text-gray-900 dark:text-white">{platform.engagement.toLocaleString()}</p>
                        <p className="text-green-600 dark:text-green-400 flex items-center gap-1 justify-end">
                          <ArrowUpRight className="w-3.5 h-3.5" />
                          <span>+12%</span>
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle>Recent Reviews</CardTitle>
                    <TooltipProvider delayDuration={100}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-0 h-auto hover:opacity-70 transition-opacity">
                            <Info className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">Real-time feed of the most recent customer reviews from all connected platforms, sorted by submission date.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <CardDescription>Latest customer feedback</CardDescription>
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
                      <DropdownMenuItem onClick={() => {
                        if (onNavigate) {
                          onNavigate('reputation');
                          toast.success('Opening detailed reviews...');
                        } else {
                          toast.info('Opening detailed view...');
                        }
                      }}>
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
                {recentReviews.slice(0, 4).map((review, index) => (
                  <motion.div 
                    key={review.id} 
                    className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-gray-100 dark:ring-gray-800">
                      <AvatarImage src={review.avatar} alt={review.author} />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                        {review.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-gray-900 dark:text-white truncate">{review.author}</p>
                        <Badge className={cn('text-xs', getSentimentColor(review.sentiment))}>
                          {review.sentiment}
                        </Badge>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">{review.comment}</p>
                      <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                        <span className="flex">
                          {Array.from({ length: review.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          ))}
                        </span>
                        <span>•</span>
                        <span>{review.date}</span>
                        <span>•</span>
                        <span className="text-gray-400 dark:text-gray-600">{review.platform}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => setShowAllReviews(true)}
              >
                See All Reviews
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* All Reviews Dialog */}
      <Dialog open={showAllReviews} onOpenChange={setShowAllReviews}>
        <DialogContent className="max-w-3xl max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>All Reviews</DialogTitle>
            <DialogDescription>
              View all customer feedback and reviews
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[calc(85vh-120px)] pr-4">
            <div className="space-y-4">
              {recentReviews.map((review, index) => (
                <motion.div 
                  key={review.id} 
                  className="flex gap-3 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Avatar className="w-10 h-10 flex-shrink-0 ring-2 ring-gray-100 dark:ring-gray-800">
                    <AvatarImage src={review.avatar} alt={review.author} />
                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-cyan-500 text-white">
                      {review.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="text-gray-900 dark:text-white">{review.author}</p>
                        <p className="text-gray-500 dark:text-gray-400">{review.property}</p>
                      </div>
                      <Badge className={cn('text-xs', getSentimentColor(review.sentiment))}>
                        {review.sentiment}
                      </Badge>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{review.comment}</p>
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                      <span className="flex">
                        {Array.from({ length: review.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </span>
                      <span>•</span>
                      <span>{review.date}</span>
                      <span>•</span>
                      <span className="text-gray-400 dark:text-gray-600">{review.platform}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
          <div className="pt-4 border-t">
            <p className="text-gray-500 dark:text-gray-400">
              Showing {recentReviews.length} reviews
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
