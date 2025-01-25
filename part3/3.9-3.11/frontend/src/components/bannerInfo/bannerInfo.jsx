import './bannerInfo.css'

export const BannerInfo = ({ message, type }) => {
  const contentClass = type === 'success' ? 'success-message__content' : 'error-message__content'
  const textClass = type === 'success' ? 'success-message__text' : 'error-message__text'
  return (
    <div className={contentClass}>
      <p className={textClass}>{message}</p>
    </div>
  )
}