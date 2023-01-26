import z from 'zod'

export const toogleHabitParamsSchema = z.object({
  id: z.string().cuid(),
})
