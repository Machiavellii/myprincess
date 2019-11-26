const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const tokenAdmin = req.header("x-auth-token");

  //Check if not token
  if (!tokenAdmin) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    const decoded = jwt.verify(tokenAdmin, config.get("jwtSecret"));

    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
