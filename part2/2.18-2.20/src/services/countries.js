import axios from 'axios'

export const getAll = async () => {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
  const response = await axios.get(url)
  return response.data
}