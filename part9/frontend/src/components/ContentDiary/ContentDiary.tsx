import type { DiaryEntry } from '../../interfaces/interfaces'
import { useEffect, useState } from 'react'
import { getAllDiaries } from '../../services/diaries'
import Diary from '../Diary/Diary'

const ContentDiary = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  useEffect(() => {
    getAllDiaries()
      .then(data => setDiaries(data))
  }, [])
  return (
    <div>
      <h2>Diary entries</h2>
      <ul>
        {diaries.length ? diaries.map(diary => <Diary key={diary.id} diaryEntry={diary} />) : ''}
      </ul>
    </div>
  );
}

export default ContentDiary
