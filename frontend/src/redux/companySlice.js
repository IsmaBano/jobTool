import { createSlice } from "@reduxjs/toolkit";

const companySlice= createSlice({
    name:"company",
    initialState:{
        companies:[],
        singleCompany:null,
        searchcompanybytext:""
    },
    reducers:{
        //actions
      
        setsingleCompany:(state,action)=>{
            state.singleCompany=action.payload;
        },
        setcompanies:(state,action)=>{
            state.companies=action.payload;
        },
        setsearchcompanybytext:(state,action)=>{
            state.searchcompanybytext=action.payload
        }
    }
})
export const {setsingleCompany,setcompanies,setsearchcompanybytext}=companySlice.actions;
export default companySlice.reducer