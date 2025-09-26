import type { HospitalEntry } from '../../interfaces/interfaces'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface Props {
  entry: HospitalEntry;
}

export const Hospital = ({ entry }: Props) => {
  return (
    <div>
      <p>{entry.date} <LocalHospitalIcon /></p>
      <p>{entry.description}</p>
      <p>discharge date: {entry.discharge.date}</p>
      <p>criteria: {entry.discharge.criteria}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}