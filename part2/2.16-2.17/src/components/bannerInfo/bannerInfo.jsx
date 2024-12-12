import './bannerInfo.css'

export const BannerInfo = ({ message }) => {
  return (
    <div className='success-message__content'>
      <p className='success-message__text'>{message}</p>
    </div>
  )
}