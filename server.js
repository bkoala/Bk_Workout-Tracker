const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const apiRoutes=require('./routes/apiRoutes');
const htmlRoutes=require('./routes/htmlRoutes');

const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();

//app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/api',apiRoutes);
app.use('/',htmlRoutes);


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
/*
// BRING IN MONGOOSE DATABASE AND EXPRESS SERVER
const express = require("express");
const mongoose = require("mongoose");

// VARIABLE FOR PORT
const PORT = process.env.PORT || 3000

// INITIATE INSTANCE OF EXPRESS SERVER AS YOUR APP
const app = express();

// DATA PARSING
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// PUBLIC DIRECTORY ACCESS
app.use(express.static("public"));

// ASYNC AWAIT FOR MONGOOSE DATABASE CONNECTION
// CONSULTED CODE HERE: https://stackoverflow.com/questions/54890608/how-to-use-async-await-with-mongoose
const connectDb = async () => {
  await mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://localhost/workout',
    {
      useNewUrlParser:true,
      useCreateIndex:true,
      useFindAndModify:false,
      useUnifiedTopology: true 
    }
  )
  .then(() => {
    console.log("Connected to database!")
  })
  .catch(() => {
    console.log(err)
  })
}
// CONNECT TO MONGOOSE DATABASE OR CATCH & CONSOLE LOG ERROR
connectDb().catch(err => console.log(err))

// ROUTES
app.use(require("./routes/api.js"));

// START LISTENING
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
*/
