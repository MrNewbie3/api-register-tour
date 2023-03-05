const express = require("express");
const router = express.Router();
const { createWorkout, getSingleWorkouts, getAllWorkouts, updateWorkout, deleteWorkout } = require("../controllers/workoutsController");
router.get("/", getAllWorkouts);

router.get("/:id", getSingleWorkouts);

router.post("/", createWorkout);

router.delete("/:id", deleteWorkout);

router.patch("/:id", updateWorkout);

module.exports = router;
