import express from "express";

const app = express();
const port = 3010;

app.listen(port, (req, res) => {
  console.log(`The app is running on port ${port}`);
});
