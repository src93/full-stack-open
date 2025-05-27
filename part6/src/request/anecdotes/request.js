import axios from 'axios'
const baseUrl = 'http://localhost:3000/anecdotes'

export const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}