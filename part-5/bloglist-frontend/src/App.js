import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import login from "./services/login";
import { ErrMessageC, MessageC } from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [errMessage, setErrMessage] = useState(null);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.sort((a, b) => (a.likes > b.likes ? -1 : 1)))
      );
  }, []);

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await login({
        username,
        password,
      });

      localStorage.setItem("loggedUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log("login error");
      setErrMessage("wrong username or password");
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  const createBlog = (blogObject) => {
    blogService.create(blogObject).then((reutrnedBlog) => {
      setBlogs(blogs.concat(reutrnedBlog));
    });
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog">
        <BlogForm createBlog={createBlog} setMessage={setMessage} />
      </Togglable>
    );
  };

  const updateBlog = async (id, blogToUpdate) => {
    try {
      const updatedBlog = await blogService.update(id, blogToUpdate);
      setBlogs(blogs.map((b) => (b.id === id ? updatedBlog : b)));
    } catch (err) {
      setErrMessage("cannot update this blog" + id);
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.deleteOne(id);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      setErrMessage("cannot remove this blog" + id);
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
    }
  };

  return (
    <div>
      <ErrMessageC message={errMessage} />
      {/* <MessageC message={message} author={author} /> */}
      {user === null ? (
        LoginForm({
          username,
          password,
          handleLogin,
          setUsername,
          setPassword,
        })
      ) : (
        <>
          <p>{user.name} logged in </p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </>
      )}
      {/* {user !== null && BlogForm({ addBlog, handleBlogChange, newblog })} */}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
        />
      ))}
    </div>
  );
};

export default App;
