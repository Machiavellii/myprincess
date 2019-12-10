const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OpinionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  review: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  profile: {
    type: String
  },
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Opinion = mongoose.model("opinion", OpinionSchema);
