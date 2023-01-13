const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

describe('addition of users', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })
  test('username and password should be bigger than 3', async () => {
    const newUser = {
      username: 'ah',
      password: 'aj',
      name: 'a',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('adding a user', async () => {
    const user = { username: 'test', name: 'test', password: '12345' }

    await api
      .post('/api/users')
      .send(user)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })
})
