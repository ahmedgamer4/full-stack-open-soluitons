import { Person } from "./person"

export const Filter = ({ persons, searchResult, remove }) => {
  if (searchResult.length === 0) {
    return ( 
      <div>
        <h2>Numbers</h2>
        <div>
          <ul>
            {console.log(persons)}
            {persons.map(person => 
              <Person name={person.name} number={person.number} key={person.id} onClick={() => remove(person)}/>)}
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {searchResult.map(person => 
            <Person name={person.name} number={person.number} key={person.id} onClick={() => remove(person)}/>)}
        </ul>
      </div>
    </div> )
  }
