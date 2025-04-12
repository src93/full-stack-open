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

const tokenExtractor = (request, response, next) => {
  const token = request.get('Authorization')
  if (token && token.toLowerCase().startsWith('bearer ')) {
    request.token = token.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

module.exports = {
  errorHandler,
  unknownEndpoint,
  tokenExtractor
}