import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const JWT_SECRET = process.env.SECRET

export default {
  MONGODB_URI,
  JWT_SECRET
}