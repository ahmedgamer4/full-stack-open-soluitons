import { useState } from "react";

const Heighest = (props) => {
    const max = Math.max(...props.points)
    const index = props.points.indexOf(max)
    if (max === 0) {
      return (
        <p>No votes yet</p>
      )
    }
    return (
      <div>
        { props.anecdotes[index] }
        has { max } votes
      </div>
    )
}

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const arr = Array(7).fill(0)
  const [points, setPoints] = useState(arr)

  const handleButton = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  const vote = () => {
    const copy = [...points]
    copy[selected]++
    setPoints(copy)
  }

  return (
    <div>
      <div>
        {anecdotes[selected]}
      </div>
      <p>has {points[selected]} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={handleButton}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Heighest anecdotes={anecdotes} points={points} />
    </div>
  )
}

export default App;
