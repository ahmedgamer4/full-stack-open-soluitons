import { useEffect, useState } from 'react';
import axios from 'axios';

const Button = ({ value, onClick }) => {
  return(
    <button onClick={onClick}>{value}</button>
  )
}

const Country = ({ name, onClick }) => {
  return (
    <li>
      {name} <Button onClick={onClick} value="show" />
    </li>
  )
}

const Search = ({ onChange }) => {
  return (
    <div>
      find countries <input type="text" required onChange={onChange} />
    </div>
  )
}

const WholeCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>
        <p>{country.capital}</p>
        <p>{country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.values(country.languages).map(element => 
            <li>{element}</li>    
          )}
        </ul>
      </div>
      <div>
        {country.flag}
      </div>
    </div>
  )
}

const Filter = ({ searchResult }) => {
  const showAllInfo = () => {
    return 
  }

  console.log(searchResult)

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
           key={searchResult.indexOf(country + 1)}
           name={country.name.common}
           onClick={showAllInfo} />
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrySearch, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [countries])

  const handleSearchInput = (e) => {
    setSearch(e.target.value)
  }

  const handleSearcher = (country, countries) => {
    if (!country) {
      return [] 
    }
     return countries.filter(c => c.name.common
                                        .toLowerCase()
                                        .includes(country.toLowerCase()))
  }

  const searchResult = handleSearcher(countrySearch, countries)

  return (
    <div>
      <Search onChange={handleSearchInput} />
      <Filter searchResult={searchResult} />
    </div>
  )
}

export default App
