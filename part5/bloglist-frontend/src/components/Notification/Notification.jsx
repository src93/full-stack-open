import './Notification.css'

const Notification = ({ message, type }) => {
  return (
    <div className={type === 'error' ? 'error' : 'success'}>
      {message}
    </div>
  )
}

export default Notification