import moment from 'moment';
import ReactPaginate from 'react-paginate';
import AddBrand from '../../components/AddBrand';
import axiosInstance from '../../axiosConfig.js';
import React, { useEffect, useState } from 'react';
import EditBrand from '../../components/EditBrand.jsx';
import AdminSideBar from '../../components/AdminSideBar';
import ErrorToast from "../../components/ErrorToast.jsx";
import AdminNavbar from '../../components/AdminNavbar.jsx';
import SucessToast from "../../components/SuccessToast.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

const Brands = () => {
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);
    const [success, setSuccess] = useState("");
    const [page, setPage] = useState("Brands");
    const [pageCount, setPageCount] = useState(1);
    const [addBrand, setAddBrand] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editBrand, setEditBrand] = useState(false);
    const [editBrandData, setEditBrandData] = useState(null);

    const handleAddBrand = () => setAddBrand(prev => !prev);

    useEffect(() => {
        getAllBrands();
    }, [currentPage]);

    const getAllBrands = async () => {
        const res = await axiosInstance.get("/admin/brands",{
            params: {
                limit: 3,
                skip: currentPage
            }
        });
        setBrands(res?.data?.result);
        setPageCount(res?.data.pageCount);
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

                <div className='mt-10'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-semibold'>All Brands</h1>
                        <button onClick={handleAddBrand} className='py-1 px-4 bg-[#593CFB] text-white rounded'>Add Brand</button>
                    </div>

                    <div className="flex justify-center my-8">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200 text-start text-gray-700 font-bold border-b">Brand Logo</th>
                                    <th className="py-2 px-4 bg-gray-200 text-start text-gray-700 font-bold border-b">Brand</th>
                                    <th className="py-2 px-4 bg-gray-200  text-start text-gray-700 font-bold border-b">Added </th>
                                    <th className="py-2 px-4 bg-gray-200  text-start text-gray-700 font-bold border-b">Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {brands.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b"><div className='w-12 h-12'><img className='w-full h-full object-cover rounded-full' src={item?.brandImage} alt="" /></div></td>
                                        <td className="py-2 px-4 border-b">{item?.brandName}</td>
                                        <td className="py-2 px-4 border-b text-gray-500">{moment(item?.createdAt).format("DD-MM-YYYY")}</td>
                                        <td className="py-2 px-4 border-b">
                                            <div>
                                                <button onClick={() => { setEditBrand(true); setEditBrandData(item); }} className='px-2 py-1 bg-blue-500 text-white rounded shadow-md'><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className='ml-4 hidden px-2 py-1 bg-red-500 text-white rounded shadow-md'><FontAwesomeIcon icon={faTrash} /></button>
                                            </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {
                    brands?.length > 0 &&
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
                {addBrand && <AddBrand setError={setError} setAddBrand={setAddBrand} setSuccess={setSuccess} />}
                {editBrand && <EditBrand setError={setError} setEditBrand={setEditBrand} editBrandData={editBrandData} />}
            </div>
            <SucessToast msg={success} setSuccessMsg={setSuccess} />
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default Brands