import { FastifyReply, FastifyRequest } from 'fastify'
import { ToggleHabitUseCase } from './ToggleHabitUseCase'
import { toogleHabitParamsSchema } from './ToggleHabitSchema'

async function ToggleHabitController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const { id } = toogleHabitParamsSchema.parse(request.params)
  const toggleHabitUseCase = new ToggleHabitUseCase()

  await toggleHabitUseCase.execute(id)

  return reply.send()
}

export { ToggleHabitController }
