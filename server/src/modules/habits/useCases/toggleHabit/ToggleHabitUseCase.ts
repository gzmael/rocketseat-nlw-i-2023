import dayjs from 'dayjs'
import { prisma } from '@/lib/prisma'
import { invalidateAllKeys } from '@/lib/cache'

class ToggleHabitUseCase {
  async execute(habit_public_id: string): Promise<void> {
    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today,
      },
    })

    const habit = await prisma.habit.findUnique({
      where: {
        publicId: habit_public_id,
      },
    })

    if (!habit) {
      throw new Error('Habit not exists!')
    }

    if (!day) {
      day = await prisma.day.create({
        data: {
          date: today,
        },
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        dayId_habitId: {
          dayId: day?.id,
          habitId: habit.id,
        },
      },
    })

    if (dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          publicId: dayHabit.publicId,
        },
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          dayId: day.id,
          habitId: habit.id,
        },
      })
    }

    invalidateAllKeys()
  }
}

export { ToggleHabitUseCase }
