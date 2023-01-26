import {
  SummaryItem,
  SummaryResponse,
} from '../useCases/getSummary/GetSummarySchema'

export function makeSummaryMapper(summary: SummaryItem[]): SummaryResponse {
  return summary.map((item) => ({
    completed: +item.completed,
    date: item.date,
    publicId: item.publicId,
    amount: +item.amount,
  }))
}
