import { Part } from "./part"

export const Content = ({ parts }) => 
    <>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />)}
    </>