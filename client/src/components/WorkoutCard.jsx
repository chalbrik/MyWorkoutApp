import React, { useState } from "react";

function WorkoutCard(props) {
  const [workoutCardData, setWorkoutCardData] = useState({
    workoutTitle: "",
    exercise: "",
    series: "",
    repetitions: "",
    weight: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    console.log(event.target);

    setWorkoutCardData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });

    event.preventDefault();
  }

  return (
    <div className="workout-card">
      <input
        onChange={handleChange}
        name="workoutTitle"
        placeholder={props.workoutTitle}
        value={workoutCardData.workoutTitle}
      />
      <ul>
        <li>Exercise</li>
        <li>Series</li>
        <li>Repetitions</li>
        <li>Weight</li>
      </ul>
    </div>
  );
}

export default WorkoutCard;
