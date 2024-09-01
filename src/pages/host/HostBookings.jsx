import htmlToPdf from "html2pdf.js";
import ReactPaginate from 'react-paginate';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import HostNavbar from '../../components/HostNavBar';
import HostSideBar from '../../components/HostSideBar';
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const HostBookings = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState(`Bookings`);
    const [bookings, setBookings] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchAllNewBookings();
    }, [currentPage]);

    const fetchAllNewBookings = async () => {
        try {
            const res = await axiosInstance("/host/bookings", {
                params: {
                    limit: 2,
                    skip: currentPage
                }
            });
            console.log(res?.data);
            setBookings(res?.data?.result);
            setPageCount(res?.data?.pageCount);
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

    const handlePdf = () => {
        const element = document.getElementById("bookingList");
        htmlToPdf(element);
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar'>
                {/* Navbar  */}
                <HostNavbar page={page} />

                <h1 className='mt-5 text-2xl font-bold'>Bookings</h1>
                <p className='text-gray-700'>See all vehicle bookings</p>

                {bookings.length > 0 ? <div className="flex flex-col justify-center my-8 overflow-x-scroll hideScrollBar">
                    <div className='mb-2 text-end'><button onClick={handlePdf} className='px-4 py-1 bg-[#593CFB] text-white rounded shadow-md'><FontAwesomeIcon icon={faDownload} /> Report</button></div>
                    <table id="bookingList" className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
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
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((book, index) => (
                                <tr onClick={() => navigate(`/host/booking-details/${book?.paymentId}`)} key={book._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-2 px-4 border-b text-center">{book?.vehicleDetails[0]?.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{book?.userDetails[0]?.firstName + " " + book?.userDetails[0]?.secondName}</td>
                                    <td className="py-2 px-4 border-b text-center text-xs">{formatDatetimeLocal(book?.bookingStarts)}</td>
                                    <td className="py-2 px-4 border-b text-center text-xs">{formatDatetimeLocal(book?.bookingEnds)}</td>
                                    <td className="py-2 px-4 border-b text-center"><span className='text-[#593CFB] font-semibold'>₹ </span>{book?.balanceAfterCommission}</td>
                                    <td className="py-2 px-4 border-b text-center text-gray-700">{book?.paymentId}</td>
                                    <td className="py-2 px-4 border-b text-center uppercase">{book?.paymentMethod}</td>
                                    <td className="py-2 px-4 border-b text-center">{formatDateLocal(book?.createdAt)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : <h1 className="mt-10 text-center font-bold">No bookings yet!!</h1>}
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
        </div>
    )
}

export default HostBookings