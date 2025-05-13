import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from './reducers/anecdoteReducer'
import { useState } from 'react'

import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState('')

  const vote = (id) => {
    console.log('vote', id)
    dispatch(votedAnecdote(id))
    setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`)
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
      {anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <AnecdoteForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default App