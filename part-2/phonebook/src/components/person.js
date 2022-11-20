export const Person = ({ name, number, onClick }) => {
  return (
    <div>
      <li>{name} {number}</li>
      <button onClick={onClick}>delete</button>
    </div>
  )
}