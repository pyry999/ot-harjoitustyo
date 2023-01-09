import { useState, useEffect } from 'react'
import personService from './services/persons'
//import axios from 'axios'

const Filter = (props) => {
  return (
    <div>
      filter shown with <input
      onChange={props.handleShown}/>
    </div>
  )
}

const Person = (props) => {
  return (
  <div>
 <p> name: <input 
  value={props.newName}
  onChange={props.handleNameChange}/></p>
  <p>number: <input 
  value={props.newNumber}
  onChange={props.handleNumberChange}/></p>
</div>
  )
}

const Button = (props) => {
  return (
    <div><button type="submit">add</button></div>
        
  )
}

const Notification = ({message}) => {
  if(message===null) {
    return null
  }

  return (
    <div className="message">
      {message}
    </div>
  )
}

const Form = (props) => {
  return (
    <form onSubmit={props.addPerson}>
    <Filter handleShown={props.handleShown}/>
    <h2>Add a new</h2>
    <Person newName={props.newName} handleNameChange={props.handleNameChange} newNumber={props.newNumber} handleNumberChange={props.handleNumberChange}/> 
    <Button/>
  </form>
  )
}



const Persons = (props) => {
  return (
    <div>
  {props.showAll.map(person => 
    <div key={person.name}> {person.name} {person.number} <button onClick={()=>props.removePerson(person.id)}>delete</button></div>
    )}
  </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(persons)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
        setShowAll(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(!persons.map(person => person.name).includes(newName)) {
    personService
      .create(personObject)
      .then(response => {
    setPersons(persons.concat(response.data))
    setShowAll(persons.concat(response.data))
    setMessage(`Added ${newName}`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewName('')
    setNewNumber('')
      })
      .catch(error => {
        setMessage(error.response.data)
      })
    
    }
    else {
      if(window.confirm(`${newName} is already added, replace the old number?`)) {
        const p = persons.find(n => n.name === newName)
        const changed = {...p, number: newNumber}

        personService
          .update(p.id, changed)
          .then(response => {
            setPersons(persons.map(person => person.id !== p.id ? person : response.data))
            setShowAll(persons.map(person => person.id !== p.id ? person : response.data))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  //  console.log(persons)
  }

  const removePerson = (id) => {
    if(window.confirm("haluukko poistaa")) {
   // setPersons(persons.filter(n => n.id !== id))
    //setShowAll(persons.filter(n => n.id !== id))
   // setMessage(`removed ${persons.find(n=> n.id===id).name}`)
   const toDelete = persons.find(n=> n.id===id)
    personService
      .rem(id).then(pers => {
        setPersons(persons.filter(n => n.id !== pers.id))
        setShowAll(persons.filter(n => n.id !== pers.id))
        setMessage(`removed ${toDelete.name}`)
      })

    setTimeout(() => {
      setMessage(null)
    }, 5000)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleShown = (event) => {
    console.log(event.target.value)
    setShowAll(persons.filter((n) => n.name.toLowerCase().includes(event.target.value.toLowerCase()) || n.number.includes(event.target.value)))
  }

  return (
    <div>
      <h1>Phonbook</h1>
      <Notification message={message}/>
      <Form addPerson={addPerson} handleShown={handleShown} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons showAll={showAll} removePerson={removePerson} />
    </div>
  )

}

export default App

