import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry } from '../interfaces/interfaces'

const baseUrl = '/api/diaries'

export const getAllDiaries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const createNewEntry = async (newEntry: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newEntry)
  return response.data
}