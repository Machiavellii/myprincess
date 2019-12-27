const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlockSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  block: {
    type: Boolean
  }
});

module.exports = Block = mongoose.model("block", BlockSchema);
