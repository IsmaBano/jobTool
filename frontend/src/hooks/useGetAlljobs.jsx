import { setallJobs } from '@/redux/jobSlice';
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function  useGetAlljobs() {
    const dispatch=useDispatch();
    const {searchQuery}=useSelector(store=>store.job);
useEffect(()=>{
 const fetchalljobs= async()=>{
   try {
    const res= await axios.get(`${JOB_API_END_POINT}/get?keyword=${searchQuery}`,{withCredentials:true});
    if (res.data.success) {
        dispatch(setallJobs(res.data.jobs));
      }
   } catch (error) {
    console.log(error);
   }
 }
 fetchalljobs();
},[])
}

export default useGetAlljobs