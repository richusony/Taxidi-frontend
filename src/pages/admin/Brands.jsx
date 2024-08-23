import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import AddBrand from '../../components/AddBrand'
import axiosInstance from '../../axiosConfig.js'
import ErrorToast from "../../components/ErrorToast.jsx"
import AdminNavbar from '../../components/AdminNavbar.jsx'
import EditBrand from '../../components/EditBrand.jsx'
import moment from 'moment'

const Brands = () => {
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState("Brands");
    const [addBrand, setAddBrand] = useState(false);
    const [editBrand, setEditBrand] = useState(false);
    const [editBrandData, setEditBrandData] = useState(null);

    const handleAddBrand = () => setAddBrand(prev => !prev);

    useEffect(() => {
        getAllBrands();
    }, [])



    const getAllBrands = async () => {
        const res = await axiosInstance.get("/admin/brands");
        setBrands(res.data);
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] relative'>
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
                                                <button onClick={()=>{setEditBrand(true); setEditBrandData(item);}} className='px-2 py-1 bg-blue-500 text-white rounded shadow-md'><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className='ml-4 px-2 py-1 bg-red-500 text-white rounded shadow-md'><FontAwesomeIcon icon={faTrash} /></button>
                                            </div></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {addBrand && <AddBrand setError={setError} setAddBrand={setAddBrand} />}
                {editBrand && <EditBrand setError={setError} setEditBrand={setEditBrand}  editBrandData={editBrandData}/>}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default Brands