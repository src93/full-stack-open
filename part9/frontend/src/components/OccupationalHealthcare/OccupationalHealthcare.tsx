import type { OccupationalHealthcareEntry } from '../../interfaces/interfaces'
import WorkIcon from '@mui/icons-material/Work';

type Props = {
  entry: OccupationalHealthcareEntry;
}

export const OcupationalHealthcare = ({ entry }: Props) => {
  return (
    <div>
      <p>{entry.date} <WorkIcon /></p>
      <p>{entry.description}</p>
      {entry.sickLeave && (
        <div>
          <p>sick leave:</p>
          <p>start date: {entry.sickLeave.startDate}</p>
          <p>end date: {entry.sickLeave.endDate}</p>
        </div>
      )}
      <p>employer name: {entry.employerName}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}