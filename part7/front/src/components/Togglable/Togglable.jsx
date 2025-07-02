import { useState, forwardRef, useImperativeHandle } from 'react'
import { ButtonCancel, ButtonDefault } from './Togglable'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const contentDefault = () => {
    return (
      <ButtonDefault
        data-testid="btnToggleShow"
        onClick={toggleVisibility}>{buttonLabel}</ButtonDefault>
    )
  }
  const contentChildren = () => {
    return (
      <>
        {children}
        <ButtonCancel onClick={toggleVisibility}>Cancel</ButtonCancel>
      </>
    )
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      {visible ? contentChildren() : contentDefault()}
    </>
  )
})

export default Togglable