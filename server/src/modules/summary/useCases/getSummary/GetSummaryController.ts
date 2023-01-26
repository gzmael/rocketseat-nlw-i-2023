import { FastifyReply, FastifyRequest } from 'fastify'
import { GetSummaryUseCase } from './GetSummaryUseCase'

async function GetSummaryController(
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<FastifyReply> {
  const getSummaryUseCase = new GetSummaryUseCase()

  const summary = await getSummaryUseCase.execute()

  return reply.send(summary)
}

export { GetSummaryController }
