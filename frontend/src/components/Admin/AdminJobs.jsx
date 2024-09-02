import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Adminjobstable from './Adminjobstable'
import useGetAllAdminjobs from '@/hooks/useGetAllAdminJobs'
import { setsearchjobbytext } from '@/redux/jobSlice'

function AdminJobs() {
 useGetAllAdminjobs();
  const[input,setinput]=useState();
  const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(()=>{
     dispatch(setsearchjobbytext(input));
    },[input])
  return (
   <div>
    <Navbar/>
    <div className='max-w-6xl mx-auto my-10'>
    <div className='flex items-center my-4 justify-between'>
        <Input type="text" className="w-fit" onChange={(e)=>setinput(e.target.value)} placeholder="Filter by company name or role"/>
        <Button onClick={()=>navigate("/admin/jobs/create")}>New Jobs</Button>
    </div>
    <Adminjobstable/>
    </div>
   </div>
  )
}

export default AdminJobs