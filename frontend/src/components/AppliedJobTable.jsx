import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

function AppliedJobTable() {
    const {allAppliedJobs}=useSelector(store=>store.job);
  return (
    <Table>
        <TableCaption>List of your Applied Jobs</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Job</TableHead>
                <TableHead>company</TableHead>
                <TableHead className="text-right">status</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                
            allAppliedJobs.length<=0?<span>You havent applied for any job</span>:allAppliedJobs.map((currjob)=>(
                <TableRow key={currjob._id}>
                <TableCell className="text-gray-500">{currjob.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-gray-500">{currjob?.job?.title}</TableCell>
                <TableCell className="text-gray-500">{currjob?.job?.company?.name}</TableCell>
                <TableCell className="text-right"><Badge className={`${currjob?.status==="rejected"? `bg-red-400`:currjob?.status==="accepted"? `bg-green-400` :` bg-gray-400`}`}>{currjob?.status}</Badge></TableCell>
            </TableRow>
            ))
}
        </TableBody>
    </Table>
  )
}

export default AppliedJobTable