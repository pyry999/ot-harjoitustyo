import { useState } from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}

const Content = () => {
  <div>
    <p>code here</p>
  </div>
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ( { good, neutral, bad }) => {
  const total = good+bad+neutral
  let avg = (good*1 - bad*1)/total
  let pospros = ((good/total)*100).toFixed(2)
  if(total!==0) { 
  return (
  <tbody>
    < StatisticLine text="good" value={good} />
    < StatisticLine text="neutral" value={neutral} />
    < StatisticLine text="bad" value={bad} />
    < StatisticLine text="average" value={avg} />
    < StatisticLine text="positive" value={pospros} /> 
  </tbody>
  )
  }
  else {
    return (
      <tbody>
      <tr>
        <td>No feedback given</td>
      </tr>
      </tbody>
    )
  }
}

const StatisticLine = ( { text, value }) => {
  if (text === "positive") {
  return (
    <tr>
    <td>{text} {value} %</td>
    </tr>
  )
  }
  else {
    return (
        <tr>
          <td>{text} {value}</td>
        </tr>
      )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const header = "give feedback"
  const header2 = "statistics"

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
    < Header header={header} />
    < Button handleClick={handleGoodClick} text='good' /> 
    < Button handleClick={handleNeutralClick} text='neutral' />
    < Button handleClick={handleBadClick} text='bad' />
    < Header header={header2} />
    <table>< Statistics good={good} neutral={neutral} bad={bad} /></table>
    </div>
  )
}

export default App
