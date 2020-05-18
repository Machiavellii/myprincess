const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const AgencyProfile = require("../../models/AgencyProfile");
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

// @route    POST api/agency
// @desc     Create agency profile
// @access   Private
router.post(
  "/",
  auth,
  [
    // check("type", "Account type is required")
    //   .not()
    //   .isEmpty(),
    check("address", "Address is required")
      .not()
      .isEmpty(),
    check("category", "Category is required")
      .not()
      .isEmpty(),
    check("services", "Services are required")
      .not()
      .isEmpty(),
    check("numberOfGirls", "Number of girls in your agency is required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      phone,
      type,
      address,
      webcamlink,
      subscription_plan,
      favorites, // array
      is_active,
      slogan,
      category,
      services, // array
      description,
      photos,
      hours,
      rate,
      website,
      ratings, // array
      recruitment,
      numberOfGirls
    } = req.body;

    const cover_photo = req.file;

    /* Profile Object */
    const profileFields = {};
    profileFields.user = req.user.id;
    if (phone) profileFields.phone = phone;
    if (type) profileFields.type = type;
    if (address) profileFields.address = address;
    if (webcamlink) profileFields.webcamlink = webcamlink;

    if (subscription_plan) profileFields.subscription_plan = subscription_plan;
    if (is_active) profileFields.is_active = is_active;
    if (slogan) profileFields.slogan = slogan;
    if (category) profileFields.category = category;
    if (description) profileFields.description = description;
    if (hours) profileFields.hours = hours;
    if (rate) profileFields.rate = rate;
    if (website) profileFields.website = website;

    //photo
    if (cover_photo) profileFields.cover_photo = cover_photo;

    // Array items
    if (photos) profileFields.photos = photos;

    if (favorites) {
      profileFields.favorites = favorites;
    }
    if (services) {
      profileFields.services = services;
    }
    if (ratings) {
      profileFields.ratings = ratings;
    }
    if (recruitment) {
      profileFields.recruitment = recruitment;
    }
    if (numberOfGirls) {
      profileFields.numberOfGirls = numberOfGirls;
    }

    try {
      let agencyProfile = await AgencyProfile.findOne({ user: req.user.id });

      if (agencyProfile) {
        //Update

        const locat = await geocoder.geocode(address);

        profileFields.location = {
          type: "Point",
          coordinates: [locat[0].longitude, locat[0].latitude],
          formattedAddress: locat[0].formattedAddress,
          city: locat[0].city,
          zipcode: locat[0].zipcode,
          canton: locat[0].state,
          country: locat[0].country,
          streetName: locat[0].streetName,
          streetNumber: locat[0].streetNumber,
          countryCode: locat[0].countryCode
        };

        agencyProfile = await AgencyProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(agencyProfile);
      }

      //Create
      agencyProfile = new AgencyProfile(profileFields);

      await agencyProfile.save();

      res.json(agencyProfile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/agencies
// @desc     Get all agency profiles
// @access   Public
router.get("/", async (req, res) => {
  try {
    const agencyProfiles = await AgencyProfile.find().populate("user", [
      "nickname",
      "email",
      "block"
    ]);
    res.json(agencyProfiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/agency/user/:user_id
// @desc     Get agency profile by user ID
// @access   Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const agencyProfile = await AgencyProfile.findOne({
      user: req.params.user_id
    }).populate("user", ["nickname"]);

    if (!agencyProfile) {
      return res.status(400).json({ msg: "Profile not found!" });
    }

    res.json(agencyProfile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route    GET api/profile/myAgency
// @desc     Get current users agency profile
// @access   Private
router.get("/myAgency", auth, async (req, res) => {
  try {
    const agencyProfile = await AgencyProfile.findOne({
      user: req.user.id
    }).populate("user", ["nickname"]);

    if (!agencyProfile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(agencyProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/agency
// @desc     Delete agency profile, user & posts
// @access   Private
router.delete("/", auth, async (req, res) => {
  try {
    // Remove profile
    await AgencyProfile.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User Deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/agency/upload-cover
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

      const agencyProfile = await AgencyProfile.findOne({
        user: mongoose.Types.ObjectId(req.user._id)
      });

      if (agencyProfile) {
        const coverUrl = agencyProfile.coverUrl;
        fs.unlink(coverUrl, err => {
          console.log("error", err);
        });
      }
      await AgencyProfile.findOneAndUpdate(
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

// @route    POST api/agency/subscription
// @desc     Subscription_plan
// @access   Private
router.post("/subscription", auth, async (req, res) => {
  try {
    const { subscription_plan } = req.body;

    const agencyProfile = await AgencyProfile.findOne({
      user: mongoose.Types.ObjectId(req.user._id)
    });

    if (agencyProfile) {
      agencyProfile.subscription_plan;
    }

    await AgencyProfile.findOneAndUpdate(
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

// @route    POST api/agency/upload-gallery
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

      const agencyProfile = await AgencyProfile.findOne({
        user: mongoose.Types.ObjectId(req.user._id)
      });
      if (agencyProfile) {
        const photoUrls = agencyProfile.photoUrls;
        fs.unlink(photoUrls, err => {
          console.log("error", err);
        });
      }

      const photo = await AgencyProfile.findOne({
        user: req.user.id
      });
      if (photo) {
        photo.photos.map((item, index) => {
          fs.unlink(item, err => {});
        });
      }

      await AgencyProfile.findOneAndUpdate(
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

// @route PUT api/agency/isActive
// @desc Toggle active hours
// @access Private
router.put("/me/isActive", auth, async (req, res) => {
  try {
    const agencyProfile = await AgencyProfile.findOne({ user: req.user.id });
    agencyProfile.is_active = !agencyProfile.is_active;
    agencyProfile.save();
    return res.json(agencyProfile.is_active);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    POST api/agency/rating
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
    const agencyProfile = await AgencyProfile.findOne({ user: user });

    agencyProfile.rating.unshift(newRating);

    await agencyProfile.save();
    res.json(agencyProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/agency/favorites
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
    const agencyProfile = await AgencyProfile.findOne({ user: user });

    agencyProfile.favorites.unshift(newFavorite);

    await agencyProfile.save();
    res.json(agencyProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/agency/reduceSubscription
// @desc     Reduce subscription by 1 for all active users
// @access   Public
router.put("/reduceSubscription", async (req, res) => {
  try {
    await AgencyProfile.updateMany(
      { is_active: true },
      {
        $inc: { subscription_plan: -1 }
      }
    );
    res.json("Updated");
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route POST api/agency/type
// @desc Type: agency or escort
// @access Private
router.post("/type", auth, async (req, res) => {
  try {
    const { type } = req.body;

    console.log(type);

    const agency = await AgencyProfile.findOne({
      user: mongoose.Types.ObjectId(req.user._id)
    });

    if (agency) {
      agency.type;
    }

    await AgencyProfile.findOneAndUpdate(
      { user: req.user.id },
      {
        type
      },
      {
        new: true,
        upsert: true
      }
    );
    return res.status(200).json({ type });
  } catch (err) {
    console.log("create dish err:", err);
    return res.status(500).json();
  }
});

// @route    POST api/agency/boost
// @desc     Boost profile to the start of array
// @access   Private

router.put("/boost", auth, async (req, res) => {
  let { date, user } = req.body;

  try {
    let agency = await AgencyProfile.findOneAndUpdate({ agency });

    date = Date.now();

    res.json(agency);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
