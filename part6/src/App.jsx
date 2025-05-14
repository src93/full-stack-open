import { useState } from 'react'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'

const App = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState('')

  const handleNewAnecdote = (message) => {
    setNotification(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  const handleSubmit = (content) => {
    setNotification(`you created '${content}'`)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {showNotification && <Notification notification={notification} />}
      <AnecdoteFilter />
      <AnecdoteList handleNewAnecdote={handleNewAnecdote} />
      <AnecdoteForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default App