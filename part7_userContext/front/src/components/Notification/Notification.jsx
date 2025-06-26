import './Notification.css'
import { useNotification } from '../../hooks'

const Notification = () => {
  const { message, typeMessage } = useNotification()
  if (!message) {
    return null
  }
  return (
    <div className={typeMessage === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification