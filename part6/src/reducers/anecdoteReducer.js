import { createSlice, current, createAsyncThunk } from '@reduxjs/toolkit'
import { getAnecdotes } from '../services/anecdotes'

// export const initializeAnecdotes = createAsyncThunk('anecdotes/getAll', async () => {
//   const anecdotes = await getAnecdotes()
//   return anecdotes
// })

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action?.payload?.id
      const anecdoteToVote = current(state).find(a => a.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return current(state).map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(initializeAnecdotes.fulfilled, (state, action) => {
  //       return action.payload
  //     })
  // }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}
export default anecdoteSlice.reducer