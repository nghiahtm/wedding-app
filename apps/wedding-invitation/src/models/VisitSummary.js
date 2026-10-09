export function createVisitSummaryModel(data = {}) {
  return {
    uniqueVisitors: Number(data.uniqueVisitors ?? 0),
    totalVisits: Number(data.totalVisits ?? 0),
  };
}
