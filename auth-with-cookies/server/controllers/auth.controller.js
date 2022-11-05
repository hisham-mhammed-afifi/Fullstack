const User = require("../models/User");
const { BadRequestError, UnauthenticatedError } = require("../errors");
const { attachCookiesToResponse, isTokenValid } = require("../utils/jwt");

//.....................................................
//.............   Email already exist   ...............
//.....................................................

const alreadyExist = async (req, res) => {
  const { email } = req.body;
  const emailAlreadyExists = await User.findOne({ email });
  if (!!emailAlreadyExists) {
    res.status(200).json(true);
    return;
  }

  res.status(200).json(false);
};

//.....................................................
//...............   Register   ........................
//.....................................................

const register = async (req, res) => {
  const { email, name, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });
  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(201).json(true);
};

//.....................................................
//...............   Login   ...........................
//.....................................................

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  const { name, _id } = user;

  const accessToken = attachCookiesToResponse({ res, user: { name, _id } });

  res.status(200).json({ accessToken });
};

//.....................................................
//...............   Logout   ..........................
//.....................................................

const logout = async (req, res) => {
  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(200).json(true);
};

module.exports = {
  alreadyExist,
  register,
  login,
  logout,
};
