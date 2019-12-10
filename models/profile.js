const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  gender: {
    type: String,
    required: true
  },
  sexual_orientation: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },

  // User type (should probably be in user) =>

  type: {
    type: String,
    required: true
  },
  // country: {
  //   type: String,
  //   required: true
  // },
  canton: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
  subscription_plan: {
    type: String
  },
  start_of_subscription: {
    type: Date
  },
  end_of_subscription: {
    type: Date
  },
  favorites: {
    type: [String]
  },

  // Profile activity  =>
  is_active: {
    type: Boolean,
    default: false
  },

  /* Ad activity  =>
    
    ad_is_active: {
        type: Boolean,
        default: true
    },*/

  languages: {
    type: [String],
    required: true
  },
  slogan: {
    type: String
  },
  category: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  silhouette: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  cover_photo: {
    type: String
  },
  photos: {
    type: Array
  },
  hours: {
    type: String
  },
  rate: {
    type: String
  },
  phone: {
    type: String
  },
  website: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },

  // U kontroleru sabrati sve vrijednosti koje su dodate u niz i podijeliti sa array length =>
  // rating: {
  //   type: [Number]
  // },

  opinions: [
    {
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
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
