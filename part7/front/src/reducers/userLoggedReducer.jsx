import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from '../services/login'

const initialState = {
  user: null,
  username: '',
  password: ''
}

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials) => {
    try {
      const user = await login(credentials)
      return user
    } catch (error) {
      console.error('Login failed:', error)
      throw new Error(error.response.data.error || 'Login failed')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      return {
        ...state,
        user
      }
    },
    setUsername(state, action) {
      const username = action.payload
      return {
        ...state,
        username
      }
    },
    setPassword(state, action) {
      const password = action.payload
      return {
        ...state,
        password
      }
    },
    logout() {
      window.localStorage.removeItem('loggedUser')
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const user = action.payload
        window.localStorage.setItem('loggedUser', JSON.stringify(user))
        return {
          user,
          username: '',
          password: ''
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.error.message)
        throw new Error(action.error.message || 'Login failed')
      })
  }
})

export const { setUser, setPassword, setUsername, logout } = userSlice.actions
export default userSlice.reducer