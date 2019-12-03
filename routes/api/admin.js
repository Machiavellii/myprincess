const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

const authAdmin = require("../../middleware/authAdmin");

// Admin Model
const Admin = require("../../models/Admin");
const User = require("../../models/User");
const Profile = require("../../models/profile");

// @route    GET api/admin
// @desc     GET Admin
// @access   Public
router.get("/", (req, res) => {
  Admin.find((err, admin) => {
    if (err) {
      return status(400).json({
        error: err
      });
    }
    res.json({ admin });
  }).select("username");
});

// @route    POST api/admin
// @desc     Regisration Admin
// @access   Public
router.post(
  "/",
  [
    check("username", "Username is required")
      .not()
      .isEmpty(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      let admin = await Admin.findOne({ username });

      if (admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Admin already exist " }] });
      }

      admin = new Admin({
        username,
        password
      });

      const salt = await bcrypt.genSalt(10);

      admin.password = await bcrypt.hash(password, salt);

      await admin.save();

      const payload = {
        admin: {
          id: admin.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(400).send("Server Error");
    }
  }
);

// @route    GET api/admin/users/:id
// @desc     GET Users
// @access   Private
router.get("/users/:id", authAdmin, async (req, res) => {
  try {
    // const user = await User.findById(req.user.id).select("-password");
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

// @route    GET api/admin/profile/:id
// @desc     Get current user profile
// @access   Private
router.get("/profile/:id", authAdmin, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.id
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

// @route    POST api/admin/edit/:id
// @desc     Update user profile
// @access   Private
router.post("/edit", authAdmin, async (req, res) => {
  const {
    gender,
    sexual_orientation,
    phone,
    type,
    canton,
    city,
    zip,
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

  // const cover_photo = req.file;

  /* Profile Object */
  const profileFields = {};
  profileFields.user = req.body.user._id;
  if (gender) profileFields.gender = gender;
  if (sexual_orientation) profileFields.sexual_orientation = sexual_orientation;
  if (phone) profileFields.phone = phone;
  if (type) profileFields.type = type;
  // if (country) profileFields.country = country;
  if (canton) profileFields.canton = canton;
  if (city) profileFields.city = city;
  if (zip) profileFields.zip = zip;
  // if (subscription_plan) profileFields.subscription_plan = subscription_plan;
  if (start_of_subscription)
    profileFields.start_of_subscription = start_of_subscription;
  if (end_of_subscription)
    profileFields.end_of_subscription = end_of_subscription;
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
  // if (cover_photo) profileFields.cover_photo = cover_photo;

  // Array items
  // if (photos) profileFields.photos = photos;

  if (opinions) {
    profileFields.opinions = opinions;
  }
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
    const profile = await Profile.findOneAndUpdate(
      { user: req.body.user },
      { $set: profileFields },
      { new: true }
    );

    // if (profile) {
    //   //Update
    //   profile = await Profile.findOneAndUpdate(
    //     { user: req.body.user },
    //     { $set: profileFields },
    //     { new: true }
    //   );

    //   return res.json(profile);
    // }

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/admin
// @desc     Delete profile & user
// @access   Private
router.delete("/:id", authAdmin, async (req, res) => {
  try {
    // Remove profile
    await Profile.findOneAndRemove({ user: req.params.id });

    // Remove User
    await User.findOneAndRemove({ _id: req.params.id });

    // console.log()

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
