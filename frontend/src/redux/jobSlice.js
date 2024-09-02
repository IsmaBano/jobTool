import { createSlice } from "@reduxjs/toolkit";

const jobSlice= createSlice({
    name:"job",
    initialState:{
        allJobs:[],
        singleJob:null,
        allAdminJobs:[],
        searchjobbytext:"",
        allAppliedJobs:[],
        searchQuery:""
    },
    reducers:{
        //actions
        setallJobs:(state,action) =>{
            state.allJobs =action.payload;
        },
        setsingleJob:(state,action)=>{
            state.singleJob=action.payload;
        },
        setallAdminJobs:(state,action)=>{
            state.allAdminJobs=action.payload;
        },
        setsearchjobbytext:(state,action)=>{
            state.searchjobbytext=action.payload;
        },
        setallAppliedJobs:(state,action) =>{
            state.allAppliedJobs =action.payload;
        },
        setsearchQuery:(state,action) =>{
            state.searchQuery =action.payload;
        },
    }
})
export const {setallJobs,setsingleJob,setallAdminJobs,setsearchjobbytext,setallAppliedJobs ,setsearchQuery}=jobSlice.actions;
export default jobSlice.reducer