import { z } from 'zod'
import { CreateHabitResponse } from '@/modules/habits/useCases/createHabit/CreateHabitSchema'

export const listDayHabitsParamsSchema = z.object({
  date: z.coerce.date(),
})

export type ListDayParamsSchema = z.infer<typeof listDayHabitsParamsSchema>
export type ListDayHabitsResponse = {
  possibleHabits: CreateHabitResponse[]
  completedHabits: string[]
}
