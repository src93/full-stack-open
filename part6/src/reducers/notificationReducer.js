import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  timeoutId: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      return {
        ...state,
        message: action.payload.message
      };
    },
    setTimeoutId(state, action) {
      return {
        ...state,
        timeoutId: action.payload.timeoutId
      };
    },
    // eslint-disable-next-line no-unused-vars
    clearNotification(state, action) {
      clearTimeout(state.timeoutId);
      return initialState;
    }
  }
})

export const { setMessage, setTimeoutId, clearNotification } = notificationSlice.actions
export default notificationSlice.reducer