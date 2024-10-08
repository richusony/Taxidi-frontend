import ReactPaginate from 'react-paginate';
import AddCar from '../../components/AddCar';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';

const Cars = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [page, setPage] = useState("Cars");
    const [addCar, setAddCar] = useState(false);
    const [vehicles, setVehicles] = useState([]);
    const [pageCount, setPageCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        getAllVehicles();
    }, [currentPage])

    const getAllVehicles = async () => {
        try {
            const res = await axiosInstance.get("/admin/cars", {
                params: {
                    limit: 3,
                    skip: currentPage
                }
            });
            console.log(res?.data);
            setVehicles(res?.data?.result);
            setPageCount(res?.data.pageCount);
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

                <div className='mt-10 text-end'><button onClick={() => setAddCar(prev => !prev)} className='px-6 py-2 bg-[#593CFB] text-white rounded'>Add Car</button></div>
                <div className="flex justify-center my-8">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Model</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Brand</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Body Type</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Host</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Registeration Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehicles.map((item) => (
                                <tr onClick={() => navigate(`/admin/cars/${item.vehicleRegistrationNumber}`)} key={item.vehicleRegistrationNumber} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{item?.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.brand?.brandName}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.bodyType?.bodyType}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.host.fullname}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.vehicleRegistrationNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
               {vehicles.length > 0 && <div>
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
                </div>}
                {addCar && <AddCar setError={setError} setAddCar={setAddCar} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default Cars