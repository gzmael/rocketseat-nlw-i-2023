import { myCache } from '@/lib/cache'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'
import { listDayHabitsMapper } from '../../mappers/listDayHabitsMapper'
import {
  ListDayHabitsResponse,
  ListDayParamsSchema,
} from './listDayHabitSchema'

class ListDayHabitsUseCase {
  async execute({ date }: ListDayParamsSchema): Promise<ListDayHabitsResponse> {
    const parsedDate = dayjs(date).startOf('day')
    const formattedDate = parsedDate.format('DD/MM/YYYY')
    const weekDay = parsedDate.get('day')

    const existsOnCache = myCache.get<ListDayHabitsResponse>(
      `day:${formattedDate}`,
    )

    if (existsOnCache) {
      return existsOnCache
    }

    const possibleHabits = await prisma.habit.findMany({
      where: {
        createdAt: {
          lte: date,
        },
        habitWeekDays: {
          some: {
            week_day: weekDay,
          },
        },
      },
    })

    const day = await prisma.day.findUnique({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: {
          select: {
            habit: {
              select: {
                publicId: true,
              },
            },
          },
        },
      },
    })

    const completedHabits =
      day?.dayHabits.map(({ habit }) => habit.publicId) ?? []

    const result = listDayHabitsMapper(possibleHabits, completedHabits)

    myCache.set(`day:${formattedDate}`, result, 86400)

    return result
  }
}

export { ListDayHabitsUseCase }
