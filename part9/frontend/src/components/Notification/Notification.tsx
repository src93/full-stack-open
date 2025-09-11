import type { NotificationType } from '../../interfaces/interfaces'

interface NotificationProps {
  message: string;
  type: NotificationType;
}

const Notification = ({ message, type }: NotificationProps) => {
  return (
    <div style={{ color: type === 'error' ? 'red' : 'green' }}>
      {message}
    </div>
  )
}

export default Notification