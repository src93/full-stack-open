import { Link } from 'react-router-dom'

interface Props {
  name: string;
  occupation: string;
  id: string;
}

export const ItemPatient = ({ name, occupation, id }: Props) => {
  return (
    <div>
      <Link to={`/patient/${id}`}>{name}</Link>
      <p>occupation: {occupation}</p>
    </div>
  );
}