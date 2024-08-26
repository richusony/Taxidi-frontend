import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig.js';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';
import SuccessToast from '../../components/SuccessToast.jsx';
import HostInformation from '../../components/HostInformation.jsx';
import VehicleInformation from '../../components/VehicleInformation.jsx';
import HostRequestDocuments from '../../components/HostRequestDocuments.jsx';

const HostRequestDetailed = () => {
    const [error, setError] = useState("");
    const { registrationNumber } = useParams();
    const [rejectMsg, setRejectMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [rejectBox, setRejectBox] = useState(false);
    const [documentsView, setDocumentsView] = useState(false);
    const [hostRequestDetails, setHostRequestDetails] = useState(null);
    const [hostInformationView, setHostInformationView] = useState(true);
    const [page, setPage] = useState(`Host Request - ${registrationNumber}`);
    const [vehicleInformationView, setVehicleInformationView] = useState(false);

    useEffect(() => {
        fetchHostInformation();
    }, [])

    const fetchHostInformation = async () => {
        try {
            const res = await axiosInstance.get(`/admin/get-host-request-details/${registrationNumber.trim()}`);
            setHostRequestDetails(res?.data);
        } catch (error) {
            setError(error?.response?.data?.error);
        }
    }

    const handleApproveHostRequest = async () => {
        console.log({ ...hostRequestDetails });
        // return;
        try {
            const res = await axiosInstance.post("/admin/approve-host-request", { ...hostRequestDetails })
            setSuccessMsg("Request Approved");
        } catch (error) {
            console.log(error?.response?.data?.error);
            setError(error?.response?.data?.error);
        }
    }

    const handleRejectHostRequest = async () => {

        console.log({ ...hostRequestDetails });
        try {
            const res = await axiosInstance.post("/admin/reject-host-request", { rejectMsg: rejectMsg.trim(), ...hostRequestDetails })
            setSuccessMsg("Request Rejected");
            setRejectMsg("");
            setRejectBox(false);
        } catch (error) {
            console.log(error?.response?.data?.error);
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
                                <img className='w-full h-full object-cover rounded-full shadow-md' src={`https://ui-avatars.com/api/?name=${hostRequestDetails?.fullname}`} alt="" />
                            </div>
                            <div className='ml-4'>
                                <h1 className='text-2xl font-semibold'>{hostRequestDetails?.fullname}</h1>
                                <h3 className='mt-1 text-gray-500'>{hostRequestDetails?.phone}</h3>
                            </div>
                        </div>

                        <div>
                            <div>
                                <button onClick={handleApproveHostRequest} className='px-4 py-1 border border-[#593CFB] text-[#593CFB] rounded-md shadow-md'>Approve</button>
                                <button onClick={() => setRejectBox(true)} className='ml-4 px-6 py-1 border border-red-500 text-red-500 rounded-md shadow-md'>Reject</button>
                                {rejectBox && <div className='mt-5 px-5 py-4 bg-white rounded-md shadow-md flex flex-col'>
                                    <div className='text-end mb-2'><button onClick={() => setRejectBox(false)} className='px-4 py-1 border border-[#593CFB] text-[#593CFB] rounded-md shadow-md'>cancel</button></div>
                                    <textarea onChange={(e) => setRejectMsg(e.target.value)} className='border-2 rounded px-2 py-1 min-h-20 outline-gray-600' cols="32" placeholder='Reason' name="rejectMsg" id="rejectMsg">{rejectMsg}</textarea>
                                    <button onClick={handleRejectHostRequest} className='mt-2 px-4 py-1 bg-[#593CFB] text-white rounded shadow-md'>reject</button>
                                </div>}
                            </div>
                        </div>
                    </div>

                    {/* Heading Tabs */}
                    <div className='border-b-2 grid grid-cols-6'>
                        <h1 onClick={() => { setVehicleInformationView(false); setDocumentsView(false); setHostInformationView(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${hostInformationView && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Host Information</h1>
                        <h1 onClick={() => { setHostInformationView(false); setDocumentsView(false); setVehicleInformationView(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${vehicleInformationView && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Vehicle Information</h1>
                        <h1 onClick={() => { setHostInformationView(false); setVehicleInformationView(false); setDocumentsView(true); }} className={`transition delay-150 py-2 w-fit ease-linear ${documentsView && 'border-b-2'} border-[#593CFB] text-gray-500 cursor-pointer`}>Documents</h1>
                    </div>

                    {/* Information section */}
                    <div className='py-5 grid grid-cols-3 gap-x-5 gap-y-10'>
                        {hostInformationView ? <HostInformation data={hostRequestDetails} /> : vehicleInformationView ? <VehicleInformation data={hostRequestDetails} /> : <HostRequestDocuments data={hostRequestDetails} />}
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
            <SuccessToast msg={successMsg} setSuccessMsg={setSuccessMsg} />
        </div>
    )
}

export default HostRequestDetailed