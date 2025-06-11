import { useReducer, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.payload
    }
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '', typeMessage: '', timeoutId: null }
    default:
      return state
  }
}

const NotificationContext = createContext()
const initializeNotification = {
  message: '',
  typeMessage: '',
  timeoutId: null,
}

export const NotificationProvider = ({ children }) => {
  const [notification, notificationDispath] = useReducer(notificationReducer, initializeNotification)

  return (
    <NotificationContext.Provider value={{ notification, notificationDispath }}>
      {children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext