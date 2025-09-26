import axios from 'axios'
import type { DiagnosesEntry } from '../interfaces/interfaces'

const baseUrl = '/api/diagnoses'

export const getAllDiagnoses = async () => {
  const response = await axios.get<DiagnosesEntry[]>(baseUrl)
  return response.data
}