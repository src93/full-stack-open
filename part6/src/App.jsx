import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './request/anecdotes/request'
import { useVoteAnecdote } from './customUse'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useVoteAnecdote()
  const handleVote = (anecdote) => {
    console.log('vote')
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    voteAnecdote(updatedAnecdote)
  }

  const { isPending, isLoading, isError, data, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAll,
    retry: 1,
  })

  const { mutate: voteAnecdote } = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (anecdotes) => {
        return anecdotes.map(anecdote =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      })
      dispatch(`you voted '${updatedAnecdote.content}'`)
    },
    onError: (error) => {
      const message = error.response?.data?.error || error.message
      dispatch(message)
    }
  })

  if (isLoading || isPending) {
    return <div>loading data...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
