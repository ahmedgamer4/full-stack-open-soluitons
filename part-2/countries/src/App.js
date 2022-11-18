import { useEffect, useState } from 'react';
import axios from 'axios';

const api_key = '19daeb98f3e6bfece2b55af8b1cfd317'
console.log(process.env.REACT_APP_API_KEY)

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

const Weather = ({ country }) => {
  const [weather, setWeather] = useState([{}])
  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }
    axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      console.log(response.data)
      setWeather(response.data)
    }) 
  })
  if (weather.length > 0) {
    const currentWeather = weather[0].current
    return (
      <div>
        <h1>Weather in {country.name.common}</h1>
        <p>temprature {currentWeather.temperature} Celcius</p>
        <img src={currentWeather.weather_icons[0]} alt="cloud image" ></img>
        <p>wind {currentWeather.wind_speed} m/h</p>
      </div>
    )
  }
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
      <img src={country.flag} alt="flag"></img>
      <Weather country={country} />
    </div>
  )
}

const Filter = ({ searchResult, setCurrentCountries }) => {
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

const App = () => {
  const [countries, setCountries] = useState([])
  const [currentCountries, setCurrentCountries] = useState([])
  const [countrySearch, setSearch] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [countries])


  const handleSearchInput = (e) => {
    setSearch(e.target.value)
    const currentCountries = countries.filter(c => c.name.common
                                     .toLowerCase()
                                     .includes(countrySearch.toLowerCase()))
    setCurrentCountries(currentCountries)
  }

  return (
    <div>
      <Search onChange={handleSearchInput} />
      <Filter searchResult={currentCountries}
              setCurrentCountries={setCurrentCountries} />
    </div>
  )
}

export default App
