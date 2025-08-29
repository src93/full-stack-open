interface ExercisesResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateExercises = (hoursDay: number[], target: number): ExercisesResult => {
  if (hoursDay.length === 0 || target === undefined) {
    throw new Error('No exercise data provided');
  }
  const periodLength = hoursDay.length;
  const trainingDays = hoursDay.filter(day => day).length;
  const average = hoursDay.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;
  const rating = success ? 3 : trainingDays / periodLength >= 0.5 ? 2 : 1;
  const ratingDescription = success
    ? 'great job!'
    : trainingDays / periodLength >= 0.5
    ? 'not too bad but could be better'
    : 'you need to work more';

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

const [target, ...hoursDay] = process.argv.slice(2).map(Number);
try {
  console.log(calculateExercises(hoursDay, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
