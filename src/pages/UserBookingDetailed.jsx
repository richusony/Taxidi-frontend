import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosConfig';
import { useParams } from 'react-router-dom';
import DefaultNavbar from '../components/DefaultNavbar';

const UserBookingDetailed = () => {
  const {paymentId} = useParams();
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(()=> {
    fetchBookingDetails();
  },[])

  const handleCancelBooking = async (e) => {
    e.stopPropagation();
  }

  const fetchBookingDetails = async () => {
    try {
      const res = await axiosInstance.get(`/booking-details/${paymentId}`);
      // console.log(res?.data);
      setBookingDetails(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatDatetimeLocal(utcDatetime) {
    const date = new Date(utcDatetime);
    
    return date.toDateString() + ", " + date.toLocaleTimeString();
}

  return (
    <div>
      <DefaultNavbar />

      <div className='mt-5'>
        <div className='flex justify-between'>
          <div className='md:w-1/2'>
            <img className='w-full h-full rounded-e' src={bookingDetails?.vehicleId?.vehicleImages[0]} alt="car-image" />
          </div>

          <div className='px-4 md:w-1/2'>
            <h1 className='text-2xl font-semibold'>{bookingDetails?.vehicleId?.model}</h1>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Host</h1>
              <div className='mt-2 flex items-center'>
                <div className='w-12 h-12'>
                  <img className='w-full h-full object-cover rounded-full shadow-sm' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" />
                </div>
                <span className='ml-3 text-gray-600'>{bookingDetails?.hostId?.fullname}</span>
              </div>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Trip Start</h1>
              <span>{formatDatetimeLocal(bookingDetails?.vehicleId?.bookingStarts)}</span>
              <h1 className='text-gray-500 font-semibold'>Trip Ends</h1>
              <span>{formatDatetimeLocal(bookingDetails?.vehicleId?.bookingEnds)}</span>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Amount Paid</h1>
              <span>{bookingDetails?.totalAmount}</span>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Payment Id</h1>
              <span>{bookingDetails?.paymentId}</span>
            </div>

            <div className='mt-5'>
              <button onClick={handleCancelBooking} className='transition delay-100 ease-in border border-red-400 px-4 py-1 text-red-400 hover:scale-105 hover:text-red-600 rounded shadow-md'>Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserBookingDetailed