import { useState } from 'react'

const Display = (props) => {
  const max = props.votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)

  return (
    <>
      {props.array[max]} <br/>
      has {props.votes[max]} votes
    </>
  )
}

const Button1 = (props) => {
  const copy = [...props.votes]
  
  return(
    <>
      has {copy[props.state]} votes <br/>
      <button onClick={()=>{copy[props.state]+=1; props.handleClick(copy)}}>
        vote
      </button>
    </>
  )
}

const Button2 = (props) => {
  return (
    <>
      <button onClick={()=>props.handleClick(Math.floor(Math.random()*8))}>
        next anecdote
      </button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const x= Array(8).fill(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(x)
  
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br/>
      <Button1 handleClick={setVotes} votes={votes} state={selected}/>
      <Button2 handleClick={setSelected}/>
      <h2>Anecdote with most votes</h2>
      <Display votes={votes} array={anecdotes}/>
    </div>
  )
}

export default App