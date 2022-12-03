import { useEffect, useState} from 'react';
import { PersonForm } from './components/personForm';
import { Filter } from './components/Filter';
import libBackend from './services/persons';
import { ErrorMessage, Message } from './components/Message';

const App = () => {
  const [persons, setPersons] = useState([])
  const [resultPersons, setResult] = useState([])
  const [newName, setNewName] = useState(null)
  const [newNumber, setNumber] = useState(null)
  const [searchName, setSearch] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
                    setMessage(`${returnedPerson.name} has beed added`)
                  })
                  .catch(err => {
                    setErrorMessage(`Information of ${err} has already been removed from server`)
                  })
        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 5000);
      }
    }
    else if (newName !== null){
      setPersons((persons.concat(person)))
      libBackend
        .create(person)
        .then((result) => {
          console.log(result)
          setMessage(`${person.name} has been added`)
        })
        .catch(createdPerson => setErrorMessage(`Person validation failed: name: Path "name"
         (${person.name})
         is shorter than the minimum allowed length (3)`), 5000)
      setSearch('')
    }
    setTimeout(() => {
      setMessage(null)
      setErrorMessage(null)
    }, 5000);
  }

  
  const handlePersonChange = (e) => {
    console.log(e.target.value)
    if (!e.target.value) {
      alert('could not add null')
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
      <Message message={message} />
      <ErrorMessage message={errorMessage} />
      filter shown with <input type="text" onChange={handleSearcher}/>
      <PersonForm addPerson={addPerson} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />
      <Filter persons={persons} searchResult={resultPersons} remove={deletePerson} />
    </div>
  )
}

export default App;
