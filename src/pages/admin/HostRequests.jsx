import moment from 'moment';
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
    const [hostRequests, setHostRequests] = useState([]);
    const [page, setPage] = useState("Host Requests");

    useEffect(() => {
        getAllHostRequests();
    }, [])


    const getAllHostRequests = async () => {
        try {
            const res = await axiosInstance.get("/admin/get-host-requests");
            setHostRequests(res.data);
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

                <div className='mt-10 text-end'><button onClick={() => setAddCar(prev => !prev)} className='px-6 py-2 bg-[#593CFB] text-white rounded'>Still figuring out!!</button></div>

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
                {addCar && <AddCar setError={setError} setAddCar={setAddCar} />}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostRequests