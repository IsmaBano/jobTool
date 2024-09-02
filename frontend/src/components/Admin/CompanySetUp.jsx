import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanybyId from '@/hooks/useGetCompanybyId'


function CompanySetUp() {
    const [loading,setloading]=useState(false);
    const navigate= useNavigate();
    const params=useParams();
    const Id=params.id;
    useGetCompanybyId(Id);
    const {singleCompany}=useSelector(store=>store.company)

    const [input, setinput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    })
   
    const changeEventHandler = (e) => {
        setinput({ ...input, [e.target.name]: e.target.value })
    }
    const changeFileHandler = (e) => {
        setinput({ ...input, file: e.target.files?.[0] });
    }
    const submitHandler= async(e)=>{
        e.preventDefault()
        const formData=new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("location",input.location);
    if(input.file){
      formData.append("file",input.file);
    }
    try {
        setloading(true);
        const res= await axios.put(`${COMPANY_API_END_POINT}/update/${Id}`,formData,{
            headers:{
                'Content-Type':'multipart/form-data'
            },
            withCredentials:true
        })
        if(res.data.success){
            toast.success(res.data.message);
            navigate("/admin/companies");
            }
    } catch (error) {
        console.log(error);
    } finally{
        setloading(false);
    }
    }
    useEffect(()=>{
        setinput({
            name: singleCompany.name||"",
            description: singleCompany.description ||"",
            website: singleCompany.website||"",
            location: singleCompany.location || "",
            file:  null
        })
    },[singleCompany])
    return (
        <div>
            <Navbar />
            <div className='md:max-w-2xl mx-[15%] md:mx-auto my-10 '>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-8 p-2 mb-3'>
                           <Button variant="outline" onClick={()=>navigate("/admin/companies")} className="font-semibold flex items-center gap-2"><ArrowLeft/>
                           <span>Back</span>
                           </Button>
                           <h1 className='font-bold text-xl'>Company SetUp</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-3'>
                        <div className=' mb-3'>
                            <Label className=" text-right ">Company Name</Label>
                            <Input name="name" value={input.name} onChange={changeEventHandler} type="text" className="col-span-3"/>
                        </div>
                        <div className=' mb-3'>
                            <Label className=" text-right ">Description</Label>
                            <Input name="description" value={input.description} onChange={changeEventHandler} type="text" className="col-span-3"/>
                        </div>
                        <div className=' mb-3'>
                            <Label className=" text-right ">Website</Label>
                            <Input name="website" onChange={changeEventHandler} value={input.website} type="url" className="col-span-3"/>
                        </div>
                        <div className=' mb-3'>
                            <Label className=" text-right ">Location</Label>
                            <Input name="location" value={input.location} type="text" onChange={changeEventHandler} className="col-span-3"/>
                        </div>

                        <div className=' mb-3'>
                            <Label className=" text-right ">Logo</Label>
                            <Input type="file" onChange={changeFileHandler} name="file" accept="image/*" className="col-span-3"/>
                        </div>
                    </div>
                    <div>
                    {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Update</Button>
          }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CompanySetUp