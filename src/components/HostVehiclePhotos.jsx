import React, { useState } from 'react'
import FullScreenImage from './FullScreenImage';

const HostVehiclePhotos= ({ data }) => {
    const [viewImageFullScreen, setViewImageFullScreen] = useState(false);
    const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
    return (
        <>
            {data ? data.map((photo, index) => (
                <div>
                    <h1 className='text-gray-500 w-fit'>Photos - {index + 1}</h1>
                    <div onClick={() => { setFullScreenImageUrl(photo); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                        <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={photo} alt="" />
                    </div>
                </div>
            )) : <h1 className='mt-10 text-center font-bold'>No Photos yet</h1>
    }
            {/* <div>
                <h1 className='text-gray-500 w-fit'>Registration Certificate Back Image</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.registrationCertificateBackImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.registrationCertificateBackImage} alt="" />
                </div>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Insurance Certificate</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.insuranceCertificateImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.insuranceCertificateImage} alt="" />
                </div>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Polluction Certificate</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.pollutionCertificateImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.pollutionCertificateImage} alt="" />
                </div>
            </div> */}
            {viewImageFullScreen && <FullScreenImage imageUrl={fullScreenImageUrl} setViewImageFullScreen={setViewImageFullScreen} setFullScreenImageUrl={setFullScreenImageUrl} />}
        </>
    )
}

export default HostVehiclePhotos