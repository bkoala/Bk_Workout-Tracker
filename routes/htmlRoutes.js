const path = require('path');
const router = require("express").Router();

// Exercises
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/exercise.html'))
  });

  //stats
  router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/stats.html'))
  });

module.exports=router;
