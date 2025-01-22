import './weather.css'

export const WeatherDetail = ({ weather, nameCountry }) => {

  return (
    <>
      <h1>Weather in {nameCountry}</h1>
      <p>Temperature: {getTempInCelsius(weather?.main?.temp)} Celcius</p>
      <p>Wind: {weather?.wind?.speed} m/s</p>
    </>
  )
}

const getTempInCelsius = (temp = 273.15) => {
  const tempInCelsius = temp - 273.15
  return tempInCelsius.toFixed(2)
}