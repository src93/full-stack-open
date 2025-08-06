import mongoose from 'mongoose'
import config from './mongoose/config.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import express from 'express'
import { expressMiddleware } from '@as-integrations/express5';
import User from './mongoose/models/user.js'
import { apolloServer } from './serverGQL/server.js'
import { app, httpServer } from './serverExpress.js'

const startServer = async () => {
  await apolloServer.start()

  app.use(
    '/', // La ruta donde escuchará nuestro servidor GraphQL
    cors(),
    express.json(),
    expressMiddleware(apolloServer, {
        context: async ({ req }) => {
          const auth = req ? req.headers.authorization : null
          let currentUser = null

          if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const token = auth.substring(7)
            console.log('token', token)
            try {
              const decodedToken = jwt.verify(token, config.JWT_SECRET)
              currentUser = await User.findById(decodedToken.id)
            } catch (error) {
              console.error('Error verifying token:', error.message)
            }
          }

          return { currentUser }
        },
    }),
  );

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Servidor HTTP listo en http://localhost:${PORT}/graphql`)
    console.log(`🚀 Servidor WebSocket listo en ws://localhost:${PORT}/graphql`)
  });
}

const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

startServer()