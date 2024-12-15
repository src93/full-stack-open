import { useState, useEffect } from 'react'
import { getAll } from './services/countries'
import { BannerMessage } from './components/bannerMessage/bannerMessage'
import { ListCountries } from './components/listCountries/listCountries'
import { DetailCountry } from './components/detailCountry/detailCountry'


function App() {
  const [countries, setcountries] = useState([])
  const [query, setQuery] = useState('')
  const [listCountries, setListCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [showTooManyCountriesMessage, setShowTooManyCountriesMessage] = useState(false)
  const [showListCountries, setShowListCountries] = useState(false)
  const [showDetailCountry, setShowDetailCountry] = useState(false)

  useEffect(() => {
    getAll()
      .then(countriesResponse => {
        console.log(countriesResponse)
        setcountries(countriesResponse)
      })
  }, [])

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
    console.log('less', lessThanTenCountries, onlyOneCountry);
    if (tooManyCountries) {
      setShowTooManyCountriesMessage(true)
      setShowListCountries(false)
      setShowDetailCountry(false)
    } else if (lessThanTenCountries) {
      setListCountries(filterCountry)
      setShowListCountries(true)
      setShowDetailCountry(false)
      setShowTooManyCountriesMessage(false)
    } else if (onlyOneCountry) {
      setCountry(filterCountry[0])
      setShowDetailCountry(true)
      setShowListCountries(false)
      setShowTooManyCountriesMessage(false)
    }
  }, [query])

  const handleChangeFilter = (ev) => setQuery(ev.target.value)

  return (
    <>
      <span>find countries <input value={query} onChange={handleChangeFilter}></input></span>
      { showTooManyCountriesMessage ? <BannerMessage /> : '' }
      { showListCountries ? <ListCountries countries={listCountries} /> : '' }
      { showDetailCountry ? <DetailCountry country={country} /> : '' }
    </>
  )
}

export default App
