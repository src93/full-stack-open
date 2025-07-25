import { useState } from 'react';

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