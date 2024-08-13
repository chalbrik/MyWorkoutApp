import express from "express";
import { Router } from "express";

const router = Router();

const workoutCardsData = [
  {
    id: 1,
    workoutTitle: "Biceps",
    exerciseTabs: [
      {
        id: 1,
        exercise: "Curls",
        series: "3",
        repetitions: "12",
        weight: "20",
      },
    ],
  },
  {
    id: 2,
    workoutTitle: "Legs",
    exerciseTabs: [
      {
        id: 1,
        exercise: "Squats",
        series: "4",
        repetitions: "8",
        weight: "60",
      },
    ],
  },
];

router.get("/workouts", (req, res) => {
  res.send(workoutCardsData);
});

router.post("/add-workouts", (req, res) => {
  const newWorkoutCard = req.body;

  if (newWorkoutCard) {
    workoutCardsData.push(newWorkoutCard);
    res.status(201).send(newWorkoutCard);
  } else {
    res.status(400).send({ message: "Invalid workout data" });
  }
});

router.put("/workouts/:id", (req, res) => {
  const workoutId = parseInt(req.params.id);
  const index = workoutCardsData.findIndex((card) => card.id === workoutId);

  if (index !== -1) {
    //aktualizacja danych karty treningowej
    workoutCardsData[index] = { id: workoutId, ...req.body };
    res.send(workoutCardsData[index]);
  } else {
    res.status(404).send({ message: "Workout not found" });
  }
});

router.delete("/workouts/deleteCard/:id", (req, res) => {
  const workoutId = parseInt(req.params.id);
  const index = workoutCardsData.findIndex((card) => card.id === workoutId);

  if (index !== -1) {
    //usunięcie karty z bazy danych
    workoutCardsData.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send({ message: "Workout not found" });
  }
});

// na pewno będzie GET do strony internetowej
// GET do zalogownia
// GET do wylogowania
// POST do umieszczenia karty treningowej
// router.post("/add-workout-card", (req, res) => {
//   componentCount += 1;
//   const newComponent = {};
// });
// DELETE do usunięcia karty treningowej
// POST do umieszczenia ćwiczenia
// DELETE do usunięcia ćwiczenia

export default router;
