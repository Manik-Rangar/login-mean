const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "123456789");
    req.userDetails = decodedToken;
    next();
  } catch (error) {
    res.status(403).json({ message: "Unauthorised Access" });
  }
};
