import React, { useState } from 'react';
import ErrorToast from '../components/ErrorToast';
import SearchNavbar from '../components/SearchNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';

const AvailableCars = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [availableCars, setAvailableCars] = useState(null);
    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    const query = useQuery();
    // setTripStarts(query.get('tripStarts'));
    // setTripEnds(query.get('tripEnds'));
    const [tripEnds, setTripEnds] = useState(query.get('tripEnds'));
    const [tripStarts, setTripStarts] = useState(query.get('tripStarts'));
    console.log(tripStarts, tripEnds);

    // Get current date in the format 'YYYY-MM-DDTHH:MM'
    const getTodayDateTime = () => {
        const today = new Date();
        today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
        return today.toISOString().slice(0, 16);
    };

    // Get the date and time one day after the provided date
    const getMinEndDateTime = (startDateTime) => {
        if (!startDateTime) return getTodayDateTime();
        const startDate = new Date(startDateTime);
        startDate.setDate(startDate.getDate() + 1);
        startDate.setMinutes(startDate.getMinutes() - startDate.getTimezoneOffset());
        return startDate.toISOString().slice(0, 16);
    };

    const handleSearch = (e) => {
        e.preventDefault();

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
            setError("The time difference between start and end date must be at least 24 hours");
            return;
        }

        try {
            navigate(`/search?tripStarts=${tripStarts}&tripEnds=${tripEnds}`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            {/* Navbar */}
            <SearchNavbar tripStarts={tripStarts} setTripStarts={setTripStarts} startDateFn={getTodayDateTime} tripEnds={tripEnds} setTripEnds={setTripEnds} endDateFn={getMinEndDateTime} setAvailableCars={setAvailableCars} setError={setError} />

            {/* Filters */}
            <div className='border-y-2 px-5 py-3 flex'>
                <div className='border-2 border-gray-500 px-3 py-1 rounded'>
                    <select name="" id="">
                        <option value="None">Brands</option>
                        <option value="bmw">BMW</option>
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select name="" id="">
                        <option value="None">Body Type</option>
                        <option value="bmw">BMW</option>
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select name="" id="">
                        <option value="None">Fuel</option>
                        <option value="bmw">BMW</option>
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select name="" id="">
                        <option value="None">Price</option>
                        <option value="bmw">BMW</option>
                    </select>
                </div>
            </div>

            {/* Number of Cars Available */}
            <div className='mt-2 px-5'>
                <span className='text-gray-500'>10 Cars Available</span>
            </div>

            {/* Cars and Map */}
            <div className='mt-2 px-5 pb-5 flex justify-between'>
                <div className='md:w-[50] h-[500px] overflow-y-scroll hideScrollBar'>
                    {availableCars ? availableCars.map((car) => (
                        <div onClick={() => navigate(`/car-details/${car.vehicleRegistrationNumber}?startDate=${tripStarts}&endDate=${tripEnds}`)} className='mb-5 border flex justify-between rounded shadow-md'>
                            <div className='w-[30%] h-44'><img className='w-full h-full object-cover rounded' src={car.vehicleImages[0]} alt="car-image" /></div>

                            <div className='w-[70%] px-5'>
                                <div className='mt-2 flex justify-between items-center w-full'><h1 className='text-xl font-semibold'>{car.brand?.brandName + " " + car.model}</h1> <h1><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faHeart} /></h1></div>
                                <div className='my-2'> <span className='text-gray-600'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span> <span>(33 trips)</span></div>
                                <div className='my-2'> <span className='text-gray-600'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /></span> Pickup at Thaliparamba</div>
                                <div className=''>
                                    <h1 className='text-end'>₹{car?.rent}/hour</h1>
                                </div>
                            </div>

                        </div>)) : <h1>No Cars available</h1>}
                    <div className='mb-5 border flex justify-between rounded shadow-md'>
                        <div className='w-[30%] h-full'><img className='w-full h-full object-cover rounded' src="https://img.freepik.com/premium-photo/3d-new-black-bmw-car_1131377-434.jpg?size=626&ext=jpg" alt="" /></div>

                        <div className='w-[70%] px-5'>
                            <div className='mt-2 flex justify-between items-center w-full'><h1 className='text-xl font-semibold'>Maruti Swift Desire</h1> <h1><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faHeart} /></h1></div>
                            <div className='my-2'> <span className='text-gray-600'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span> <span>(33 trips)</span></div>
                            <div className='my-2 text-gray-600'> <span className=''><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /></span> Pickup at Thaliparamba</div>
                            <div className=''>
                                <h1 className='text-end'>₹450/hour</h1>
                            </div>
                        </div>

                    </div>
                    <div className='mb-5 border flex justify-between rounded shadow-md'>
                        <div className='w-[30%] h-full'><img className='w-full h-full object-cover rounded' src="https://img.freepik.com/premium-photo/3d-new-black-bmw-car_1131377-434.jpg?size=626&ext=jpg" alt="" /></div>

                        <div className='w-[70%] px-5'>
                            <div className='mt-2 flex justify-between items-center w-full'><h1 className='text-xl font-semibold'>Maruti Swift Desire</h1> <h1><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faHeart} /></h1></div>
                            <div className='my-2'> <span className='text-gray-600'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span> <span>(33 trips)</span></div>
                            <div className='my-2'> <span className='text-gray-600'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /></span> Pickup at Thaliparamba</div>
                            <div className=''>
                                <h1 className='text-end'>₹450/hour</h1>
                            </div>
                        </div>

                    </div>
                    <div className='mb-5 border flex justify-between rounded shadow-md'>
                        <div className='w-[30%] h-full'><img className='w-full h-full object-cover rounded' src="https://img.freepik.com/premium-photo/3d-new-black-bmw-car_1131377-434.jpg?size=626&ext=jpg" alt="" /></div>

                        <div className='w-[70%] px-5'>
                            <div className='mt-2 flex justify-between items-center w-full'><h1 className='text-xl font-semibold'>Maruti Swift Desire</h1> <h1><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faHeart} /></h1></div>
                            <div className='my-2'> <span className='text-gray-600'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span> <span>(33 trips)</span></div>
                            <div className='my-2'> <span className='text-gray-600'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /></span> Pickup at Thaliparamba</div>
                            <div className=''>
                                <h1 className='text-end'>₹450/hour</h1>
                            </div>
                        </div>

                    </div>
                </div>

                {/* map */}
                <div className='hidden md:block md:ml-4 md:w-[50%]'>
                    <img className='w-full h-full object-cover rounded' src="https://thumbs.dreamstime.com/b/south-coast-england-map-13987361.jpg" alt="" />
                </div>
            </div>
            <ErrorToast setError={setError} error={error} />
        </div>
    )
}

export default AvailableCars