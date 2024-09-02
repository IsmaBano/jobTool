import { populate } from "dotenv";
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob=async(req,res)=>{
    try {
        const userId=req.id;
        const jobId=req.params.id;
        if(!jobId){
          return res.status(400).json({
             message:"Job Id is required",
             success:false
          });
        }
       const existingApplicantion= await Application.findOne({job:jobId, applicant:userId});
       if(existingApplicantion){
        return res.status(400).json({
           message:"You have already applied for this job",
           success:false
        });
      }

      const job=await Job.findById(jobId);
      if(!job){
        return res.status(400).json({
           message:"Job not found",
           success:false
        });
      }
      const applications =await Application.create({
        job:jobId, applicant:userId
      });

      job.application.push(applications._id);
      await job.save();
        return res.status(201).json({
          success:true,
          message:"Job applied successfully"
       });
    } catch (error) {
       console.log(error);
    }
 }

 export const getAppliedJob=async(req,res)=>{
    try {
        const userId=req.id;
       const application= await (Application.find({applicant:userId}).sort({createdAt: -1})).populate({
        path:'job',
        Options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            Options:{sort:{createdAt:-1}} 
        }
       });
       if(!application){
        return res.status(400).json({
           message:"No application",
           success:false
        });
      }
      return res.status(201).json({
        success:true,
       application
     });
    } catch (error) {
       console.log(error);
    }
 }
 

 export const getApplicants=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:'application',
            Options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                Options:{sort:{createdAt:-1}} 
            }
           });;
        if(!job){
          return res.status(400).json({
             message:"Job not found",
             success:false
          });
        };
        return res.status(201).json({
            success:true,
           job
         });
    } catch (error) {
        console.log(error);
    }
 }

 
 export const getupdateStatus=async(req,res)=>{
    try {
        const {status}=req.body;
        const applicationId=req.params.id;
        
        if(!status){
          return res.status(400).json({
             message:"Status is required",
             success:false
          });
        };

        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
               message:"Application  not found",
               success:false
            });
          };
          application.status=status.toLowerCase();
          await application.save();
        return res.status(201).json({
            success:true,
           message:"Status updated successfully"
         });
    } catch (error) {
        console.log(error);
    }
 }
