import React from "react";

function AddWorkoutButton(props) {
  return (
    <div className="workout-button-container">
      <button onClick={props.onClick}>Add new workout plan</button>
    </div>
  );
}

export default AddWorkoutButton;
