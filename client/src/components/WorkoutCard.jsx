import React from "react";

function WorkoutCard(props) {
  return (
    <div className="workout-card">
      <input
        type="text"
        name="workoutTitle"
        placeholder={props.workoutTitle}
        value=""
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
