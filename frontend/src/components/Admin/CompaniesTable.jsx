import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function CompaniesTable() {
    const { companies, searchcompanybytext } = useSelector(store => store.company);
    const [filtercompany, setfiltercompany] = useState(companies);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredcompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchcompanybytext) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchcompanybytext.toLowerCase());
        })
        setfiltercompany(filteredcompany);
    }, [companies, searchcompanybytext])
    return (
        <Table>
            <TableCaption>List of your recent registeres companies</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    filtercompany?.length <= 0 ? <span className='text-center text-muted-foreground'>No company is found</span> :

                        (
                            <>
                                {

                                    filtercompany?.map((company) => {
                                        return (
                                            <>
                                                <tr>
                                                    <TableCell>
                                                        <Avatar className="border border-blue-700" >
                                                            <AvatarImage src={company.logo} />
                                                        </Avatar>
                                                    </TableCell>
                                                    <TableCell>{company.name}</TableCell>
                                                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Popover>
                                                            <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                                            <PopoverContent>
                                                                <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 cursor-pointer'>
                                                                    <Edit2 className='w-4' />
                                                                    <span>Edit</span>
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

export default CompaniesTable