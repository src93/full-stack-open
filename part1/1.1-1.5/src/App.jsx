import './App.css'

function App() {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]


  const Header = ({ course }) => {
    return (
      <h1>{course}</h1>
    )
  }

  const Part = ({ part, exercise }) => {
    return (
      <p>{part} {exercise}</p>
    )
  }

  const Content = ({ parts }) => {
    return (
      <>
        <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} />
      </>
    )
  }

  const Total = ({ parts }) => {
    return (
      <p>Number total of exercises: { getTotalExercises(parts) }</p>
    )
  }

  const getTotalExercises = (parts) => {
    return parts.reduce((acc, current) => acc += current.exercises, 0)
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App
