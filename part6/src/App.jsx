import { useState } from 'react'
import './App.css'

function App({ store }) {
  const handleStore = (type) => {
    store.dispatch({
      type
    })
  }

  return (
    <div>
      <button onClick={() => handleStore('GOOD')}>good</button> 
      <button onClick={() => handleStore('OK')}>ok</button>
      <button onClick={() => handleStore('BAD')}>bad</button>
      <button onClick={() => handleStore('ZERO')}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

export default App
