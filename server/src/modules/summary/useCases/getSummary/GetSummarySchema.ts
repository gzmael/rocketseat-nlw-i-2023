type SummaryItemBase = {
  publicId: string
  date: string
}

export type SummaryItem = SummaryItemBase & {
  completed: string
  amount: string
}

export type SummaryResponse = (SummaryItemBase & {
  completed: number
  amount: number
})[]
