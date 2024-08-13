import React from "react";

function SignUp() {
  function handleSubmit() {
    //tutaj trzebabedzie zrobić logowanie po stronie serwera
  }

  return (
    <div className="sign-up-container">
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="sign-up-username">Username</label>
        <input type="text" name="sign-up-username" id="sign-up-username" />
        <label htmlFor="sign-up-password">Password</label>
        <input type="password" name="sign-up-password" id="sign-up-password" />
        <label htmlFor="sign-up-password-repeat">Repeat password</label>
        <input
          type="password"
          name="sign-up-password-repeat"
          id="sign-up-password-repeat"
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}

export default SignUp;
