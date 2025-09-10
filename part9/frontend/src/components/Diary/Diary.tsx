import type { DiaryEntry } from '../../interfaces/interfaces'

interface Props {
  diaryEntry: DiaryEntry
}

const Diary = ({ diaryEntry }: Props) => {
  return (
    <li key={diaryEntry.id}>
      <h3>{diaryEntry.date}</h3>
      <p>visibility: {diaryEntry.visibility}</p>
      <p>weather: {diaryEntry.weather}</p>
      {diaryEntry.comment ? <p>comment: {diaryEntry.comment}</p> : ''}
    </li>
  )
}

export default Diary