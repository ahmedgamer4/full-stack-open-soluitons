const totalLikes = (blogs) => {
  const reducer = (p, c) => p + c.likes
  const result = blogs.reduce(reducer, 0)
  return result
}

const favoriteBlog = (blogs) => {
  let mostLikded = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > mostLikded.likes) {
      mostLikded = blog
    }
  })
  return mostLikded
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.reduce((pre, blog) => {
    pre[blog.author] = (pre[blog.author] || 0) + 1
    return pre
  }, {})
  const max = Math.max(...Object.values(authors))
  const frequent = Object.keys(authors).filter((author) => authors[author] === max)
  return {
    author: frequent[0],
    blogs: max,
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.reduce((pre, blog) => {
    pre[blog.author] = (pre[blog.author] || 0) + blog.likes
    return pre
  }, {})
  const max = Math.max(...Object.values(authors))
  const liked = Object.keys(authors).filter((author) => authors[author] === max)
  return {
    author: liked[0],
    likes: max,
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
