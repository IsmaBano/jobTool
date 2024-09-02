import React from 'react'
import { Carousel , CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setsearchQuery } from '@/redux/jobSlice'
  const category=[
    "Backened developer",
    "Frontened developer",
    "Full stack developer",
    "Data analytics",
    "Java Developer",
    "Software Developer"
  ]
function CategoryCarousel() {
  const dispatch =useDispatch();
  const navigate=useNavigate();
  const searchHandler=(Query)=>{
    dispatch(setsearchQuery(Query));
    navigate("/browse")
  }
  return (
    <div>
        <Carousel className="w-full max-w-[220px] md:max-w-xl mx-auto my-20">
            <CarouselContent>
             { category.map((items,index) => (
                 <CarouselItem className="md:basis-1/2 lg:basis-1/3 basis-1"  key={index}>
                 <Button variant="outline" onClick={()=>searchHandler(items)} className="rounded-full">{items}</Button>
                    </CarouselItem>
             ))
            }
            </CarouselContent>
            <CarouselPrevious/>
            <CarouselNext/>
        </Carousel>
    </div>
  )
}

export default CategoryCarousel