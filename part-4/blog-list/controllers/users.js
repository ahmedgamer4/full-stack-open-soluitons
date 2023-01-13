const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { info } = require('../utils/logger')

userRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return res.status(400).json({
      error: 'user is already exist',
    })
  }

  if (!password || !username) {
    return res.status(400).json({
      error: 'username and password are required',
    })
  }

  if (password.length < 3 || username.length < 3) {
    return res.status(400).json({
      error: 'password and username cannot be less than 3 chars',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  info(user)

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})

userRouter.get('/', async (req, res) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, date: 1 })

  res.status(200).json(users)
})

module.exports = userRouter
