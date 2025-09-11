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
            type='radio'
            name='visibility'
            value='great'
            checked={visibility === 'great'}
            onChange={(e) => setVisibility(e.target.value)} /> great
          <input
            type='radio'
            name='visibility'
            value='good'
            checked={visibility === 'good'}
            onChange={(e) => setVisibility(e.target.value)} /> good
          <input
            type='radio'
            name='visibility'
            value='ok'
            checked={visibility === 'ok'}
            onChange={(e) => setVisibility(e.target.value)} /> ok
          <input
            type='radio'
            name='visibility'
            value='poor'
            checked={visibility === 'poor'}
            onChange={(e) => setVisibility(e.target.value)} /> poor
        </div>
        <div>
          weather
          <input
            type='radio'
            name='weather'
            value='sunny'
            checked={weather === 'sunny'}
            onChange={(e) => setWeather(e.target.value)} /> sunny
          <input
            type='radio'
            name='weather'
            value='rainy'
            checked={weather === 'rainy'}
            onChange={(e) => setWeather(e.target.value)} /> rainy
          <input
            type='radio'
            name='weather'
            value='cloudy'
            checked={weather === 'cloudy'}
            onChange={(e) => setWeather(e.target.value)} /> cloudy
          <input
            type='radio'
            name='weather'
            value='windy'
            checked={weather === 'windy'}
            onChange={(e) => setWeather(e.target.value)} /> windy
          <input
            type='radio'
            name='weather'
            value='stormy'
            checked={weather === 'stormy'}
            onChange={(e) => setWeather(e.target.value)} /> stormy
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