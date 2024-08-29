import axiosInstance from "../axiosConfig";
import { validateEmail, validatePhoneNumber } from "../utils/helper";
import ErrorToast from "./ErrorToast";
import React, { useState } from 'react';

const HostProfileUpdate = ({ hostData, setUpdateBox, setHostData }) => {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        fullname: hostData?.fullname,
        email: hostData?.email,
        phone: hostData?.phone
    });

    const updateHostInfo = async () => {
        if (!formData.fullname || !formData.email || !formData.phone) {
            return setError("Fill all the fields");
        }

        if (!validateEmail(formData?.email)) {
            return setError("Enter valid email");
        }

        if (!validatePhoneNumber(formData.phone)) {
            return setError("Enter valid phone number");
        }

        try {
            const res = await axiosInstance.patch("/host/update-host", formData);
            console.log(res);
            setHostData(res?.data);
            setUpdateBox(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className='absolute top-0 right-0 px-5 py-5 bg-black h-screen w-full bg-opacity-80'>
            <div className='text-end text-white font-bold'><h1 onClick={() => setUpdateBox(false)} className='cursor-pointer'>Close</h1></div>

            <div className='relative mx-auto mt-20 px-5 py-4 h-1/2 w-1/2 bg-white rounded-xl'>
                <h1 className='font-semibold text-center'>Update Info</h1>
                <div className='mt-5 grid grid-cols-2 gap-x-2 gap-y-4'>
                    <div>
                        <label className='text-gray-500 font-bold' htmlFor="fullname">Fullname</label><br />
                        <input onChange={handleInputChange} value={formData.fullname} className='px-2 py-1 outline-none border border-[#593CFB] rounded' type="text" name="fullname" id="fullname" />
                    </div>
                    <div>
                        <label className='text-gray-500 font-bold' htmlFor="email">Email</label><br />
                        <input onChange={handleInputChange} value={formData.email} className='px-2 py-1 outline-none border border-[#593CFB] rounded' type="email" name="email" id="email" />
                    </div>
                    <div>
                        <label className='text-gray-500 font-bold' htmlFor="phone">Phone Number</label><br />
                        <input onChange={handleInputChange} value={formData.phone} className='px-2 py-1 outline-none border border-[#593CFB] rounded' type="tel" name="phone" id="phone" />
                    </div>
                </div>
                <div onClick={updateHostInfo} className='absolute bottom-4 text-center w-full'><button className='px-4 py-2 bg-[#593CFB] text-white rounded-md'>Update</button></div>
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default HostProfileUpdate