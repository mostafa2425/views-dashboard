// Demo page showing the new Review Sources Chart with legend
// To view: Temporarily change App.tsx line 29 to: return <ReviewSourcesDemo />;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ReviewSourcesChart } from './ReviewSourcesChart';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

export function ReviewSourcesDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.reload()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div>
            <h1 className="text-3xl text-gray-900 dark:text-white">Review Sources Chart</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Now matches Sentiment Distribution card style
            </p>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Review Sources</CardTitle>
            <CardDescription>Distribution by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ReviewSourcesChart />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-indigo-50 to-cyan-50 dark:from-indigo-950/20 dark:to-cyan-950/20 border-indigo-200 dark:border-indigo-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              ✨ Features Implemented
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Visual Style</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Colored dots (circles) like Sentiment Distribution</li>
                  <li>Clean legend layout with source names</li>
                  <li>Percentage values on the right</li>
                  <li>14px font size matching dashboard</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Interactions</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Hover over legend to highlight chart segment</li>
                  <li>Smooth transitions and animations</li>
                  <li>Chart segments expand on hover (+8px)</li>
                  <li>Legend dots scale up on hover (1.2x)</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Color Mappings</h4>
                <ul className="list-none space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#4F46E5]"></span>
                    Booking.com — 30%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#06B6D4]"></span>
                    Google Reviews — 25%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#8B5CF6]"></span>
                    TripAdvisor — 19%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>
                    Expedia — 13%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>
                    Facebook — 9%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#DC2626]"></span>
                    Others — 4%
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technical Details</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                  <li>Uses Recharts Legend component</li>
                  <li>Custom legend renderer for precise control</li>
                  <li>Donut chart (innerRadius: 45, outerRadius: 80)</li>
                  <li>Content-hugging height (240px built-in)</li>
                  <li>Dark mode support throughout</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white dark:bg-gray-900 rounded-lg border border-indigo-200 dark:border-indigo-800">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📝 Integration Instructions</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                The chart component is ready! To integrate into ReputationPage:
              </p>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-xs">
                <div className="text-gray-600 dark:text-gray-400">In ReputationPage.tsx, replace lines 566-588:</div>
                <div className="mt-2 text-red-600 dark:text-red-400">{'- <div className="h-[300px]">'}</div>
                <div className="text-red-600 dark:text-red-400">{'-   <ResponsiveContainer...>'}</div>
                <div className="text-red-600 dark:text-red-400">-     ... (old pie chart code)</div>
                <div className="text-red-600 dark:text-red-400">{'-   </ResponsiveContainer>'}</div>
                <div className="text-red-600 dark:text-red-400">{'- </div>'}</div>
                <div className="mt-2 text-green-600 dark:text-green-400">{'+ <ReviewSourcesChart />'}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
