require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person.js')

const morgan = require('morgan')
const cors = require('cors')

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name=='CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if(error.name=='ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(morgan(':method :url :body'))
app.use(express.static('build'))
app.use(errorHandler)

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-452653424'
  },
  {
    id: 2,
    name: 'joku',
    number: '040-3425326'
  },
  {
    id: 3,
    name: 'sgfd',
    number: '040-0000064537'
  }
]

const a = `Phonebook has info for ${persons.length} people`
const b = new Date()

const generateID = () => {
  return (Math.floor(Math.random()*1000))
}

app.get('/', (req, res) => {
  res.send('<div>Hello hello</div>')
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id).then(res.status(204).end())
    .catch(error => next(error))
})

const exists = (name) => {
  let a = false
  for(let i = 0; i < persons.length; i++) {
    if(persons[i].name == name) {
      a = true
    }
  }
  return a
}

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: 'content missing'
    })
  }
  else if(exists(body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    id: generateID(),
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id).then(person => {
    if(person) {
      res.json(person)
    }
    else {
      res.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.get('/info', (req, res) => {
  res.send(`<div>${a}</div><div>${b}</div>`)
})

app.put('api/persons/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})