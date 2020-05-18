const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const geocoder = require("../utills/geocoder");

const AgencyProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  phone: {
    type: String,
    trim: true,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  webcamlink: {
    type: String
  },
  type: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ["Point"]
    },
    coordinates: {
      type: [Number],
      index: "2dsphere"
    },
    formattedAddress: String,
    countryCode: String,
    country: String,
    city: String,
    streetName: String,
    streetNumber: String,
    zipcode: String,
    canton: String
  },
  subscription_plan: {
    type: Number
  },
  is_active: {
    type: Boolean,
    default: false
  },
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
  ],
  recruitment: {
    type: Boolean
  },
  numberOfGirls: {
    type: String
  }
});

// Geocode & create location
AgencyProfileSchema.pre("save", async function(next) {
  const loc = await geocoder.geocode(this.address);

  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
    canton: loc[0].state,
    country: loc[0].country,
    streetName: loc[0].streetName,
    streetNumber: loc[0].streetNumber,
    countryCode: loc[0].countryCode
  };

  // console.log(loc);

  next();
});

module.exports = AgencyProfile = mongoose.model(
  "AgencyProfile",
  AgencyProfileSchema
);
