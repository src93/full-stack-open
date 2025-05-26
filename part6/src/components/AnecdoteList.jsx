import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdoteAction } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ handleNewAnecdote }) => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes

    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    return filteredAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(updateAnecdoteAction({
      ...anecdote,
      votes: anecdote.votes + 1
    }))
    handleNewAnecdote(`you voted '${anecdote.content}'`)
  }
  console.log('anecdotes', anecdotes)

  return (
    [...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList