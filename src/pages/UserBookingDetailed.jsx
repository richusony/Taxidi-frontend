import axiosInstance from '../axiosConfig';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/DefaultNavbar';
import UserNotifications from '../components/UserNotifications';
import { useNotificationContext } from '../contexts/NotificationContext';

const UserBookingDetailed = () => {
  const { paymentId } = useParams();
  const { notificationBox } = useNotificationContext();
  const [bookingStatus, setBookingStatus] = useState(true);
  const [bookingDetails, setBookingDetails] = useState(null);

  useEffect(() => {
    fetchBookingDetails();
  }, [])

  const handleCancelBooking = async (e) => {
    e.stopPropagation();
    const reqData = {
      paymentId
    }
    try {
      const res = await axiosInstance.post("/cancel-booking", reqData);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBookingDetails = async () => {
    try {
      const res = await axiosInstance.get(`/booking-details/${paymentId}`);
      console.log(res?.data[0]);
      setBookingDetails(res?.data[0]);
      setBookingStatus(res?.data[0]?.bookingStatus);
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

      <div className='mt-10 mb-5'>
        <div className='flex flex-col md:flex-row gap-y-5 md:gap-y-0 justify-between'>
          <div className='md:w-1/2 md:h-1/2 md:m-auto'>
            <img className='w-full h-full rounded-e' src={bookingDetails?.vehicleDetails?.vehicleImages[0]} alt="car-image" />
          </div>

          <div className='px-4 md:w-1/2'>
            <h1 className='text-2xl font-semibold uppercase'>{bookingDetails?.brandDetails[0]?.brandName + " " + bookingDetails?.vehicleDetails?.model}</h1>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Host</h1>
              <div className='mt-2 flex items-center'>
                <div className='w-12 h-12'>
                  <img className='w-full h-full object-cover rounded-full shadow-sm' src={bookingDetails?.hostDetails[0]?.profileImage} alt="" />
                </div>
                <span className='ml-3 text-gray-600'>{bookingDetails?.hostDetails[0]?.fullname}</span>
              </div>
            </div>

            <div className='mt-5 grid grid-cols-2 gap-y-3'>
              <div className=''>
                <h1 className='text-gray-500 font-semibold'>Trip Start</h1>
                <span>{formatDatetimeLocal(bookingDetails?.bookingStarts)}</span>
                <h1 className='mt-2 text-gray-500 font-semibold'>Trip Ends</h1>
                <span>{formatDatetimeLocal(bookingDetails?.bookingEnds)}</span>
              </div>

              <div className='mt-5'>
                <h1 className='text-gray-500 font-semibold'>Amount Paid</h1>
                <span><span className='text-[#593CFB] font-semibold'>₹</span>{bookingDetails?.totalAmount}</span>
              </div>

              <div className='mt-5'>
                <h1 className='text-gray-500 font-semibold'>Payment Id</h1>
                <span>{bookingDetails?.paymentId}</span>
              </div>

              <div className='mt-5'>
                <h1 className='text-gray-500 font-semibold'>Booking Status</h1>
                <span>{bookingStatus ? "Booked" : "Cancelled"}</span>
              </div>
              <div className='mt-5'>
                <h1 className='text-gray-500 font-semibold'>Pick Up</h1>
                <span>{bookingDetails?.vehicleDetails?.pickUpLocation}</span>
              </div>
            </div>

            <div className='mt-8 text-center'>
              <button disabled={!bookingStatus} onClick={handleCancelBooking} className={`transition-all ${bookingStatus ? "cursor-pointer" : "cursor-not-allowed"} delay-100 ease-in border border-red-400 px-4 py-1 w-10/12 mx-auto font-semibold text-red-500 hover:bg-red-500 hover:text-white rounded shadow-md`}>Cancel</button>
            </div>
          </div>
        </div>
      </div>
      {notificationBox && <UserNotifications />}
    </div>
  )
}

export default UserBookingDetailed