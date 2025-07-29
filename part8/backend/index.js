import { startStandaloneServer } from '@apollo/server/standalone'
import { server } from './serverGQL/server.js'
import mongoose from 'mongoose'
import config from './mongoose/config.js'
import jwt from 'jsonwebtoken';
import User from './mongoose/models/user.js'


const MONGODB_URI = config.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

startStandaloneServer(server, {
  listen: { port: 4000 },
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
  }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})