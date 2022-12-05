const logger = require('./logger')

const requestLogger = (req, res, next) => {
  logger.info('Method ', req.method)
  logger.info('Path ', req.path)
  logger.info('Body ', req.body)
  logger.info('---------')
  next()
}

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CaseError') {
    return res.status(400).send({ err: 'malformatted error' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).send({ err: err.message })
  }
  next(err)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ err: 'unknown endpoint' })
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
}
