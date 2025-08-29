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

console.log(calculateExercises([6, 4, 2, 3, 3, 4, 3], 2));
