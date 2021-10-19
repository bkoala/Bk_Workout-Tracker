const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");


const apiRoutes=require('./routes/apiRoutes');

const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use('/',apiRoutes);


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
// Connect to the database
connectDb().catch(err => console.log(err))

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
