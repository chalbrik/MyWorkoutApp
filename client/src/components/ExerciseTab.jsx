import React, { useState } from "react";

function ExerciseTab(props) {
  function handleChange(event) {
    const { name, value } = event.target;

    props.onTabChange(props.id, name, value);

    event.preventDefault();
  }

  return (
    <div className="exercise-tab">
      <input
        type="text"
        onChange={handleChange}
        name="exercise"
        value={props.exercise}
        placeholder="_"
      />
      <input
        type="number"
        min={1}
        onChange={handleChange}
        name="series"
        value={props.series}
        placeholder="_"
      />
      <input
        type="number"
        min={1}
        onChange={handleChange}
        name="repetitions"
        value={props.repetitions}
        placeholder="_"
      />
      <input
        type="number"
        min={0}
        onChange={handleChange}
        name="weight"
        value={props.weight}
        placeholder="_"
      />
    </div>
  );
}

export default ExerciseTab;
