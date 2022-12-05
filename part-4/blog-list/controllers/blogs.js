const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then((blogs) => res.json(blogs))
})

blogsRouter.get('/:id', (req, res, next) => {
  const { id } = req.params
  Blog.findById(id)
    .then((blog) => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404)
      }
    })
    .catch((err) => next(err))
})

// blogsRouter.delete('/:id', (req, res, next) => {
//   const { id } = req.params
//   Blog.findByIdAndRemove(id)
//     .then(() => {
//       res.status(204).end()
//     })
//     .catch((err) => next(err))
// })

blogsRouter.post('/', (req, res, next) => {
  const { body } = req.body

  if (!body.title) {
    return res.status(400).json({
      err: 'content missing',
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  })
  blog.save()
    .then((savedBlog) => res.json(savedBlog))
    .catch((err) => next(err))
})

// blogsRouter.put('/:id', (req, res, next) => {
//   const { body } = req.body
//   const blog = {
//     title
//   }
// })
module.exports = blogsRouter