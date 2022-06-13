import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedRequestError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    //async errors package is nice...
    throw new BadRequestError("Please provide all required values.");
  }
  const userAlreadyExists = await User.findOne({ email });
  if (userAlreadyExists) {
    throw new BadRequestError("Email already in use.");
  }
  if (password.lenth < 6) {
    console.log("pw length", password.lenth);
    throw new BadRequestError("Password must be six or more characters.");
  }
  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  res.status(StatusCodes.CREATED).json({
    user: { email: user.email, lastName: user.lastName, name: user.name },
    token,
    location: user.location,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password.");
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new UnauthenticatedRequestError("Invalid user credentials.");
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthenticatedRequestError("Invalid user credentials.");
  }
  const token = user.createJWT();
  //clear the password from state
  user.password = undefined;
  res.status(StatusCodes.OK).json({
    user: user,
    token,
    location: user.location,
  });
  res.send("user login");
};

const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all required values.");
  }
  //console.log("Req user id:", req.user.userId);
  const user = await User.findOne({ _id: req.user.userId });
  //console.log("user instance:", user);
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({
    user: user,
    token,
    location: user.location,
  });
};

const deleteUser = async (req, res) => {
  res.send("delete user");
};

export { register, login, updateUser, deleteUser };
