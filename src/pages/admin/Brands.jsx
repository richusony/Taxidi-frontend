import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MARUTI_SUZUKI_IMAGE } from '../../constants'
import AddBrand from '../../components/AddBrand'
import axios from 'axios'
import { handleAdminLogOut, validateAdmin } from '../../utils/helper'

const Brands = () => {
    const [addBrand, setAddBrand] = useState(false);
    const [brands, setBrands] = useState([]);

    const handleAddBrand = () => setAddBrand(prev => !prev);

    useEffect(() => {
        validateAdmin();
        getAllBrands()
    }, [])



    const getAllBrands = async () => {
        const res = await axios.get("http://localhost:8080/admin/brands");
        setBrands(res.data);
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] relative'>
                {/* Navbar  */}
                <nav className='py-3 flex justify-between items-center'>
                    <div>
                        <h2 className='text-gray-500'>Pages / Brands</h2>
                        <h2 className='text-semibold'>Brands</h2>
                    </div>

                    <div>
                        <button onClick={handleAdminLogOut} className='py-1 px-4 border border-[#593CFB] rounded text-[#593CFB]'>Logout</button>
                        <span className='ml-5 cursor-pointer'><FontAwesomeIcon icon={faGear} /> Settings</span>
                    </div>
                </nav>

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
                {addBrand && <AddBrand />}
            </div>
        </div>
    )
}

export default Brands