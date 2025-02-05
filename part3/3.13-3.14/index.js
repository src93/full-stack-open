require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : null
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :response-time :status :body'))

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:name', (request, response) => {
  const { name } = request.params

  Person.findOneAndDelete({ name }).then(() => {
    response.status(204).end()
  })
})

app.post('/api/persons', async (request, response) => {
  const { body } = request

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const ensureIsNotValidBody = !body.name || !body.phone
  const { name } = body
  const isNameExist = await Person.findOne({ name })

  if (ensureIsNotValidBody) {
    return response.status(400).json({
      error: 'name or phone is missing'
    })
  }

  if (isNameExist) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = new Person({
    name: body.name,
    phone: body.phone
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})