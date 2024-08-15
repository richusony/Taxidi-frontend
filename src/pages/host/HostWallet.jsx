import React, { useEffect, useState } from 'react'
import HostNavbar from '../../components/HostNavBar'
import HostSideBar from '../../components/HostSideBar'
import ErrorToast from '../../components/ErrorToast';
import axiosInstance from '../../axiosConfig';

const HostWallet = () => {
    const [error, setError] = useState("");
    const [page, setPage] = useState(`Wallet`);
    const [wallet, setWallet] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);

    useEffect(()=>{
        fetchWalletInfo();
    },[]);

    const fetchWalletInfo = async () => {
        try {
            const res = await axiosInstance.get("/host/wallet");
            // console.log(res);
            setWallet(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%]'>
                {/* Navbar  */}
                <HostNavbar page={page} />

                <div className='my-5 pt-14'>
                    {/* Text & Wallet Balance */}
                    <div className=' grid grid-cols-2'>
                        <div className='px-10 text-center'>
                            <h1 className='px-5 text-2xl font-bold'>Let's Make it easy by, Using <span className='text-[#593CFB]'>Taxidi</span> Wallet</h1>
                            <p className='mt-2 px-2 text-gray-500'>Taxidi Wallet allows you to make instant payments for
                                booking vehicles without any transactions issues
                                caused by the banks</p>
                        </div>
                        <div className='text-center'>
                            <h1 className='text-2xl font-semibold'>Balance <span className='text-[#593CFB]'>₹</span>{wallet?.balance}</h1>
                            <button className='mt-5 px-4 py-2 bg-[#593CFB] text-white rounded '>Withdraw</button>
                        </div>
                    </div>

                    {/* Payment History */}
                    <div className='mt-20'>
                        <h1 className='text-gray-500 font-semibold text-center'>Payment History</h1>
                        <div className=''>
                            <div className="flex justify-center my-8">
                                <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Payment Id</th>
                                            <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Payment Method</th>
                                            <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Date</th>
                                            <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Amount</th>
                                            <th className="py-2 px-4 bg-gray-200 text-gray-700 font-bold border-b">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paymentHistory.map(request => (
                                            <tr onClick={() => navigate(`/admin/host-requests/${page}`)} key={request._id} className="hover:bg-gray-100 cursor-pointer">
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
                        </div>
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostWallet