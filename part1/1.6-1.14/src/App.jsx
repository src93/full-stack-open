import { useState } from 'react'
import './App.css'

const Title = () => (<h2>Give feedback</h2>)

const Button = ({ onHandleClick, text }) => {
  return (
    <button onClick={onHandleClick}>{text}</button>
  )
}

const ContentButton = ({
  handleBadButton,
  handleNeutralButton,
  handleGoodButton
}) => {
  return (
    <div className='content-button'>
      <Button onHandleClick={handleBadButton} text={'Bad'} />
      <Button onHandleClick={handleNeutralButton} text={'Neutral'} />
      <Button onHandleClick={handleGoodButton} text={'Good'} />
    </div>
  )
}

const SecondTitle = () => (<h2>Statistics</h2>)

const Statistic = ({ result, category }) => (<p>{category} {result}</p>)

function App() {
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)

  return (
    <>
      <Title />
      <ContentButton
        handleBadButton={() => setBad(bad + 1)}
        handleNeutralButton={() => setNeutral(neutral + 1)}
        handleGoodButton={() => setGood(good + 1)}
      />
      <SecondTitle />
      <Statistic category={'bad'} result={bad} />
      <Statistic category={'neutral'} result={neutral} />
      <Statistic category={'good'} result={good} />
    </>
  )
}

export default App
