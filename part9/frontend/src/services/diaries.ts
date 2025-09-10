import axios from 'axios'
import type { DiaryEntry } from '../interfaces/interfaces'

const baseUrl = '/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}