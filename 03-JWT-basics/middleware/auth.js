const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const authorizeToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("No Token Provided");
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.username = decoded.username;
    next();
  } catch (error) {
    console.log(error);
    throw new Unauthenticated(error.message);
  }
};

module.exports = authorizeToken;
