const router = require("express").Router();
const db = require("../models");
const mongoose = require('mongoose');


//HTML ROUTES
// Exercises
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'))
});

//stats
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'))
});


// GET ROUTE FOR RENDERING ALL WORKOUTS, SHOWING TOTAL DURATION OF EXERCISES
router.get("/api/workouts", (req, res) => {
    // Use aggregate to sum up duration of all exercises for each workout
    // and add sum to totalDuration 
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

// PUT ROUTE FOR UPDATING A WORKOUT WITH NEW EXERCISES (or Use findOneAndUpdate)
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
  

/*
// BRINGING IN REQUIRED MODULES
const router = require("express").Router();
const mongoose = require('mongoose');
const db = require('../models')
const path = require('path');

// GET ROUTE FOR RENDERING ALL WORKOUTS, SHOWING TOTAL DURATION OF EXERCISES
router.get("/api/workouts", (req, res) => {
  // Use aggregate to sum up duration of all exercises for each workout
  // and set the sum to a new field called totalDuration for each workout
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

// GET ROUTE FOR RENDERING EXERCISE PAGE
router.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/exercise.html'));
});

// POST ROUTE FOR CREATING A NEW WORKOUT
router.post("/api/workouts", ( req, res) => {
  // Create a new workout document in the database
  db.Workout.create(req.body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// PUT ROUTE FOR UPDATING A WORKOUT WITH NEW EXERCISES
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

// GET ROUTE FOR RENDERING STATS DASHBOARD
router.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/stats.html'));
});

// GET ROUTE FOR GETTING WORKOUT DATA FOR LAST 7 WORKOUTS
router.get("/api/workouts/range", (req, res) => {
  // ORIGINALLY HAD IT FILTERING FOR LAST 7 DAYS - KEEPING CODE FOR REFERENCE
  // set a variable for six days ago (to filter for last 7 days of data, including today)
  // const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 7))
  // a variable for filtering workouts where the day is greater than the date six days ago
  // const filter = { day: { $gte: sixDaysAgo } };

  // Use aggregate method to get all workouts, filtered for last 7 days
  // and add a field of totalDuration, summing the exercise durations for each workout
  db.Workout.aggregate([
    // ORIGINAL METHOD TO FILTER LAST 7 DAYS OF WORKOUTS
    // { 
    //   $match: filter 
    // },
    {
      $addFields: { totalDuration: { $sum: "$exercises.duration" } }
    },
  ])
  // Descending order - newest workouts to oldest
  .sort({ day: -1 })
  .then(workouts => {
    // create a copy of workouts, capturing most recent 7 workouts
    const lastSevenWorkouts = workouts.slice(0,7)
    res.json(lastSevenWorkouts);
  })
  .catch(err => {
    res.status(400).json(err);
  })
});

// EXPORT ROUTES
module.exports = router;



*/


module.exports = router;