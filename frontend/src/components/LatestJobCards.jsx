import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

function LatestJobCards({job}) {
  const navigate=useNavigate();
  return (
    <div onClick={()=>navigate(`/description/${job._id}`)} className=' p-5 rounded-md bg-white shadow-xl border border-gray-200 cursor-pointer '> 
      <div>
        <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
        <p className='text-gray-500 text-sm'>India</p>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='md:flex items-center gap-4 mt-2 pb-3'>
       <Badge variant="ghost" className={"text-blue-600 font-bold"}>{job?.position} Positions</Badge>
       <Badge variant="ghost" className={"text-[#cb3b4e] font-bold"}>{job?.jobType}</Badge>
       <Badge variant="ghost" className={"text-[#6A38C2] font-bold"}>{job?.salary}LPA</Badge>
      </div>
    </div>
  )
}

export default LatestJobCards