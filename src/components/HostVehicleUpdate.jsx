import { faClose, faLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import axiosInstance from '../axiosConfig';
import axios from 'axios';

const HostVehicleUpdate = ({ setVehicleUpdateBox, vehicleData, role }) => {
    const [longitude, setLongitude] = useState(null);
    const [latitude, setLatitude] = useState(null);
    const [currentAddress, setCurrentAddress] = useState("");
    const [formData, setFormData] = useState({
        vehicleId: vehicleData?._id,
        mileage: vehicleData?.mileage,
        seats: vehicleData?.seats,
        color: vehicleData?.color,
        rent: vehicleData?.rent,
        city: vehicleData?.city,
        pincode: vehicleData?.pincode,
        pickUpLocation: vehicleData?.pickUpLocation,
        latitude: vehicleData?.latitude,
        longitude: vehicleData?.longitude,
        lastServiceDate: vehicleData?.lastServiceDate,
        locationText: vehicleData?.locationText
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const fetchCoordinates = (e) => {
        e.preventDefault();
        if (navigator.geolocation) {
            navigator?.geolocation.getCurrentPosition(sucess, errorState);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    }

    function sucess(position) {
        const lat = position?.coords?.latitude;
        const lon = position?.coords?.longitude
        setLatitude(lat);
        setLongitude(lon)
        // console.log(latitude,logitude)
        fetchAddressFromCoordinates(lat, lon);
    }

    function errorState(error) {
        console.log(error)
    }

    const fetchAddressFromCoordinates = async (latitude, longitude) => {
        const apiKey = import.meta.env.VITE_GEO_LOCATION_API;
        try {
            const res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=${apiKey}&q=${latitude},${longitude}`);
            const address = res?.data?.results[0]?.formatted;
            setCurrentAddress(address);
            setFormData({
                ...formData,
                latitude:latitude,
                longitude:longitude,
                locationText:address.trim()
            })
            // console.log(res?.data?.results[0]?.formatted);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdateVehicle = async () => {
        console.log(formData);
        try {
            const res = await axiosInstance.patch(`/${role}/update-vehicle`, formData);
            // console.log(res);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='absolute right-0 h-screen w-full bg-black bg-opacity-50 flex justify-center items-center'>
            <div className='px-4 py-4 bg-white rounded-xl shadow-md'>
                <div className='mb-5 relative flex justify-center items-center'>
                    <h1 className='text-center font-semibold'>Update Vehicle Info</h1>
                    <FontAwesomeIcon onClick={() => setVehicleUpdateBox(false)} className='absolute right-0 text-lg cursor-pointer' icon={faClose} />
                </div>

                <form className='grid grid-cols-3 gap-5'>
                    <div key={"formInput#3"} className='flex flex-col'>
                        <label htmlFor="color">Colour</label>
                        <input onChange={handleInputChange} type="text" value={vehicleData?.color} id='color' placeholder='eg: Coffie-Brown' name='color' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#7"} className='flex flex-col'>
                        <label htmlFor="seats">No.Seats</label>
                        <select value={vehicleData?.seats} onChange={handleInputChange} name="seats" id="seats" className='border-2  px-2 py-1 rounded'>
                            <option value="none">None</option>
                            <option className='' value="2">Two-Seater</option>
                            <option className='' value="4">Four-Seater</option>
                            <option className='' value="5">Five-Seater</option>
                            <option className='' value="6">Six-Seater</option>
                            <option className='' value="7">Seven-Seater</option>
                            <option className='' value="8">Eight-Seater</option>
                            <option className='' value="9">Nine-Seater</option>
                        </select>
                        {/* <input type="text" id='seats' name='seats' className='border-2  px-2 py-1 rounded' /> */}
                    </div>
                    <div key={"formInput#9"} className='flex flex-col'>
                        <label htmlFor="city">City</label>
                        <input onChange={handleInputChange} type="text" value={vehicleData?.city} id='city' name='city' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#219"} className='flex flex-col'>
                        <label htmlFor="pincode">Pincode</label>
                        <input onChange={handleInputChange} type="tel" value={vehicleData?.pincode} id='pincode' name='pincode' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#239"} className='flex flex-col'>
                        <label htmlFor="pickUpLocation">Pick Up Locaton</label>
                        <input onChange={handleInputChange} type="text" value={vehicleData?.pickUpLocation} id='pickUpLocation' name='pickUpLocation' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#10"} className='flex flex-col'>
                        <label htmlFor="mileage">Mileage</label>
                        <input onChange={handleInputChange} type="tel" value={vehicleData?.mileage} id='mileage' placeholder='km/L' name='mileage' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#12"} className='flex flex-col'>
                        <label htmlFor="rent">Rent</label>
                        <input onChange={handleInputChange} type="tel" value={vehicleData?.rent} id='rent' name='rent' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#13"} className='flex flex-col'>
                        <label htmlFor="lastServiceDate">Last Service</label>
                        <input onChange={handleInputChange} type="date" value={vehicleData?.lastServiceDate} id='lastServiceDate' name='lastServiceDate' className='border-2  px-2 py-1 rounded' />
                    </div>
                    <div key={"formInput#14"} className='flex flex-col'>
                        <label htmlFor="lastServiceDate">Map Coordinates</label>
                        {longitude ? <input onChange={handleInputChange} type="text" value={latitude + ", " + longitude} id='locationText' name='locationText' className='border-2  px-2 py-1 rounded' /> :
                            <button type='button' onClick={fetchCoordinates} className='px-4 py-2 bg-[#593CFB] text-white rounded shadow-md'>Get Location <FontAwesomeIcon icon={faLocation} /></button>}
                    </div>
                </form>
                <div className='mt-5 text-center'>
                    <button onClick={handleUpdateVehicle} className='px-4 py-2 bg-[#593CFB] text-white rounded shadow-md'>Update</button>
                </div>
            </div>
        </div>
    )
}

export default HostVehicleUpdate