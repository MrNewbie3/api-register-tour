const Tour = require("../models/workoutModels");
const mongoose = require("mongoose");
// get all workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Tour.find({}).sort({ createdAt: -1 });
  res.status(200).json(workouts);
};
// get a single workouts
const getSingleWorkouts = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such workout" });
  const workout = await Tour.findById(id);
  if (!workout) return res.status(404).json({ error: "No such workout" });
  return res.status(200).json(workout);
};
// create new workout
const createWorkout = async (req, res) => {
  const { title, location, price } = req.body;
  let emptyFields = [];
  if (!title) emptyFields.push("title");
  if (!location) emptyFields.push("location");
  if (!price) emptyFields.push("price");
  if (emptyFields.length > 0) return res.status(400).json({ error: "Please fill in all the field", emptyFields });
  try {
    const tour = await Tour.create({ title, location, price });
    res.status(200).json(tour);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// delete a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such workout" });
  const workout = await Tour.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  return res.status(200).json(workout);
};

// update a workout

const updateWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: "No such workout" });
  const workout = await Tour.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  return res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  deleteWorkout,
  getAllWorkouts,
  getSingleWorkouts,
  updateWorkout,
};
