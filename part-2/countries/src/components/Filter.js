import { WholeCountry } from "./WholeCountry"
import { Country } from "./Country"

export const Filter = ({ searchResult, setCurrentCountries }) => {
  if (searchResult.length > 10)  {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  else if (searchResult.length === 1) {
    return (
      <div>
        <WholeCountry country={searchResult[0]} />
      </div>
    )
  }

  return (
    <div>
      <ul>
        {searchResult.map(country => 
          <Country 
           key={searchResult.indexOf(country) + 1}
           name={country.name.common}
           onClick={() => setCurrentCountries([country])} />
        )}
      </ul>
    </div>
  )
}