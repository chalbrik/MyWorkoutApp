import React, { useEffect, useState } from "react";

import Header from "./components/Header";
import AddWorkoutButton from "./components/AddWorkoutButton";
import WorkoutCard from "./components/WorkoutCard";

function App() {
  const [backendData, setBackendData] = useState([{}]);

  const [workoutCards, setWorkoutCards] = useState([]);

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  // const addWorkoutCard = async () => {
  //   try {
  //     const response = await fetch("");
  //   } catch (error) {
  //     console.error("Error during adding a component: ", error);
  //   }
  // };

  function addWorkoutCard(event) {
    const newWorkoutCard = {
      id: workoutCards.length + 1,
      workoutTitle: "Name your workout",
    };

    setWorkoutCards([...workoutCards, newWorkoutCard]);

    event.preventDefault();
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
              workoutTitle={workoutCard.workoutTitle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
