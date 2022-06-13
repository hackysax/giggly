import express from "express";
import auth from "../middleware/authenticate.js";

import rateLimiter from "express-rate-limit";
const authApiLimiter = rateLimiter({
  windowMs: 10 * 60 * 100, //10 mintues
  max: 25,
  message: "Too may login attempts Try again later.",
});
const router = express.Router();

import {
  register,
  login,
  updateUser,
  deleteUser,
} from "../controllers/authController.js";

router.route("/register").post(authApiLimiter, register);
router.route("/login").post(authApiLimiter, login);
router.route("/updateUser").patch(auth, updateUser);
router.route("/deleteUser").delete(auth, deleteUser);

export default router;
