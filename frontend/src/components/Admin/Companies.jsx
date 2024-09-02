import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setsearchcompanybytext } from '@/redux/companySlice'

function Companies() {
  useGetAllCompanies();
  const[input,setinput]=useState();
  const dispatch=useDispatch();
    const navigate=useNavigate()
    useEffect(()=>{
     dispatch(setsearchcompanybytext(input));
    },[input])
  return (
   <div>
    <Navbar/>
    <div className='max-w-6xl mx-auto my-10'>
    <div className='flex items-center my-4 justify-between'>
        <Input type="text" className="w-fit" onChange={(e)=>setinput(e.target.value)} placeholder="Filter by name"/>
        <Button onClick={()=>navigate("/admin/companies/create")}>New Company</Button>
    </div>
    <CompaniesTable/>
    </div>
   </div>
  )
}

export default Companies