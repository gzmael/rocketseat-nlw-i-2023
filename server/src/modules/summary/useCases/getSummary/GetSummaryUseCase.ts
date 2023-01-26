import { myCache } from '@/lib/cache'
import { prisma } from '@/lib/prisma'
import { makeSummaryMapper } from '../../mappers/SummaryMapper'
import { SummaryItem } from './GetSummarySchema'

class GetSummaryUseCase {
  async execute(): Promise<unknown> {
    const existsOnCache = myCache.get('summary')

    if (existsOnCache) {
      return existsOnCache
    }

    const summary = await prisma.$queryRaw<SummaryItem[]>`
      SELECT 
        D.publicId,
        D.date,
        (
          SELECT
            CONVERT(count(*), DECIMAL)
          FROM day_habits as DH
          WHERE DH.dayId = D.id
        ) as completed,
        (
          SELECT
            CONVERT(count(*), DECIMAL)
          FROM habit_week_days as HWD
          INNER JOIN habits as H ON (H.id = HWD.habitId)
          WHERE 
            HWD.week_day = (DAYOFWEEK(D.date) - 1)
            AND H.createdAt < D.date
        ) as amount
      FROM days as D
    `

    const result = makeSummaryMapper(summary)
    myCache.set('summary', result, 86400)

    return result
  }
}

export { GetSummaryUseCase }
