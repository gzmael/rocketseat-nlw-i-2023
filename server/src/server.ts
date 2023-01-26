/* eslint-disable @typescript-eslint/no-floating-promises */
import fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from './routes'

const app = fastify({
  logger: true,
})

app.register(cors, {
  origin: '*',
})

app.register(appRoutes)

app.listen(
  {
    port: 3333,
    host: '0.0.0.0',
  },
  (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`server listening on ${address}`)
  },
)
