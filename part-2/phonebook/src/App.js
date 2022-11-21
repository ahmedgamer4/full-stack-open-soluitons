import { useEffect, useState} from 'react';
import { PersonForm } from './components/personForm';
import { Filter } from './components/Filter';
import libBackend from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [resultPersons, setResult] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [searchName, setSearch] = useState('')

  useEffect(() => {
    libBackend.getAll()
    .then(response => {
      console.log(response)
      setPersons(response)
    })
  }, []) 

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
    }

    const onlyPerson = persons.filter((person) => 
      person.name === newName
    )

    if (onlyPerson.length !== 0) {
      console.log('yes')
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one ? `)) {
        const changedPerson = {...onlyPerson[0], number: newNumber} 

        libBackend.update(onlyPerson[0].id, changedPerson)
                  .then(returnedPerson => {
                    console.log(returnedPerson)
                    setPersons(persons.map(p => p.id !== onlyPerson[0].id ? p : returnedPerson))
                  })
      }
    }
    else {
      setPersons((persons.concat(person)))
      libBackend.create(person)
           .catch(error => console.log('fail to add this person to the backend'))
      setSearch('')
    }
  }

  
  const handlePersonChange = (e) => {
    console.log(e.target.value)
    if (e.target.value === '') {
      return
    }
    else {
      setNewName(e.target.value)
    }
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
