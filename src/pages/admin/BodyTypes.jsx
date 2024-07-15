import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../components/AdminSideBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCar, faGear } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MARUTI_SUZUKI_IMAGE } from '../../constants'
import axios from 'axios'
import { handleAdminLogOut, validateAdmin } from '../../utils/helper'
import AddBody from '../../components/AddBody'
import ErrorToast from '../../components/ErrorToast.jsx'

const BodyTypes = () => {
    const [addBody, setAddBody] = useState(false);
    const [body, setBody] = useState([]);
    const [error, setError] = useState("");

    const handleAddBody = () => setAddBody(prev => !prev);

    useEffect(() => {
        validateAdmin();
        getAllBodys()
    }, [])



    const getAllBodys = async () => {
        try {
            const res = await axios.get("http://localhost:8080/admin/body-types");
            setBody(res.data);
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] relative'>
                {/* Navbar  */}
                <nav className='py-3 flex justify-between items-center'>
                    <div>
                        <h2 className='text-gray-500'>Pages / Body Types</h2>
                        <h2 className='text-semibold'>Body Types</h2>
                    </div>

                    <div>
                        <button onClick={handleAdminLogOut} className='py-1 px-4 border border-[#593CFB] rounded text-[#593CFB]'>Logout</button>
                        <span className='ml-5 cursor-pointer'><FontAwesomeIcon icon={faGear} /> Settings</span>
                    </div>
                </nav>

                <div className='mt-10'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-semibold'>All Body Types</h1>
                        <button onClick={handleAddBody} className='py-1 px-4 bg-[#593CFB] text-white rounded'>Add Body</button>
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-5'>
                        {body.map((type) => (
                            <div key={type._id} className='my-2 text-center w-44 shadow-md rounded'>
                                <div className='w-44 h-28 border border-b-2 rounded'>
                                    <FontAwesomeIcon className='w-full h-full text-gray-500' icon={faCar} />
                                </div>
                                <h1 className='py-2 text-center font-semibold'>{type.bodyType}</h1>
                            </div>
                        ))}

                    </div>
                </div>
                {addBody && <AddBody setError={setError} setAddBody={setAddBody} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default BodyTypes