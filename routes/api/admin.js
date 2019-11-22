const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const { check, validationResult } = require("express-validator");

// Admin Model
const Admin = require("../../models/Admin");

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

module.exports = router;
