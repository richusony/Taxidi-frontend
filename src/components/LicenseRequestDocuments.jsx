import { useState } from "react"
import FullScreenImage from "./FullScreenImage";

const LicenseRequestDocuments = ({ data }) => {
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
            
            {viewImageFullScreen && <FullScreenImage imageUrl={fullScreenImageUrl} setViewImageFullScreen={setViewImageFullScreen} setFullScreenImageUrl={setFullScreenImageUrl} />}
        </>
    )
}

export default LicenseRequestDocuments