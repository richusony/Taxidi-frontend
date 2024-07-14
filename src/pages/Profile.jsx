import { Link } from 'react-router-dom';
import axiosInstance from '../axiosConfig';
import { handleLogOut } from '../utils/helper';
import UpdateUser from '../components/UpdateUser';
import ErrorToast from '../components/ErrorToast';
import React, { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Profile = () => {
    const [error, setError] = useState("");
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const [updateBox, setUpdateBox] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [updateLicense, setUpdateLicense] = useState(false);

    useEffect(() => {
        getUserDetails();
    }, []);

    const getUserDetails = async () => {
        try {
            const res = await axiosInstance.get('/profile');
            setUserData(res.data.user);
            if (res.status !== 200) window.location.href = "/login";
        } catch (error) {
            window.location.href = "/login";
            console.error('Error fetching profile:', error);
        }
    };

    const handleMenu = () => setMenu(prev => !prev);

    const handleUpdate = (update) => {
        setUpdateBox(true);
        if (update === "update-user") {
            setUpdateUser(true);
        } else {
            setUpdateLicense(true);
        }
    };

    return (
        <div>
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

            <div className='mt-5 px-10 pb-10'>
                {userData ? (
                    <>
                        <span className='font-semibold'>Profile verification status:</span>
                        <span className='px-2 py-1 bg-red-500 text-white rounded-xl'>Documents upload pending</span>
                        {updateUser ? (
                            <UpdateUser userData={userData} userFun={setUpdateUser} />
                        ) : (
                            <div className='mt-5 shadow-md'>
                                <h1 className='py-1 px-2 bg-[#593CFB] text-white rounded-tl rounded-tr'>1. Basic Information</h1>
                                <div className='px-5 py-2 border border-[#593CFB] grid grid-cols-2 gap-5 rounded-b-md'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" disabled id='firstName' value={userData.firstName || ''} name='firstName' className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="secondName">Second Name</label>
                                        <input type="text" disabled id='secondName' value={userData.secondName || ''} name='secondName' className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" disabled id='email' value={userData.email || ''} name='email' className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="phone">Phone Number</label>
                                        <input type="tel" disabled id='phone' value={userData.phone || ''} name='phone' className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="city">City</label>
                                        <input type="text" disabled id='city' name='city' value={userData.city || ''} className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="pincode">Pincode</label>
                                        <input type="text" disabled id='pincode' name='pincode' value={userData.pincode || ''} className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div>
                                        <button onClick={() => handleUpdate('update-user')} className='px-4 py-2 bg-[#593CFB] text-white rounded'>CHANGE</button>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className='mt-10 shadow-md'>
                            <h1 className='py-1 px-2 bg-[#593CFB] text-white rounded-tl rounded-tr'>2. Driving License</h1>
                            <div className='px-5 py-2 border border-[#593CFB] rounded-b-md'>
                                <div className='flex flex-col'>
                                    <label htmlFor="licenseNumber">Driving License Number</label>
                                    <input type="text" id='licenseNumber' placeholder='Add your license number' name='licenseNumber' className='px-2 py-2 border-2 rounded' />
                                </div>
                                <div className='mt-2 grid grid-cols-2 gap-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="drivingLicenseFront">License front image</label>
                                        <input type="file" id='drivingLicenseFront' name='drivingLicenseFront' className='border-2' />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="drivingLicenseBack">License back image</label>
                                        <input type="file" id='drivingLicenseBack' name='drivingLicenseBack' className='border-2' />
                                    </div>
                                </div>
                                <div className='mt-5'>
                                    <button className='px-4 py-2 bg-[#593CFB] text-white rounded'>UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <ErrorToast error={error} setError={setError} />
        </div>
    );
};

export default Profile;
