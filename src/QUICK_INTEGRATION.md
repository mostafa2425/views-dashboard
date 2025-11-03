# 🚀 Quick Integration Guide

## Ready to Use!

The Review Sources chart is complete and matches the Sentiment Distribution card style.

## One-Step Integration

**File:** `/components/dashboard/ReputationPage.tsx`  
**Lines:** 566-588  
**Action:** Replace the `<CardContent>` section

### Find This:
```tsx
<CardContent>
  <div className="h-[300px]">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        {/* ... old chart code ... */}
      </PieChart>
    </ResponsiveContainer>
  </div>
</CardContent>
```

### Replace With:
```tsx
<CardContent>
  <ReviewSourcesChart />
</CardContent>
```

That's it! The import is already added at line 29.

## ✅ What You Get

- **Circular colored dots** (matching Sentiment Distribution)
- **Clean legend**: Source name + percentage
- **Interactive hover**: Legend ↔ Chart highlighting
- **Perfect alignment** with your design system
- **All 6 sources** with correct colors:
  - 🔵 Indigo → Booking.com (30%)
  - 🔵 Cyan → Google Reviews (25%)
  - 🟣 Purple → TripAdvisor (19%)
  - 🟢 Green → Expedia (13%)
  - 🟠 Orange → Facebook (9%)
  - 🔴 Red → Others (4%)

## 🧪 Test First?

Navigate to demo: Set `activePage` to `'chart-demo'` to see it standalone.

---

**That's all!** See `CHART_UPDATE_COMPLETE.md` for full details.
