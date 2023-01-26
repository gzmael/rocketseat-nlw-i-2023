import { FastifyReply, FastifyRequest } from 'fastify'
import { listDayHabitsParamsSchema } from './listDayHabitSchema'
import { ListDayHabitsUseCase } from './listDayHabitsUseCase'

async function ListDayHabitsController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const { date } = listDayHabitsParamsSchema.parse(request.query)
  const listDayHabitsUseCase = new ListDayHabitsUseCase()

  const list = await listDayHabitsUseCase.execute({ date })

  return reply.send(list)
}

export { ListDayHabitsController }
