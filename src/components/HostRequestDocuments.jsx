import { useState } from "react"
import FullScreenImage from "./FullScreenImage";

const HostRequestDocuments = ({ data }) => {
    const [viewImageFullScreen, setViewImageFullScreen] = useState(false);
    const [fullScreenImageUrl, setFullScreenImageUrl] = useState("");
    return (
        <>
            <div>
                <h1 className='text-gray-500 w-fit'>License Front Image</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.licenseFrontImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.licenseFrontImage} alt="" />
                </div>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>License Back Image</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.licenseBackImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.licenseBackImage} alt="" />
                </div>
            </div>
            <div>
                <h1 className='text-gray-500 w-fit'>Registration Certificate Front Image</h1>
                <div onClick={() => { setFullScreenImageUrl(data?.registrationCertificateFrontImage); setViewImageFullScreen(true); }} className="mt-2 w-72 h-44 cursor-pointer rounded">
                    <img className="transition delay-150 ease-linear w-full h-full object-cover hover:scale-105 rounded shadow-md" src={data?.registrationCertificateFrontImage} alt="" />
                </div>
            </div>
            <div>
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
            </div>
            {viewImageFullScreen && <FullScreenImage imageUrl={fullScreenImageUrl} setViewImageFullScreen={setViewImageFullScreen} setFullScreenImageUrl={setFullScreenImageUrl} />}
        </>
    )
}

export default HostRequestDocuments