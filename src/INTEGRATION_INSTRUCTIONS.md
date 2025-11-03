# Review Sources Chart Integration Instructions

## ✅ What's Been Completed

1. **Created `/components/charts/ReviewSourcesChart.tsx`**
   - Donut chart with interactive hover effects
   - Legend with color indicators, labels, and percentages
   - Smooth animations using Motion
   - Hover interaction: legend items highlight corresponding chart segments
   - Tooltips with "Click to filter by this source" message

2. **Updated `/lib/mockData.ts`**
   - Updated `reviewSourceData` with correct colors and percentages:
     - Indigo (#4F46E5) → Booking.com — 30%
     - Cyan (#06B6D4) → Google Reviews — 25%
     - Purple (#8B5CF6) → TripAdvisor — 19%
     - Green (#10B981) → Expedia — 13%
     - Orange (#F59E0B) → Facebook — 9%
     - Red (#DC2626) → Others — 4%

3. **Added import to `/components/dashboard/ReputationPage.tsx`**
   - Line 29: `import { ReviewSourcesChart } from '../charts/ReviewSourcesChart';`

## 🔧 Manual Integration Required

Due to file encoding issues, you need to manually update one section in **`/components/dashboard/ReputationPage.tsx`**:

### Location: Lines 565-587

**FIND THIS CODE:**
```tsx
                   <CardContent>
                     <div className="h-[300px]">
                       <ResponsiveContainer width="100%" height="100%">
                         <PieChart>
                           <Pie
                             data={reviewSourceData}
                             cx="50%"
                             cy="50%"
                             labelLine={false}
                             label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                             outerRadius={80}
                             fill="#8884d8"
                             dataKey="value"
                           >
                             {reviewSourceData.map((entry, index) => (
                               <Cell key={`cell-${index}`} fill={entry.color} />
                             ))}
                           </Pie>
                           <Tooltip />
                         </PieChart>
                       </ResponsiveContainer>
                     </div>
                   </CardContent>
```

**REPLACE WITH:**
```tsx
                   <CardContent>
                     <ReviewSourcesChart />
                   </CardContent>
```

### Visual Reference

The section is in the "Review Sources" Card, which is part of the "Total Views Dashboard" tab.

Look for the comment: `{/* Review Source Distribution */}` around line 559.

## 🎨 Features Implemented

### Layout & Design
- ✅ Horizontal layout (chart on left, legend on right)
- ✅ 16px spacing between legend items (using `gap-3` which is 12px, adjusted to `py-2` for total 16px)
- ✅ Text size: 14px regular for labels, 14px semibold for percentages
- ✅ Font: Inter / DM Sans via inline styles
- ✅ Left-aligned icons, right-aligned percentages
- ✅ Subtle divider line above legend (opacity 10%)
- ✅ Small rounded color indicators (3x3 rounded-sm)

### Interactions
- ✅ Hover effects: legend items highlight corresponding chart slices
- ✅ Chart segments expand slightly on hover (+8px outer radius)
- ✅ Smooth motion animations (Motion/React)
- ✅ Tooltips showing "Click to filter by this source"
- ✅ Cursor changes to pointer on hover

### Colors & Data
- ✅ All 6 sources with exact colors as specified
- ✅ Percentages displayed prominently
- ✅ Dark mode support throughout

## 🧪 Testing

To test the chart in isolation, you can temporarily update `/App.tsx` to import and render:
```tsx
import { ReviewSourcesDemo } from './components/charts/ReviewSourcesDemo';

// In renderPage():
case 'demo':
  return <ReviewSourcesDemo />;
```

Then navigate to the demo page to see the chart working.

## 📝 Notes

- The chart uses `reviewSourceData` from `mockData.ts`
- The component is fully self-contained and handles its own state
- Interactive features work in both light and dark modes
- The donut chart (inner radius) provides better readability than a full pie chart
- Legend spacing can be adjusted via the `py-2` className (currently 8px top/bottom = 16px total)

## ✨ Next Steps (Optional Enhancements)

If you want to add click functionality:
1. Add an `onClick` handler to the legend items in `ReviewSourcesChart.tsx`
2. Pass a callback prop to filter data
3. Update the ReputationPage to handle filtered views

Example:
```tsx
onClick={() => onFilterSource?.(entry.source)}
```
