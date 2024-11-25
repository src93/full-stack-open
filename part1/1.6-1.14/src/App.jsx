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
  const [allComentaries, setAllComentaries] = useState(0)

  const getAllComentaries = () => bad + neutral + good
  const getAverage = () => (good * 1 + bad * -1) / allComentaries
  const getAveragePositve = () => `${good / allComentaries * 100} %`
  const handleOnClickBadButton = () => {
    setBad(bad + 1)
    setAllComentaries(allComentaries + 1)
  }
  const handleOnClickNeutralButton = () => {
    setNeutral(neutral + 1)
    setAllComentaries(allComentaries + 1)
  }
  const handleOnClickGoodButton = () => {
    setGood(good + 1)
    setAllComentaries(allComentaries + 1)
  }

  return (
    <>
      <Title />
      <div className='content-button'>
        <Button onHandleClick={handleOnClickBadButton} text={'Bad'} />
        <Button onHandleClick={handleOnClickNeutralButton} text={'Neutral'} />
        <Button onHandleClick={handleOnClickGoodButton} text={'Good'} />
      </div>
      <SecondTitle />
      <Statistic category={'bad'} result={bad} />
      <Statistic category={'neutral'} result={neutral} />
      <Statistic category={'good'} result={good} />
      <Statistic category={'all'} result={getAllComentaries()} />
      <Statistic category={'average'} result={getAverage()} />
      <Statistic category={'positive'} result={getAveragePositve()} />
    </>
  )
}

export default App
