import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';
import axiosInstance from '../../axiosConfig';
import ErrorToast from '../../components/ErrorToast';
import AdminVehiclePhotos from '../../components/AdminVehiclePhotos';
import AdminVehicleDocuments from '../../components/AdminVehicleDocuments';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar } from '@fortawesome/free-solid-svg-icons';

const AdminCarDetailed = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { registrationNumber } = useParams();
    const [vehicleData, setVehicleData] = useState(null);
    const [vehiclePhotos, setVehiclePhotos] = useState(true);
    const [vehicleDocuments, setVehicleDocuments] = useState(false);
    const [page, setPage] = useState(`Car Details - ${registrationNumber}`);

    useEffect(() => {
        getVehicleDetails();
    }, []);

    const getVehicleDetails = async () => {
        try {
            const res = await axiosInstance.get(`/admin/cars/${registrationNumber.trim()}`);
            setVehicleData(res?.data);
        } catch (error) {
            setError(error?.response?.data?.error);
        }
    }

    const deleteTaxidiVehicle = async () => {
        const confirmDelete = confirm("Are you sure, you want delete this vehicle?");

        if(!confirmDelete) return;

        try {
            const res = await axiosInstance.delete(`/admin/car/${registrationNumber.trim()}`);
            navigate("/admin/cars");
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%]'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

                <div className='my-10'>
                    {vehicleData?.host?.fullname.split(' ').includes("TAXIDI") && <div className='mb-10 flex justify-between transition delay-150 ease-linear'><div><h1 className='text-gray-500 font-bold text-xl'>Taxidi Vehicle <FontAwesomeIcon className='' icon={faCar} /></h1></div><div><button className='px-6 py-1 border border-[#593CFB] hover:bg-[#593CFB] text-[#593CFB] hover:text-white rounded'>Edit</button><button onClick={deleteTaxidiVehicle} className='ml-4 px-4 py-1 border border-red-500 hover:bg-red-500 text-red-500 hover:text-white rounded'>Delete</button></div></div>}
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
                        <h1 onClick={() => { setVehiclePhotos(false); setVehicleDocuments(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${vehicleDocuments && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Documents</h1>
                    </div>
                    <div className='py-5 grid grid-cols-3 gap-x-5 gap-y-10'>
                        {vehiclePhotos ? <AdminVehiclePhotos data={vehicleData?.vehicleImages} /> : <AdminVehicleDocuments data={vehicleData} />}
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default AdminCarDetailed