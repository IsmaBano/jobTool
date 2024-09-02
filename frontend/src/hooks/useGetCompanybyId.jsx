
import { setsingleCompany } from '@/redux/companySlice'
import { COMPANY_API_END_POINT, } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function  useGetCompanybyId(companyId) {
   const dispatch=useDispatch();
useEffect(()=>{
 const fetchsinglecompany= async()=>{
   try {
    const res= await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`,{withCredentials:true});
    if (res.data.success) {
        dispatch(setsingleCompany(res.data.company));
      }
   } catch (error) {
    console.log(error);
   }
 }
 fetchsinglecompany();
},[companyId,dispatch])
}

export default useGetCompanybyId