const jwt = require('jsonwebtoken')
const User = require('../models/user')
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
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      err: 'invalid token',
    })
  }
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      err: 'token expired',
    })
  }
  if (err.name === 'BSONTypeError') {
    return res.status(400).json({
      err: 'BSONTypeError',
    })
  }
  if (err.name === 'CastError') {
    return res.status(400).json({
      err: 'Cast Error',
    })
  }

  logger.error(err.message)
  next(err)
}

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ err: 'unknown endpoint' })
  next()
}

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')

  req.token = null
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    req.token = authorization.substring(7)
  }
  next()
}

const userExtractor = async (req, res, next) => {
  const { token } = req
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    req.user = await User.findById(decodedToken.id)
  }
  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
}
