import { useState } from "react";

const BlogForm = ({ createBlog, setMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState(" ");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    const blog = {
      title: title,
      date: new Date(),
      author: author,
      url: url,
    };

    createBlog(blog);

    setMessage(blog.title);
    setTimeout(() => {
      setMessage(null);
    }, 5000);

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        title
        <input
          onChange={({ target }) => setTitle(target.value)}
          value={title}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-blog" type="submit">create</button>
    </form>
  );
};

export default BlogForm;
