require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const workoutsRoutes = require("./routes/workouts");
mongoose.set("strictQuery", false);
// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  next();
});

app.use("/api/workouts", workoutsRoutes);

app.get("/", (req, res) => {
  res.send("GET request to the homepage");
});
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then((res) => {
    console.log(res.connection.db);
    app.listen(process.env.PORT, () => console.log(`app listening on port ${process.env.PORT}! + ${process.env.MONGO_URI}`));
  })
  .catch((err) => {
    console.log("The Error: " + err);
  });
