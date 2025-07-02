import { useSelector } from 'react-redux'
import {
  ErrorMessage,
  SuccessMessage
} from './Notification.js'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { message, typeMessage } = notification
  if (!message) {
    return null
  }
  return (
    typeMessage === 'error'
      ? <ErrorMessage data-testid="errorMessage">{message}</ErrorMessage>
      : <SuccessMessage data-testid="successMessage">{message}</SuccessMessage>
  )
}

export default Notification