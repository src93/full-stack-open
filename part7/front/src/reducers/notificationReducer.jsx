import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  typeMessage: null,
  timeoutId: null
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const { message, typeMessage, timeoutId } = action.payload
      clearTimeout(state.timeoutId)
      state.message = message
      state.typeMessage = typeMessage
      state.timeoutId = timeoutId
    },
    setTimeoutId(state, action) {
      const { timeoutId } = action.payload
      state.timeoutId = timeoutId
    },
    clearMessage() {
      // clearTimeout(state.timeoutId)
      return initialState
    }
  }
})

export const { setMessage, clearMessage, setTimeoutId } = notificationSlice.actions
export default notificationSlice.reducer