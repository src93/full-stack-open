import { appendAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../services/anecdotes'

const AnecdoteForm = ({ handleSubmit }) => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    const content = event.target.newNote.value
    event.target.newNote.value = ''
    createAnecdote(content)
      .then(anecdote => {
        dispatch(appendAnecdote(anecdote))
      })
    handleSubmit(content)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name='newNote'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm