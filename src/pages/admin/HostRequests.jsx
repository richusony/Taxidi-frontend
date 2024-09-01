import moment from 'moment';
import ReactPaginate from 'react-paginate';
import AddCar from '../../components/AddCar';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';

const HostRequests = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [addCar, setAddCar] = useState(false);
    const [pageCount, setPageCount] = useState(1);
    const [page, setPage] = useState("Host Requests");
    const [currentPage, setCurrentPage] = useState(1);
    const [hostRequests, setHostRequests] = useState([]);

    useEffect(() => {
        getAllHostRequests();
    }, [currentPage])


    const getAllHostRequests = async () => {
        try {
            const res = await axiosInstance.get("/admin/get-host-requests", {
                params: {
                    limit: 3,
                    skip: currentPage
                }
            });
            setHostRequests(res?.data?.result);
            setPageCount(res?.data?.pageCount);
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    const handlePageClick = (e) => {
        setCurrentPage(e.selected + 1);
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar relative'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

                <div className='mt-10 text-end'><button onClick={() => setAddCar(prev => !prev)} className='px-6 py-2 bg-[#593CFB] text-white rounded'>Not Done</button></div>

                {hostRequests.length > 0?
                <div className="flex justify-center my-8">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Fullname</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Model</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Registration Number</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Email</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Phone</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hostRequests.map(request => (
                                <tr onClick={()=>navigate(`/admin/host-requests/${request.vehicleRegistrationNumber}`)} key={request._id} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-2 px-4 border-b text-center">{request.fullname}</td>
                                    <td className="py-2 px-4 border-b text-center">{request.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{request.vehicleRegistrationNumber}</td>
                                    <td className="py-2 px-4 border-b text-center">{request.email}</td>
                                    <td className="py-2 px-4 border-b text-center">{request.phone}</td>
                                    <td className="py-2 px-4 border-b text-center">{moment(request.createdAt).format("DD-MM-YYYY")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                :<h1 className="mt-10 text-center font-bold">No requests yet!!</h1>}
                {addCar && <AddCar setError={setError} setAddCar={setAddCar} />}
                {
                    hostRequests?.length > 0 &&
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
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostRequests