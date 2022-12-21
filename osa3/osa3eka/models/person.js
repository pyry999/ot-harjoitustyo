const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to', url)
mongoose.connect(url)
  .then(console.log('connected to MongoDB'))
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

function numberValidator(number)  {
  const splitted = number.split('-')
  const a = splitted[0].length == 2 || splitted[0].length == 3
  const b = number.includes('-')
  const c = splitted[1].length > (7-splitted[0].length)
  const d = splitted.length == 2
  return a && b && c && d
}

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
  },
  number: {
    type: String,
    minlength: 8,
    validate: [numberValidator, 'Invalid number'],
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)