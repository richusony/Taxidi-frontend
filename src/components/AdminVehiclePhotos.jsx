import React, { useState } from 'react';
import FullScreenImage from './FullScreenImage';

const AdminVehiclePhotos = ({ data }) => {
    const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
    const [viewImageFullScreen, setViewImageFullScreen] = useState(false);
    return (
        <>
            {data ? data.map((photo, index) => (
                <div key={index}>
                    <h1 className='text-gray-500 w-fit'>Photos - {index + 1}</h1>
                    <div onClick={() => { setFullScreenImageUrl(photo); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                        <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={photo} alt="" />
                    </div>
                </div>
            )) : <h1 className='mt-10 text-center font-bold'>No Photos yet</h1>
            }

            {viewImageFullScreen && <FullScreenImage imageUrl={fullScreenImageUrl} setViewImageFullScreen={setViewImageFullScreen} setFullScreenImageUrl={setFullScreenImageUrl} />}
        </>
    )
}

export default AdminVehiclePhotos