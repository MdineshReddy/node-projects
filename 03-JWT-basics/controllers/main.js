const { BadRequest } = require("../errors");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide Username and Password");
  }
  const token = jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(StatusCodes.OK).json({ msg: "user created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(StatusCodes.OK).json({
    msg: `Hello, ${req.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
