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
    if (props.workoutTitle && props.exerciseTabs) {
      setWorkoutCardData(props.workoutTitle);
      setExerciseTabs(props.exerciseTabs);
    }
  }, [props.workoutTitle, props.exerciseTabs]);

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

  async function handleAddExercise() {
    const newExerciseTab = {
      id:
        exerciseTabs.length > 0
          ? exerciseTabs[exerciseTabs.length - 1].id + 1
          : 1,
      exercise: "",
      series: "",
      repetitions: "",
      weight: "",
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/users/${props.userId}/workouts/${props.id}/exerciseTabs`,
        newExerciseTab
      );
      setExerciseTabs((prevExerciseTabs) => [
        ...prevExerciseTabs,
        response.data,
      ]);
    } catch (error) {
      console.error("Error in add exercise tab: ", error);
    }
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
        `http://localhost:5000/users/${props.userId}/workouts/${props.id}`,
        updateWorkoutCard
      );
      console.log(response.data.workoutTitle);
      console.log(workoutCardData);
      setWorkoutCardData({ workoutTitle: response.data.workoutTitle });
    } catch (error) {
      console.error("Error updating workout card: ", error);
    }
  }

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `http://localhost:5000/users/${props.userId}/workouts/deleteCard/${props.id}`
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
          placeholder={"Name your workout"}
          value={workoutCardData.workoutTitle}
        />
        <div>
          <button onClick={handleSave}>Save</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>

      <ul>
        <li className="exercise">Exercise</li>
        <li>Series</li>
        <li>Repetitions</li>
        <li>Weight [kg]</li>
      </ul>
      {exerciseTabs.map((exerciseTab) => {
        return (
          <ExerciseTab
            key={exerciseTab.id}
            id={exerciseTab.id}
            userId={props.userId}
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
