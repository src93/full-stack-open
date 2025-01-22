import './listCountries.css'

export const ListCountries = ( {countries, handleShowButton} ) => {
  return (
    <ul className='listCountries'>
      {countries.map(country => {
        return (
          <>
            <li key={country.name.common}>{country.name.common}</li>
            <button onClick={handleShowButton(country)}>show</button>
          </>
        )
      })}
    </ul>
  )
}