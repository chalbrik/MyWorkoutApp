import React, { useState, useEffect } from "react";
import ExerciseTab from "./ExerciseTab";
import axios from "axios";

function WorkoutCard(props) {
  const [workoutCardData, setWorkoutCardData] = useState({
    workoutTitle: props.workoutTitle || "",
  });

  const [exerciseTabs, setExerciseTabs] = useState([]);

  // Ustawienie początkowych wartości dla exerciseTabs
  useEffect(() => {
    if (props.exerciseTabs) {
      setExerciseTabs(props.exerciseTabs);
    }
  }, [props.exerciseTabs]);

  function handleChange(event) {
    const { name, value } = event.target;

    setWorkoutCardData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    event.preventDefault();
  }

  function handleAddExercise() {
    const newExerciseTab = {
      id: exerciseTabs.length + 1,
      exercise: "",
      series: "",
      repetitions: "",
      weight: "",
    };

    setExerciseTabs((prevExerciseTabs) => [
      ...prevExerciseTabs,
      newExerciseTab,
    ]);
  }

  function handleTabChange(id, field, value) {
    setExerciseTabs((prevExerciseTabs) =>
      prevExerciseTabs.map((tab) =>
        tab.id === id ? { ...tab, [field]: value } : tab
      )
    );
  }

  async function handleSave() {
    const updateWorkoutCard = {
      workoutTitle: workoutCardData.workoutTitle,
      exerciseTabs: exerciseTabs,
    };

    try {
      const response = await axios.put(
        `http://localhost:5000/workouts/${props.id}`,
        updateWorkoutCard
      );
    } catch (error) {
      console.error("Error updating workout card: ", error);
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/workouts/deleteCard/${props.id}`
      );
      props.onDelete(props.id);
    } catch (error) {
      console.error("Error deleting workout card: ", error);
    }
  }

  function handleOnExerciseTabDelete(id) {
    setExerciseTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== id));
  }

  return (
    <div className="workout-card">
      <div className="workout-card-heading">
        <input
          onChange={handleChange}
          name="workoutTitle"
          placeholder={props.workoutTitle}
          value={workoutCardData.workoutTitle}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>

      <ul>
        <li>Exercise</li>
        <li>Series</li>
        <li>Repetitions</li>
        <li>Weight [kg]</li>
      </ul>
      {exerciseTabs.map((exerciseTab) => {
        return (
          <ExerciseTab
            key={exerciseTab.id}
            id={exerciseTab.id}
            exercise={exerciseTab.exercise}
            series={exerciseTab.series}
            repetitions={exerciseTab.repetitions}
            weight={exerciseTab.weight}
            onTabChange={handleTabChange}
            workoutCardId={props.id}
            onExerciseTabDelete={handleOnExerciseTabDelete}
          />
        );
      })}

      <button className="add-exercise-button-area" onClick={handleAddExercise}>
        Add exercise
      </button>
    </div>
  );
}

export default WorkoutCard;
