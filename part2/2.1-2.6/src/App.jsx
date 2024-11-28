const Course = ({ course }) => {
  return (
    <>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <TotalExercises total={course.parts.reduce((acc, current) => acc += current.exercises, 0)} />
    </>
  )
}

const Header = ({ title }) => (<h1>{title}</h1>)

const Content = ({ parts }) => parts.map(part => (<Part key={part.id} part={part} />))

const Part = ({ part }) => (<p>{part.name} {part.exercises}</p>)

const TotalExercises = ({ total }) => (<b>Total of {total} exercises</b>)

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App