import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setsingleCompany } from '@/redux/companySlice'

function CreateCompany() {
    const dispatch= useDispatch();
    const navigate= useNavigate();
    const [companyName,setcompanyName]=useState();
    const registercompany= async ()=>{
        try {
            const res= await axios.post(`${COMPANY_API_END_POINT}/register`,{companyName},{
                headers:{
                    "Content-Type":"application/json"
                },
                withCredentials:true
            });
            if(res?.data?.success){
                toast.success(res.data.message);
                dispatch(setsingleCompany(res.data.company));
                const companyId=res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
 
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto my-5'>
            <div>
                <h1 className='text-2xl font-bold'>Your Company Name</h1>
                <p className='text-gray-500'>Decide the name of company. You can change it later..</p>
            </div>
            <div className='my-6'>
                <Label >Company name</Label>
                <Input className="my-3" type="text" onChange={(e)=>setcompanyName(e.target.value)}/>
            </div>
            <div className='flex gap-3 items-center'>
                <Button variant="outline" onClick={()=>navigate("/admin/companies")} >Cancel</Button>
                <Button onClick={registercompany}>Continue</Button>
            </div>
        </div>
    </div>
  )
}

export default CreateCompany