import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AddWorkoutButton from "./components/AddWorkoutButton";
import WorkoutCard from "./components/WorkoutCard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userId, setUserId] = useState(localStorage.getItem("userId"));

  const [displayLogout, setDisplayLogout] = useState(
    localStorage.getItem("displayLogout")
  );

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userId) {
      axiosFetchData(userId);
    }
  }, [isLoggedIn, userId]);

  const axiosFetchData = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${userId}/workouts`
      );
      setWorkoutCards(response.data);
    } catch (error) {
      console.error("Error in fetching data for logged user: ", error);
    }
  };

  async function addWorkoutCard(event) {
    const newWorkoutCard = {
      id: workoutCards.length + 1,
      workoutTitle: "",
      exerciseTabs: [],
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/users/${userId}/add-workouts`,
        newWorkoutCard
      );
      setWorkoutCards([...workoutCards, response.data]);
    } catch (error) {
      console.error("Error in adding workout card: ", error);
    }

    event.preventDefault();
  }

  function handleOnDelete(id) {
    setWorkoutCards((prevCards) => prevCards.filter((card) => card.id !== id));
  }

  function handleLogin(userId) {
    setUserId(userId);
    setIsLoggedIn(true);
    setDisplayLogout(true);
    setPasswordMatch(false);
    setInvalidCredentials(false);
    localStorage.setItem("userId", userId);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("displayLogout", "true");
  }

  function handleSignUp(newUserId) {
    setUserId(newUserId);
    setIsLoggedIn(true);
    setDisplayLogout(true);
    setPasswordMatch(false);
    setInvalidCredentials(false);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("displayLogout", "true");
  }

  function handleOnLogout() {
    setUserId(null);
    setIsLoggedIn(false);
    setDisplayLogout(false);
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("displayLogout");
  }

  function handleNotMatch() {
    setPasswordMatch(true);
  }

  function handleNotValid() {
    setInvalidCredentials(true);
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Header navItemsDisplay={displayLogout} />
        <div className="sign-up-login-container">
          <Login
            onLogin={handleLogin}
            notValid={handleNotValid}
            isValid={invalidCredentials}
          />
          <SignUp
            onSignUp={handleSignUp}
            notMatch={handleNotMatch}
            isPasswordMatch={passwordMatch}
          />
        </div>
        <div className="example">
          <p>Demo-example credentials</p>
          <p>username: user1</p>
          <p>password: password1</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header onLogout={handleOnLogout} navItemsDisplay={displayLogout} />
      <AddWorkoutButton onClick={addWorkoutCard} />
      <div className="workout-cards-area">
        {workoutCards.map((workoutCard) => {
          return (
            <WorkoutCard
              key={workoutCard.id}
              id={workoutCard.id}
              userId={userId}
              workoutTitle={workoutCard.workoutTitle}
              exerciseTabs={workoutCard.exerciseTabs}
              onDelete={handleOnDelete}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
