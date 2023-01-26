import { Habit } from '@prisma/client'
import { CreateHabitResponse } from '../useCases/createHabit/CreateHabitSchema'

export function createHabitMapper(habit: Habit): CreateHabitResponse {
  const { createdAt, publicId, title } = habit

  return {
    createdAt,
    publicId,
    title,
  }
}
