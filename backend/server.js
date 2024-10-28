const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { format } = require("date-fns");
const path = require("path");
const adminRoutes = require("./routes/adminroutes");
const timerService = require('./services/timerService'); 

const { currentModel, historicalModel } = require("./models/log");

require("dotenv").config();
const app = express();
const PORT = process.env.PORT;


//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Routes
app.use("/", adminRoutes);

timerService.startTimer();

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("Connected to db");
    app.listen(3500, () => {
      console.log(`Server running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Error in database conncetion: ${err}`);
  });
