import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import router from "./routes/router.js";

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use("/", router);

app.listen(port, (req, res) => {
  console.log(`The app is running on port ${port}`);
});
