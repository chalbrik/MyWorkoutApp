import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

function SignUp(props) {
  const [newUsername, setNewUserName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordRepeat, setNewPasswordRepeat] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    let checkPassword = newPassword === newPasswordRepeat ? true : false;

    if (checkPassword) {
      const newUser = {
        username: newUsername,
        password: newPassword,
      };

      try {
        const response = await axios.post(
          `http://localhost:5000/users/add-user`,
          newUser
        );
        if (response.status === 201) {
          console.log(response.data);
          const { token, newUserId } = response.data;
          console.log("Success");
          props.setToken(token);
          props.onSignUp(newUserId);
        }
      } catch (error) {
        console.error("Error in sign in: ", error);
      }
    } else {
      // tu trzeba coś zapisac żeby wyświetlił się komunikat że hasło się jest takie same
      console.error("Passwords do not match: ");
      props.notMatch();
    }
  }

  function handleNewUserNameChange(event) {
    event.preventDefault();
    setNewUserName(event.target.value);
  }

  function handleNewPasswordChange(event) {
    event.preventDefault();
    setNewPassword(event.target.value);
  }

  function handlePasswordRepeatChange(event) {
    event.preventDefault();
    setNewPasswordRepeat(event.target.value);
  }

  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sign-up-username">Username</label>
        <input
          type="text"
          name="sign-up-username"
          id="sign-up-username"
          onChange={handleNewUserNameChange}
        />
        <label htmlFor="sign-up-password">Password</label>
        <input
          type="password"
          name="sign-up-password"
          id="sign-up-password"
          onChange={handleNewPasswordChange}
        />
        <label htmlFor="sign-up-password-repeat">Repeat password</label>
        <input
          type="password"
          name="sign-up-password-repeat"
          id="sign-up-password-repeat"
          onChange={handlePasswordRepeatChange}
        />
        <button type="submit">Sign up</button>
      </form>
      {props.isPasswordMatch && (
        <p className="comment">Passwords do not match</p>
      )}
    </div>
  );
}

SignUp.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default SignUp;
