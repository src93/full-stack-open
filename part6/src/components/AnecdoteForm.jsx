import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const AnecdoteForm = ({ handleSubmit }) => {
  const dispatch = useDispatch()
  const create = (event) => {
    event.preventDefault()
    const content = event.target.newNote.value
    event.target.newNote.value = ''
    dispatch(createAnecdote({ content }))
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