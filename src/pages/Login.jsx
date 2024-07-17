import axios from 'axios';
import { Link } from 'react-router-dom';
import useOnline from "../hooks/useOnline.jsx";
import { validateEmail } from '../utils/helper';
import { signInWithPopup } from "firebase/auth";
import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../services/firebase';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Login = () => {
    const isOnline = useOnline();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!formData.email || !formData.password) {
            setError("Fill all the forms")
            return
        }

        if (!validateEmail(formData.email)) {
            setError("Enter valid email");
            return
        }

        try {
            // console.log(formData);
            // const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            const res = await axios.post('http://localhost:8080/login', formData)
            if (res.status == 200) window.location.href = "/"
        } catch (error) {
            setError(error?.response?.data?.error)
        }
    }

    const handleGoogleSignup = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        try {
            const userData = await signInWithPopup(auth, googleProvider)
            formData.email = userData.user.email
            formData.password = null
            formData.googleLogin = true

            const res = await axios.post('http://localhost:8080/login', formData)
            if (res.status == 200) window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    }

    const DesktopView = () => (
        <>
            <div className='md:pl-2 flex items-center'>
                <div className='hidden md:block w-[50%] h-full'>
                    <Link to="/" className='absolute top-5 left-4 font-bold text-2xl text-white cursor-pointer'>Taxidi</Link>

                    <div className='text-center'><p className='text-4xl text-white'>Welcome to <span>Taxidi</span></p></div>
                </div>

                <div className='min-h-screen px-10 md:px-20 py-10 w-full md:w-[50%] bg-[#F7F3FA] md:rounded-l-2xl'>
                    <h1 className='text-4xl font-bold'>Login</h1>
                    <p className='mt-2 mx-auto'>Login for booking your pefered car</p>

                    <div className='my-10 grid grid-cols-1 gap-5'>
                        <label htmlFor="email" className='mx-auto py-2 bg-white w-[70%] border-2 border-black rounded'>
                            <input type="email" onChange={handleChange} placeholder='Email' id='email' className='px-2 w-full outline-none' />
                        </label>
                        <label htmlFor="password" className='mx-auto py-2 bg-white w-[70%] border-2 border-black rounded'>
                            <input type="password" onChange={handleChange} placeholder='Password' id='password' className='px-2 w-full outline-none' />
                        </label>
                    </div>

                    <div className='mt-5 w-full text-center'>
                        <button onClick={handleSubmit} className='mx-auto w-[70%] px-4 py-2 bg-violet-500 text-white font-semibold rounded shadow-md'>LOGIN</button>
                        <p className='mt-3'>Don't have an account? <Link to="/signup" className='font-semibold cursor-pointer hover:underline'>Sign in</Link></p>
                    </div>

                    <div className='my-5 flex items-center justify-center'>
                        <p><span>--------</span> OR <span>--------</span></p>
                    </div>

                    <div className='flex justify-center'>
                        <div onClick={handleGoogleSignup} className='px-3 py-2 border-2 w-fit cursor-pointer rounded shadow-md'>
                            <span>Login with Google</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <div className='min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600 relative'>
            <div className={`transition delay-150 absolute ease-linear ${error ? "left-40 top-1" : "right-full"} px-4 py-2 bg-white border-2 border-violet-500 w-fit rounded shadow-md`}>
                <span className='text-violet-600'><FontAwesomeIcon icon={faWarning} /> {error}</span>
            </div>
            {DesktopView()}
        </div>
    )
}

export default Login