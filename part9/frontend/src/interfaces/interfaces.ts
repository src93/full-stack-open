export interface DiaryEntry {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
}

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export type Visibility = 'great' | 'good' | 'ok' | 'poor';

// Define a type for new diary entries without the 'id' field
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>;