import { FastifyReply, FastifyRequest } from 'fastify'
import { createHabitBodySchema } from './CreateHabitSchema'
import { CreateHabitUseCase } from './CreateHabitUseCase'

async function CreateHabitController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const { title, weekDays } = createHabitBodySchema.parse(request.body)
  const createHabitUseCase = new CreateHabitUseCase()

  const habit = await createHabitUseCase.execute({ title, weekDays })

  return reply.send(habit)
}

export { CreateHabitController }
