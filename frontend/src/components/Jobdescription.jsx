import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { Badge } from './ui/badge';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setsingleJob } from '@/redux/jobSlice';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';


function Jobdescription() {
  const dispatch=useDispatch();
  const params= useParams();
  const jobId=params.id;
  const {singleJob}=useSelector(store=>store.job);
  const {user}=useSelector(store=>store.auth);
  const applied=singleJob?.application?.some(applications=>applications.applicant==user?.id)|| false;
  const [isapplied,setisapplied]=useState(applied);
  const applyHandler=async ()=>{
    try {
      const res= await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true});
      if (res.data.success) {
          setisapplied(true);
          const updatedSingleJob=  {...singleJob,application:[...singleJob.application,{applicant:user?._id}]};
          dispatch(setsingleJob(updatedSingleJob));
          toast.success(res.data.message);
        }
     } catch (error) {
      console.log(error);
     }
  }
  useEffect(()=>{
    const fetchalljobs= async()=>{
      try {
       const res= await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
       if (res.data.success) {
           dispatch(setsingleJob(res.data.job));
           console.log((user._id));
           console.log(res.data.job);
           if (Array.isArray(res.data.job.application)) {
            const applied = res.data.job.application.some(application => {
              return application.applicant === user?._id;
            });
            setisapplied(applied);
          }
         }
      } catch (error) {
       console.log(error);
      } 
    }
    fetchalljobs();
   },[jobId,dispatch,user?._id])
   
  return (
    <div className='max-w-7xl mx-auto shadow-lg  p-3 my-6 min-h-[600px]'>
        <div className='flex items-center justify-between mb-2'>
            <div>
            <h1 className='font-bold text-xl mb-3'>{singleJob?.title}</h1>
            <div className='flex items-center gap-4 mt-2 mb-2'>
       <Badge variant="ghost" className={"text-blue-600 font-bold"}>{singleJob?.position} Positions</Badge>
       <Badge variant="ghost" className={"text-[#cb3b4e] font-bold"}>{singleJob?.jobType}</Badge>
       <Badge variant="ghost" className={"text-[#6A38C2] font-bold"}>{singleJob?.salary}LPA</Badge>
      </div>
            </div>
      
            <div className=''>
            {
                !isapplied? <Button className="bg-[#C75B7A] hover:bg-[#8a374e] cursor-pointer" onClick={applyHandler}>Apply</Button>: <Button className="cursor-not-allowed bg-gray-500">Already Applied</Button>
            }
           </div>
        </div>
        <h1 className='font-medium text-xl border-b-2 border-b-gray-300 pb-5'> Job Description</h1>
        <div className='m-3 p-2'>
            <span className='flex gap-5 my-1 font-bold mb-3'>Role :<p className='text-gray-500 font-normal'>{singleJob?.title}</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Location :<p className='text-gray-500 font-normal'>{singleJob?.location}</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Description:<p className='text-gray-500 font-normal'>{singleJob?.description}</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Experience :<p className='text-gray-500 font-normal'>{singleJob?.experiencelevel} yrs</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Salary :<p className='text-gray-500 font-normal'>{singleJob?.salary}LPA</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Total applicants :<p className='text-gray-500 font-normal'>{singleJob?.application?.length}</p></span>
            <span className='flex gap-5 my-1 font-bold mb-3'>Posted Date :<p className='text-gray-500 font-normal'>{singleJob?.createdAt.split("T")[0]}</p></span>
        </div>

    </div>
  )
}

export default Jobdescription