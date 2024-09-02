import { setallAdminJobs, setallJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function  useGetAllAdminjobs() {
    const dispatch=useDispatch();
useEffect(()=>{
 const fetchalljobs= async()=>{
   try {
    const res= await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
    if (res.data.success) {
        dispatch(setallAdminJobs(res.data.jobs));
        console.log(res.data.jobs)
      }
   } catch (error) {
    console.log(error);
   }
 }
 fetchalljobs();
},[])
}

export default useGetAllAdminjobs