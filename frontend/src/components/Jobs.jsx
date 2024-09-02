import React, { useEffect, useState } from 'react'
import Job from './Job'
import Filtercard from './Filtercard'
import Navbar from './shared/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { setsearchQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

function Jobs() {
  const {allJobs,searchQuery}=useSelector(store=>store.job);
  const {user}=useSelector(store=>store.auth);
  const [filterjobs,setfilterjobs]=useState(allJobs);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
        let minSalary = 0;
        let maxSalary = Infinity;
      
      if(searchQuery){
        if (searchQuery.includes("Lpa")) {
          if (searchQuery === "0-1Lpa") {
            maxSalary = 1 ;
          } else if (searchQuery === "1-4Lpa") {
            minSalary = 1;
            maxSalary = 4 ;
          } else if (searchQuery === "5Lpa or above") {
            minSalary = 5 ;
          }
          const filteredjobs=allJobs.filter((job)=>{
            return  job.salary>=minSalary && job.salary<=maxSalary;
          })
          setfilterjobs(filteredjobs);
        }
          else{
            const filteredjobs= allJobs.filter((job)=>{
              return job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.location.toLowerCase().includes(searchQuery.toLowerCase()) ;
             
            })
            setfilterjobs(filteredjobs);
          
        }

      
      }
      else{
        dispatch(setsearchQuery(""));
        setfilterjobs(allJobs)
      }
  },[allJobs,searchQuery])
  return (
    <>
    <Navbar/>
    <div className='md:flex '>
        <div className='max-w-7xl mx-auto  '>
        <Filtercard/>
        </div>
        <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 overflow-y-auto '>
      {
        filterjobs.length<=0?<span>Job not found</span>:
        filterjobs?.map((job)=>(
          <motion.div key={job._id} initial={{opacity:0,x:100}}
          animate={{opacity:1,x:0}}
          exit={{opacity:0,x:-100}}
          transition={{duration:0.3}}>
           <Job job={job}  />
          </motion.div>
        ))
      }
      </div>
        
    </div>
    </>
  )
}

export default Jobs