import AddBody from '../../components/AddBody';
import axiosInstance from '../../axiosConfig.js';
import React, { useEffect, useState } from 'react';
import AdminSideBar from '../../components/AdminSideBar';
import ErrorToast from '../../components/ErrorToast.jsx';
import { faCar } from '@fortawesome/free-solid-svg-icons';
import AdminNavbar from '../../components/AdminNavbar.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const BodyTypes = () => {
    const [body, setBody] = useState([]);
    const [error, setError] = useState("");
    const [addBody, setAddBody] = useState(false);
    const [page, setPage] = useState("Body Types");

    const handleAddBody = () => setAddBody(prev => !prev);

    useEffect(() => {
        getAllBodys();
    }, [])



    const getAllBodys = async () => {
        console.log("called..")
        console.log(body);
        try {
            const res = await axiosInstance.get("/admin/body-types");
            console.log(res);
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
                <AdminNavbar page={page} />

                <div className='mt-10'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl font-semibold'>All Body Types</h1>
                        <button onClick={handleAddBody} className='py-1 px-4 bg-[#593CFB] text-white rounded'>Add Body</button>
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-5'>
                        {body.length > 0 ? body.map((type) => (
                            <div key={type._id} className='my-2 text-center w-44 shadow-md rounded'>
                                <div className='w-44 h-28 border border-b-2 rounded'>
                                    <FontAwesomeIcon className='w-full h-full text-gray-500' icon={faCar} />
                                </div>
                                <h1 className='py-2 text-center font-semibold'>{type.bodyType}</h1>
                            </div>
                        )) : <><h1>No Body Types yet</h1></>}

                    </div>
                </div>
                {addBody && <AddBody setError={setError} setAddBody={setAddBody} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default BodyTypes