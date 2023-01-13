const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'some title',
    author: 'me',
    url: '@.mail',
    likes: 2,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  blogsInDb,
  initialBlogs,
}
