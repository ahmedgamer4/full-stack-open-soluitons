import { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ name }) => {
  return (
    <li>
      {name}
    </li>
  )
}

const Filter = ({ searchResult }) => {
  return (
    <div>
      <ul>
        {searchResult.map(country => 
          <Country key={searchResult.indexOf(country + 1)}
           name={country.name.common} />
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState()

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      console.log(countries)
    })
  }, [countries])

  return (
    <Filter searchResult={countries} />
  )
}

export default App;
