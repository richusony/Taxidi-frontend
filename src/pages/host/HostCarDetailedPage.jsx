import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import ErrorToast from '../../components/ErrorToast';
import AdminVehiclePhotos from '../../components/AdminVehiclePhotos';
import AdminVehicleDocuments from '../../components/AdminVehicleDocuments';
import { validateHost } from '../../utils/helper';
import HostSideBar from '../../components/HostSideBar';
import HostNavbar from '../../components/HostNavBar';
import HostVehiclePhotos from '../../components/HostVehiclePhotos';

const HostCarDetailed = () => {
    const [error, setError] = useState("");
    const { registrationNumber } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [vehiclePhotos,setVehiclePhotos] =  useState(true);
    const [vehicleDocuments,setVehicleDocuments] =  useState(false);
    const [page, setPage] = useState(`Car Details - ${registrationNumber}`);

    useEffect(() => {
        // validateHost();
        getVehicleDetails();
    }, []);

    const getVehicleDetails = async () => {
        try {
            const res = await axiosInstance.get(`/host/cars/${registrationNumber.trim()}`)
            console.log(res?.data);
            setVehicleData(res?.data[0]);
        } catch (error) {
            console.log(error?.response?.data?.error);
            setError(error?.response?.data?.error);
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%]'>
                {/* Navbar  */}
                <HostNavbar page={page} />

                <div className='my-10'>
                    <div className='grid grid-cols-3 gap-y-9'>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Registration Number</h1>
                            <h3 className='w-fit'>{vehicleData?.vehicleRegistrationNumber}</h3>
                        </div>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Model</h1>
                            <h3 className='w-fit'>{vehicleData?.model}</h3>
                        </div>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Seat Capacity</h1>
                            <h3 className='w-fit'>{vehicleData?.seats}</h3>
                        </div>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Colour</h1>
                            <h3 className='w-fit'>{vehicleData?.color}</h3>
                        </div>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Last Service Date</h1>
                            <h3 className='w-fit'>Not Done</h3>
                        </div>
                        <div>
                            <h1 className='text-gray-500 w-fit'>Pick-Up Location</h1>
                            <h3 className='w-fit'>Not Done</h3>
                        </div>
                    </div>

                    {/* Heading Tabs */}
                    <div className='mt-10 border-b-2 grid grid-cols-6'>
                        <h1 onClick={() => { setVehicleDocuments(false); setVehiclePhotos(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${vehiclePhotos && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Photos</h1>
                        <h1 onClick={() => { setVehiclePhotos(false); setVehicleDocuments(true);}} className={`transition delay-150 py-2 w-fit ease-linear ${vehicleDocuments && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Documents</h1>
                    </div>
                    <div className='py-5 grid grid-cols-3 gap-x-5 gap-y-10'>
                        {vehiclePhotos ? <HostVehiclePhotos data={vehicleData?.vehicleImages} /> : <AdminVehicleDocuments data={vehicleData} />}
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostCarDetailed