const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  Day: {
    type: Date,
    default: Date.now()
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Enter an exercise type"
      },
      name: {
          type: String,
          trim: true,
          required: "Enter a name for the exercise"
      },
      duration: {
          type: Number,
          required: "Enter an exercise duration (in minutes)"
      },
      weight: {
          type: Number,
      },
      reps: {
          type: Number,
      },
      sets: {
          type: Number,
      },
      distance: {
          type: Number,
      },
    }
  ],
});
WorkoutSchema.methods.deleteMany = function() {
  
  };
WorkoutSchema.methods.addExercise=function(){

};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;