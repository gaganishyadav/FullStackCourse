import { useState } from 'react'

const StatisticLine = (props) => {
  return(
      <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
      </tr>
  )
}

const Statistics = ({mood1,mood2,mood3}) => {
  if(mood1+mood2+mood3==0)
  {
    return (<div> No feedback given </div>)
  }
  return(
    <div>
      <table>
        <tbody>
        <StatisticLine text="good" value ={mood1} />
        <StatisticLine text="neutral" value ={mood2}/>
        <StatisticLine text="bad" value ={mood3}/>
        <StatisticLine text="total" value ={mood1+mood2+mood3}/>
        <StatisticLine text="average" value ={(mood1-mood3)/(mood1+mood2+mood3)}/>
        <StatisticLine text="positive" value ={`${mood1 / (mood1 + mood2 + mood3) * 100} %`}/>
        </tbody>
      </table>
    </div>
  )
}

const Button = (props) => {
  return(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text='good' handleClick={()=>setGood(good+1)}/>
      <Button text='neutral' handleClick={()=>{setNeutral(neutral+1)}}/>
      <Button text='bad' handleClick={()=>{setBad(bad+1)}}/>
      <h2>
        statistics
      </h2>
      <Statistics mood1={good} mood2={neutral} mood3={bad}/>
    </div>
  )
}

export default App