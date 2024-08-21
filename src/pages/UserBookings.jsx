import axiosInstance from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DefaultNavbar from "../components/DefaultNavbar";
import UserNotifications from '../components/UserNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCarSide, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNotificationContext } from '../contexts/NotificationContext';

const UserBookings = () => {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState(null);
    const { notificationBox } = useNotificationContext();

    useEffect(() => {
        getBookings();
    }, []);

    const getBookings = async () => {
        try {
            const res = await axiosInstance.get("/bookings");
            console.log(res?.data);
            setBookings(res?.data);

        } catch (error) {
            console.log(error)
        }
    }

    function formatDatetimeLocal(utcDatetime) {
        const date = new Date(utcDatetime);

        return date.toDateString() + ", " + date.toLocaleTimeString();
    }

    const handleCancelBooking = async (e) => {
        e.stopPropagation();
    }

    const navigateTo = url => {
        navigate(url);
    }

    return (
        <div className='mb-10'>
            <DefaultNavbar />

            <div className='mt-5 px-10'>
                <h1 className='text-2xl font-semibold '>Bookings</h1>
                <p className='mt-2 text-gray-500'>See all your bookings. Note: No charges for cancelling 24 hrs before the trip start date. </p>

                <div className='mt-5'>
                    <div className='p-1 bg-gray-100 w-fit rounded shadow-sm'>
                        <button className='mx-2 px-4 py-1 bg-white rounded shadow-md'>Latest</button>
                        <button className='mx-2 px-4 py-1 rounded'>Cancelled</button>
                    </div>
                </div>

                <div className='mt-5 h-96 overflow-y-scroll hideScrollBar'>
                    {bookings?.length > 0 ? bookings.map((book) => (
                        <div onClick={() => navigateTo(`/booking-details/${book.paymentId}`)} key={book._id} className='transition delay-150 ease-linear mb-5 border-2 px-2 py-3 flex items-center rounded-xl hover:scale-105 cursor-pointer relative shadow-sm'>
                            <div className='border-r-2 pr-2 w-fit'>
                                <div className='w-14 h-14'>
                                    <img className='w-full h-full object-cover rounded shadow-sm' src={book.vehicleId.vehicleImages[0]} alt="" />
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <div className='ml-5'>
                                    <h1 className='w-24 font-semibold'>{book.vehicleId.model}</h1>
                                    <h1 className='mt-1 text-gray-500 text-sm'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /> {"Thaliparamba"}</h1>
                                </div>

                                <div className='ml-10 text-sm text-center text-gray-500 flex justify-between items-center'>
                                    {/* <input type="datetime-local" className='bg-blue-500 w-fit' disabled value={formatDatetimeLocal(book.vehicleId.bookingStarts)} name="" id="" /> */}
                                    <span className='mx-2 w-32'>{formatDatetimeLocal(book?.bookingStarts)}</span>
                                    <span className='mx-2 text-[#593CFB] font-semibold'>_ _ _ _<FontAwesomeIcon icon={faCarSide} />_ _ _</span>
                                    <span className='mx-2 w-32'>{formatDatetimeLocal(book?.bookingEnds)}</span>
                                    {/* <input type="datetime-local" className='bg-blue-500 w-fit' disabled value={formatDatetimeLocal(book.vehicleId.bookingEnds)} name="" id="" /> */}
                                </div>

                                <div className='ml-10 flex justify-center items-center'>
                                    <div className='w-12 h-12'>
                                        <img className='w-full h-full object-cover rounded-full shadow-sm' src="https://gravatar.com/images/homepage/avatar-01.png" alt="" />
                                    </div>
                                    <span className='ml-3 text-gray-600'>Richu Sony</span>
                                </div>

                                <div className='ml-10 absolute right-10'>
                                    <button onClick={handleCancelBooking} className='transition delay-100 ease-in border border-red-400 px-4 py-1 text-red-400 hover:scale-105 hover:text-red-600 rounded shadow-md'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    ))
                        : <h1>No booking yet</h1>}
                </div>
            </div>
            {notificationBox && <UserNotifications />}
        </div>
    )
}

export default UserBookings