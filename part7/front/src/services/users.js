import axios from 'axios'
const baseUrl = '/api/user'

const getUsers = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setUser = async (user) => {
  const response = await axios.post(baseUrl, user)
  return response.data
}

export default {
  getUsers
}