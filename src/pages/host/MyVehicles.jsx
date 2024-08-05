import AddCar from '../../components/AddCar';
import axiosInstance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { validateHost } from '../../utils/helper';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import HostSideBar from '../../components/HostSideBar';
import HostNavbar from '../../components/HostNavBar';

const MyVehicles = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [page, setPage] = useState("My Vehicles");
    const [addCar, setAddCar] = useState(false);
    const [vehicles, setVehicles] = useState([]);


    useEffect(() => {
        // validateHost();
        getHostVehicles();
    }, [])

const getHostVehicles = async () => {
    try {
        const res = await axiosInstance.get("/host/host-vehicles");
        console.log(res.data);
        setVehicles(res.data);
    } catch (error) {
        console.log(error?.response?.data?.error);
        setError(error?.response?.data?.error)
    }
}
    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%] relative'>
                {/* Navbar  */}
                <HostNavbar page={page} />

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
                            {vehicles.map((item, index) => (
                                <tr onClick={()=>navigate(`/host/cars/${item.vehicleRegistrationNumber}`)} key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{item?.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.brand?.brandName}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.bodyType?.bodyType}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.host?.fullname}</td>
                                    <td className="py-2 px-4 border-b text-center">{item?.vehicleRegistrationNumber}</td>
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

export default MyVehicles