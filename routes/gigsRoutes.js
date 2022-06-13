import express from "express";

const router = express.Router();

import {
  createGig,
  deleteGig,
  getAllGigs,
  updateGig,
  showStats,
} from "../controllers/gigsController.js";

router.route("/").post(createGig).get(getAllGigs);
//stats must lead /:id
router.route("/stats").get(showStats);
router.route("/:id").delete(deleteGig).patch(updateGig);
export default router;
