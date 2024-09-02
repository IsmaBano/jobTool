import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
import mongoose from "mongoose";
export const register = async (req, res) => {
    try {
        const { fullname, email, password, phoneNumber, role } = req.body;
        if (!fullname || !email || !password || !phoneNumber || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const file = req.file;
        let cloudResponse;
        if (file) {
            let fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        const photo = cloudResponse?.secure_url;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email",
                success: false
            });
        }

        const hashpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            password: hashpassword,
            phoneNumber,
            role,
            prfile: {
                profilePhoto: photo,
            }
        });
        return res.status(201).json({
            message: "Account is created,succesfully!",
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        let user = await User.findOne({ email }).populate({
            path: 'savedJobs'
        });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or Password",
                success: false
            });
        }
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(400).json({
                message: "Password is wrong",
                success: false
            });
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "User doesnot exist with current role",
                success: false
            });
        }
        const tokenData = {
            userId: user._id
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            savedJobs: user.savedJobs
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, samSite: 'strict' }).json({
            message: `welcome Back ${user.fullname}`,
            user,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
            message: `logged out succesfully`,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        //file setup with (cloudinary)
        const file = req.file;
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }


        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;     //middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }
        if (fullname) user.fullname = fullname;  ///updating data
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;
        ///user resume
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = file.originalname;
        }
        await user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            password: user.password,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).json({
            message: "Profile Updated succesfully",
            user,
            success: true
        })
    }
    catch (error) {
        console.log(error);
    }
}
export const savejob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.id;
        let user = await User.findById(userId).populate({
            path: 'savedJobs'
        });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }
        if (!mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid job ID"
            });
        }

        if (user.savedJobs.some(savedJob => savedJob._id.toString() === jobId)) {
            return res.status(200).json({
                user,
                success: true,
                message: "Job is already saved"
            });
        }
        user.savedJobs.push(jobId);
        await user.save();
        console.log(user.savedJobs);
        return res.status(200).json({
            user,
            success: true,
            message: "job is saved"
        })
    } catch (error) {
        console.log(error);
    }
}


export const updateProfilePhoto = async (req, res) => {
    try {

        //file setup with (cloudinary)
        const file = req.file;
        let cloudResponse;
        if (file) {
            let fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }
        const photo = cloudResponse?.secure_url;
        const userId = req.id;     //middleware authentication
        let user = await User.findById(userId);
         if (!user) {
            return res.status(400).json({
                message: "user not found",
                success: false
            });
        }
            if(photo){
                user.profile.profilePhoto=photo;
            }
            await user.save();
            console.log("value is saved")
            return res.status(200).json({
                message: "Profile Photo Updated succesfully",
                user,
                success: true
            })

        }
    catch (error) {
        console.log(error);
    }
}