import React, { useState } from 'react'
import axiosInstance from "../axiosConfig"
import ErrorToast from '../components/ErrorToast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';

const Otp = () => {
    const [otp, setOtp] = useState(null);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(JSON.parse(sessionStorage.getItem("userData")))

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(otp);
        // console.log(userData);
        try {
            const res = await axiosInstance.post("/verify-otp", { email: userData.email, otp: otp });
            console.log(res);
            if (res.status == 200) {
                console.log(typeof userData);
                const res = await axiosInstance.post("/signup", userData)
                if (res.status == 201) window.location.href = "/login";
            }
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    const handleResendOtp = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/send-otp", { email: userData.email });
            if (res.status == 200) alert("otp sended");
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    return (
        <div className='px-5 pt-10 grid grid-cols-2 items-center'>
            <div className='mx-auto my-auto text-center'>
                <div className='mx-auto'>
                    <h1 className='text-2xl font-bold text-blue-500'>Enter The Code</h1>
                    <p className='mt-5 w-[50%] mx-auto text-gray-500'>Enter The Code That we send to your email <span className='text-blue-500'>{userData?.email}</span> be careful not to share code with anyone</p>
                    <input type="text" onChange={(e) => setOtp(e.target.value)} inputMode='numeric' className='mt-5 px-4 py-2 border-2 rounded' />
                    <div className='mt-5'><button onClick={handleSubmit} className='px-6 py-2 bg-blue-500 text-white rounded'>Verify</button></div>
                </div>
                <div className='mt-5'><h1 className='text-gray-500'>Didn't receive code? <span onClick={handleResendOtp} className='text-blue-500 hover:underline cursor-pointer'>Resend</span></h1></div>
            </div>

            <div className='my-auto rounded'>
                <div className='w-[70%] bg-transparent'>
                    <img className='w-full h-full rounded bg-transparent' src="/src/assets/images/otpimage.jpg" alt="otp-image" />
                </div>
            </div>

            <ErrorToast error={error} setError={setError}/>
        </div>
    )
}

export default Otp