import { Habit } from './Habit'

export type ListDayHabitsResponse = {
  possibleHabits: Habit[]
  completedHabits: string[]
}
