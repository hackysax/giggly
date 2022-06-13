import { UnauthenticatedRequestError } from "../errors/index.js";

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    throw new UnauthenticatedRequestError("Unauthenticated request.");
  }
  const token = authorizationHeader.split(" ")[1].trim();
  //   console.log("Token only:", token);
  //   console.log("Secret:", process.env.JWT_SECRET);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    //console.log(payload);

    next();
  } catch (error) {
    //console.log("Additional Issues!");
    throw new UnauthenticatedRequestError("Unauthenticated request, part 2");
  }
  //console.log("Authenticate user!");
  //console.log(authorizationHeader);
};

export default auth;
