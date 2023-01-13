const express = require('express')

const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const config = require('./utils/config')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((err) => {
    logger.error('error connecting to MongoDB', err.message)
  })

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app
