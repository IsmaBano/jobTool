import {  BookMarkedIcon, LogOut,  Pen, User2,  } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom';
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger, } from '../ui/popover'
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

function Navbar() {
    const {user}=useSelector(store=>store.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const logOutHandler =async()=>{
        try {
            const res= await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
            dispatch(setUser(null));
            navigate("/");
            toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }
    return (
        <div className='bg-white flex items-center justify-between mx-auto p-4 ' >
            <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#C75B7A]'>Tool</span></h1>
            </div>
            <div className='flex gap-3 justify-around'> 
                <ul className='flex items-center font-medium gap-6'>
                    {
                        user && user.role==="recruiter" ?(
                          <>.

                          <li><Link to="/admin/companies">Companies</Link></li>
                          <li><Link to="/admin/jobs">Jobs</Link></li>
                          </>  
                        ):(
                            <>
                             <li><Link to="/">Home</Link></li>
                            <li><Link to="/jobs">Jobs</Link></li>
                            <li><Link to="/browse">Browse</Link></li>
                            </>
                        )
                    }
                </ul>
                {
                    !user?(
                        <div className='flex items-center gap-3'>
                            <Link to="/login"><Button variant="outline">Login</Button></Link>
                            <Link to="/signup"><Button className="bg-[#C75B7A] hover:bg-[#8a374e]">SignUp</Button></Link> </div>  ):(
                        <Popover>
                        <PopoverTrigger asChild>
                            <Avatar className="cursor-pointer border border-[#C75B7A]">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                            </Avatar>
                            </PopoverTrigger>
                        <PopoverContent className="w-80  "> 
                            <div className='flex items-center gap-3 '>
                            <Avatar className="cursor-pointer border  border-[#C75B7A]">
                            <AvatarImage  src= {user?.profile?.profilePhoto} alt="@shadcn" />
                            </Avatar>
                            <h4 className='font-bold'>{user.fullname}</h4>
                            </div>
                           <div> <p className='text-sm text-muted-foreground'> {user?.profile?.bio}</p></div>
                           {
                            user && user.role==="student" && (
                                <>
                                 <div>  <Button variant="link" className="gap-2"><User2/><Link to="/profile">view profile</Link></Button> </div>
                                 <div>  <Button variant="link"  className="gap-2"><Pen/><Link to="/profilephoto">Edit ProfilePhoto</Link></Button> </div>
                                 <div>  <Button variant="link" className="gap-2"><BookMarkedIcon/> <Link to="/profile/savedjobs"> Saved Jobs</Link></Button> </div>
                               
                                </>
                            )
                           }
                           <div> <Button onClick={logOutHandler} variant="link"className="gap-2"><LogOut/> Log out</Button> </div>
                        </PopoverContent>
                    </Popover>
    
                    )
                }

               

            </div>
        </div>
    )
}

export default Navbar