import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import morgan from "morgan";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";

const app = express();

//dbs and authenticate
import connectDB from "./db/connect.js";

//routers
import authRouter from "./routes/authRoutes.js";
import gigsRouter from "./routes/gigsRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandler from "./middleware/error-handler.js";
import auth from "./middleware/authenticate.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Use when ready to deploy
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "API!" });
});

//order matters here...
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gigs", auth, gigsRouter);

// only when ready to deploy
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

//error catcher mw
app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server Running on port ${port}`);
    });
  } catch (error) {
    //console.log(error);
  }
};

console.log("Welcome.");

start();
