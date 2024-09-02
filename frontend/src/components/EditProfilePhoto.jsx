
import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import Navbar from './shared/Navbar';


function EditProfilePhoto() {
    const navigate=useNavigate();
    const {user}=useSelector(store=>store.auth);
    let photo;
    const dispatch=useDispatch();
    const [loading,setloading]=useState(false);
    const changeFileHandler = (e) => {
        photo=e.target.files?.[0] ;
    }
    const submitHandler=async(e)=>{
        setloading(true);
        e.preventDefault();
        const formData=new FormData();
        formData.append("file",photo);
        try {
            const res=await axios.post(`${USER_API_END_POINT}/profilephoto/${user._id}`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            });
            console.log(res.data.success)
             if(res.data.success){
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
                navigate("/");
                }
            
        } catch (error) {
            toast.error("unexpected error")
            console.log(error)
        }
        finally{
            setloading(false);
        }
    }
    return (
        <>
        <Navbar/>
        <div className='flex max-w-3xl shadow-lg items-center justify-center mx-auto my-[10%] '>
            <form onSubmit={submitHandler}>
            <div className=' mb-3'>
                <Label className=" text-right text-3xl mb-3">Profile Photo</Label>
                <Input type="file" name="file" onChange={changeFileHandler} accept="image/*" className="col-span-3 mt-2" />
            </div>
            <div>
                    {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Update</Button>
          }
                    </div>
            </form>
          
        </div>
        </>
    )
}

export default EditProfilePhoto