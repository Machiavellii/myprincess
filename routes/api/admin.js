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
