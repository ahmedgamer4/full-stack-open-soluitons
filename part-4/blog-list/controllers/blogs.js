/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs.map((blog) => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog.toJSON())
  } else {
    res.status(404).end()
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  const { token } = req
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } else {
    res.status(401).json({
      error: 'Unauthorized',
    })
  }
})

blogsRouter.post('/', async (req, res) => {
  const { body } = req
  const { user } = req
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (!body.title || !body.url) {
    return res.status(400).json({
      err: 'content missing',
    })
  }

  if (!body.likes) {
    body.likes = 0
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  logger.info(blog.title)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  logger.info(user.username)
  res.status(201).json(savedBlog.toJSON())
})

blogsRouter.patch('/:id', async (req, res) => {
  const { body } = req

  const updatedBlog = await Blog.findByIdAndUpdate({ _id: req.params.id }, body, { new: true })
  if (!updatedBlog) {
    return res.status(404)
  }
  res.status(200).json(updatedBlog.toJSON())
})
module.exports = blogsRouter
