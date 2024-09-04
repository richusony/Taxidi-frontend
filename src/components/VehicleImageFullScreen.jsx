import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const VehicleImageFullScreen = ({ vehicleImages, closeView }) => {
    const [imageIndex, setImageIndex] = useState(0);

    const handleChangeImage = action => {
        if (action === "prev") {
            if(imageIndex > 0) {
                setImageIndex(prev => prev - 1);
            }
        } else if (action === "next") {
            if (imageIndex < vehicleImages?.length - 1) {
                setImageIndex(prev => prev + 1);
            }
        }
    }

    return (
        <div className='transition-all ease-linear px-4 bg-black bg-opacity-80 absolute top-0 right-0 w-full h-screen overflow-hidden'>
            <div className='mt-2 text-end h-fit'><h1 onClick={()=> closeView(false)} className='text-white font-bold cursor-pointer'>Close</h1></div>
            <div className='w-full h-full m-auto flex justify-between items-center'>
                <button onClick={() => handleChangeImage("prev")}><FontAwesomeIcon icon={faAngleLeft} className='bg-white py-2 px-3 rounded-full' /></button>
                <div className='md:w-2/3 md:h-4/5'>
                    <img className='w-full h-full object-cover rounded' src={vehicleImages[imageIndex]} alt="vehicle-image" />
                </div>
                <button onClick={() => handleChangeImage("next")}><FontAwesomeIcon icon={faAngleRight} className='bg-white py-2 px-3 rounded-full' /></button>
            </div>
        </div>
    )
}

export default VehicleImageFullScreen