import { useState } from 'react'
import './App.css'

const Title = () => (<h2>Give feedback</h2>)
const Button = ({ onHandleClick, text }) => {
  return (
    <button onClick={onHandleClick}>{text}</button>
  )
}
const SecondTitle = () => (<h2>Statistics</h2>)
const Statistic = ({ result, category }) => (<p>{category} {result}</p>)
const Statistics = ({ bad, neutral, good, all, average, positive }) => {
  const withCommentaries = (
    <>
      <Statistic category={'bad'} result={bad} />
      <Statistic category={'neutral'} result={neutral} />
      <Statistic category={'good'} result={good} />
      <Statistic category={'all'} result={all} />
      <Statistic category={'average'} result={average} />
      <Statistic category={'positive'} result={positive} />
    </>
  )
  const withoutCommentaries = (
    <p>No feedback given</p>
  )
  return all ? withCommentaries : withoutCommentaries
}

function App() {
  const [bad, setBad] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [good, setGood] = useState(0)
  const [allComentaries, setAllComentaries] = useState(0)

  const getAllComentaries = () => bad + neutral + good
  const getAverage = () => isNaN((good * 1 + bad * -1) / allComentaries) ? 0 : (good * 1 + bad * -1) / allComentaries
  const getAveragePositve = () => isNaN(good / allComentaries * 100) ? '0 %' : `${good / allComentaries * 100} %`
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
      <Statistics
        bad={bad}
        neutral={neutral}
        good={good}
        all={getAllComentaries()}
        average={getAverage()}
        positive={getAveragePositve()} />
    </>
  )
}

export default App
