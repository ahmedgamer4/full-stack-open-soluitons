import { Button } from "./Button"

export const Country = ({ name, onClick }) => {
  return (
    <li>
      {name} <Button onClick={onClick} value="show" />
    </li>
  )
}