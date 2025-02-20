const router = require('express').Router()
const Person = require('../models/person')

router.get('/', (request, response, next) => {
  Person.find({})
    .then(persons => {
      response.json(persons)
    })
    .catch(error => next(error))
})

router.get('/:id', (request, response, next) => {
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

router.delete('/:id', (request, response, next) => {
  const { id } = request.params
  console.log('id en el delete', id)
  Person.findOneAndDelete({ _id: id })
    .then((person) => {
      console.log('person delete', person)
      response.status(204).end()
    })
    .catch(error => next(error))
})

router.post('/', async (request, response, next) => {
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

router.put('/:id', (request, response, next) => {
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

module.exports = router