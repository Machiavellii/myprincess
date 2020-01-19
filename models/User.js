const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  block: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }

  /* USER user remodeled end */

  /* removed for now :)
     
     in_agency: {
        type: Boolean,
        default: false,
    },
    parent_acc: {
        type: ObjectId,
        ref: 'userSchema'
    },
        adCount: {
        type: Number
    } */
});

module.exports = User = mongoose.model("user", UserSchema);
