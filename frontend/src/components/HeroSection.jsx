import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setsearchQuery } from '@/redux/jobSlice';

function HeroSection() {
  const [Query,setQuery]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const searchHandler=()=>{
    dispatch(setsearchQuery(Query));
    navigate("/browse")
  }
  return (
    <div className='text-center mx-[25%] md:mx-0'>
      <div className='flex flex-col gap-4 my-10'>
      <span className='mx-auto text-[#6A38C2] px-4 py-2 bg-gray-200 rounded-full font-medium'>your job hunt ends here  !</span>
      </div>
      <div>
      <h1 className='md:text-5xl text-3xl font-bold text-center'>Search & apply <br/>for your <span className='text-[#C75B7A]'> dream jobs</span></h1>
      </div>
      <div className='text-center m-3 flex justify-center  py-3 text-wrap text-sm text-muted-foreground'> 
   <p> Explore thousands of job opportunities across various industries, ranging from entry-level positions to executive roles..</p>
    </div>
    <div className='flex md:w-[40%] shadow-lg border border-gray-200 md:pl-3 rounded-full items-center gap-4 mx-3 md:mx-auto'>
      <input type='text' onChange={(e)=>setQuery(e.target.value)} placeholder='Search your dream Jobs'className='outline-none border-none w-full'/>
      <Button onClick={searchHandler} className="rounded-r-full bg-[#C75B7A] hover:bg-[#98415a]"><Search /></Button>
    </div>
    </div>
  )
}

export default HeroSection