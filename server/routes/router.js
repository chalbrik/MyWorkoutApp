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

router.get("/test", (req, res) => {
  res.send("Server is working");
});

router.get("/users", (req, res) => {
  if (users) {
    res.send(users);
  } else {
    res.status(404).send({ message: "Users not found" });
  }
});

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

router.post("/users/:id/add-workouts", (req, res) => {
  const userId = parseInt(req.params.id);
  const newWorkoutCard = req.body;

  const user = users.find((user) => user.id === userId);

  if (user && newWorkoutCard) {
    user.workoutCards.push(newWorkoutCard);
    res.status(200).send(newWorkoutCard);
  } else {
    res.status(400).send({ message: "Invalid workout data" });
  }
});

router.put("/users/:userId/workouts/:workoutId", (req, res) => {
  const userId = parseInt(req.params.userId);
  const workoutId = parseInt(req.params.workoutId);

  const user = users.find((user) => user.id === userId);

  if (user) {
    const index = user.workoutCards.findIndex((card) => card.id === workoutId);

    if (index !== -1) {
      //aktualizacja danych karty treningowej
      user.workoutCards[index] = { id: workoutId, ...req.body };
      res.send(user.workoutCards[index]);
    } else {
      res.status(404).send({ message: "Workout not found" });
    }
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.delete("/users/:userId/workouts/deleteCard/:workoutId", (req, res) => {
  const userId = parseInt(req.params.userId);

  const user = users.find((user) => user.id === userId);

  if (user) {
    const workoutId = parseInt(req.params.workoutId);
    const index = user.workoutCards.findIndex((card) => card.id === workoutId);
    if (index !== -1) {
      //usunięcie karty z bazy danych
      users.workoutCards.splice(index, 1);
      res.status(204).send();
    } else {
      res.status(404).send({ message: "Workout not found" });
    }
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.delete(
  "/users/:userId/workouts/:workoutCardId/deleteExerciseTab/:exerciseTabId",
  (req, res) => {
    const userId = parseInt(req.params.userId);
    const workoutCardId = parseInt(req.params.workoutCardId);
    const exerciseTabId = parseInt(req.params.exerciseTabId);

    const user = users.find((user) => user.id === userId);

    if (user) {
      const workoutCard = user.workoutCards.find(
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
    } else {
      res.status(404).send({ message: "User not found" });
    }
  }
);

export default router;
