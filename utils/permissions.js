import { UnauthenticatedRequestError } from "../errors/index.js";

const checkPermissions = (user, objectCreatedbyId) => {
  //To do: check if user is admin, if true return true
  //(Also to do, add admin to user schema LMFAO)
  if (user.userId === objectCreatedbyId.toString()) {
    return;
  }
  throw new UnauthenticatedRequestError(
    "Unauthorized request has been logged."
  );
};

export default checkPermissions;
