import React, { useDebugValue, useEffect } from 'react'
import LatestJobCards from './LatestJobCards'
import { useSelector } from 'react-redux'



function LatestJobs() {
  const {allJobs}=useSelector(store=>store.job);
  
  return (
    <div className=' m-8'>
        <h1 className='text-3xl font-bold p-2 '><span className='text-[#C75B7A]'> Latest & Top</span> Jobs</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-3 m-2'>
         { allJobs.length<=0?<span>No jobs available</span>:allJobs?.slice(0,6).map((job)=>(
            <LatestJobCards job={job} key={job._id}/>
         ))
}
</div>
    </div>
  )
}

export default LatestJobs