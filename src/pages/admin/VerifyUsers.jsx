import AddCar from '../../components/AddCar';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';

const VerifyUsers = () => {
       const navigate = useNavigate();
    const [error, setError] = useState("");
    const [page, setPage] = useState("Verify Users");
    const [addCar, setAddCar] = useState(false);
    const [requestsData, setRequestsData] = useState([]);


    useEffect(() => {
        getAllrequestsData();
    }, [])

const getAllrequestsData = async () => {
    try {
        const res = await axiosInstance.get("/admin/license-verification-requests");
        // console.log(res.data);
        setRequestsData(res.data);
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

                <div className='mt-10 text-end'><button onClick={() => setAddCar(prev => !prev)} className='px-6 py-2 bg-[#593CFB] text-white rounded'>Not Done</button></div>
                <div className="flex justify-center my-8">
                    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Fullname</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Email</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Phone</th>
                                <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">License Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requestsData.map((item, index) => (
                                <tr onClick={()=>navigate(`/admin/license-verify-requests/${item.licenseNumber}`)} key={index} className="hover:bg-gray-100 cursor-pointer">
                                    <td className="py-2 px-4 border-b text-center">{item?.userId?.firstName + " " + item?.userId?.secondName}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.userId?.email}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.userId?.phone}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.licenseNumber}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {addCar && <AddCar setError={setError} setAddCar={setAddCar} />}
            </div>
            <ErrorToast error={error} setError={setError}/>
        </div>
  )
}

export default VerifyUsers