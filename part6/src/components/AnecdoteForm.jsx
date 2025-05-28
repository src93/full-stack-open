import { useMutation, useQueryClient } from '@tanstack/react-query'
import { create } from '../request/anecdotes/request'
import { useCreateAnecdote } from '../customUse'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useCreateAnecdote()
  const { mutate: createAnecdote } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['anecdotes']
      })
    },
    onError: (error) => {
      console.error('Error creating anecdote:', error)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    createAnecdote(content)
    dispatch(content)
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
