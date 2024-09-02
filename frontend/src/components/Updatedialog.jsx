import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

function Updatedialog({open,setopen}) {
  const dispatch=useDispatch();
  const [loading, setloading]=useState(false)
  const {user}=useSelector(store=>store.auth);
  const[input,setinput]=useState({
    fullname:user?.fullname,
    email:user?.email,
    phoneNumber:user?.phoneNumber,
    bio:user?.profile?.bio,
    skills:user?.profile?.skills.map(skill=>skill),
    file:user?.profile?.resume
  })
  const changeEventHandler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value})
  }
  const changeFileHandler=(e)=>{
    setinput({...input,file:e.target.files?.[0]});
  }
  const submitHandler=async(e)=>{
    e.preventDefault();
    const formData=new FormData();
    formData.append("fullname",input.fullname);
    formData.append("email",input.email);
    formData.append("phoneNumber",input.phoneNumber);
    formData.append("bio",input.bio);
    formData.append("skills",input.skills);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
      setloading(true);
       const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
        headers:{
          "Content-Type":'multipart/form-data'
        },
        withCredentials:true
       })
       if(res.data.success){
       dispatch(setUser(res.data.user));
       toast.success(res.data.message);
       }
    } catch (error) {
        console.log(error);
        toast.error("error")
    } finally{
      setloading(false);
    }
    setopen(false);
  }
      
  return (
    <Dialog open={open}>
  <DialogContent onInteractOutside={()=>setopen(false)}>
    <DialogHeader>
      <DialogTitle>Update Profile</DialogTitle>
    </DialogHeader>
    <form  onSubmit={submitHandler}>
      <div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">Full Name</Label>
          <Input id="name" name="fullname" value={input.fullname} onChange={changeEventHandler}  type="text" className="col-span-3"/>
        </div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">email</Label>
          <Input id="email" name="email" value={input.email} onChange={changeEventHandler} type="email" className="col-span-3"/>
        </div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">phone number</Label>
          <Input id="phoneNumber" name="phoneNumber" onChange={changeEventHandler} value={input.phoneNumber} type="text" className="col-span-3"/>
        </div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">bio</Label>
          <Input id="bio" name="bio" value={input.bio} type="bio" onChange={changeEventHandler} className="col-span-3"/>
        </div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">Skills</Label>
          <Input id="skills" type="text" value={input.skills} onChange={changeEventHandler} name="skills" className="col-span-3"/>
        </div>
        <div className=' grid grid-cols-4 items-center gap-3  mb-3'>
          <Label className=" text-right ">Resume</Label>
          <Input id="name" type="file" value={input.resume} onChange={changeFileHandler} name="file" accept="application/pdf"className="col-span-3"/>
        </div>
      </div>
      <DialogFooter>
      {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Update</Button>
          }
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>
  )
}

export default Updatedialog