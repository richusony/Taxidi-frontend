import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from '../../services/firebase'
import axiosInstance from '../../axiosConfig.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { validateEmail } from '../../utils/helper'
import ErrorToast from '../../components/ErrorToast.jsx'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AdminLogin = () => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    googleLogin: false
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.email || !formData.password) {
      setError("Fill all the forms")
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Enter valid email");
      return;
    }

    try {
      // console.log(formData);
      // const response = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
      const res = await axiosInstance.post('/admin/login', formData)
      if (res.status == 200) window.location.href = "/admin"
    } catch (error) {
      // console.log(error.message)
      setError(error?.response?.data?.error)
    }
  }

  const handleGoogleSignup = async () => {
    try {
      const userData = await signInWithPopup(auth, googleProvider)
      formData.email = userData.user.email
      formData.password = null
      formData.googleLogin = true

      const res = await axios.post('http://localhost:8080/admin/login', formData)
      if (res.status == 200) window.location.href = "/admin"
      if (res.status !== 200) alert("Invalid Credentials")
    } catch (error) {
      console.log(error)
    }
  }

  const DesktopView = () => (
    <>
      <div className='pl-2 flex items-center'>
        <div className='w-[50%] h-full'>
          <Link to="/" className='absolute top-5 left-4 font-bold text-2xl text-white cursor-pointer'>Taxidi</Link>

          <div className='text-center'><p className='text-4xl text-white'><span>Taxidi</span> Admin</p></div>
        </div>

        <div className='min-h-screen px-20 py-10 w-[50%] bg-[#F7F3FA] rounded-l-2xl'>
          <h1 className='text-4xl font-bold text-center'>Admin Login</h1>
          {/* <p className='mt-2 mx-auto'>Login for booking your pefered car</p> */}

          <div className='mt-[30%] grid grid-cols-1 gap-5'>
            <label htmlFor="email" className='mx-auto py-2 bg-white w-[70%] border-2 border-black rounded'>
              <input type="email" onChange={handleChange} placeholder='Email' id='email' className='px-2 w-full outline-none' />
            </label>
            <label htmlFor="password" className='mx-auto py-2 bg-white w-[70%] border-2 border-black rounded'>
              <input type="password" onChange={handleChange} placeholder='Password' id='password' className='px-2 w-full outline-none' />
            </label>
          </div>

          <div className='mt-5 w-full text-center'>
            <button onClick={handleSubmit} className='mx-auto w-[70%] px-4 py-2 bg-violet-500 text-white font-semibold rounded shadow-md'>LOGIN</button>
            {/* <p className='mt-3'>Don't have an account? <Link to="/signup" className='font-semibold cursor-pointer hover:underline'>Sign in</Link></p> */}
          </div>

          {/* <div className='my-5 flex items-center justify-center'>
                        <p><span>--------</span> OR <span>--------</span></p>
                    </div>

                    <div className='flex justify-center'>
                        <div onClick={handleGoogleSignup} className='px-3 py-2 border-2 w-fit cursor-pointer rounded shadow-md'>
                            <span>Login with Google</span>
                        </div>
                    </div> */}
        </div>
      </div>
    </>
  )

  return (
    <div className='min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600'>
      <ErrorToast error={error} setError={setError}/>
      {DesktopView()}
    </div>
  )
}

export default AdminLogin