import { createHabitMapper } from '@/modules/habits/mappers/createHabitMapper'
import { Habit } from '@prisma/client'
import { ListDayHabitsResponse } from '../useCases/listDayHabits/listDayHabitSchema'

export function listDayHabitsMapper(
  possibleHabits: Habit[],
  completedHabits: string[],
): ListDayHabitsResponse {
  return {
    possibleHabits: possibleHabits.map((habit) => createHabitMapper(habit)),
    completedHabits,
  }
}
