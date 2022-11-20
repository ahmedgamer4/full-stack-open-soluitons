import { useEffect, useState} from 'react';
import { PersonForm } from './components/personForm';
import { Filter } from './components/Filter';
import axios from 'axios';
import libBackend from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [resultPersons, setResult] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState(0)
  const [searchName, setSearch] = useState('')

  useEffect(() => {
    libBackend.getAll()
    .then(response => {
      setPersons(response)
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
      libBackend.create(person)
           .catch(error => console.log('fail to add this person to the backend'))
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

  const handleSearcher = (e ) => {
    setSearch(e.target.value)
    if (!searchName) {
      setResult(persons)
    }
    const searchResult = persons.filter(p => p.name
                                .toLowerCase()
                                .includes(searchName.toLowerCase()))
    
    setResult(searchResult)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Do you want to delete ${person.name} ?`)) {
      libBackend.remove(person.id)
         .then(response => console.log(response.data))
         .catch(err => console.log('could not delete this person'))
      setPersons(persons.filter(p=> person.id !== p.id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input type="text" onChange={handleSearcher}/>
      <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <Filter persons={persons} searchResult={resultPersons} remove={deletePerson} />
    </div>
  )
}

export default App;
