import axiosInstance from '../axiosConfig';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import DefaultNavbar from "../components/DefaultNavbar";
import UserNotifications from '../components/UserNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotificationContext } from '../contexts/NotificationContext';
import { faCarSide, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const UserBookings = () => {
    const navigate = useNavigate();
    const [pageCount, setPageCount] = useState(1);
    const [bookings, setBookings] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { notificationBox } = useNotificationContext();
    const [filterCancelled, setFilterCancelled] = useState(false);

    useEffect(() => {
        getBookings();
    }, [currentPage,filterCancelled]);

    const getBookings = async () => {
        try {
            const res = await axiosInstance.get("/bookings", {
                params: {
                    limit: 2,
                    skip: currentPage,
                    cancelled:!filterCancelled
                }
            });
            console.log(res?.data);
            setBookings(res?.data?.result);
            setPageCount(res?.data?.pageCount);
        } catch (error) {
            console.log(error)
        }
    }

    function formatDatetimeLocal(utcDatetime) {
        const date = new Date(utcDatetime);

        return date.toDateString() + ", " + date.toLocaleTimeString();
    }

    const handleCancelBooking = async (e, paymentId) => {
        e.stopPropagation();
        const confirm = window.confirm("Are you sure");
        if (!confirm) return;

        const reqData = {
            paymentId
        }
        try {
            const res = await axiosInstance.post("/cancel-booking", reqData);
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const navigateTo = url => {
        navigate(url);
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return (
        <div className='md:mb-10'>
            <DefaultNavbar />

            <div className='mt-5 px-5 md:px-10'>
                <h1 className='md:text-2xl font-semibold '>Bookings</h1>
                <p className='mt-2 text-sm text-gray-500'>See all your bookings. Note: No charges for cancelling 24 hrs before the trip start date. </p>

                <div className='mt-5'>
                    <div className='p-1 bg-gray-100 w-fit rounded shadow-sm'>
                        <button onClick={()=>setFilterCancelled(false)} className={`transition-all ease-linear mx-2 px-4 py-1 ${!filterCancelled && "bg-white shadow-md"} rounded `}>Latest</button>
                        <button onClick={()=>setFilterCancelled(true)} className={`transition-all ease-linear mx-2 px-4 py-1 ${filterCancelled && "bg-white shadow-md"} rounded `}>Cancelled</button>
                    </div>
                </div>

                <div className='mt-5 max-h-96 overflow-y-scroll hideScrollBar'>
                    {bookings?.length > 0 ? bookings.map((book) => (
                        <div onClick={() => navigateTo(`/booking-details/${book.paymentId}`)} key={book._id} className='transition delay-150 ease-linear mb-5 border-2 px-2 py-3 flex flex-cols md:flex-row items-center rounded-xl hover:scale-105 cursor-pointer relative shadow-sm'>
                            <div className='border-r-2 pr-2 w-fit'>
                                <div className='w-14 h-14'>
                                    <img className='w-full h-full object-cover rounded shadow-sm' src={book.vehicleId.vehicleImages[0]} alt="" />
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <div className='ml-2 md:ml-5 w-40'>
                                    <h1 className='w-24 text-sm md:text-base font-semibold'>{book.vehicleId.model}</h1>
                                    <h1 className='mt-1 text-gray-500 text-xs md:text-xs'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /> {book?.vehicleId?.pickUpLocation}</h1>
                                </div>

                                <div className='hidden ml-2 md:ml-10 text-xs md:text-sm text-center text-gray-500 md:flex justify-between items-center'>
                                    {/* <input type="datetime-local" className='bg-blue-500 w-fit' disabled value={formatDatetimeLocal(book.vehicleId.bookingStarts)} name="" id="" /> */}
                                    <span className='mx-2 w-32'>{formatDatetimeLocal(book?.bookingStarts)}</span>
                                    <span className='mx-2 text-[#593CFB] font-semibold'>_ _ _ _<FontAwesomeIcon icon={faCarSide} />_ _ _</span>
                                    <span className='mx-2 w-32'>{formatDatetimeLocal(book?.bookingEnds)}</span>
                                    {/* <input type="datetime-local" className='bg-blue-500 w-fit' disabled value={formatDatetimeLocal(book.vehicleId.bookingEnds)} name="" id="" /> */}
                                </div>

                                <div className='hidden ml-10 md:flex justify-center items-center'>
                                    <div className='w-12 h-12'>
                                       <img className='w-full h-full object-cover rounded-full shadow-sm' src={book?.hostId?.profileImage} alt="host_image" />
                                    </div>
                                    <span className='ml-3 text-gray-600'>{book?.hostId?.fullname}</span>
                                </div>

                                {book?.bookingStatus === true ? <div className='md:ml-10 absolute right-2 md:right-10 text-sm md:text-base'>
                                    <button onClick={(e) => handleCancelBooking(e, book.paymentId)} className='transition delay-100 ease-in border border-red-400 px-4 py-1 text-red-400 hover:scale-105 hover:text-red-600 rounded shadow-md'>Cancel</button>
                                </div> : <h1 className='md:ml-10 absolute right-2 md:right-10 text-sm md:text-base text-red-500'>Cancelled</h1>}
                            </div>
                        </div>
                    ))
                        : <h1>No booking yet</h1>}
                </div>
                {
                    bookings?.length > 0 &&
                    <div>
                        <ReactPaginate
                            breakLabel="..."
                            nextLabel="next >"
                            onPageChange={handlePageClick}
                            pageRangeDisplayed={5}
                            pageCount={pageCount}
                            previousLabel="< previous"
                            renderOnZeroPageCount={null}
                            marginPagesDisplayed={2}
                            containerClassName="pagination justify-content-center"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            activeClassName="active"
                        />
                    </div>
                }
            </div>
            {notificationBox && <UserNotifications />}
        </div>
    )
}

export default UserBookings