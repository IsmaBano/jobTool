import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import { Badge } from './ui/badge'
import Updatedialog from './Updatedialog'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import UserAppliedJob from '@/hooks/UserAppliedJob'

function Profile() {
  UserAppliedJob();
  const {user}=useSelector(store=>store.auth);
  const[open,setopen]=useState();
  const isResume = true;
  const skills = user?.profile?.skills;
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto shadow-lg border border-gray-200 mb-4 '>
        <div className='flex  m-5 p-4 justify-between'>
          <div className='flex gap-5 '>
            <div >
              <Avatar className="h-15 w-15 md:h-24 md:w-24 cursor-pointer border border-[#C75B7A]">
                <AvatarImage src={user?.profile?.profilePhoto}></AvatarImage>
              </Avatar>
            </div>
            <div className='mt-4'>
              <h1 className='font-medium text-2xl'>{user?.fullname}</h1>
              <p className='text-sm '>{user?.profile.bio}</p>
            </div>
          </div>
          <div >
            <Button variant="outline"  onClick={()=>setopen(true)} ><Pen /></Button>
          </div>
        </div>
        <div className='mb-2 ml-4 p-2' >
          <span className='flex gap-4 mb-2'> <Mail /><p className='text-gray-500'>{user?.email}</p></span>
          <span className='flex gap-4'> <Contact /><p className='text-gray-500'>{user?.phoneNumber}</p></span>
        </div>
        <div className='mb-2 ml-4 p-2'>
          <h4>Skills</h4>
          <div className='flex gap-2 mt-2'>
            {
            skills.length>0? skills?.map((items) => (
                <Badge>{items}</Badge>
              )):< span className='text-muted-foreground'>NA</span>
            }
          </div>
          {
            isResume ? <div className='my-2'> <h1 className='font-bold '>Resume</h1><a href={user.profile?.resume} className='text-blue-400 text-sm'>{user?.profile?.resumeOriginalName}</a></div> : <></>
          }
          <div>
          </div>

        </div>
      </div>
      <div className=' max-w-7xl mx-auto' >
        <h1 className='font-bold text-2xl'>Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <Updatedialog open={open} setopen={setopen}/>
    </div>
  )
}

export default Profile