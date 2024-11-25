import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const AnecdoteWithMostVotes = ({anecdote, votes}) => {
  return (
    <>
      <h1>Anecdote with most votes</h1>
      <p>{anecdote}</p>
      <p>Has {votes} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array.from({length: 8}, () => 0))
  const handleClickNextAnecdote = () => setSelected(Math.floor(Math.random() * 8))
  const handleClickVote = () => {
    points[selected] += 1
    setPoints([...points])
  }
  const getAnecdoteWithMostVotes = () => points.reduce((acc, current, index) => {
    return points[index] > acc.votes ? {index, votes: current} : acc
  }, {index: 0, votes: 0})

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Has {points[selected]} votes</p>
      <Button handleClick={handleClickVote} text={'Vote'} />
      <Button handleClick={handleClickNextAnecdote} text={'Next anecdote'} />
      <AnecdoteWithMostVotes anecdote={anecdotes[getAnecdoteWithMostVotes().index]} votes={getAnecdoteWithMostVotes().votes} />
    </div>
  )
}

export default App