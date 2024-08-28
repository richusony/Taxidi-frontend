import axios from 'axios';
import { Link } from 'react-router-dom';
import useOnline from '../hooks/useOnline';
import { handleLogOut } from '../utils/helper';
import React, { useEffect, useRef, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axiosInstance, { createCancelTokenSource } from '../axiosConfig.js';

const SearchNavbar = ({
    tripStarts,
    tripEnds,
    setAvailableCars,
    startDateFn,
    endDateFn,
    setError,
    setTripStarts,
    setTripEnds,
    selectedBrand,
    selectedBodyType,
    selectedFuel,
    selectedPrice,
    latitude,
    longitude,
    currentPage,
    setCurrentPage,
    setHasMoreCars
}) => {
    const isOnline = useOnline();
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState(null);

    // To hold the cancel token
    const cancelTokenRef = useRef(null);

    useEffect(()=>{
        setAvailableCars([]);
    },[tripStarts,tripEnds]);

    useEffect(() => {
        // getUserDetails();
        getAvailableCars();

        // Cleanup function to cancel the request when the component unmounts
        return () => {
            if (cancelTokenRef.current) {
                cancelTokenRef.current.cancel();
            }
        };
    }, [
        tripStarts,
        tripEnds,
        selectedBrand,
        selectedBodyType,
        selectedFuel,
        selectedPrice,
        latitude,
        longitude,
        currentPage
    ]);

    const handleMenu = () => setMenu(prev => !prev);

    const getAvailableCars = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        if (!tripStarts || !tripEnds) {
            setError("Please select both start and end date");
            return;
        }

        const startDateTime = new Date(tripStarts);
        const endDateTime = new Date(tripEnds);
        const now = new Date();

        if (startDateTime < now || endDateTime < now) {
            setError("Dates cannot be in the past");
            return;
        }

        if ((endDateTime - startDateTime) < (24 * 60 * 60 * 1000)) {
            setError("Booking should be at least 24 hours");
            return;
        }

        if (cancelTokenRef.current) {
            cancelTokenRef.current.cancel("Operation canceled due to new request.");
        }

        // Create a new cancel token
        cancelTokenRef.current = createCancelTokenSource();

        const lat = latitude ?? localStorage.getItem("latitude");
        const long = longitude ?? localStorage.getItem("longitude");

        try {
            console.log("request count")
            const res = await axiosInstance.get(`/get-available-cars?`, {
                params: {
                    brand: selectedBrand,
                    bodyType: selectedBodyType,
                    fuel: selectedFuel,
                    price: selectedPrice,
                    bookingStarts: tripStarts,
                    bookingEnds: tripEnds,
                    latitude: lat,
                    longitude: long,
                    limit: 4,
                    skip: (currentPage - 1) * 4
                },
                cancelToken: cancelTokenRef.current.token,
            });
            console.log(res?.data);
            if (res?.data.length < 4) {
                setHasMoreCars(false); // No more cars to load
            }

            setAvailableCars(prevCars => [...prevCars, ...res?.data]);
            setCurrentPage(currentPage);
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log("Request canceled", error.message);
            } else {
                console.error("Error fetching cars", error);
            }
        }
    }

    return (
        <nav className='px-5 md:px-10 py-2 md:py-5 flex justify-between items-center'>
            <div className='hidden md:block'><Link to="/" className='md:text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>

            <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 text-xs md:text-base'>
                <div className='border-b-2 border-gray-600'>
                    <span className='text-[#593CFB] mr-2'>From</span>
                    <input value={tripStarts} min={startDateFn()} onChange={(e) => setTripStarts(e.target.value)} type="datetime-local" className='outline-none' />
                </div>
                <div className='mt-3 md:mt-0 md:ml-8 border-b-2 pb-1 border-gray-600'>
                    <span className='text-[#593CFB] mr-2'>Until</span>
                    <input value={tripEnds} min={endDateFn(tripStarts)} onChange={(e) => setTripEnds(e.target.value)} type="datetime-local" className='outline-none' />
                </div>
            </div>

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
    )
}

export default SearchNavbar