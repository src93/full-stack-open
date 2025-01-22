import { useState, useEffect } from 'react'
import { getAll } from './services/countries'
import { getWeather } from './services/weather'
import { BannerMessage } from './components/bannerMessage/bannerMessage'
import { ListCountries } from './components/listCountries/listCountries'
import { DetailCountry } from './components/detailCountry/detailCountry'

function App() {
  const [countries, setcountries] = useState([])
  const [query, setQuery] = useState('')
  const [listCountries, setListCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
  const [showTooManyCountriesMessage, setShowTooManyCountriesMessage] = useState(false)
  const [showListCountries, setShowListCountries] = useState(false)
  const [showDetailCountry, setShowDetailCountry] = useState(false)

  const handleShowButton = (country) => {
    return () => {
      setCountry(country)
    }
  }

  useEffect(() => {
    getAll()
      .then(countriesResponse => {
        console.log(countriesResponse)
        setcountries(countriesResponse)
      })
  }, [])

  useEffect(() => {
    setShowDetailCountry(true)
    console.log('tiempo', weather);
  }, [weather])

  // useEffect(() => {
  //   if (latlng.length) {
  //     getWeather(latlng[0], latlng[1])
  //       .then(weatherResponse => {
  //         setWeather(weatherResponse)
  //       })
  //   }
  // }, [latlng])

  useEffect(() => {
    if (country) {
      getWeather(country.latlng[0], country.latlng[1])
        .then(weatherResponse => {
          setWeather(weatherResponse)
        })
    }
  }, [country])

  useEffect(() => {
    if (!query) {
      setShowTooManyCountriesMessage(false)
      setShowListCountries(false)
      setShowDetailCountry(false)
      return
    }
    const filterCountry = countries.filter(country => country.name.common.toLowerCase().includes(query.toLowerCase()))
    const tooManyCountries = filterCountry.length > 10
    const lessThanTenCountries = filterCountry.length <= 10 && filterCountry.length > 1
    const onlyOneCountry = filterCountry.length === 1
    if (tooManyCountries) {
      setShowTooManyCountriesMessage(true)
    } else if (lessThanTenCountries) {
      setListCountries(filterCountry)
      setShowListCountries(true)
    } else if (onlyOneCountry) {
      setCountry(filterCountry[0])
      setShowDetailCountry(true)
    }
  }, [query])

  useEffect(() => {
    if (showDetailCountry) {
      setShowListCountries(false)
      setShowTooManyCountriesMessage(false)
    } else if (showListCountries) {
      setShowDetailCountry(false)
      setShowTooManyCountriesMessage(false)
    } else if (showTooManyCountriesMessage) {
      setShowDetailCountry(false)
      setShowListCountries(false)
    }
  }, [showDetailCountry, showListCountries, showTooManyCountriesMessage])

  const handleChangeFilter = (ev) => setQuery(ev.target.value)

  return (
    <>
      <span>find countries <input value={query} onChange={handleChangeFilter}></input></span>
      { showTooManyCountriesMessage ? <BannerMessage /> : '' }
      { showListCountries ? <ListCountries countries={listCountries} handleShowButton={handleShowButton} /> : '' }
      { showDetailCountry ? <DetailCountry country={country} weather={weather} /> : '' }
    </>
  )
}

export default App
