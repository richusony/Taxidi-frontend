import React, { useEffect, useState } from 'react'
import axiosInstance from '../axiosConfig.js';
import { isKannur, validateEmail, validatePhoneNumber } from '../utils/helper.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import ErrorToast from './ErrorToast.jsx';

const UpdateUser = ({ userData, userFun }) => {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: userData.firstName,
        secondName: userData.secondName,
        email: userData.email,
        phone: userData.phone,
        city: userData.city,
        pincode: userData.pincode,
    })

    useEffect(() => {
        const clearErrorTimer = setTimeout(() => setError(""), 3000);
        return () => clearTimeout(clearErrorTimer);
    }, [error])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        if (!formData.firstName || !formData.email || !formData.pincode) {
            setError("Fill all the forms")
        }

        if (!validateEmail(formData.email)) {
            setError("Enter valid email");
            return
        }

        if (!validatePhoneNumber(formData.phone)) {
            setError("Enter valid Phone Number")
            return
        }

        if (isKannur(Number(formData.pincode.toString().trim())) == false) {
            setError("Currently Booking is only available on Kannur")
            return
        }
        try {
            // console.log(formData);
            // const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const res = await axiosInstance.post('/update-user', formData)
            console.log("checking :: ", res);
            if (res.status == 200) window.location.href = "/profile"
        } catch (error) {
            setError(error.response?.data?.err)
        }
    }
    return (
        <div>
            <div className='mt-5'>
                {/* Error Display  */}
                <ErrorToast error={error} setError={setError}/>

                <h1 className='py-1 px-2 bg-[#593CFB] text-white rounded-tl rounded-tr'>1. Basic Information - UPDATE</h1>
                <div className='px-5 py-2 border border-[#593CFB] grid grid-cols-2 gap-5'>
                    <div className='flex flex-col'>
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" onChange={handleChange} id='firstName' value={formData.firstName} name='firstName' className='px-2 py-2 border-2 rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="secondName">Second Name</label>
                        <input type="text" onChange={handleChange} id='secondName' value={formData.secondName} name='secondName' className='px-2 py-2 border-2 rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input type="email" onChange={handleChange} id='email' value={formData.email} name='email' className='px-2 py-2 border-2 rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" onChange={handleChange} id='phone' value={formData.phone} name='phone' className='px-2 py-2 border-2 rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="city">City</label>
                        <input type="text" onChange={handleChange} id='city' name='city' value={formData.city} className='px-2 py-2 border-2 rounded' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="pincode">Pincode</label>
                        <input type="text" onChange={handleChange} id='pincode' name='pincode' value={formData.pincode} className='px-2 py-2 border-2 rounded' />
                    </div>

                    <div className=''>
                        <button onClick={handleUpdateUser} className='px-4 py-2 bg-[#593CFB] text-white rounded'>UPDATE</button>
                    </div>
                    <div className='flex justify-end'>
                        <button onClick={() => userFun(false)} className='px-4 py-2 border border-[#593CFB] text-[#593CFB] rounded'>Cancel</button>
                    </div>
                        
                </div>
            </div>
        </div>
    )
}

export default UpdateUser