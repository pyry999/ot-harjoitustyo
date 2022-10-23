import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    next anecdote
  </button>
)

const Button2 = (props) => (
  <button onClick={props.handleClick}>
    vote
  </button>
)

var votes = new Uint8Array(7)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(0)
  const header = "Anecdote of the day"
  const header2 = "Anecdote with most votes"
  var largestIndex = 0
  var largest = 0

    for(let i = 0; i<anecdotes.length; i++) {
      if(votes[i]>largest) {
        largest = votes[i]
        largestIndex = i
      }
    }
  
  const handleClick = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const handleClick2 = () => {
    votes[selected] += 1
    setVote(vote +votes[selected])
  }
  return (
    <div>
      <h1>{header}</h1>
      {anecdotes[selected]}
      <div>
      has {votes[selected]} votes
      </div>
      <div>
       < Button2 handleClick={handleClick2} />
       < Button handleClick={handleClick} />
      </div>
      <h1>{header2}</h1>
      <div>
        {anecdotes[largestIndex]}
        <div>
          has {largest} votes
        </div>
      </div>
    </div>
  )
}

export default App