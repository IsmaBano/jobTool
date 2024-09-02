import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setUser } from '@/redux/authSlice'

function Job({job}) {
  const dispatch=useDispatch();
  const handleSave= async (id)=>{
   try {
    const res=await axios.get(`${USER_API_END_POINT}/savejob/${id}`,{withCredentials:true});
    if(res.data.success){
      dispatch(setUser(res.data.user));
      toast.success(res.data.message);
    }
   } catch (error) {
    console.log(error);
   }
  }
  const timefunc=(mongotime)=>{
    const createdAt=new  Date(mongotime);
    const currtime=new Date();
    const timediff=currtime- createdAt;
    return Math.floor(timediff/(1000*24*60*60))
  }
  const navigate=useNavigate();
  return (
    <div className='shadow-lg border border-gray-200 m-2 p-5 rounded-md'>
        <div className='flex justify-between'>
            <p className='text-muted-foreground'>{timefunc(job?.createdAt)===0?"Today":`${timefunc(job?.createdAt)} days ago`}</p>
            <Button variant="outline" className="rounded-full" size="icon" onClick={()=>handleSave(job?._id)}> <Bookmark/></Button>
        </div>
        <div className='flex gap-9 my-3'>
            <Button  variant="outline" className="rounded-full" size="icon" >
                <Avatar>
                    <AvatarImage src={job?.company?.logo}></AvatarImage>
                </Avatar>
            </Button>
            <div>
            <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
            <p className='text-sm'>India</p>
        </div>
        </div>
        <div>
            <h1 className='font-bold text-xl my-3'>{job?.title}</h1>
            <p className='text-sm text-gray-500'>{job?.description}</p>
        </div>
        <div className='md:flex items-center gap-4 mt-4'>
       <Badge variant="ghost" className={"text-blue-600 font-bold"}>{job?.position} Positions</Badge>
       <Badge variant="ghost" className={"text-[#cb3b4e] font-bold"}>{job?.jobType}</Badge>
       <Badge variant="ghost" className={"text-[#6A38C2] font-bold"}>{job?.salary }LPA</Badge>
      </div>
      <div className='flex gap-2 p-2 m-3'>
        <Button onClick={()=>navigate(`/description/${job?._id}`)} variant="outline">Details</Button>
        <Button className="bg-[#C75B7A] hover:bg-[#8a374e] mr-2" onClick={()=>handleSave(job?._id)}>Save for later</Button>
      </div>
       
    </div>
  )
}

export default Job