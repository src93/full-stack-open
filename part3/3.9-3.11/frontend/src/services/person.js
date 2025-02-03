import axios from 'axios'

const baseUrl = '/api/persons'

const getAllPersons = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createPerson = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson)
  return response.data
}

const updatePerson = async (updatePerson) => {
  const { id } = updatePerson
  const response = await axios.put(`${baseUrl}/${id}`, updatePerson)
  return response.data
}

const deletePerson = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`)
  return response.data
}

export {
  getAllPersons,
  createPerson,
  updatePerson,
  deletePerson
}