import axios from 'axios'
import type { Entry, NewEntry } from '../interfaces/interfaces'

const baseUrl = '/api/patients/{id}/entries'

export const addEntry = async (id: string, entry: NewEntry) => {
  const response = await axios.post<Entry>(baseUrl.replace('{id}', id), entry)
  return response.data
}