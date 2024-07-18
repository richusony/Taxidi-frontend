import AddCar from '../../components/AddCar';
import axiosInstance from '../../axiosConfig';
import { validateAdmin } from '../../utils/helper';
import React, { useEffect, useState } from 'react';
import ErrorToast from '../../components/ErrorToast';
import AdminNavbar from '../../components/AdminNavbar';
import AdminSideBar from '../../components/AdminSideBar';

const Cars = () => {
    const [error, setError] = useState("");
    const [page, setPage] = useState("Cars");
    const [addCar, setAddCar] = useState(false);
    const [vehicles, setVehicles] = useState([]);


    useEffect(() => {
        validateAdmin();
        getAllVehicles();
    }, [])
    const data = [
        { model: 'Model S', brand: 'Tesla', bodyType: 'Sedan', host: 'John Doe', added: '2024-01-01' },
        { model: 'Mustang', brand: 'Ford', bodyType: 'Coupe', host: 'Jane Smith', added: '2024-01-15' },
        { model: 'Civic', brand: 'Honda', bodyType: 'Sedan', host: 'Michael Johnson', added: '2024-02-01' },
        { model: 'Corolla', brand: 'Toyota', bodyType: 'Sedan', host: 'Emily Davis', added: '2024-02-10' },
        { model: 'Model 3', brand: 'Tesla', bodyType: 'Sedan', host: 'Chris Brown', added: '2024-03-05' },
        { model: 'F-150', brand: 'Ford', bodyType: 'Truck', host: 'Patricia Miller', added: '2024-03-12' },
        { model: 'Accord', brand: 'Honda', bodyType: 'Sedan', host: 'Daniel Wilson', added: '2024-04-01' },
        { model: 'Camry', brand: 'Toyota', bodyType: 'Sedan', host: 'Anna White', added: '2024-04-20' },
        { model: 'Model X', brand: 'Tesla', bodyType: 'SUV', host: 'David Martin', added: '2024-05-01' },
        { model: 'Explorer', brand: 'Ford', bodyType: 'SUV', host: 'Susan Lee', added: '2024-05-15' },
    ];

const getAllVehicles = async () => {
    try {
        const res = await axiosInstance.get("/admin/cars");
        setVehicles(res.data);
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
                                <tr key={index} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b text-center">{item.model}</td>
                                    <td className="py-2 px-4 border-b text-center">{item.brand.brandName}</td>
                                    <td className="py-2 px-4 border-b text-center">{item.bodyType.bodyType}</td>
                                    <td className="py-2 px-4 border-b text-center">{item.host}</td>
                                    <td className="py-2 px-4 border-b text-center">{item.registerationNumber}</td>
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

export default Cars