import mongoose from "mongoose";

const jobSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    requirements:[{type:String}],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experiencelevel:{
      type:Number,
      required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:'Company',
        required:true
    },
    createdby:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    application:[
        {
        type:mongoose.Schema.ObjectId,
        ref:'Application',
    }
    ],
},{timestamps:true})
export const Job= mongoose.model('Job',jobSchema);