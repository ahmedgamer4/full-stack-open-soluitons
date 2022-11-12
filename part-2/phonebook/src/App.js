import { useState } from 'react';
import { Person } from './components/person';

function App() {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: 0}
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState(0)

  const addPerson = (e) => {
    e.preventDefault()
    const person = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (checkPersons(person)) {
      return
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
    if (persons.includes(person)) {
      console.alert(`${person.name} is already added to phonebook`)
    }
  }

  const handleNumberChange = (e) => {
    e.preventDefault()
    if (e.target.value !== '') {
      setNumber(e.target.value)
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" onChange={handlePersonChange}/>
          number: <input type="number" onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="sumbit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul>
          {persons.map(person => 
            <Person name={person.name} number={person.number} key={person.id} />)}
        </ul>
      </div>
    </div>
  )
}

export default App;
