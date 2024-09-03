import axios from 'axios';
import useOnline from '../hooks/useOnline';
import axiosInstance from '../axiosConfig';
import Reviews from '../components/Reviews';
import { handleLogOut } from '../utils/helper';
import AuthContext from '../contexts/AuthContext';
import RatingList from '../components/RatingList';
import ErrorToast from '../components/ErrorToast';
import useNotification from '../hooks/useNotification';
import React, { useContext, useEffect, useState } from 'react';
import UserNotifications from '../components/UserNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotificationContext } from '../contexts/NotificationContext';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { faBars, faCar, faLocationDot, faOilCan, faStar, faUsers } from '@fortawesome/free-solid-svg-icons';

const CarDetailedPage = () => {
  const isOnline = useOnline();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [menu, setMenu] = useState(false);
  const { user } = useContext(AuthContext);
  const [rating, setRating] = useState(null);
  const { registrationNumber } = useParams();
  const [userData, setUserData] = useState(null);
  const [responseId, setResposeId] = useState(null);
  const [walletData, setWalletData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [responseState, setResposeState] = useState(null);
  const [payUsingWallet, setPayUsingWallet] = useState(false);
  const { notificationBox, setNotificationBox } = useNotificationContext();

  axios.defaults.withCredentials = true;

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  const query = useQuery();
  const queryStartDate = query.get('startDate');
  const queryEndDate = query.get('endDate');

  // Retrieve start and end dates from the query parameters
  const tripStartsObj = new Date(queryStartDate);
  const tripEndsObj = new Date(queryEndDate);

  // Define a function to format the date in "DD/MM/YYYY" and 12-hour time with AM/PM
  const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12 || 12; // Convert to 12-hour format
    const hoursStr = String(hours).padStart(2, '0');

    return `${day}/${month}/${year}, ${hoursStr}:${minutes} ${ampm}`;
  };

  // Format the start and end dates
  const tripStarts = formatDateTime(tripStartsObj);
  const tripEnds = formatDateTime(tripEndsObj);

  useEffect(() => {
    getVehicleDetails();
    if (user !== null && user !== undefined && user !== "") {
      getWalletInfo();
    }
  }, []);

  const getVehicleDetails = async () => {
    try {
      const res = await axiosInstance.get(`/car/${registrationNumber}`);
      console.log(res?.data);
      setVehicleData(res?.data);
    } catch (error) {
      console.log(error)
    }
  }

  const getWalletInfo = async () => {
    try {
      const res = await axiosInstance.get("/wallet");
      setWalletData(res?.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Function to calculate the total amount based on hours and rate
  const calculateTotalAmount = () => {
    if (tripStartsObj && tripEndsObj && vehicleData?.rent) {
      const diffInMs = tripEndsObj - tripStartsObj; // Difference in milliseconds
      const diffInHours = diffInMs / (1000 * 60 * 60); // Convert to hours
      return Math.floor(diffInHours * vehicleData.rent); // Total amount
    }
    return 0;
  };

  const handleMenu = () => setMenu(prev => !prev);

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

  const totalAmount = calculateTotalAmount();

  const createRazorpayOrder = async (amount) => {
    const accessToken = localStorage.getItem("accessToken");
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_BACKEND}/book-vehicle`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
      data: data
    }

    axios.request(config).then((response) => {
      // console.log(JSON.stringify(response.data))
      handleRazorpayScreen(response.data.amount);
    }).catch((error) => console.log(error))
  }

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("some error at screen");
    }
    const verifyRequestData = {
      vehicleId: vehicleData._id,
      queryStartDate,
      queryEndDate,
      paymentDetails: null
    }
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "TAXIDI PAYMENT",
      description: "trying to pay",
      handler: async function verifyBooking(response) {
        try {
          verifyRequestData.paymentDetails = response;
          const res = await axiosInstance.post("/verify-booking", verifyRequestData);
          if (res.status === 200) {
            // Redirect to my bookings
            navigate("/my-bookings");
          } else {
            alert("Payment verification failed.");
          }
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

  const handleBooking = async () => {
    if (!user) return navigate("/login");

    if (payUsingWallet && walletData?.balance < totalAmount) {
      scrollTo(0, 0)
      return setError("Insufficient Balance");
    }

    if (payUsingWallet && walletData?.balance >= totalAmount) {
      // Book using wallet
      try {
        const res = await axiosInstance.post("/book-vehicle-wallet", {
          vehicleId: vehicleData._id,
          queryStartDate: queryStartDate,
          queryEndDate: queryEndDate,
          amount: parseFloat(totalAmount),
        });
        if (res.status === 200) {
          // Redirect to my bookings after successful wallet payment
          navigate("/my-bookings");
        } else {
          setError("Booking failed using wallet.");
        }
      } catch (error) {
        console.log("Error booking with wallet:", error);
      }
    } else {
      // Book using Razorpay
      await createRazorpayOrder(totalAmount);
    }
  }

  return (
    <div className='pb-10 overflow-x-hidden'>
      <nav className='px-5 md:px-10 py-5 flex justify-between'>
        <div><Link to="/" className='text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>
        <div className='flex items-center'>
          <div className='relative'>
            <FontAwesomeIcon className='text-2xl cursor-pointer' onClick={handleMenu} icon={faBars} />
            <div className={`${menu ? 'absolute' : 'hidden'} top-14 right-0 w-48 px-5 py-2 z-10 bg-white rounded shadow-md border`}>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/profile">Profile</Link>
              </div>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' onClick={() => setNotificationBox(true)}>Notifications</Link>
              </div>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/wallet">Wallet</Link>
              </div>
              <div className='my-4'>
                <Link className='hover:text-[#593CFB] text-lg' to="/my-bookings">Bookings</Link>
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

      <div className='px-2 md:px-28 py-2'>
        {/* images  */}
        <div className='flex'>
          <div className='md:w-[60%] h-96'>
            <img className='w-full h-full object-cover rounded-l' src={vehicleData?.vehicleImages[0]} alt="" />
          </div>

          <div className='hidden w-[40%] md:flex flex-col justify-between px-5 h-96'>
            <div className='h-[47%]'><img className='w-full h-full object-cover rounded-tr' src={vehicleData?.vehicleImages[1]} alt="" /></div>
            <div className='h-[47%]'><img className='w-full h-full object-cover rounded-br' src={vehicleData?.vehicleImages[2]} alt="" /></div>
          </div>
        </div>

        <div className='mt-5 flex flex-col md:flex-row'>
          <div className='md:w-[70%]'>
            <h1 className='text-xl md:text-3xl font-bold'>{vehicleData?.brand?.brandName + " " + vehicleData?.model}</h1>
            <h1 className='mt-2 md:text-xl text-gray-500 font-semibold'>{vehicleData?.model}</h1>
            <h1 className='mt-2 text-sm md:text-xl font-semibold'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /> (5 trips)</h1>

            <div className='mt-5 grid grid-cols-2 gap-y-4'>
              <div className='md:text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faOilCan} /> <span>{vehicleData?.fuel}</span></div>
              <div className='md:text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faCar} /> <span>{vehicleData?.transmission}</span></div>
              <div className='md:text-xl text-gray-500 font-semibold'><FontAwesomeIcon className='text-[#593CFB]' icon={faUsers} /> <span>{vehicleData?.seats} seats</span></div>
            </div>

            {/* Host */}
            <div className='mt-5'>
              <h1 className='font-semibold'>Hosted By</h1>
              <div className='mt-2 flex items-center'>
                <div className='w-16 h-16 rounded-full shadow-md'><img className={vehicleData?.host?.profileImage} alt="host-profileImage" /></div>
                <div className='ml-2'><h1 className='md:text-xl font-semibold'>{vehicleData?.host?.fullname}</h1></div>
              </div>
            </div>

            {/* Rating and Reviews */}
            <div className='mt-5'>
              <h1 className='font-semibold'>RATING AND REVIEWS</h1>
              <h1 className='mt-2 md:text-xl font-bold'>{rating ? rating?.TotalAverage : <span className='text-gray-500 font-normal'>No rating yet</span>} <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></h1>
              <h1 className='mt-1 px-2'>{rating ? (rating?.TotalNumberOfRatings + " ratings") : ""}</h1>

              <RatingList ratingsData={rating} />

              <Reviews vehicleId={vehicleData?._id} vehicleRegistrationNumber={registrationNumber} user={user} setRatingData={setRating} />
            </div>
          </div>



          {/* payment details  */}
          <div className='mt-10 md:mt-0 md:w-[30%]'>
            <h1 className='md:hidden mb-2 font-bold'>Summary</h1>
            <h1 className='md:text-xl font-bold'><span className='text-[#593CFB]'>₹</span>{totalAmount} <span className='text-gray-500 font-semibold'>({vehicleData?.rent}/hour)</span></h1>

            <h1 className='mt-2 font-semibold'>Trip Starts</h1>
            <h1 className='text-gray-700'>{tripStarts}</h1>
            <h1 className='font-semibold'>Trip Ends</h1>
            <h1 className='text-gray-700'>{tripEnds}</h1>

            <h1 className='mt-2 font-semibold'>Pickup Location</h1>
            <h1 className='text-gray-700'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /> {vehicleData?.pickUpLocation}</h1>

            {
              walletData !== null &&
              <div className='mt-4 '>
                <h1 className='font-semibold'>wallet balance: <span className='text-[#593CFB]'>₹</span>{walletData?.balance}</h1>
                <div><input
                  type="checkbox"
                  name="payUsingWallet"
                  id="payUsingWallet"
                  checked={payUsingWallet}
                  onChange={(e) => setPayUsingWallet(e.target.checked)} /> Pay using Wallet</div>
              </div>
            }
            <button onClick={handleBooking} className='mt-5 mx-auto w-full md:w-auto px-14 py-2 bg-[#593CFB] text-white rounded-md'>Continue</button>
          </div>
        </div>
      </div>
      {notificationBox && <UserNotifications />}
      <ErrorToast error={error} setError={setError} />
    </div>
  )
}

export default CarDetailedPage