import { useEffect, useState } from 'react';
import axios from 'axios';
import { Filter } from './Filter';

const api_key = '19daeb98f3e6bfece2b55af8b1cfd317'
console.log(process.env.REACT_APP_API_KEY)

const Search = ({ onChange }) => {
  return (
    <div>
      find countries <input type="text" required onChange={onChange} />
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
