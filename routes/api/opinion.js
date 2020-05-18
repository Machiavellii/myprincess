const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Opinions = require("../../models/Opinions");

// @route    POST api/opinion/
// @desc     Add opinions
// @access   Private
router.post(
  "/:id",
  [
    auth,
    [
      check("review", "Review is required")
        .not()
        .isEmpty(),
      check("title", "Title is required")
        .not()
        .isEmpty(),

      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const profile = await Profile.findById(req.params.id);

      const { review, title, text } = req.body;

      const newOpinion = new Opinions({
        review,
        title,
        name: user.nickname,
        profile: profile._id,
        text
      });

      // profile.opinions.unshift(newOpinion);

      await newOpinion.save();

      res.json(newOpinion);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/opinion
// @desc     Get all opinion
// @access   Private
router.get("/", async (req, res) => {
  try {
    const opinion = await Opinions.find().sort({ date: -1 });
    res.json(opinion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
