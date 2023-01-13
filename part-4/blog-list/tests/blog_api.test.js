const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  // const blogObject = helper.initialBlogs
  //   .map((blog) => new Blog(blog))
  // const promiseArray = blogObject.map((blog) => blog.save())
  // await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('unique idenifiers is called id', async () => {
  const res = await api.get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

describe('addition of a new blog', () => {
  let token = null
  beforeAll(async () => {
    await User.deleteMany()

    const passwordHash = await bcrypt.hash('12345', 10)
    const user = new User({ username: 'test', name: 'test', passwordHash })
    await user.save()

    const userForToken = { username: 'test', id: user.id }
    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('the default likes is 0', async () => {
    const newBlog = {
      title: 'some title 2',
      author: 'me',
      url: '@.mail',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'some title 2',
      author: 'me',
      url: '@.mail',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('some title 2')
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'some title 2',
      author: 'me',
      url: '@.mail',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).toContain('some title 2')
  })

  test('verify that if blog does not have title or url the status code will be 400', async () => {
    const newBlog = {
      title: 'any',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deletion of blogs', () => {
  let token = null
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('12344', 10)

    const user = new User({
      username: 'test',
      name: 'test',
      passwordHash,
    })
    await user.save()

    const userForToken = { username: 'test', id: user.id }
    token = jwt.sign(userForToken, process.env.SECRET)

    const newBlog = {
      title: 'some title 2',
      author: 'me',
      url: '@.mail',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map((b) => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blog = blogsAtStart[0]

  await api
    .patch(`/api/blogs/${blog.id}`)
    .send({ likes: 10 })
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlog = blogsAtEnd[0]

  expect(updatedBlog.likes).toBe(10)
})
