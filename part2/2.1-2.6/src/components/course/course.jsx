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

export default Course