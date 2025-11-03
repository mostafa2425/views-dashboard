// This is a drop-in replacement for the Review Sources card content
// Replace lines 565-587 in ReputationPage.tsx with:
// <CardContent><ReviewSourcesChart /></CardContent>

import { ReviewSourcesChart } from './ReviewSourcesChart';

export function ReviewSourcesCardContent() {
  return <ReviewSourcesChart />;
}
