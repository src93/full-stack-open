import type { ContentProps } from '../../interfaces/interfaces'

const Total = (props: ContentProps) => {
  const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0)

  return <p>Number of exercises {totalExercises}</p>
}

export default Total