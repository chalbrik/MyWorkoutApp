import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AddWorkoutButton from "./components/AddWorkoutButton";
import WorkoutCard from "./components/WorkoutCard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const [workoutCards, setWorkoutCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

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
  }

  function handleSignUp(newUserId) {
    setUserId(newUserId);
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <div>
        <Header />
        <div className="sign-up-login-container">
          <Login onLogin={handleLogin} />
          <SignUp onSignUp={handleSignUp} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
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
