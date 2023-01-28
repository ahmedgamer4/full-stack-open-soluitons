import Togglable from "./Togglable";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog, removeBlog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleIncrement = () => {
    const updatedObject = {
      ...blog,
      user: blog.user.id || null,
      likes: blog.likes + 1,
    };
    updateBlog(blog.id, updatedObject);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className="blog" style={blogStyle}>
      <span>{blog.title}</span>
      <Togglable buttonLabel="view">
        <span>{blog.url}</span>
        <span id="likes">
          likes {blog.likes} <button onClick={handleIncrement}>like</button>
        </span>
        <span>{blog.author}</span>
        <button onClick={handleRemove}>remove</button>
      </Togglable>
    </div>
  );
};

export default Blog;
