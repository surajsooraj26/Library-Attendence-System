const mongoose = require("mongoose");

const currentSchema = mongoose.Schema(
  {
    regNo: String,
    name: String,
    in_time: Date,
  },
  {
    timestamps: true,
  }
);

//Schema for Historical attendance
const historicalSchema = mongoose.Schema(
  {
    regNo: String,
    name: String,
    in_time: Date,
    out_time: Date,
    timer: Boolean,
  },
  {
    timestamps: true,
  }
);

//Models

const currentModel = mongoose.model("current_attendee", currentSchema);

const historicalModel = mongoose.model(
  "historicalS_attendee",
  historicalSchema
);

module.exports = { currentModel, historicalModel };
