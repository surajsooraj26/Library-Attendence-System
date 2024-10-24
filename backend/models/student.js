const mongoose = require("mongoose");

//Schema for student database
const studentSchema = mongoose.Schema(
  {
    regNo: String, //change after prototype
    name: String,
    profile: String,
    role: String,
    programme: String,
    status:Boolean,
    duration: {
      start: Number, //Year of admission
      end: Number, //Year of completion of cource
    },
    gender: String,
    phone: Number,
    address: String,
  },
  {
    timeStamps: true,
  }
);
const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
