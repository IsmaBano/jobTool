import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@radix-ui/react-label'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '@/redux/jobSlice'

const filterData=[
  {
    filterType:"Location",
    array:["Delhi","Pune","Banglore","Mumbai","Hyderabad"]
  },
  {
    filterType:"Industry",
    array:["Frontened Developer","Backened Developer","Data Analytics","Full Stack developer"]
  },
  {
    filterType:"Salary",
    array:["0-1Lpa","1-4Lpa","5Lpa or above"]
  },
]
function Filtercard() {
  const dispatch=useDispatch()
  const [selectedvalue,setselectedvalue]=useState("");
  const changeHandler=(value)=>{
    setselectedvalue(value);
  }
  useEffect(()=>{
      dispatch(setsearchQuery(selectedvalue));
  },[selectedvalue])
  return (
   <div className='m-2 p-4'>
    <h1>Filter data</h1>
    <hr className='mt-3'/>
    <RadioGroup value={selectedvalue} onValueChange={changeHandler}>
      {
        filterData.map((data,index)=>(
          <div className='mt-3 grid grid-cols-3 md:grid-cols-none md:grid-flow-row '>
          <h1 className='font-bold'>{data.filterType}</h1>
          {
            data.array.map((items,idx)=>{
              const itemid=`id${index}-${idx}`
              return(
                <div className='mt-1 gap-2'>
            <RadioGroupItem  id={itemid} value={items}/>
            <Label htmlFor={itemid}>{items}</Label>
            </div>
              )
          })
        }
          </div>
        ))
      }

    </RadioGroup>
   </div>
  )
}

export default Filtercard