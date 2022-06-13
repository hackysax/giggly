import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name."],
    minlength: 2,
    maxlength: 40,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password."],
    minlength: 6,
    select: false,
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 40,
    trim: true,
    default: "Last Name",
  },
  location: {
    type: String,
    minlength: 2,
    maxlength: 40,
    trim: true,
    default: "My City",
  },
});

//prior to save record (creat and update user...)
UserSchema.pre("save", async function () {
  console.log("Modified paths:", this.modifiedPaths());
  const modpaths = this.modifiedPaths();
  if (!this.isModified("password")) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const cryptPassword = await bcrypt.hash(this.password, salt);
  //console.log(this.password);
  //console.log(cryptPassword);
  this.password = cryptPassword;
});

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};
//bycrypt makes it easy
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};
export default mongoose.model("User", UserSchema);
