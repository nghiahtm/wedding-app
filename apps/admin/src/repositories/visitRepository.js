import { fetchVisitStats } from '../api/visits.js';
import { createVisitStatsModel } from '../models/VisitStats.js';

export async function getVisitStats() {
  return createVisitStatsModel(await fetchVisitStats());
}
