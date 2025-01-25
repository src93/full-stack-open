const express = require('express')
const app = express()
const morgan = require('morgan')

morgan.token('body', (request) => {
  return request.method === 'POST' ? JSON.stringify(request.body) : null
})

app.use(express.json())
app.use(morgan('tiny'))
app.use(morgan(':method :url :response-time :status :body'))

let persons = [
  {
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(item => item.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>
  `)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(item => item.id !== id)
  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const { body } = request
  const ensureIsNotValidBody = body ? !body.name || !body.number : true
  const isNameExist = body ? persons.some(item => item.name === body.name) : false

  if (ensureIsNotValidBody) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  if (isNameExist) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const person = {
    id: Math.floor(Math.random() * 1000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})