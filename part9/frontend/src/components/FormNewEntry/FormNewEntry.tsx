import { useState } from 'react'
import type { NewDiaryEntry, Visibility, Weather } from '../../interfaces/interfaces'
import { createNewEntry } from '../../services/diaries'
import type { NotificationType } from '../../interfaces/interfaces'
import Notification from '../Notification/Notification'
import axios from 'axios'

const FormNewEntry = () => {
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [comment, setComment] = useState('')
  const [showNotification, setShowNotification] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [typeMessage, setTypeMessage] = useState<NotificationType>('info')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const newEntry: NewDiaryEntry = {
      date: date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment: comment
    }
    createNewEntry(newEntry)
      .then(() => {
        setDate('')
        setVisibility('')
        setWeather('')
        setComment('')
      })
      .catch(error => {
        console.error('Error adding entry:', error)
        if (axios.isAxiosError(error)) {
          setErrorMessage(error.response?.data || 'Unknown axios error')
          setTypeMessage('error')
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
            setErrorMessage('')
          }, 5000)
        } else {
          setErrorMessage('Unknown error')
          setTypeMessage('error')
          setShowNotification(true)
          setTimeout(() => {
            setShowNotification(false)
            setErrorMessage('')
          }, 5000)
        }
      })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {showNotification && <Notification message={errorMessage} type={typeMessage} />}
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