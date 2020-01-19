const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/profile");
const User = require("../../models/User");

const geocoder = require("../../utills/geocoder");

/* start upload image logic */
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folder_id = req.user.id;
    dirPath = `./static/images/${folder_id}`;
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  }
});

const uploadGallery = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadCover = multer({ storage, fileFilter }).single("cover_photo");

// @route    POST api/profile
// @desc     Create or update user profile
// @access   Private
router.post(
  "/",
  auth,
  [
    check("gender", "Gender is required")
      .not()
      .isEmpty(),
    check("sexual_orientation", "Sexual orientation is required")
      .not()
      .isEmpty(),
    check("type", "Account type is required")
      .not()
      .isEmpty(),
    check("address", "Address is required")
      .not()
      .isEmpty(),
    check("languages", "Spoken languages are required")
      .not()
      .isEmpty(),
    check("category", "Category is required")
      .not()
      .isEmpty(),
    check("services", "Services are required")
      .not()
      .isEmpty(),
    check("age", "Age is required")
      .not()
      .isEmpty(),
    check("silhouette", "Category is required")
      .not()
      .isEmpty(),
    check("origin", "Origin is required")
      .not()
      .isEmpty()
    // check("cover_photo", "Profile Picture is required")
    //   .not()
    //   .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      gender,
      sexual_orientation,
      phone,
      type,
      address,
      subscription_plan,
      start_of_subscription,
      end_of_subscription,
      favorites, // array
      is_active,
      languages, // array
      slogan,
      category,
      services, // array
      age,
      silhouette,
      origin,
      description,
      photos,
      hours,
      rate,
      website,
      ratings, // array
      opinions
    } = req.body;

    const cover_photo = req.file;

    /* Profile Object */
    const profileFields = {};
    profileFields.user = req.user.id;
    if (gender) profileFields.gender = gender;
    if (sexual_orientation)
      profileFields.sexual_orientation = sexual_orientation;
    if (phone) profileFields.phone = phone;
    if (type) profileFields.type = type;
    if (address) profileFields.address = address;

    if (subscription_plan) profileFields.subscription_plan = subscription_plan;
    // if (start_of_subscription)
    //   profileFields.start_of_subscription = start_of_subscription;
    // if (end_of_subscription)
    //   profileFields.end_of_subscription = end_of_subscription;
    if (is_active) profileFields.is_active = is_active;
    if (slogan) profileFields.slogan = slogan;
    if (category) profileFields.category = category;
    if (age) profileFields.age = age;
    if (silhouette) profileFields.silhouette = silhouette;
    if (origin) profileFields.origin = origin;
    if (description) profileFields.description = description;
    if (hours) profileFields.hours = hours;
    if (rate) profileFields.rate = rate;
    if (website) profileFields.website = website;

    //photo
    if (cover_photo) profileFields.cover_photo = cover_photo;

    // Array items
    if (photos) profileFields.photos = photos;

    // if (opinions) {
    //   profileFields.opinions = opinions;
    // }
    if (favorites) {
      profileFields.favorites = favorites;
    }
    if (languages) {
      profileFields.languages = languages;
    }
    if (services) {
      profileFields.services = services;
    }
    if (ratings) {
      profileFields.ratings = ratings;
    }

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update

        const locat = await geocoder.geocode(address);

        console.log(locat);

        profileFields.location = {
          type: "Point",
          coordinates: [locat[0].longitude, locat[0].latitude],
          formattedAddress: locat[0].formattedAddress,
          city: locat[0].city,
          zipcode: locat[0].zipcode,
          neighbourhood: locat[0].neighbourhood,
          country: locat[0].country,
          streetName: locat[0].streetName,
          streetNumber: locat[0].streetNumber,
          countryCode: locat[0].countryCode
        };

        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //Create
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", [
      "nickname",
      "email",
      "block"
    ]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["nickname"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found!" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["nickname"]);

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile/upload-cover
// @desc     Upload cover photo
// @access   Private
router.post("/upload-cover", auth, async (req, res) => {
  try {
    uploadCover(req, res, async function(err) {
      if (err instanceof multer.MulterError) {
        return res.status(500).json(err);
      } else if (err) {
        return res.status(500).json(err);
      }
      let file = req.file;

      const coverUrl = path.join(file.destination, file.filename);

      const profile = await Profile.findOne({
        user: mongoose.Types.ObjectId(req.user._id)
      });

      if (profile) {
        const coverUrl = profile.coverUrl;
        fs.unlink(coverUrl, err => {
          console.log("error", err);
        });
      }
      await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          cover_photo: coverUrl
        },
        {
          new: true,
          upsert: true
        }
      );
      return res.status(200).json({ cover_photo: coverUrl });
    });
  } catch (err) {
    console.log("create dish err:", err);
    return res.status(500).json();
  }
});

// @route    POST api/profile/subscription
// @desc     Subscription_plan
// @access   Private
router.post("/subscription", auth, async (req, res) => {
  try {
    const { subscription_plan } = req.body;

    const profile = await Profile.findOne({
      user: mongoose.Types.ObjectId(req.user._id)
    });

    // const profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile.subscription_plan;
    }

    await Profile.findOneAndUpdate(
      { user: req.user.id },
      {
        subscription_plan
      },
      {
        new: true,
        upsert: true
      }
    );
    return res.status(200).json({ subscription_plan });
  } catch (err) {
    console.log("create dish err:", err);
    return res.status(500).json();
  }
});

// @route    POST api/profile/upload-gallery
// @desc     Upload gallery photos
// @access   Private
router.post(
  "/upload-gallery",
  auth,
  uploadGallery.array("photos", 10),
  async (req, res) => {
    try {
      let reqFiles = [];
      for (var i = 0; i < req.files.length; i++) {
        reqFiles.push(req.files[i]);
      }

      const photoUrls = reqFiles.map((item, index) => {
        const photoLink = path.join(item.destination, item.filename);
        return photoLink;
      });

      const profile = await Profile.findOne({
        user: mongoose.Types.ObjectId(req.user._id)
      });
      if (profile) {
        const photoUrls = profile.photoUrls;
        fs.unlink(photoUrls, err => {
          console.log("error", err);
        });
      }

      const photo = await Profile.findOne({
        user: req.user.id
      });
      if (photo) {
        photo.photos.map((item, index) => {
          fs.unlink(item, err => {});
        });
      }

      await Profile.findOneAndUpdate(
        { user: req.user.id },
        {
          photos: photoUrls
        },
        {
          new: true,
          upsert: true
        }
      );
      res.status(200).json({ photos: photoUrls });
    } catch (err) {
      console.log(err);
    }
  }
);

// @route    POST api/profile/rating
// @desc     Add rating
// @access   Private
router.post("/rating", [auth, []], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { num, user } = req.body;

  const newRating = Number(num);

  try {
    const profile = await Profile.findOne({ user: user });

    profile.rating.unshift(newRating);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/profile/rating
// @desc     Add rating
// @access   Private
router.post("/favorites", [auth, []], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { favorite, user } = req.body;

  const newFavorite = favorite;

  try {
    const profile = await Profile.findOne({ user: user });

    profile.favorites.unshift(newFavorite);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
