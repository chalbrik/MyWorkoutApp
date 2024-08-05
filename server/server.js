import express from "express";

const app = express();
const port = 5000;

app.get("/api", (req, res) => {
  res.json({ users: ["userOne", "userTwo", "userThree"] });
});

// na pewno będzie GET do strony internetowej
// GET do zalogownia
// GET do wylogowania
// POST do umieszczenia karty treningowej
// DELETE do usunięcia karty treningowej
// POST do umieszczenia ćwiczenia
// DELETE do usunięcia ćwiczenia

app.listen(port, (req, res) => {
  console.log(`The app is running on port ${port}`);
});
