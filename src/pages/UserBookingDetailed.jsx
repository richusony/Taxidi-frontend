import React from 'react';
import DefaultNavbar from '../components/DefaultNavbar';

const UserBookingDetailed = () => {

  const handleCancelBooking = async (e) => {
    e.stopPropagation();
  }

  return (
    <div>
      <DefaultNavbar />

      <div className='mt-5'>
        <div className='flex justify-between'>
          <div className='md:w-1/2'>
            <img className='w-full h-full rounded-e' src="https://res.cloudinary.com/dwswpaf4r/image/upload/v1722498526/uploads/duster1.webp.webp" alt="car-image" />
          </div>

          <div className='px-4 md:w-1/2'>
            <h1 className='text-2xl font-semibold'>Duster</h1>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Host</h1>
              <div className='mt-2 flex items-center'>
                <div className='w-12 h-12'>
                  <img className='w-full h-full object-cover rounded-full shadow-sm' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" />
                </div>
                <span className='ml-3 text-gray-600'>Richu Sony</span>
              </div>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Trip Start</h1>
              <span>08/07/2024 2:23 AM</span>
              <h1 className='text-gray-500 font-semibold'>Trip Ends</h1>
              <span>08/07/2024 2:23 AM</span>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Amount Paid</h1>
              <span>1200</span>
            </div>

            <div className='mt-5'>
              <h1 className='text-gray-500 font-semibold'>Payment Id</h1>
              <span>pay_twxtqwqWzt23</span>
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