import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosConfig';
import React, { useEffect, useState } from 'react';
import HostNavbar from '../../components/HostNavBar';
import ErrorToast from "../../components/ErrorToast";
import HostSideBar from '../../components/HostSideBar';
import CancelReasonBox from '../../components/CancelReasonBox';

const HostBookingDetailed = () => {
    const { paymentId } = useParams();
    const [error, setError] = useState("");
    const [cancelWindow, setCancelWindow] = useState(false);
    const [bookingDetails, setBookingDetails] = useState(null);
    const [page, setPage] = useState(`Booking of ${paymentId}`);
    const [bookingStatus, setBookingStatus] = useState(true);

    useEffect(() => {
        fetchBookingDetails();
    }, [paymentId]);

    const fetchBookingDetails = async () => {
        try {
            const res = await axiosInstance.get(`/host/booking-details/${paymentId}`);
            console.log(res?.data[0]);
            setBookingDetails(res?.data[0]);
            setBookingStatus(res?.data[0].bookingStatus);
        } catch (error) {
            console.log(error);
        }
    }

    function formatDatetimeLocal(utcDatetime) {
        const date = new Date(utcDatetime);

        return date.toDateString() + ", " + date.toLocaleTimeString();
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar'>
                {/* Navbar  */}
                <HostNavbar page={page} />
                <div className='mt-10'>
                    <div className='flex justify-between'>
                        <div className='md:w-1/2'>
                            <img className='w-full h-full rounded-e' src={bookingDetails?.vehicleDetails?.vehicleImages[0]} alt="car-image" />
                        </div>

                        <div className='px-4 md:w-1/2'>
                            <h1 className='text-2xl font-semibold'>{bookingDetails?.brandDetails[0]?.brandName + " " + bookingDetails?.vehicleDetails?.model}</h1>

                            {/* <div className='mt-5'>
                                <h1 className='text-gray-500 font-semibold'>Host</h1>
                                <div className='mt-2 flex items-center'>
                                    <div className='w-12 h-12'>
                                        <img className='w-full h-full object-cover rounded-full shadow-sm' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" />
                                    </div>
                                    <span className='ml-3 text-gray-600'>{bookingDetails?.hostDetails[0]?.fullname}</span>
                                </div>
                            </div> */}

                            <div className='mt-5 grid grid-cols-2 gap-y-3'>
                                <div className=''>
                                    <h1 className='text-gray-500 font-semibold'>Trip Start</h1>
                                    <span>{formatDatetimeLocal(bookingDetails?.vehicleDetails?.bookingStarts)}</span>
                                    <h1 className='mt-2 text-gray-500 font-semibold'>Trip Ends</h1>
                                    <span>{formatDatetimeLocal(bookingDetails?.vehicleDetails?.bookingEnds)}</span>
                                </div>

                                <div className='mt-5'>
                                    <h1 className='text-gray-500 font-semibold'>Amount Paid</h1>
                                    <span><span className='text-[#593CFB] font-semibold'>₹</span>{bookingDetails?.balanceAfterCommission}</span>
                                </div>

                                <div className='mt-5'>
                                    <h1 className='text-gray-500 font-semibold'>Payment Id</h1>
                                    <span>{bookingDetails?.paymentId}</span>
                                </div>

                                <div className='mt-5'>
                                    <h1 className='text-gray-500 font-semibold'>Booking Status</h1>
                                    <span>{bookingStatus ? "Booked" : "Cancelled"}</span>
                                </div>
                            </div>

                            <div className='mt-8 text-center'>
                                <button onClick={() => setCancelWindow(true)} disabled={!bookingStatus} className={`transition delay-100 ease-in ${bookingStatus ? "" : "cursor-not-allowed"} border border-red-400 px-4 py-1 w-10/12 mx-auto font-semibold text-red-500 hover:bg-red-500 hover:text-white rounded shadow-md`}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                {cancelWindow && <CancelReasonBox setCancelBox={setCancelWindow} paymentId={paymentId} bookingStatus={bookingStatus} setError={setError} cancelBy={"host"} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostBookingDetailed