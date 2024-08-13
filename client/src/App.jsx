import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/Header";
import AddWorkoutButton from "./components/AddWorkoutButton";
import WorkoutCard from "./components/WorkoutCard";

function App() {
  const [workoutCards, setWorkoutCards] = useState([]);

  useEffect(() => {
    let processing = true;
    axiosFetchData(processing);
    return () => {
      processing = false;
    };
  }, []);

  const axiosFetchData = async (processing) => {
    await axios
      .get("http://localhost:5000/workouts")
      .then((res) => {
        if (processing) {
          setWorkoutCards(res.data);
        }
      })
      .catch((err) => console.log(err));
  };

  async function addWorkoutCard(event) {
    const newWorkoutCard = {
      id: workoutCards.length + 1,
      workoutTitle: "Name your workout",
      exerciseTabs: [],
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/add-workouts`,
        newWorkoutCard
      );
      setWorkoutCards([...workoutCards, newWorkoutCard]);
    } catch (error) {
      console.error("Error in adding workout card: ", error);
    }

    event.preventDefault();
  }

  function handleOnDelete(id) {
    setWorkoutCards((prevCards) => prevCards.filter((card) => card.id !== id));
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
