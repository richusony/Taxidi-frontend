import { json, Link, useParams } from 'react-router-dom';
import useOnline from '../hooks/useOnline';
import { handleLogOut } from '../utils/helper';
import React, { useEffect, useState } from 'react';
import { faBars, faCar, faLocationDot, faOilCan, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import axiosInstance from '../axiosConfig';

const CarDetailedPage = () => {
  const isOnline = useOnline();
  const [menu, setMenu] = useState(false);
  const {registrationNumber} = useParams();
  const [userData, setUserData] = useState(null);
  const [responseId, setResposeId] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [responseState, setResposeState] = useState(null);

  useEffect(() => {
    // getUserDetails();
    getVehicleDetails();
  }, []);

  const getUserDetails = async () => {
    if (!isOnline) {
      setError("You are offline");
      return;
    }

    try {
      const res = await axiosInstance.get('/profile');
      // console.log(res);
      setUserData(res?.data?.user);
    } catch (error) {
      // window.location.href = "/login";
      // setError(error?.response?.data?.error);
    }
  };

  const getVehicleDetails = async () =>{
    try {
      const res = await axiosInstance.get(`/car/${registrationNumber}`);
      console.log(res?.data);
      setVehicleData(res?.data);
    } catch (error) {
      console.log(error)
    }
  }

  const handleMenu = () => setMenu(prev => !prev);

  const loadScript = (src) => {
    return new Promise((resolve) =>{
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

  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND}/orders`,
      headers: {
        'Content-Type': 'application/json'
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

  if(!res) {
    alert("some error at screen");
  }

  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: amount,
    currency: "INR",
    name: "TAXIDI PAYMENT",
    description: "trying to pay",
    handler: function(response){
      setResposeId(response.razorpay_payment_id)
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
    <div className='pb-10'>
      <nav className='px-10 py-5 flex justify-between'>
        <div><Link to="/" className='text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>
        <div className='flex items-center'>
          <div className='relative'>
            <FontAwesomeIcon className='text-2xl cursor-pointer' onClick={handleMenu} icon={faBars} />
            <div className={`${menu ? 'absolute' : 'hidden'} top-14 right-0 w-48 px-5 py-2 z-10 bg-white rounded shadow-md border`}>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/profile">Profile</Link>
              </div>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/wallet">Wallet</Link>
              </div>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/bookings">Bookings</Link>
              </div>
              {userData ? <div className='my-4'>
                <h1 className='hover:text-[#593CFB] text-lg cursor-pointer' onClick={handleLogOut}>Logout</h1>
              </div>
                :
                <div className='my-4'>
                  <Link className='hover:text-[#593CFB] text-lg' to="/login">Login</Link>
                </div>}
            </div>
          </div>
        </div>
      </nav>

      <div className='px-28 py-2'>
        {/* images  */}
        <div className='flex'>
          <div className='w-[60%] h-96'>
            <img className='w-full h-full object-cover rounded-l' src={vehicleData?.vehicleImages[0]} alt="" />
          </div>

          <div className='w-[40%] flex flex-col justify-between px-5 h-96'>
            <div className='h-[47%]'><img className='w-full h-full object-cover rounded-tr' src={vehicleData?.vehicleImages[1]} alt="" /></div>
            <div className='h-[47%]'><img className='w-full h-full object-cover rounded-br' src={vehicleData?.vehicleImages[2]} alt="" /></div>
          </div>
        </div>

        <div className='mt-5 flex'>
          <div className='w-[70%]'>
            <h1 className='text-3xl font-bold'>{vehicleData?.brand?.brandName + " " + vehicleData?.model}</h1>
            <h1 className='mt-2 text-xl text-gray-500 font-semibold'>{vehicleData?.model}</h1>
            <h1 className='mt-2 text-xl font-semibold'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /> (5 trips)</h1>

            <div className='mt-5 w-72 grid grid-cols-2 gap-y-4'>
              <div className='text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faOilCan} /> <span>{vehicleData?.fuel}</span></div>
              <div className='text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faCar} /> <span>{vehicleData?.transmission}</span></div>
              <div className='text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faUsers} /> <span>{vehicleData?.seats} seats</span></div>
            </div>

            {/* Host */}
            <div className='mt-5'>
              <h1 className='font-semibold'>Hosted By</h1>
              <div className='mt-2 flex items-center'>
                <div className='w-16 h-16 rounded-full shadow-md'><img className='w-full h-full object-cover rounded-full' src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZSUyMGltYWdlfGVufDB8fDB8fHww" alt="" /></div>
                <div className='ml-2'><h1 className='text-xl font-semibold'>{vehicleData?.host?.fullname}</h1></div>
              </div>
            </div>
          </div>



          {/* payment details  */}
          <div className='w-[30%]'>
            <h1 className='text-xl font-bold'>₹{vehicleData?.rent}/hour</h1>

            <h1 className='mt-2 font-semibold'>Trip Starts</h1>
            <h1 className='text-gray-700'>06/07/2024 - 2:30 AM</h1>
            <h1 className='font-semibold'>Trip Ends</h1>
            <h1 className='text-gray-700'>07/07/2024 - 2:30 AM</h1>

            <h1 className='mt-2 font-semibold'>Pickup Location</h1>
            <h1 className='text-gray-700'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /> Thaliparamba</h1>

            <button onClick={() => createRazorpayOrder(100)} className='mt-5 mx-auto px-14 py-2 bg-[#593CFB] text-white rounded-md'>Continue</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetailedPage