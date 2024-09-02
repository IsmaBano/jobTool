import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setsingleJob } from '@/redux/jobSlice'



function UpdateJob() {
    const {singleJob}=useSelector(store=>store.job)
    const [input, setInput] = useState({
        title:singleJob.title || "",
        description:singleJob.description || "",
        requirements: singleJob.requirements || "",
        salary: singleJob.salary ||"",
        location:singleJob.location || "",
        jobType:singleJob.jobType || "",
        experiencelevel:singleJob.experiencelevel || "",
        position: singleJob.position ||0,
    });
    const [loading, setLoading] = useState(false);
    const dispatch=useDispatch();
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

  

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.put(`${JOB_API_END_POINT}/update/${singleJob._id}`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
               dispatch(setsingleJob(res.data.job))
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div>
            <Navbar />
            <div className='max-w-2xl mx-auto my-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-8 p-2 mb-3'>
                           <Button variant="outline" onClick={()=>navigate("/admin/jobs")} className="font-semibold flex items-center gap-2"><ArrowLeft/>
                           <span>Back</span>
                           </Button>
                           <h1 className='font-bold text-xl'>Update Job</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-2'>
                        <div>
                            <Label>Title</Label>
                            <Input
                                type="text"
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input
                                type="text"
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input
                                type="text"
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input
                                type="text"
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input
                                type="text"
                                name="experiencelevel"
                                value={input.experiencelevel}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        <div>
                            <Label>No of Postion</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="mb-2"
                            />
                        </div>
                        </div>
                    {
            loading? <Button className="w-full my-3"><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please Wait</Button>: <Button type="submit"  className="w-full my-3">Update</Button>
          }
                   
                </form>
            </div>
        </div>
    )
}

export default UpdateJob