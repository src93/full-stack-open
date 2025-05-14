import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ handleNewAnecdote }) => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes

    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    return filteredAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote({ id }))
    handleNewAnecdote(`you voted '${anecdotes.find(a => a.id === id).content}'`)
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

export default AnecdoteList