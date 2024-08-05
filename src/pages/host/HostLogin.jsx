import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosConfig.js';
import useOnline from '../../hooks/useOnline.jsx';
import { validateEmail } from '../../utils/helper';
import ErrorToast from '../../components/ErrorToast.jsx';
import AuthContext from '../../contexts/AuthContext.jsx';

const HostLogin = () => {
  const isOnline = useOnline();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
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
    if (!isOnline) {
      setError("You are offline");
      return;
    }

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
      const res = await axiosInstance.post('/host/host-login', formData)
      login(res?.data?.host, res?.data?.accessToken, res?.data?.refreshToken);
      console.log(res.data);
      navigate('/host');
    } catch (error) {
      console.log(error.message)
      setError(error?.response?.data?.error)
    }
  }

  const DesktopView = () => (
    <>
      <div className='pl-2 flex items-center'>
        <div className='w-[50%] h-full'>
          <Link to="/" className='absolute top-5 left-4 font-bold text-2xl text-white cursor-pointer'>Taxidi</Link>

          <div className='text-center'><p className='text-4xl text-white'><span>Taxidi</span> Host</p></div>
        </div>

        <div className='min-h-screen px-20 py-10 w-[50%] bg-[#F7F3FA] rounded-l-2xl'>
          <h1 className='text-4xl font-bold text-center'>Host Login</h1>
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

        </div>
      </div>
    </>
  )

  return (
    <div className='min-h-screen bg-gradient-to-r from-violet-600 to-indigo-600'>
      <ErrorToast error={error} setError={setError} />
      {DesktopView()}
    </div>
  )
}

export default HostLogin