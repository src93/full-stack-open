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

const errorHandler = (error, request, response, next) => {
  const errors = {
    CastError: () => response.status(400).send({ error: 'malformatted id' }),
    ValidationError: () => response.status(400).json({ error: error.message }),
    DocumentNotFoundError: () => response.status(404).send({ error: 'not found' }),
    MongooseError: () => response.status(400).json({ error: error.message }),
  }
  console.error(error.message)

  errors[error.name] && errors[error.name]() || next(error)
}
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  console.log('id en el delete', id)
  Person.findOneAndDelete({ _id: id })
    .then((person) => {
      console.log('person delete', person)
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', async (request, response, next) => {
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
  console.log('person', person)
  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  console.log('entra en el put')
  const { body } = request

  if (!body) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const { name, phone } = body
  Person.findByIdAndUpdate(request.params.id, { name, phone }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})

app.use(errorHandler)
app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})