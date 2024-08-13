import express from "express";
import { Router } from "express";

const router = Router();

const users = [
  {
    id: 1,
    username: "user1",
    password: "password1",
    workoutCards: [
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
    ],
  },
  {
    id: 2,
    username: "user2",
    password: "password2",
    workoutCards: [
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
    ],
  },
];

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

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).send({ userId: user.id });
  } else {
    res.status(401).send({ message: "Invalid credentials" });
  }
});

router.get("/users/:id/workouts", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((user) => user.id === userId);

  if (user) {
    res.send(user.workoutCards);
  } else {
    res.status(404).send({ message: "User not found" });
  }
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

router.delete(
  "/workouts/:workoutCardId/deleteExerciseTab/:exerciseTabId",
  (req, res) => {
    const workoutCardId = parseInt(req.params.workoutCardId);
    const exerciseTabId = parseInt(req.params.exerciseTabId);
    const workoutCard = workoutCardsData.find(
      (card) => card.id === workoutCardId
    );

    if (workoutCard) {
      const exerciseTabIndex = workoutCard.exerciseTabs.findIndex(
        (tab) => tab.id === exerciseTabId
      );

      if (exerciseTabIndex !== -1) {
        workoutCard.exerciseTabs.splice(exerciseTabIndex, 1);
        res.status(204).send();
      } else {
        res.status(404).send({ message: "Exercise tab not found" });
      }
    } else {
      res.status(404).send({ message: "Workout card not found" });
    }
  }
);

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
