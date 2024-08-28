import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {
    const navigate = useNavigate();
    
    return (
        <div className='px-2 py-2 text-center'>
            <h1 className='mt-5 text-xl md:text-2xl text-gray-800 text-center font-semibold'>4<span className='text-violet-500'>0</span>4 Page Not Found</h1>
            <div className='mx-auto w-1/2 h-1/2'>
                <img className='w-full h-full object-cover' src="https://cdni.iconscout.com/illustration/premium/thumb/woman-with-broken-down-car-illustration-download-in-svg-png-gif-file-formats--accident-on-road-breakdown-pack-vehicle-illustrations-5191844.png" alt="car-image" />
            </div>
            <button className='transition-all ease-linear mt-5 px-6 py-2 bg-violet-600 text-white hover:-translate-y-1 rounded shadow-md' onClick={() => navigate(-1)}>Go back</button>
        </div>
    )
}

export default NotFoundPage