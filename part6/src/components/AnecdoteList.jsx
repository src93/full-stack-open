import { useSelector, useDispatch } from 'react-redux'
import { votedAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ handleNewAnecdote }) => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(votedAnecdote(id))
    handleNewAnecdote(`you voted '${anecdotes.find(a => a.id === id).content}'`)
  }

  return (
    anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
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