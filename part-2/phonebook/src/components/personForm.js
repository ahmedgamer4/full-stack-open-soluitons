export const PersonForm = ({ addPerson, handleNumberChange, handlePersonChange }) => {
  return (
    <div>
    <form onSubmit={addPerson}>
      <div>
        name: <input type="text" onChange={handlePersonChange}/>
        number: <input type="number" onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="sumbit" onClick={addPerson}>add</button>
      </div>
    </form>
    </div>
  )
}