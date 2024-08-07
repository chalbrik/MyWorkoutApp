import React, { useState } from "react";
import ExerciseTab from "./ExerciseTab";

function WorkoutCard(props) {
  const [workoutCardData, setWorkoutCardData] = useState({
    workoutTitle: "",
  });

  const [exerciseTabs, setExerciseTabs] = useState([]);

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
    console.log(id);
    console.log(field);
    console.log(value);
    setExerciseTabs((prevExerciseTabs) =>
      prevExerciseTabs.map((tab) =>
        tab.id === id ? { ...tab, [field]: value } : tab
      )
    );
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
        <button>Save</button>
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
