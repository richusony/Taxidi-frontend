import axiosInstance from '../axiosConfig';
import useOnline from '../hooks/useOnline';
import BecomeHost from '../components/BecomeHost';
import ErrorToast from '../components/ErrorToast';
import React, { useEffect, useState } from 'react';
import DefaultNavbar from '../components/DefaultNavbar';
import { CAR_COLLECTIONS, HOME_BG_IMAGE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';
import UserNotifications from '../components/UserNotifications';
import { useNotificationContext } from '../contexts/NotificationContext';

const Home = () => {
    const isOnline = useOnline();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);
    const {notificationBox} = useNotificationContext();
    const [formData, setFormData] = useState({
        bookingStarts: null,
        bookingEnds: null
    });

    useEffect(() => {
        getAllBrands();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const { bookingStarts, bookingEnds } = formData;
        if (!bookingStarts || !bookingEnds) {
            setError("Please select both start and end date");
            return;
        }
        const startDateTime = new Date(bookingStarts);
        const endDateTime = new Date(bookingEnds);
        const now = new Date();

        if (startDateTime < now || endDateTime < now) {
            setError("Dates cannot be in the past");
            return;
        }

        if ((endDateTime - startDateTime) < (24 * 60 * 60 * 1000)) {
            setError("The time difference between start and end date must be at least 24 hours");
            return;
        }

        try {
            navigate(`/search?tripStarts=${bookingStarts}&tripEnds=${bookingEnds}`);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllBrands = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        try {
            const res = await axiosInstance.get("/brands");
            setBrands(res.data);
        } catch (error) {
            console.error('Error fetching brands:', error);
        }
    };

    const getTodayDateTime = () => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().slice(0, 16);
    };

    const getMinEndDateTime = (startDateTime) => {
        if (!startDateTime) return getTodayDateTime();
        const startDate = new Date(startDateTime);
        startDate.setDate(startDate.getDate() + 1);
        startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
        return startDate.toISOString().slice(0, 16);
    };

    return (
        <div className='overflow-x-hidden'>
            <div className='py-2 bg-[#FBF9F6] text-center'>
                <p className='text-gray-500 text-sm'>Taxidi launched on Kozhikode!!</p>
            </div>

            <DefaultNavbar />

            <div className="h-screen relative">
                <img className='h-full w-full object-cover' src={HOME_BG_IMAGE_URL} alt="" />

                <div className='px-5 py-8 w-10/12 absolute top-10 left-[8%] bg-white rounded-xl flex flex-col md:flex-row justify-between items-center shadow-md'>
                    <div>
                        <h2 className='font-semibold'>Start Date and Time</h2>
                        <div className='mt-2'>
                            <input onChange={handleInputChange} min={getTodayDateTime()} type="datetime-local" id='bookingStarts' name='bookingStarts' placeholder='date and time' className='px-4 py-2 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='mt-4 md:mt-0 md:ml-8'>
                        <h2 className='font-semibold'>End Date and Time</h2>
                        <div className='mt-2'>
                            <input onChange={handleInputChange} min={getMinEndDateTime(formData.bookingStarts)} type="datetime-local" id='bookingEnds' name='bookingEnds' className='px-4 py-2 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='mt-4 md:mt-0 md:ml-8'>
                        <button onClick={handleSearch} className='px-8 py-2 bg-[#593CFB] text-white rounded-lg'>Search</button>
                    </div>
                </div>
            </div>

            <div className='px-10 py-14 text-center'>
                <div className='my-5'>
                    <h1 className='text-3xl font-bold text-gray-700'>Skip the rental car counters</h1>
                    <h3 className='mt-2'>Rent just about any car, just about anywhere</h3>
                </div>
            </div>

            <div className='py-10 md:pr-10 bg-[#E8E6E6] flex flex-col md:flex-row justify-center md:justify-evenly items-center'>
                <div className='w-96 rounded'>
                    <img className='w-full h-full object-cover rounded' src={CAR_COLLECTIONS} alt="car-collections" />
                </div>

                <div className='mt-5 md:mt-0'>
                    <h1 className='text-3xl font-bold text-gray-700'>Explore cars for any <br /> occasion</h1>
                    <p className='mt-3'>Our incredible selection of cars makes it <br />
                        easy to find a ride anytime, anywhere.</p>
                    <button className='mt-3 py-2 px-4 bg-[#593CFB] text-white rounded'>Explore cars</button>
                </div>
            </div>

            <div className='mt-5 px-5 md:px-10 py-5'>
                <h1 className='font-bold text-gray-700 text-xl'>Browse by make</h1>

                <div className='mt-2 mx-auto py-2 px-2 w-[98%] flex overflow-y-hidden overflow-x-scroll hideScrollBar'>
                    {brands.length > 0 && brands.map((brand) => (
                        <div key={brand._id} className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                            <div className='mx-auto h-[80%] w-[80%]'>
                                <img className='w-full h-full rounded-t-md' src={brand?.brandImage} alt="car" />
                            </div>
                            <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>{brand.brandName}</h1>
                        </div>
                    ))}

                    {/* <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div>
                    <div className='mx-2 w-52 h-44 rounded shadow-md flex-shrink-0'>
                        <div>
                            <img className='w-full h-[85%] rounded-t-md' src={HOME_BG_IMAGE_URL} alt="car" />
                        </div>
                        <h1 className='py-2 text-center bg-[#E8E6E6] font-bold rounded-b-md'>Jeep</h1>
                    </div> */}
                </div>
            </div>

            <div className='mt-5 py-2 px-5 flex justify-center items-center'>
                <BecomeHost />
            </div>

            <footer className='mt-10 px-5 md:px-10 py-10 bg-[#F2F1F1] grid grid-cols-3 gap-x-5'>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Location</h1>
                    <div className='mt-5'>
                        <h3>Kasargod</h3>
                        <h3>Kannur</h3>
                        <h3>Kozhikode</h3>
                        <h3>Malapuram</h3>
                        <h3>Kozhikode</h3>
                    </div>
                </div>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Social Media</h1>
                    <div className='mt-5'>
                        <h3>Instagram</h3>
                        <h3>Facebook</h3>
                        <h3>Twitter/X</h3>
                        <h3>Median</h3>
                    </div>
                </div>
                <div className='w-52'>
                    <h1 className='md:text-xl font-bold'>Brands</h1>
                    <div className='mt-5'>
                        <h3>Maruti Suzuki</h3>
                        <h3>Mahindra</h3>
                        <h3>Renault</h3>
                        <h3>Volkswagen</h3>
                        <h3>Toyota</h3>
                        <h3>Hyundai</h3>
                        <h3>Honda</h3>
                    </div>
                </div>
            </footer>
            {notificationBox && <UserNotifications />}
            <ErrorToast error={error} setError={setError} />
        </div>
    )
}

export default Home;
