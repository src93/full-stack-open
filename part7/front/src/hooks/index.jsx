import { useState, useContext } from 'react';
import NotificationContext from '../context/NotificationContext.jsx';

export const useFiled = (name) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    name,
    reset,
    onChange
  }
}

export const useNotification = () => {
  const { notification, notificationDispath } = useContext(NotificationContext)

  const setNotification = ({message, typeMessage, timeout = 5000}) => {
    if (notification.timeoutId) {
      clearTimeout(notification.timeoutId)
    }
    const timeoutId = setTimeout(() => {
      notificationDispath({ type: 'CLEAR_NOTIFICATION' })
    }, timeout)

    notificationDispath({
      type: 'SET_NOTIFICATION',
      payload: { message, typeMessage, timeoutId }
    })
  }

  return {
    ...notification,
    setNotification
  }
}