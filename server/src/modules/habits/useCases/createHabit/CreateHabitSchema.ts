import { Habit } from '@prisma/client'
import { z } from 'zod'

export const createHabitBodySchema = z.object({
  title: z.string(),
  weekDays: z.array(z.number().min(0).max(6)),
})

export type HabitBodySchema = z.infer<typeof createHabitBodySchema>

export type CreateHabitResponse = Omit<Habit, 'id' | 'updatedAt'>
