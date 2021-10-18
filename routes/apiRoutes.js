const router = require("express").Router();
const db = require("../models");

router.get("/exercise", (req, res) => {
    db.Workout.find({})
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  // GET "/workouts" responds with all notes from the database
router.get("/workouts", function(req, res) {
    db.Workout.find({}, (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.json(data.exercises);
        }
      });
});
//Post new notes to the database in dB
router.post("/workouts", (req, res) => {
   const body=req.body;
db.Workout.create({ body})
.then(dbWorkout => {
 console.log(dbWorkout);
})
.catch(({message}) => {
  console.log(message);
});
  });
//Put data in data
router.put("/workouts/:id", function(req, res) {
    db.Workout.findByIdAndUpdate(
        {
          _id: mongojs.ObjectId(req.params.id)
        },
        {
          $set: {
            Day: req.body.Day,
            exercises:req.body.exercises
          }
        },
        (error, data) => {
          if (error) {
            res.send(error);
          } else {
            res.send(data);
          }
        }
      );
    });
  



module.exports = router;