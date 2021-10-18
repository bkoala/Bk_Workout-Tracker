const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  Day: {
    type: Date
  },
  exercises: [
    {
      type: String,
      name: String,
      duration: Number,
      weight: Number,
      reps: Number,
      sets: Number,
    },
  ],
});
WorkoutSchema.methods.deleteMany = function() {
  
  };
WorkoutSchema.methods.addExercise=function(){

};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;