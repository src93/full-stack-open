import { useReducer, createContext } from 'react'

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        ...action.payload
      }
    }
    case 'CLEAR_USER':
      return {
        username: '',
        password: '',
        user: null
      }
    default:
      return state
  }
}

const UserContext = createContext()
const initializeUser = {
  username: '',
  password: '',
  user: null
}

export const UserProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initializeUser)

  return (
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext