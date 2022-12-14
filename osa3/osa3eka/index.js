const { response } = require('express')
const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-452653424"
  },
  {
    id: 2,
    name: "joku",
    number: "040-3425326"
  },
  {
    id: 3,
    name: "sgfd",
    number: "040-74564537"
  }
]

const a = `Phonebook has info for ${persons.length} people`
const b = new Date()

const generateID = () => {
    return (Math.floor(Math.random()*1000))
}


app.use(express.json())

app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    let a = false 

    for(let i = 0; i < persons.length; i++) {
        if(persons[i].name == body.name) {
            a = true
        }
    }

    if (!body.content) {
        return res.status(400).json({ 
          error: 'content missing' 
        })
      }
      else if(a) {
        return res.status(400).json({
            error: 'name must be unique'
        })
      }

    const person = {
        id: generateID(),
        name: body.name,
        number: body.number,
    }

    persons.concat(person)

    response.json(person)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

  app.get('/info', (req, res) => {
    res.send(`<div>${a}</div><div>${b}</div>`)
  })

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)