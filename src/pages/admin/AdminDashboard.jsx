import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import AdminNavbar from '../../components/AdminNavbar'
import useOnline from '../../hooks/useOnline.jsx';
import ErrorToast from "../../components/ErrorToast.jsx";
import axiosInstance from '../../axiosConfig';

const AdminDashboard = () => {
    const isOnline = useOnline();
    const [error, setError] = useState("");
    const [hostCount, setHostCount] = useState(0);
    const [brandCount, setBrandCount] = useState(0);
    const [vehicleCount, setVehicleCount] = useState(0);
    const [bodyTypeCount, setBodyTypeCount] = useState(0);
    const [todayBookingsCount, setTodayBookingsCount] = useState(0);
    const [page, setPage] = useState("Dashboard");

    useEffect(() => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        fetchTotalNumbers();
    }, []);

    const fetchTotalNumbers = async () => {
        try {
            const res = await axiosInstance.get(`/admin/counts`);
            setBrandCount(res?.data.brandCount);
            setBodyTypeCount(res?.data.bodyTypeCount);
            setHostCount(res?.data.hostCount);
            setVehicleCount(res?.data.vehicleCount);
            setTodayBookingsCount(res?.data.todayBookingsCount);
            // console.log(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

                {/* Cards  */}
                <div className='mt-10 grid grid-cols-4 gap-5'>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Today's Booking</h1>
                        <h2>{todayBookingsCount}</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Brands</h1>
                        <h2>{brandCount}</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Body Types</h1>
                        <h2>{bodyTypeCount}</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Cars</h1>
                        <h2>{vehicleCount}</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Hosts</h1>
                        <h2>{hostCount}</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Social Media</h1>
                        <h2>3</h2>
                    </div>

                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default AdminDashboard