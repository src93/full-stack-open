import type { HeaderProps } from '../../interfaces/interfaces'

const Header = (porps: HeaderProps) => {
  return <h1>{porps.courseName}</h1>
}

export default Header