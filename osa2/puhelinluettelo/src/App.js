import { useState, useEffect } from 'react'
import axios from 'axios'

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
    <div>
          <button type="submit">add</button>
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
    <div key={person.name}> {person.name} {person.number}</div>
    )}
  </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(persons)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
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
    setPersons(persons.concat(personObject))
    setShowAll(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
    else {
      alert(`${newName} is already added`)
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
      <h2>Phonebook</h2>
      <Form addPerson={addPerson} handleShown={handleShown} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons showAll={showAll} />
    </div>
  )

}

export default App

