import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup} from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { toast } from 'sonner'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'

function Login() {
  const {user}=useSelector(store=>store.auth);
  const [input,setinput]=useState({
    email:"",
    password:"",
    role:"",
});
const {loading}=useSelector(store=>store.auth);
const dispatch=useDispatch();
const navigate= useNavigate();
  const changeEventHandler=(e)=>{
    setinput({...input,[e.target.name]:e.target.value})
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      console.log(res);
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
    finally{
         dispatch(setLoading(false))
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
          <h1 className='font-bold text-xl mb-5'>Login</h1>
          <div className='my-2'>
          <Label>Email</Label>
          <Input className="my-2" type="email" name="email" value={input.email} onChange={changeEventHandler} placeholder="Enter email" />
          </div>
          <div className='my-2'>
          <Label>Password</Label>
          <Input className="my-2" type="password" name="password" value={input.password} onChange={changeEventHandler} placeholder="Enter password" />
          </div>
          <div className='flex  justify-between items-center '>
          <RadioGroup  className='flex justify-center items-center gap-4 my-5'>
      <div className="flex items-center space-x-2">
        <Input type="radio" name="role" value="student"  checked={input.role==='student'} onChange={changeEventHandler}  className="cursor-pointer" />
        <Label htmlFor="r1">Student</Label>
      </div>
      <div className="flex items-center space-x-2">
      <Input type="radio" name="role" value="recruiter"  checked={input.role==='recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
        <Label htmlFor="r2">Recruiter</Label>
      </div>
    </RadioGroup>
          </div>
          {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Login</Button>
          }
          <span>Dont have an account? <Link to="/signup" className='text-blue-600 text-sm' >Sign up</Link></span>
          
        </form>
    </div>
    </>
  )
}

export default Login