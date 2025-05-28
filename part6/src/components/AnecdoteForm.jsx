import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../request/anecdotes/request'
import { useCreateAnecdote } from '../customUse'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useCreateAnecdote()
  const { mutate: createAnecdote } = useMutation({
    mutationFn: create,
    onSuccess: (anecdoteCreated) => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
      dispatch(anecdoteCreated.content)
    },
    onError: (error) => {
      const message = error.response?.data?.error || error.message
      dispatch(message)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
