import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJob, getupdateStatus } from "../controllers/application.controller.js";

const router=express.Router();

router.route("/apply/:id").get(isAuthenticated,applyJob);
router.route("/get").get(isAuthenticated,getAppliedJob);
router.route("/status/:id/update").post(isAuthenticated,getupdateStatus);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
export default  router;