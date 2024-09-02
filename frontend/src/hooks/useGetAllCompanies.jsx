
import { setcompanies } from '@/redux/companySlice'
import { COMPANY_API_END_POINT, } from '@/utils/constant'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

function useGetAllCompanies() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchcompanies = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setcompanies(res.data.companies));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchcompanies();
  }, [dispatch])
}

export default useGetAllCompanies