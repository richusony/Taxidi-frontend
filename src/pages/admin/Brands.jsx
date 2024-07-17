import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MARUTI_SUZUKI_IMAGE } from '../../constants'
import AddBrand from '../../components/AddBrand'
import axiosInstance from '../../axiosConfig.js'
import ErrorToast from "../../components/ErrorToast.jsx"
import { handleAdminLogOut, validateAdmin } from '../../utils/helper'
import AdminNavbar from '../../components/AdminNavbar.jsx'

const Brands = () => {
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);
    const [page, setPage] = useState("Brands");
    const [addBrand, setAddBrand] = useState(false);

    const handleAddBrand = () => setAddBrand(prev => !prev);

    useEffect(() => {
        validateAdmin();
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

                    <div className='mt-5 grid grid-cols-3 gap-3'>
                        {brands.map((brand) => (
                            <div key={brand._id} className='w-44 h-28 border shadow-md rounded'>
                                <img className='w-full h-full object-cover rounded' src={brand.brandImage} alt="brand-image" />
                            </div>
                        ))}

                    </div>
                </div>
                {addBrand && <AddBrand setError={setError} setAddBrand={setAddBrand} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default Brands