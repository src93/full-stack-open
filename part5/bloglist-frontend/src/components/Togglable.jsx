import { useState, forwardRef, useImperativeHandle } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const contentDefault = () => {
    return (
      <button onClick={toggleVisibility}>{buttonLabel}</button>
    )
  }
  const contentChildren = () => {
    return (
      <>
        {children}
        <button onClick={toggleVisibility}>Cancel</button>
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