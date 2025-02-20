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

module.exports = {
  errorHandler,
  unknownEndpoint
}