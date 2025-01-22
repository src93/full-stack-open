import axios from 'axios'

export const getWeather = async (lat, lon) => {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  const response = await axios.get(url)
  return response.data
}