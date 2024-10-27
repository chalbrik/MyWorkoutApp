import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AddWorkoutButton from "./components/AddWorkoutButton";
import WorkoutCard from "./components/WorkoutCard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import useToken from "./components/useToken";

function App() {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );
  const [userId, setUserId] = useState(sessionStorage.getItem("userId"));

  const [displayLogout, setDisplayLogout] = useState(
    sessionStorage.getItem("displayLogout")
  );

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const { token, setToken } = useToken();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
    console.log("userId:", userId);
    if (isLoggedIn && userId) {
      axiosFetchData(userId);
    }
  }, [isLoggedIn, userId]);

  const axiosFetchData = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/users/${userId}/workouts`
      );
      console.log(response.data);
      setWorkoutCards(response.data);
    } catch (error) {
      console.error("Error in fetching data for logged user: ", error);
    } finally {
      setLoading(false);
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
    sessionStorage.setItem("userId", userId);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("displayLogout", "true");

    setWorkoutCards([]);

    axiosFetchData(userId);
  }

  function handleSignUp(newUserId) {
    setUserId(newUserId);
    setIsLoggedIn(true);
    setDisplayLogout(true);
    setPasswordMatch(false);
    setInvalidCredentials(false);
    sessionStorage.setItem("userId", newUserId);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("displayLogout", "true");
  }

  function handleOnLogout() {
    setUserId(null);
    setIsLoggedIn(false);
    setDisplayLogout(false);
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("displayLogout");
    sessionStorage.removeItem("token");
  }

  function handleNotMatch() {
    setPasswordMatch(true);
  }

  function handleNotValid() {
    setInvalidCredentials(true);
  }

  if (!token && !isLoggedIn) {
    return (
      <div>
        <Header navItemsDisplay={displayLogout} />
        <div className="main-page-container">
          <div className="sign-up-login-container">
            <Login
              onLogin={handleLogin}
              notValid={handleNotValid}
              isValid={invalidCredentials}
              setToken={setToken}
            />
            <SignUp
              onSignUp={handleSignUp}
              notMatch={handleNotMatch}
              isPasswordMatch={passwordMatch}
              setToken={setToken}
            />
          </div>
          <div className="example">
            <p>Demo-example credentials</p>
            <p>username: user1</p>
            <p>password: password1</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header onLogout={handleOnLogout} navItemsDisplay={displayLogout} />
      <AddWorkoutButton onClick={addWorkoutCard} />
      {loading ? (
        <p>loading</p>
      ) : (
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
      )}
    </div>
  );
}

export default App;
