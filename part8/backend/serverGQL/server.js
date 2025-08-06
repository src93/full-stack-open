import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/use/ws';
import { typeDefs } from './defs.js'
import { resolvers } from './resolvers.js'
import { httpServer } from '../serverExpress.js'

// Crear schema ejecutable
const schema = makeExecutableSchema({ typeDefs, resolvers })

// Crear WebSocket server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/' // La misma ruta que usará Apollo para las suscripciones
})

// Configurar GraphQL sobre WebSockets
// `useServer` se encarga de la lógica de las suscripciones
// y necesita el schema para validar las peticiones.
const serverCleanup = useServer({
  schema,
  // Aquí puedes añadir context para subscriptions
  context: async (ctx) => {
    // Acceso a headers de WebSocket
    return {
      // Tu contexto aquí
    }
  }
}, wsServer)

export const apolloServer = new ApolloServer({
  schema,
  plugins: [
    // Plugin para apagar correctamente el servidor HTTP
    ApolloServerPluginDrainHttpServer({ httpServer }),
    // Plugin para apagar correctamente el servidor WebSocket
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose()
          }
        }
      }
    }
  ]
})