import axios from 'axios'
const baseUrl = '/api/blog'

let token = null

const setToken = newToken => token = `Bearer ${newToken}`

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async (newPost) => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.post(baseUrl, newPost, config)
  const response = await request
  return response.data
}

export default {
  getAll,
  create,
  setToken
}