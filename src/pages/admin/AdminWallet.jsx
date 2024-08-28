import React, { useEffect, useState } from 'react'
import AdminNavbar from '../../components/AdminNavbar'
import AdminSideBar from '../../components/AdminSideBar'
import ErrorToast from '../../components/ErrorToast';
import axiosInstance from '../../axiosConfig';
import moment from 'moment';

const AdminWallet = () => {
    const [error, setError] = useState("");
    const [page, setPage] = useState(`Wallet`);
    const [wallet, setWallet] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMoreData, setHasMoreData] = useState(true);
    const [walletHistory, setWalletHistory] = useState([]);

    useEffect(() => {
        fetchWalletInfo();
    }, []);

    useEffect(() => {
        setHasMoreData(true);
        fetchWalletHistory();
    }, [currentPage]);

    const fetchWalletInfo = async () => {
        try {
            const res = await axiosInstance.get("/admin/wallet");
            // console.log(res);
            setWallet(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchWalletHistory = async () => {
        try {
            const res = await axiosInstance.get("/admin/wallet-history", {
                params: {
                    limit: 2,
                    skip: (currentPage - 1) * 2
                }
            });
            // console.log(res?.data);
            setWalletHistory(res?.data);
            if (res?.data.length < 2) {
                setHasMoreData(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const changeTablePage = (action) => {
        if (action == "add") {
            if (hasMoreData) {
                setCurrentPage(prev => prev + 1);
            }
        } else {
            if (currentPage > 1) {
                setCurrentPage(prev => prev - 1)
            }
        }
    }

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <AdminSideBar />

            <div className='w-[80%] h-screen overflow-y-scroll hideScrollBar'>
                {/* Navbar  */}
                <AdminNavbar page={page} />

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
                            {
                                walletHistory?.length > 0 ?
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
                                                {walletHistory.map(pay => (
                                                    <tr onClick={() => navigate(`/admin/host-pays/${page}`)} key={pay?._id} className="hover:bg-gray-100 cursor-pointer">
                                                        <td className="py-2 px-4 border-b">{pay?.paymentId}</td>
                                                        <td className="py-2 px-4 border-b text-center uppercase">{pay?.paymentMethod}</td>
                                                        <td className="py-2 px-4 border-b text-center">{moment(pay?.createdAt).format("DD-MM-YYYY")}</td>
                                                        <td className="py-2 px-4 border-b text-center">{pay?.balanceAfterCommission}</td>
                                                        <td className="py-2 px-4 border-b text-center">{pay?.credited ? <h1 className='text-green-500'>Credited</h1> : <h1 className='text-red-500'>Debited</h1>}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div> :
                                    <h1 className='text-center text-gray-500'>No transactions yet</h1>
                            }
                            {
                                walletHistory?.length > 0 &&
                                <div className='mt-5 text-center flex gap-x-2 justify-center'>
                                    <button disabled={currentPage <= 1} onClick={() => changeTablePage("sub")} className={`px-4 py-1 ${currentPage <= 1 ? "cursor-not-allowed" : ""} text-gray-700 bg-white rounded-l-xl shadow-md`}>prev</button>
                                    <button onClick={() => changeTablePage("add")} className={`px-4 py-1 ${hasMoreData === false ? "cursor-not-allowed" : ""} text-gray-700 bg-white rounded-r-xl shadow-md`}>next</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default AdminWallet