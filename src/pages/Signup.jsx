import React, { createElement, useEffect, useState } from 'react'
import { Link, redirect } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "../services/firebase"
import { isKannur, validateEmail, validatePhoneNumber, validatePassword } from '../utils/helper'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWarning } from '@fortawesome/free-solid-svg-icons'

const Signup = () => {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        email: '',
        phone: '',
        city: '',
        pincode: '',
        password: '',
        confirmPassword: '',
        googleLogin: false
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

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.firstName || !formData.email || !formData.pincode || !formData.password || !formData.confirmPassword) {
            setError("Fill all the forms")
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return
        }

        if (!validateEmail(formData.email)) {
            setError("Enter valid email");
            return
        }

        if (!validatePhoneNumber(formData.phone)) {
            setError("Enter valid Phone Number")
            return
        }

        if(!validatePassword(formData.password)) {
        
            setError("Password must be at least 8 characters long and contain both letters and numbers")
            return
        }

        if (isKannur(Number(formData.pincode.trim())) == false) {
            setError("Currently Booking is only available on Kannur")
            return
        }
        try {
            // console.log(formData);
            // const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const res = await axios.post('http://localhost:8080/signup', formData)
            console.log("checking :: ",res);
            if (res.status == 201) window.location.href = "/login"
        } catch (error) {
            setError(error.response?.data?.err)
        }
    }

    const handleGoogleSignup = async () => {
        try {
            const userData = await signInWithPopup(auth, googleProvider)

            formData.firstName = userData.user.displayName.split(' ')[0]
            formData.secondName = userData.user.displayName.split(' ')[1]
            formData.email = userData.user.email
            formData.phone = null
            formData.city = null
            formData.pincode = null
            formData.password = null
            formData.confirmPassword = null
            formData.googleLogin = true

            const res = await axios.post('http://localhost:8080/signup', formData)
            if (res.status == 201) window.location.href = "/login"
        } catch (error) {
            console.log(error.message)
        }
    }

    const DesktopView = () => (
        <>
            <div className='pl-2 flex items-center'>
                <div className='w-[40%] h-full'>
                    <Link to="/" className='absolute top-5 left-4 font-bold text-2xl text-white cursor-pointer'>Taxidi</Link>

                    <div className='text-center'><p className='text-4xl text-white'>Welcome to <span>Taxidi</span></p></div>
                </div>

                <div className='px-20 py-10 w-[60%] bg-[#F7F3FA] rounded-l-2xl'>
                    <h1 className='text-4xl font-bold'>Sign Up</h1>
                    <p className='mt-2'>Create a account for booking your pefered car</p>

                    <div className='my-10 grid grid-cols-2 gap-5'>
                        <label htmlFor="firstName" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="text" onChange={handleChange} placeholder='First Name' id='firstName' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="secondName" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="text" onChange={handleChange} placeholder='Last Name' id='secondName' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="email" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="email" onChange={handleChange} placeholder='Email' id='email' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="phone" className='py-2 bg-white border-2 border-black rounded flex'>
                            <span className='px-1 border-r'>+91</span>  <input type="tel" onChange={handleChange} placeholder='Phone Number' id='phone' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="city" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="text" onChange={handleChange} placeholder='City' id='city' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="pincode" className='py-2 bg-white border-2 border-black rounded'>
                            <input name='pincode' onChange={handleChange} type="number" min={6} max={6} maxLength={6} inputMode='numeric' placeholder='Pincode' id='pincode' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="password" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="password" onChange={handleChange} placeholder='Password' id='password' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="confirmPassword" className='py-2 bg-white border-2 border-black rounded'>
                            <input type="password" onChange={handleChange} placeholder='Confirm Password' id='confirmPassword' className='px-2 w-full outline-none' />
                        </label>
                    </div>

                    <div className='mt-5 w-full text-center'>
                        <button onClick={handleSubmit} className='mx-auto w-[70%] px-4 py-2 bg-violet-500 text-white font-semibold rounded shadow-md'>SIGN UP</button>
                        <p className='mt-3'>Already have an account? <Link to="/login" className='font-semibold cursor-pointer hover:underline'>Login in</Link></p>
                    </div>

                    <div className='my-5 flex items-center justify-center'>
                        <p><span>--------</span> OR <span>--------</span></p>
                    </div>

                    <div className='flex justify-center'>
                        <div onClick={handleGoogleSignup} className='px-3 py-2 border-2 w-fit cursor-pointer rounded shadow-md'>
                            <span>Sign up with Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className='bg-gradient-to-r from-violet-600 to-indigo-600 relative'>
            <div className={`transition delay-150 absolute ease-linear ${error ? "left-40 top-1" : "right-full"} px-4 py-2 bg-white border-2 border-violet-500 w-fit rounded shadow-md`}>
                <span className='text-violet-600'><FontAwesomeIcon icon={faWarning} /> {error}</span>
            </div>
            {DesktopView()}
        </div>
    )
}

export default Signup