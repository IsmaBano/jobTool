import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setsingleJob } from '@/redux/jobSlice'

function Adminjobstable() {
    const { allAdminJobs,searchjobbytext} = useSelector(store => store.job);
    const [filterjob, setfilterjob] = useState(allAdminJobs);
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const handleclick=(job)=>{
      dispatch(setsingleJob(job));
      navigate(`/admin/jobs/update/${job._id}`);
    }
    useEffect(() => {
        const filteredjobs = allAdminJobs?.length >= 0 && allAdminJobs.filter((Job) => {
            if (!searchjobbytext) {
                return true
            };
            return Job?.company?.name?.toLowerCase().includes(searchjobbytext.toLowerCase()) ||  Job?.title?.toLowerCase().includes(searchjobbytext.toLowerCase());
        })
        setfilterjob(filteredjobs);
    }, [allAdminJobs, searchjobbytext])
    return (
        <Table>
            <TableCaption>List of your recent registered jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Company Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filterjob?.length <= 0 ? <span className='text-center text-muted-foreground'>No job is found</span> :

                        (
                            <>
                                {

                                    filterjob?.map((job) => {
                                        return (
                                            <>
                                                <tr>
                                                    <TableCell>{job?.company?.name} </TableCell>
                                                    <TableCell>{job?.title}</TableCell>
                                                    <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Popover>
                                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                            <PopoverContent>
                                                                <div onClick={() => handleclick(job)} className='flex items-center gap-2 cursor-pointer'>
                                                                    <Edit2 className='w-4' />
                                                                    <span>Edit</span>
                                                                </div>
                                                                <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className='flex items-center gap-2 cursor-pointer my-2'>
                                                                    <Eye/>
                                                                    <apan>Applicants</apan>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    </TableCell>
                                                </tr>
                                            </>
                                        )
                                    })
                                }
                            </>

                        )
                }
            </TableBody>
        </Table>
    )
}

export default Adminjobstable