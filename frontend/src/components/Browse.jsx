import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setsearchQuery } from '@/redux/jobSlice';
import useGetAlljobs from '@/hooks/useGetAlljobs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Browse() {
  useGetAlljobs();
  const {allJobs}=useSelector(store=>store.job);
  const {user}=useSelector(store=>store.auth);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!user){
      toast.message("Login First");
      navigate("/login");
    }
  return ()=>
  dispatch(setsearchQuery(""));
  },[])
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto '>
            <h1 className='font-bold'>Search Results({allJobs.length})</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-3">
                {
                   allJobs?.map((job)=>(
                         <Job key={job._id} job={job}/>
                    ))
                }
            </div>
        </div>

    </div>
  )
}

export default Browse