import { createServer } from 'http'
import express from 'express'

const app = express()
const httpServer = createServer(app)

export {
  httpServer,
  app
}