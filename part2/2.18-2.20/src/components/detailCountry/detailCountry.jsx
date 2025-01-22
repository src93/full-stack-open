import './detailCountry.css'
import { WeatherDetail } from '../weather/weather'

export const DetailCountry = ({ country, weather }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(language => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img className="flag" src={country.flags.svg} />
      <WeatherDetail weather={weather} nameCountry={country.name.common} />
    </>
  )
}