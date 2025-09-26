import type { HealthCheckEntry } from '../../interfaces/interfaces';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface Props {
  entry: HealthCheckEntry;
}

type HeartColor = 'primary' | 'secondary' | 'info' | 'warning' | 'inherit' | 'action' | 'disabled' | 'error' | 'success' | undefined;

export const HealthCheck = ({ entry }: Props) => {
  const getHeartColor = (
    rating: number
  ): HeartColor => {
    const heartColors: { [key: number]: HeartColor } = {
      0: 'primary',
      1: 'secondary',
      2: 'info',
      3: 'warning'
    };
    return heartColors[rating];
  }

  return (
    <div>
      <p>{entry.date} <MedicalInformationIcon /></p>
      <p>{entry.description}</p>
      <FavoriteBorderIcon color={getHeartColor(entry.healthCheckRating)} />
      <p>diagnose by {entry.specialist}</p>
    </div>
  )
}