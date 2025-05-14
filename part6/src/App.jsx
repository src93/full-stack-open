import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteFilter from './components/AnecdoteFilter'
import { setMessage, setTimeoutId, clearNotification } from './reducers/notificationReducer'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getAnecdotes } from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('fetching anecdotes')
    getAnecdotes()
      .then(anecdotes => {
        dispatch(setAnecdotes(anecdotes))
      })
  }, [dispatch])
  const notification = useSelector(state => state.notification)
  const handleNewAnecdote = (message) => {
    if (notification.timeoutId) {
      dispatch(clearNotification())
    }
    dispatch(setMessage({ message }))
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch(setTimeoutId({ timeoutId }))
  }

  const handleSubmit = (content) => {
    const message = `you created '${content}'`
    if (notification.timeoutId) {
      dispatch(clearNotification())
    }
    dispatch(setMessage({ message }))
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch(setTimeoutId({ timeoutId }))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {notification.message && <Notification notification={notification} />}
      <AnecdoteFilter />
      <AnecdoteList handleNewAnecdote={handleNewAnecdote} />
      <AnecdoteForm handleSubmit={handleSubmit} />
    </div>
  )
}

export default App