import { useState, useEffect } from 'react'
import network from './network'

const Notification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Filter = ({searchName, setSearchName}) => {
  const searchingname = (event) => {
    setSearchName(event.target.value)
  }
  return(
    <>
      filter shown with <input value={searchName} onChange={searchingname}/>
    </>
  )
}

const PersonForm = ({newName,newNumber,setNewName,setNewNumber,persons,setPersons,setErrorMessage}) => {
  const enteringname = (event) => {
    setNewName(event.target.value)
  }

  const enteringnumber = (event) => {
    setNewNumber(event.target.value)
  }
  
  const submission = (event) => {
    event.preventDefault()
    if(persons.map(i=>i.name).includes(newName)){
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const person = persons.find(i=>i.name===newName)
        const newperson = {...person, number: newNumber}
        network.updation(newperson)
          .then(
            data=>{
              setPersons(persons.map(i=>i.id===person.id?data:i))
              setErrorMessage(`${data.name} contact number changed`)
              setTimeout(()=>{
                setErrorMessage('')
              },1200)
            })
          .catch(error=>{
            setErrorMessage(error.response.data.error)
            setTimeout(()=>{
              setErrorMessage('')
            },1500)
            setPersons(persons.filter(i=>i.id!==person.id))
          })
      }
      setNewName('')
      setNewNumber('')
      return
    }
    if(newName!=='' || newNumber!==''){
      const object = { name: newName, number: newNumber}
      network.creation(object)
        .then(data=>{setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
          setErrorMessage(`Added ${data.name}`)
          setTimeout(()=>{
            setErrorMessage('')
          },1200)})
        .catch(error=>{
          setErrorMessage(error.response.data.error)
          setTimeout(()=>{
            setErrorMessage('')
          },1500)
        })
    }
  }
  
  return(
    <form onSubmit={submission}>
      <div>
        name: <input value={newName} onChange={enteringname}/>
      </div>
      <div>
        number: <input value={newNumber} onChange={enteringnumber}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({persons,searchName,setPersons}) => {
  const deleting = (id,name) => {
    if(confirm(`Delete ${name} ?`)){
      network.deletion(id)
      setPersons(persons.filter(i=>i.id!==id))
    }
  }

  return(
    <>
      {persons.filter(i=>i.name.toLowerCase().includes(searchName.toLowerCase()))
      .map(i=><p key={i.name}>{i.name} {i.number} <button onClick={()=>deleting(i.id,i.name)}>delete</button></p>)}
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(()=>{
    network.download().then((data)=>setPersons(data))
  },[])

  return (
    <div>
      <Notification message={errorMessage}/>
      <h2 id='title'>Phonebook</h2>
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNumber={newNumber} setNewName={setNewName} setNewNumber={setNewNumber}
        persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
      <h3>Numbers</h3>
      <Persons persons={persons} searchName={searchName} setPersons={setPersons}/>
    </div>
  )
}

export default App