import express from "express";
import { Router } from "express";
import usersData from "../data/usersData.js";

const router = Router();

const users = usersData;

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

router.post("/users/add-user", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  const newUserId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

  const newUser = {
    id: newUserId,
    username: username,
    password: password,
    workoutCards: [],
  };

  users.push(newUser);

  res.status(201).send({ token: "test456", newUserId: newUser.id });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    res.status(200).send({
      token: "test123",
      userId: user.id,
    });
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

router.post("/users/:userId/workouts/:workoutId/exerciseTabs", (req, res) => {
  const userId = parseInt(req.params.userId);
  const workoutId = parseInt(req.params.workoutId);
  const newExerciseTab = req.body;

  const user = users.find((user) => user.id === userId);

  if (user) {
    const workoutCard = user.workoutCards.find((card) => card.id === workoutId);

    if (workoutCard) {
      workoutCard.exerciseTabs.push(newExerciseTab); // Dodajemy exerciseTab do odpowiedniego workoutCard
      res.status(200).send(newExerciseTab);
    } else {
      res.status(404).send({ message: "Workout not found" });
    }
  } else {
    res.status(404).send({ message: "User not found" });
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
  const workoutId = parseInt(req.params.workoutId);

  const user = users.find((user) => user.id === userId);

  if (user) {
    const index = user.workoutCards.findIndex((card) => card.id === workoutId);
    if (index !== -1) {
      //usunięcie karty z bazy danych
      user.workoutCards.splice(index, 1);
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
