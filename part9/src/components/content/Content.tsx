import type { ContentProps } from '../../interfaces/interfaces'
import Part from '../part/part'

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} part={part} />
      ))}
    </div>
  )
}

export default Content