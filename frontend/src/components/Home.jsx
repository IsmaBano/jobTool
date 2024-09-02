import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import useGetAlljobs from '@/hooks/useGetAlljobs'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsearchQuery } from '@/redux/jobSlice'

function Home() {
  const dispatch=useDispatch();
  const {user}=useSelector(store=>store.auth);
  const navigate= useNavigate();
  useEffect(()=>{
    if(user?.role==="recruiter"){
        navigate("/admin/companies");
    }
    dispatch(setsearchQuery(""));
  },[])
  useGetAlljobs();
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobs/>
    <Footer/>
    </>
  )
}

export default Home