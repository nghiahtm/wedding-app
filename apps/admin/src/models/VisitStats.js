export function createVisitStatsModel(data = {}) {
  return {
    totalVisits: Number(data.totalVisits ?? 0),
    uniqueVisitors: Number(data.uniqueVisitors ?? 0),
    todayVisits: Number(data.todayVisits ?? 0),
    lastVisitAt: data.lastVisitAt ?? null
  };
}
