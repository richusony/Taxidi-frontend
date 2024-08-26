import moment from 'moment';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';

const Hosts = () => {
    const navigate = useNavigate();
    const [page, setPage] = useState("Hosts");
    const [hostList, setHostList] = useState([]);

    useEffect(()=>{
        fetchAllHosts();
    },[])

    const fetchAllHosts = async()=> {
        try {
           const res = await axiosInstance.get("/admin/hosts");
        console.log(res?.data);
        setHostList(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const redirectTo = (e, url) => {
        e.stopPropagation();
        navigate(url);
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar relative'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

                <div className='mt-5'>
                    <h1 className='font-bold text-2xl'>All hosts</h1>
                    <div className="flex justify-center my-8">
                        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                            <thead>
                                <tr>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b"></th>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b text-start">Host</th>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b text-start">Email</th>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Phone</th>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Joined At</th>
                                    <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {hostList.map(host => ( 
                                    <tr onClick={() => navigate(`/admin/host/${host?.email}`)} key={host._id} className="hover:bg-gray-100 cursor-pointer">
                                        <td className="py-2 px-4 border-b text-center">{}</td>
                                        <td className="py-2 px-4 border-b text-start">{host?.fullname}</td>
                                        <td className="py-2 px-4 border-b text-start">{host?.email}</td>
                                        <td className="py-2 px-4 border-b text-center">{host.phone}</td>
                                        <td className="py-2 px-4 border-b text-center">{moment(host.createdAt).format("DD-MM-YYYY")}</td>
                                        <td className="py-2 px-4 border-b text-center">
                                            <div>
                                                <button onClick={(e) => redirectTo(e,"/admin/chat/"+host?.email)} className='transition-all ease-linear border border-[#593CFB] px-4 text-[#593CFB] hover:bg-[#593CFB] hover:text-white rounded shadow-md'>chat</button>
                                            </div>
                                            </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hosts