import PropsTypes from "prop-types";

const LoginForm = ({
  handleLogin,
  username,
  setUsername,
  setPassword,
  password,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <label>username</label> 
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type="password"
          name="Password"
          id="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  );
};

LoginForm.prototype = {
  handleLogin: PropsTypes.func.isRequired,
  username: PropsTypes.string.isRequired,
  password: PropsTypes.string.isRequired,
  setPassword: PropsTypes.func.isRequired,
  setUsername: PropsTypes.func.isRequired,
};

export default LoginForm;
