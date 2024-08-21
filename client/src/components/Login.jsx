import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    //tutaj trzebabedzie zrobić logowanie po stronie serwera
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, userId } = response.data;
        props.setToken(token); //przekazuje token do komponentu nadrzędnego
        props.onLogin(userId); //przekazuje Id zalogowanego użytkownika do komponentu nadrzędnego
      }
    } catch (error) {
      props.notValid();
      console.error("Error in log in: ", error);
    }

    // w przypadku sukcesu dostane przypisane userId w response
  }

  function handleUsernameChange(event) {
    event.preventDefault();
    setUsername(event.target.value);
    console.log(event.target.value);
  }

  function handlePasswordChange(event) {
    event.preventDefault();
    setPassword(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="login-container">
      <h2>Log in</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="login-username">Username</label>
        <input
          type="text"
          name="login-username"
          id="login-username"
          onChange={handleUsernameChange}
        />
        <label htmlFor="login-password">Password</label>
        <input
          type="password"
          name="login-password"
          id="login-password"
          onChange={handlePasswordChange}
        />
        <button type="submit">Login</button>
      </form>
      {props.isValid && <p className="comment">Invalid credentials</p>}
    </div>
  );
}

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
