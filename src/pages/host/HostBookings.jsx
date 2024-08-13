import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HostNavbar from '../../components/HostNavBar';
import HostSideBar from '../../components/HostSideBar';

const HostBookings = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(`Bookings`);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        fetchAllNewBookings();
    }, []);

    const fetchAllNewBookings = async () => {
        try {
            const res = await axiosInstance("/host/bookings");
            console.log(res?.data);
            setBookings(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    function formatDateLocal(utcDatetime) {
        const date = new Date(utcDatetime);

        return date.toDateString();
    }

    function formatDatetimeLocal(utcDatetime) {
        const date = new Date(utcDatetime);

        return date.toDateString() + ", " + date.toLocaleTimeString();
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%]'>
                {/* Navbar  */}
                <HostNavbar page={page} />

                <h1 className='mt-5 text-2xl font-bold'>Bookings</h1>
                <p className='text-gray-700'>See all vehicle bookings</p>

                <div className="flex justify-center my-8 overflow-x-scroll hideScrollBar">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Vehicle</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">User</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Trip Starts</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Trip Ends</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Amount</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Payment Id</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Payment Method</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Paid on</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((book, index) => (
                                <tr onClick={() => navigate(`/host/booking-details/${book?.paymentId}`)} key={book._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{book?.vehicleDetails[0]?.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{book?.userDetails[0]?.firstName + " " + book?.userDetails[0]?.secondName}</td>
                                    <td className="py-2 px-4 border-b text-center text-xs">{formatDatetimeLocal(book?.bookingStarts)}</td>
                                    <td className="py-2 px-4 border-b text-center text-xs">{formatDatetimeLocal(book?.bookingEnds)}</td>
                                    <td className="py-2 px-4 border-b text-center"><span className='text-[#593CFB] font-semibold'>₹ </span>{book?.balanceAfterCommission}</td>
                                    <td className="py-2 px-4 border-b text-center text-gray-700">{book?.paymentId}</td>
                                    <td className="py-2 px-4 border-b text-center uppercase">{book?.paymentMethod}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatDateLocal(book?.createdAt)}</td>
                                    <td className="py-2 px-4 border-b text-center">{book?.vehicleRegistrationNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default HostBookings