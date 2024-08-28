import axiosInstance from '../axiosConfig';
import ErrorToast from '../components/ErrorToast';
import React, { useEffect, useState } from 'react';
import SearchNavbar from '../components/SearchNavbar';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faHeart, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import Map from '../components/Map';

const AvailableCars = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [brands, setBrands] = useState([]);
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [bodyTypes, setBodyTypes] = useState([]);
    const [availableCars, setAvailableCars] = useState(null);

    const [selectedBrand, setSelectedBrand] = useState("None");
    const [selectedBodyType, setSelectedBodyType] = useState("None");
    const [selectedFuel, setSelectedFuel] = useState("None");
    const [selectedPrice, setSelectedPrice] = useState("None");

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    };

    useEffect(() => {
        fetchBrands();
        fetchBodyTypes();
        fetchCoordinates();
    }, []);

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

    const fetchBrands = async () => {
        try {
            const res = await axiosInstance.get("/brands");
            setBrands(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const fetchBodyTypes = async () => {
        try {
            const res = await axiosInstance.get("/body-types");
            setBodyTypes(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeBrand = async () => {
        try {
            const res = await axiosInstance.get("/brands?")
        } catch (error) {
            console.log(error);
        }
    }

    const handleFilterChange = (setter) => (event) => {
        const value = event.target.value;
        setter(value);
    };

    const fetchCoordinates = () => {
        if (navigator.geolocation) {
            navigator?.geolocation.getCurrentPosition(sucess, errorState);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function sucess(position) {
        setLatitude(position?.coords?.latitude)
        setLongitude(position?.coords?.longitude)
        localStorage.setItem("latitude",position?.coords?.latitude);
        localStorage.setItem("longitude",position?.coords?.longitude);
        console.log(position?.coords,latitude,longitude)
    }

    function errorState(error) {
        console.log(error)
    }

    return (
        <div>
            {/* Navbar */}
            <SearchNavbar
                tripStarts={tripStarts}
                setTripStarts={setTripStarts}
                startDateFn={getTodayDateTime}
                tripEnds={tripEnds}
                setTripEnds={setTripEnds}
                endDateFn={getMinEndDateTime}
                setAvailableCars={setAvailableCars}
                setError={setError}
                selectedBrand={selectedBrand}
                selectedBodyType={selectedBodyType}
                selectedFuel={selectedFuel}
                selectedPrice={selectedPrice}
                latitude={latitude}
                longitude={longitude}
            />

            {/* Filters */}
            <div className='border-y-2 px-2 md:px-5 py-2 md:py-3 flex text-sm md:text-base w-screen overflow-x-scroll hideScrollBar'>
                <div className='border-2 border-gray-500 md:px-3 py-1 rounded'>
                    <select className='bg-transparent outline-none' onChange={handleFilterChange(setSelectedBrand)}
                        value={selectedBrand} name="" id="">
                        <option value="None">Brands</option>
                        {brands?.length > 0 && brands.map((brand) => (
                            <option className='' value={brand?._id}>{brand?.brandName}</option>
                        ))}
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select className='bg-transparent outline-none' onChange={handleFilterChange(setSelectedBodyType)}
                        value={selectedBodyType} name="" id="">
                        <option value="None">Body Type</option>
                        {bodyTypes?.length > 0 && bodyTypes.map((body) => (
                            <option className='' value={body?._id}>{body?.bodyType}</option>
                        ))}
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select className='bg-transparent outline-none' onChange={handleFilterChange(setSelectedFuel)}
                        value={selectedFuel} name="" id="">
                        <option value="None">Fuel</option>
                        <option value="petrol">Petrol</option>
                        <option value="diesel">Diesel</option>
                        <option value="electric">EV</option>
                    </select>
                </div>
                <div className='ml-2 border-2 border-gray-500 px-3 py-1 rounded'>
                    <select className='bg-transparent outline-none' onChange={handleFilterChange(setSelectedPrice)}
                        value={selectedPrice} name="" id="">
                        <option value="None">Price</option>
                        <option value="[40,60]">40-60</option>
                        <option value="[70,100]">70-100</option>
                        <option value="[100,150]">100-150</option>
                    </select>
                </div>
            </div>

            {/* Number of Cars Available */}
            <div className='mt-2 px-5'>
                <span className='text-gray-500'>{availableCars && availableCars.length} Cars Available</span>
            </div>

            {/* Cars and Map */}
            <div className='mt-2 px-2 md:px-5 pb-5 flex justify-between'>
                <div className='md:w-[50%] h-[600px] md:h-[500px] overflow-y-scroll hideScrollBar'>
                    {availableCars?.length > 0 ? availableCars.map((car) => (
                        <div onClick={() => navigate(`/car-details/${car.vehicleRegistrationNumber}?startDate=${tripStarts}&endDate=${tripEnds}`)} className='mb-5 border flex justify-between rounded shadow-md'>
                            <div className='my-auto w-[30%] h-24 md:h-44'><img className='w-full h-full object-cover rounded' src={car.vehicleImages[0]} alt="car-image" /></div>

                            <div className='w-[70%] px-5'>
                                <div className='mt-2 flex justify-between gap-x-2 items-center w-full'><h1 className='text-sm md:text-xl font-semibold'>{`${car.brand?.brandName + " " + car.model}`.length > 15 ? `${car.brand?.brandName + " " + car.model}`.substring(0, 15) + "..." : car.brand?.brandName + " " + car.model}</h1> <h1><FontAwesomeIcon className='text-[#593CFB] text-xl' icon={faHeart} /></h1></div>
                                <div className='my-2 text-sm md:text-base'> <span className='text-gray-600'>5.0 <FontAwesomeIcon className='text-[#593CFB]' icon={faStar} /></span> <span>(33 trips)</span></div>
                                <div className='my-2 text-sm md:text-base'> <span className='text-gray-600'><FontAwesomeIcon className='text-[#593CFB]' icon={faLocationDot} /></span> Pickup at Thaliparamba</div>
                                <div className=''>
                                    <h1 className='text-end text-sm md:text-base'>₹{car?.rent}/hour</h1>
                                </div>
                            </div>

                        </div>)) : <h1 className='text-center'>No Cars available</h1>}
                </div>

                {/* map */}
                <div className='hidden md:block md:ml-4 md:w-[50%]'>
                    {longitude ? <Map latitude={latitude} longitude={longitude} vehicles={availableCars} /> : <h1 className='my-auto text-center'>Allow location for showing nearby vehicles</h1>}
                </div>
            </div>
            <ErrorToast setError={setError} error={error} />
        </div>
    )
}

export default AvailableCars