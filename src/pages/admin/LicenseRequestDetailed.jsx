import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig.js';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';
import UserInformation from '../../components/UserInformation.jsx';
import LicenseRequestDocuments from '../../components/LicenseRequestDocuments.jsx';

const LicenseRequestDetailed = () => {
    const navigate = useNavigate();
    const { licenseNumber } = useParams();
    const [error, setError] = useState("");
    const [documentsView, setDocumentsView] = useState(false);
    const [licenseRequest, setLicenseRequest] = useState(null);
    const [userInformationView, setUserInformationView] = useState(true);
    const [page, setPage] = useState(`License Verification - ${licenseNumber}`);
    const [vehicleInformationView, setVehicleInformationView] = useState(false);

    useEffect(() => {
        fetchLicenseRequestInformation();
    }, [])

    const fetchLicenseRequestInformation = async () => {
        try {
            const res = await axiosInstance.get(`/admin/get-license-request-details/${licenseNumber.trim()}`);
            // console.log(res.data);
            setLicenseRequest(res?.data[0]);
        } catch (error) {
            setError(error?.response?.data?.error);
        }
    }

    const handleApproveLicenseRequest = async () => {
        console.log({...licenseRequest});
        try {
            const res = await axiosInstance.post("/admin/approve-license-request", { ...licenseRequest });
            navigate("/admin/verify-users");
        } catch (error) {
            setError(error?.response?.data?.error);
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

                <div>
                    {/* Approval/Rejection section */}
                    <div className='px-5 py-5 flex justify-between items-center'>
                        <div className='flex items-center'>
                            <div className='w-20 h-20 rounded-full'>
                                <img className='w-full h-full object-cover rounded-full shadow-md' src={`https://ui-avatars.com/api/?name=${licenseRequest?.userId?.firstName+licenseRequest?.userId?.secondName}`} alt="" />
                            </div>
                            <div className='ml-4'>
                                <h1 className='text-2xl font-semibold'>{licenseRequest?.userId?.firstName + " " + licenseRequest?.userId?.secondName}</h1>
                                <h3 className='mt-1 text-gray-500'>{licenseRequest?.userId?.phone}</h3>
                            </div>
                        </div>

                        <div>
                            <div>
                                <button onClick={handleApproveLicenseRequest} className='px-4 py-1 border border-[#593CFB] text-[#593CFB] rounded-md shadow-md'>Approve</button>
                                <button className='ml-4 px-6 py-1 border border-red-500 text-red-500 rounded-md shadow-md'>Reject</button>
                            </div>
                        </div>
                    </div>

                    {/* Heading Tabs */}
                    <div className='border-b-2 grid grid-cols-6'>
                        <h1 onClick={() => { setDocumentsView(false); setUserInformationView(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${userInformationView && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>User Information</h1>
                        <h1 onClick={() => { setUserInformationView(false); setDocumentsView(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${documentsView && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Documents</h1>
                    </div>

                    {/* Information section */}
                    <div className='py-5 grid grid-cols-3 gap-x-5 gap-y-10'>
                        {userInformationView ? <UserInformation data={licenseRequest?.userId} /> : <LicenseRequestDocuments data={licenseRequest} />}
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default LicenseRequestDetailed