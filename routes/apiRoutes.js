const router = require("express").Router();
const db = require("../models");
const mongoose = require('mongoose');
const path = require('path');


//HTML ROUTES
// Exercises
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

//stats
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
});


// GET route for rendering all workouts and show the total duration of excerices.
router.get("/api/workouts", (req, res) => {
    // Use aggregate to sum up duration of all exercises for each workout
    // and Add sum to totalDuration 
    db.Workout.aggregate( [
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" } 
        }
      },
    ] )
      // Ascending order - oldest workouts to newest (because grabbing last index later)
      .sort({ day: 1 })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });

//Get workout exercise data in a range (last seven workouts)

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: { totalDuration: { $sum: "$exercises.duration" } }
      },
    ])
    // Descending order - newest workouts to oldest
    .sort({ day: -1 })
    .then(workouts => {
      // create a copy of workouts, capturing most recent 7 workouts
      const lastSevenDays = workouts.slice(0,7)
      res.json(lastSevenDays);
    })
    .catch(err => {
      res.status(400).json(err);
    })
  });

//Post creates new workout
router.post("/api/workouts", (req, res) => {   
db.Workout.create(req.body)
.then(dbWorkout => {
    res.json(dbWorkout);
})
.catch(err => {
    res.status(400).json(err);
  });
  });

// Put route to update workout for new exercise
router.put("/api/workouts/:id", ( req, res) => {

    // Find a workout document by id and add the new exercise to the array of exercises
    db.Workout.findOneAndUpdate({ _id: req.params.id }, { $push: { exercises: req.body } })
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  });
  
module.exports = router;