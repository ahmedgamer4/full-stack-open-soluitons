import { useEffect, useState} from 'react';
import { PersonForm } from './components/personForm';
import { Filter } from './components/Filter';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState(0)
  const [searchName, setSearch] = useState('')

  useEffect(() => {
    console.log('effect')
    axios.get('http://localhost:3001/persons')
    .then(response => {
      console.log(response.data)
      setPersons(response.data)
    })
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (checkPersons(person)) {
      console.alert('INVALID INPUT')
    }
    else {
      setPersons(persons.concat(person))
    }
  }
  
  const handlePersonChange = (e) => {
    console.log(e.target.value)
    if (e.target.value === '') {
      return
    }
    setNewName(e.target.value)
  }

  const checkPersons = (person) => {
    return (persons.includes(person) || person.number === '0') 
  }

  const handleNumberChange = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setNumber(e.target.value)
    }
  }

  const handleSearcher = (person, items) => {
    if (!person) {
      return items
    }
    return items.filter(p => p.name
                              .toLowerCase()
                              .includes(person.toLowerCase()))
  }

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    console.log(e.target.value)
  }

  const searchResult = handleSearcher(searchName, persons)



  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input type="text" onChange={handleSearchChange}/>
      <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <Filter searchResult={searchResult} />
    </div>
  )
}

export default App;
