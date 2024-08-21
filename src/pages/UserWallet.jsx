import React, { useEffect, useMemo, useState } from 'react';
import axiosInstance from '../axiosConfig';
import ErrorToast from '../components/ErrorToast';
import DefaultNavbar from "../components/DefaultNavbar";
import axios from 'axios';
import UserNotifications from '../components/UserNotifications';
import useNotification from '../hooks/useNotification';

const UserWallet = () => {
    const [error, setError] = useState("");
    const [page, setPage] = useState(`Wallet`);
    const { notificationBox } = useNotification();
    const [walletData, setWalletData] = useState(null);
    const [paymentHistory, setPaymentHistory] = useState([]);
    const accessToken = useMemo(() => localStorage.getItem("accessToken")[localStorage.getItem("accessToken")]);

    axios.defaults.withCredentials = true;
   
    useEffect(() => {
        getWalletData();
    }, [])

    const handleAddMoney = async (amount) => {
        try {
            await createRazorpayOrder(amount);
        } catch (error) {
            console.log(error);
        }
    }

    const getWalletData = async () => {
        try {
            const res = await axiosInstance.get("/wallet");
            setWalletData(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;

            script.onload = () => {
                resolve(true);
            }

            script.onerror = () => {
                resolve(false);
            }

            document.body.appendChild(script);
        })
    }


    const createRazorpayOrder = async (amount) => {
        let data = JSON.stringify({
            amount: amount * 100,
            currency: "INR"
        })
        let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${import.meta.env.VITE_BACKEND}/add-to-wallet`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        }

        axios.request(config).then((response) => {
            console.log(JSON.stringify(response.data))
            handleRazorpayScreen(response.data.amount);
        }).catch((error) => console.log(error))
    }

    const handleRazorpayScreen = async (amount) => {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            alert("some error at screen");
        }

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: amount,
            currency: "INR",
            name: "TAXIDI PAYMENT",
            description: "trying to pay",
            handler: async function verifyBooking(response) {
                try {
                    const res = await axiosInstance.post("/verify-add-money-payment", response)
                    alert("booking verified");
                } catch (error) {
                    console.log("error while verifying the order", error);
                }
            },
            prefill: {
                name: "Richu Sony",
                email: "sonyrichu4@gmail.com"
            },
            theme: {
                color: "#593CFB"
            }
        }

        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
    }

    return (
        <div className='px-5 pb-5 min-h-screen bg-[#EDEDED]'>
            {/* Navbar  */}
            <DefaultNavbar />

            <div className='my-5 pt-14'>
                {/* Text & Wallet Balance */}
                <div className='mt-10 grid grid-cols-2'>
                    <div className='px-20 text-center'>
                        <h1 className='px-5 text-2xl font-bold'>Let's Make it easy by, Using <span className='text-[#593CFB]'>Taxidi</span> Wallet</h1>
                        <p className='mt-2 px-10 text-gray-500'>Taxidi Wallet allows you to make instant payments for
                            booking vehicles without any transactions issues
                            caused by the banks</p>
                    </div>
                    <div className='text-center'>
                        <h1 className='text-2xl font-semibold'>Balance <span className='text-[#593CFB]'>₹</span>{walletData ? walletData?.balance : 0}</h1>
                        <div className='mt-5 flex justify-center items-center'>
                            <button onClick={() => handleAddMoney(500)} className='transition delay-150 ease-linear hover:scale-105 mx-1 border border-[#593CFB] px-4 py-1 w-fit text-[#593CFB] rounded shadow-md'>500</button>
                            <button onClick={() => handleAddMoney(1000)} className='transition delay-150 ease-linear hover:scale-105 mx-1 border border-[#593CFB] px-4 py-1 w-fit text-[#593CFB] rounded shadow-md'>1000</button>
                            <button onClick={() => handleAddMoney(1500)} className='transition delay-150 ease-linear hover:scale-105 mx-1 border border-[#593CFB] px-4 py-1 w-fit text-[#593CFB] rounded shadow-md'>1500</button>
                            <button onClick={() => handleAddMoney(2000)} className='transition delay-150 ease-linear hover:scale-105 mx-1 border border-[#593CFB] px-4 py-1 w-fit text-[#593CFB] rounded shadow-md'>2000</button>
                        </div>
                        <button className='transition delay-150 ease-linear mt-5 px-4 py-2 bg-[#593CFB] text-white rounded hover:scale-105'>Add Money</button>
                    </div>
                </div>

                {/* Payment History */}
                <div className='mt-20'>
                    <h1 className='text-gray-500 font-semibold text-center'>Payment History</h1>
                    {paymentHistory.length > 0 ? <div className=''>
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
                    </div> : <h1 className='text-center text-gray-500'>No Transations yet</h1>}
                </div>
            </div>
            <ErrorToast error={error} setError={setError} />
            {notificationBox && <UserNotifications />}
        </div>
    )
}

export default UserWallet