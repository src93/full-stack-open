import axios from 'axios'
import type { PatientEntry } from '../interfaces/interfaces'

const baseUrl = '/api/patients'

export const getAllPatients = async () => {
  const response = await axios.get<PatientEntry[]>(baseUrl)
  return response.data
}

export const getPatientById = async (id: string) => {
  const response = await axios.get<PatientEntry>(`${baseUrl}/${id}`)
  return response.data
}