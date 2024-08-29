import React, { useState } from 'react'
import axiosInstance from '../axiosConfig';

const CancelReasonBox = ({ setCancelBox, paymentId, bookingStatus, setError, cancelBy }) => {
  const [cancelReason, setCancelReason] = useState("");

  const handleCancelBooking = async (e) => {
    e.stopPropagation();

    if(bookingStatus === false) {
      setError("Booking has been cancelled already");
      return;
    }

    if(!cancelReason || cancelReason == "") {
      setError("Enter reason for cancelling");
      return;
    }

    try {
      const reqData = {
        paymentId,
        cancelReason
      }
      const res = await axiosInstance.post(`/${cancelBy}/cancel-booking`, reqData);
      console.log("cancelled ::", res);
      setCancelBox(false);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.error);
    }
  }

  return (
    <div className='transition-all delay-150 ease-linear absolute top-0 right-0 bg-black bg-opacity-60 min-h-screen w-full flex justify-center items-center'>
      <div className='px-4 py-3 bg-white rounded-md shadow-md'>
        <h1 className='mb-2 text-gray-700'>Are you sure?</h1>
        <textarea name="cancelReason" onChange={(e)=>setCancelReason(e.target.value)} className='border border-[#593CFB] px-2 py-1 bg-transparent resize-none outline-none rounded hideScrollBar' placeholder='Reason for cancelling' id="cancelReason" cols="60" rows="5"></textarea>
        <div className='mt-5 flex justify-between'>
          <button onClick={() => setCancelBox(false)} className='border border-[#593CFB] px-4 py-1 rounded text-[#593CFB]'>Go Back</button><button onClick={handleCancelBooking} className='border border-red-500 px-4 py-1 rounded text-red-500'>Cancel Booking</button>
        </div>
      </div>
    </div>
  )
}

export default CancelReasonBox