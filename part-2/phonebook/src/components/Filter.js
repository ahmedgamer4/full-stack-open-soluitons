import { Person } from "./person"

export const Filter = ({ searchResult}) => {
  return (
    <div>
      <h2>Numbers</h2>
      <div>
        <ul>
          {searchResult.map(person => 
            <Person name={person.name} number={person.number} key={person.id} />)}
        </ul>
      </div>
    </div> )
  }