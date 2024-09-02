import express from "express";
import { login, logout, register, savejob, updateProfile, updateProfilePhoto } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js"

const router=express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
router.route("/profilephoto/:id").post(isAuthenticated,singleUpload,updateProfilePhoto);
router.route("/logout").get(logout);
router.route("/savejob/:id").get(isAuthenticated, savejob);
export default  router;