import { useState } from 'react'
import type { NewDiaryEntry, Visibility, Weather } from '../../interfaces/interfaces'
import { createNewEntry } from '../../services/diaries'

const FormNewEntry = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    }
    console.log(newEntry)
    createNewEntry(newEntry)
      .then(returnedEntry => {
        console.log('entry added', returnedEntry)
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch(error => {
        console.error('Error adding entry:', error)
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          visibility
          <input
            type="text"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)} />
        </div>
        <div>
          weather
          <input
            type="text"
            value={weather}
            onChange={(e) => setWeather(e.target.value)} />
        </div>
        <div>
          comment
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)} />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default FormNewEntry;