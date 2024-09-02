import React from 'react'
import Navbar from './shared/Navbar'
import Job from './Job'
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
function SavedJobs() {
  const {user}=useSelector(store=>store.auth);
  return (
   <div>
    <Navbar/>
    <div className='flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-2 overflow-y-auto'>
    {
        user?.savedJobs?.length<=0?<span>Job not found</span>:
        user?.savedJobs?.map((job)=>(
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
  )
}

export default SavedJobs