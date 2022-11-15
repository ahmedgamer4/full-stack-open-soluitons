import { useState } from 'react'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StaticLine = (props) => {
  return (
    <p>{ props.text } { props.content }</p>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StaticLine text='good' content={props.good} />
      <StaticLine text='bad' content={props.bad} />
      <StaticLine text='neutral' content={props.neutral} />
      <StaticLine text='all' content={props.all} />
      <StaticLine text='average' content={props.getAverage()} />
      <StaticLine text='positive' content={(props.good / props.all) * 100} /> 
    </div>
  )
}


const App = () => {
   // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
   
  let all = bad + good + neutral

  const getAverage = () => {
    console.log('it works')
    return (
      (good*1 + bad*-1) / all 
    )
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <Statistics good={good} bad={bad} neutral={neutral} getAverage={getAverage} all={all} />

    </div>
  )
}

export default App;
