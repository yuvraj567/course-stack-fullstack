import React, { useEffect, useState } from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay,FreeMode,Navigation, Pagination}  from 'swiper/modules'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../services/apiconnector'
import { ratingsEndpoints } from '../../services/apis'
import { FaStar } from 'react-icons/fa'


const ReviewSlider = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async() => {
            const {data} = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            console.log("LOgging response in rating", data);

            if(data?.success) {
                setReviews(data?.data);
            }

            console.log("Printing Reviews", reviews);

        }
        fetchAllReviews();
    }, []);


  return (
    <div className='text-white mb-10 mt-5 flex justify-start  mx-auto'>
        <div className='max-h-max max-w-maxContent w-11/12'>
            <Swiper
            slidesPerView={1}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay={{
                delay: 2500,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className='w-screen'
            >

                {
                    reviews.map((review, index) => (
                        <SwiperSlide key={index} className='mySwiper flex flex-col items-center'>
                            <img
                            src={review?.user?.image
                             ? review?.user?.image
                              : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                              alt='Profile Pic'
                              className='h-9 w-9 object-cover rounded-full mt-2'
                            />
                            <p className='text-md'>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p className='text-lg font-bold useme flex items-center'>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>
                            
                            <p>{review?.rating.toFixed(1)}</p>
                            <ReactStars 
                                count={5}
                                value={review.rating}
                                size={20}
                                edit={false}
                                activeColor="#ffd700"
                                emptyIcon={<FaStar />}
                                fullIcon={<FaStar />}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default ReviewSlider