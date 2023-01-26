import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { invalidateAllKeys } from '@/lib/cache'
import { CreateHabitResponse, HabitBodySchema } from './CreateHabitSchema'
import { createHabitMapper } from '../../mappers/createHabitMapper'

class CreateHabitUseCase {
  async execute({
    title,
    weekDays,
  }: HabitBodySchema): Promise<CreateHabitResponse> {
    const today = dayjs().startOf('day').toDate()

    const newHabit = await prisma.habit.create({
      data: {
        title,
        createdAt: today,
        habitWeekDays: {
          createMany: {
            data: weekDays.map((day) => ({
              week_day: day,
            })),
          },
        },
      },
    })

    invalidateAllKeys()

    return createHabitMapper(newHabit)
  }
}

export { CreateHabitUseCase }
