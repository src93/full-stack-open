import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    },
    addUser(state, action) {
      state.push(action.payload)
    }
  }
})

export const { setUsers, addUser } = usersSlice.actions
export default usersSlice.reducer

export const initializeUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(setUsers(users))
  }
}