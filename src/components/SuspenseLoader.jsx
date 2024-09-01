import React from 'react'
import loader from "../assets/images/car-suspense-loading.gif"

const SuspenseLoader = () => {
  return (
    <div className='px-5 py-5'>
        <div className='m-auto w-1/2 h-1/2'>
            <img className='w-full h-full object-cover' src={loader} alt="car-driving" />
        </div>
        <h1 className='text-xl text-center font-bold md:font-extrabold text-gray-700'>Hold there for a sec..!!</h1>
    </div>
  )
}

export default SuspenseLoader