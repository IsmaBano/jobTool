import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'

import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import store from '@/redux/store'

import { Loader2 } from 'lucide-react'
import { setLoading } from '@/redux/authSlice'
function Signup() {
  const {user}=useSelector(store=>store.auth);
  const [input,setinput]=useState({
    fullname:"",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });
  const {loading}=useSelector(store=>store.auth);
const dispatch=useDispatch();
  const navigate= useNavigate();
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
          formData.append("password",input.password);
          formData.append("role",input.role);
          if(input.file){
            formData.append("file",input.file);
          }
          
        try {
          dispatch(setLoading(true));
          const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
            headers:{
              "Content-Type":"multipart/form-data"
            },
            withCredentials:true,
          });
          console.log(res);
          if(res.data.success){
            navigate("/login");
            toast.success(res.data.message);
          }
          
        } catch (error) {
          console.log(error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
          toast.error(errorMessage);
        }
        finally{
          dispatch(setLoading(false));
     }
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  },[])
  return (
    <>
    <Navbar/>
    <div className='flex justify-center items-center my-3 min-w-[300px] w-full md:max-w-full mx-[15%] md:mx-auto'>
        <form onSubmit={submitHandler} className='md:w-1/2 border border-gray-200 rounded-md p-5'>
          <h1 className='font-bold text-xl mb-5'>SignUp</h1>
          <div className='my-2'>
          <Label >Full Name</Label>
          <Input className="my-2" type="text" name="fullname" value={input.fullname} onChange={changeEventHandler} placeholder="Enter name" />
          </div>
          <div className='my-2'>
          <Label>Email</Label>
          <Input className="my-2" type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter email" />
          </div>
          <div className='my-2'>
          <Label>Phone Number</Label>
          <Input className="my-2" type="text" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} placeholder="Enter Phone Number" />
          </div>
          <div className='my-2'>
          <Label>Password</Label>
          <Input className="my-2" type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter password" />
          </div>
          <div className='md:flex  justify-between items-center '>
          <RadioGroup  className='flex justify-center items-center gap-4 my-5'>
      <div className="flex items-center space-x-2">
        <Input type="radio" name="role" value="student" checked={input.role==='student'} onChange={changeEventHandler} className="cursor-pointer" />
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center space-x-2">
      <Input type="radio" name="role" value="recruiter"  checked={input.role==='recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
    <div className='flex items-center gap-2'>
      <Label>Profile</Label>
      <Input type="file"  accept="image/*"   onChange={changeFileHandler} className="cursor-pointer"  />
    </div>
          </div>
          {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Sign Up</Button>
          }
          <span>Already have an account? <Link to="/login" className='text-blue-600 text-sm' >Login</Link></span>
          
        </form>
    </div>
    </>
  )
}

export default Signup