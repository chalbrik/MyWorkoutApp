import express from "express";
import { Router } from "express";

const router = Router();

router.get("/workouts", (req, res) => {
  //   res.json({ users: ["userOne", "userTwo", "userThree"] });
  //potem trzeba bedzie zrobić bazę danych, ale na razie będzie to po prostu tablica obiektów

  const workoutCardsData = [
    {
      id: 1,
      workoutTitle: "Biceps",
    },
    {
      id: 2,
      workoutTitle: "Legs",
    },
  ];

  res.send(workoutCardsData);
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
