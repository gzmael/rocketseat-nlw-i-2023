import { FastifyInstance, FastifyPluginOptions } from 'fastify'
import { ListDayHabitsController } from './modules/days/useCases/listDayHabits/listDayHabitsController'
import { CreateHabitController } from './modules/habits/useCases/createHabit/CreateHabitController'
import { ToggleHabitController } from './modules/habits/useCases/toggleHabit/ToggleHabitController'
import { GetSummaryController } from './modules/summary/useCases/getSummary/GetSummaryController'

type DoneType = (err?: Error | undefined) => void

export async function appRoutes(
  app: FastifyInstance,
  _options: FastifyPluginOptions,
  done: DoneType,
) {
  app.get('/', async (_, reply) => {
    return reply.send({ hello: 'World' })
  })

  app.post('/habits', CreateHabitController)
  app.patch('/habits/:id/toggle', ToggleHabitController)
  app.get('/day', ListDayHabitsController)
  app.get('/summary', GetSummaryController)

  done()
}
