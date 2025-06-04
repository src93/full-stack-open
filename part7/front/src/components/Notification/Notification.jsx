import './Notification.css'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const { message, typeMessage } = notification
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