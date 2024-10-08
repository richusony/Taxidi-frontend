import axiosInstance from '../axiosConfig';
import useOnline from '../hooks/useOnline';
import { handleLogOut } from '../utils/helper';
import UpdateUser from '../components/UpdateUser';
import ErrorToast from '../components/ErrorToast';
import AuthContext from '../contexts/AuthContext';
import { isValidLicenseNumber } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import useNotification from '../hooks/useNotification';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import UserNotifications from '../components/UserNotifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LicenseRequestDocuments from '../components/LicenseRequestDocuments';
import { useNotificationContext } from '../contexts/NotificationContext';

const Profile = () => {
    const isOnline = useOnline();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [menu, setMenu] = useState(false);
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [updateBox, setUpdateBox] = useState(false);
    const [updateUser, setUpdateUser] = useState(false);
    const [updateLicense, setUpdateLicense] = useState(false);
    const { notificationBox, setNotificationBox } = useNotificationContext();
    const [formData, setFormData] = useState({
        licenseNumber: null,
        licenseFrontImage: null,
        licenseBackImage: null
    })

    useEffect(() => {
        getUserDetails();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0],
        });
    };

    const getUserDetails = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        try {
            // const res = await axiosInstance.get('/profile');
            // console.log(res);
            setUserData(user);
        } catch (error) {
            console.log(error?.response?.data?.error);
            setError(error?.response?.data?.error);
        }
    };

    const handleMenu = () => setMenu(prev => !prev);

    const handleUpdate = (update) => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        setUpdateBox(true);
        if (update === "update-user") {
            setUpdateUser(true);
        } else {
            setUpdateLicense(true);
        }
    };

    const handleUploadLicense = async (e) => {
        e.preventDefault();

        if (!formData.licenseNumber) {
            window.scrollTo(0, 0);
            setError("Enter License Number");
            return;
        }

        if (!formData.licenseFrontImage || !formData.licenseBackImage) {
            window.scrollTo(0, 0);
            setError("Upload both Front & Back image of the license");
            return;
        }

        if (!isValidLicenseNumber(formData.licenseNumber.trim())) {
            window.scrollTo(0, 0);
            setError("Enter a valid License Number");
            return;
        }

        const formDataToSubmit = new FormData();
        for (const key in formData) {
            formDataToSubmit.append(key, formData[key]);
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND}/upload-driving-license`, {
                method: 'POST',
                credentials: 'include',
                body: formDataToSubmit
            });

            if (res.status == 200) {
                alert("license uploaded");
            }
        } catch (error) {
            window.scrollTo(0, 0);
            setError(error);
        }
    }

    return (
        <div>
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
                                <h1 className='hover:text-[#593CFB] text-lg cursor-pointer' onClick={() => setNotificationBox(true)}>Notifications</h1>
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

            <div className='mt-5 px-5 md:px-10 pb-10'>
                {userData ? (
                    <>
                        <span className='text-sm md:text-base font-semibold'>Profile verification status:</span> <br className='md:hidden' />
                        {userData.licenseNumber === null ? <span className='ml-2 px-2 text-sm md:text-base py-1 bg-red-500 text-white rounded-xl'>Documents upload pending</span> : <span className='ml-2 px-4 py-1 bg-green-500 text-white rounded'>License Verified</span>}
                        {updateUser ? (
                            <UpdateUser userData={userData} setError={setError} userFun={setUpdateUser} />
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
                        {userData.licenseNumber === null ? <div className='mt-10 shadow-md'>
                            <h1 className='py-1 px-2 bg-[#593CFB] text-white rounded-tl rounded-tr'>2. Driving License</h1>
                            <div className='px-5 py-2 border border-[#593CFB] rounded-b-md'>
                                <form onSubmit={handleUploadLicense}>
                                    <div className='flex flex-col'>
                                        <label htmlFor="licenseNumber">Driving License Number</label>
                                        <input type="text" onChange={handleChange} id='licenseNumber' placeholder='Add your license number' name='licenseNumber' className='px-2 py-2 border-2 rounded' />
                                    </div>
                                    <div className='mt-2 grid grid-cols-2 gap-5'>
                                        <div className='flex flex-col'>
                                            <label htmlFor="licenseFrontImage">License front image</label>
                                            <input type="file" onChange={handleFileChange} id='licenseFrontImage' name='licenseFrontImage' className='border-2' />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label htmlFor="licenseBackImage">License back image</label>
                                            <input type="file" onChange={handleFileChange} id='licenseBackImage' name='licenseBackImage' className='border-2' />
                                        </div>
                                    </div>
                                    <div className='mt-5'>
                                        <button type='submit' className='px-4 py-2 bg-[#593CFB] text-white rounded'>UPDATE</button>
                                    </div>
                                </form>
                            </div>
                        </div> : <div className='mt-10 grid grid-rows-2 md:grid-cols-2 gap-y-2 md:gap-y-0'>
                            <LicenseRequestDocuments data={userData} />
                        </div>}
                    </>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <ErrorToast error={error} setError={setError} />
            {notificationBox && <UserNotifications />}
        </div >
    );
};

export default Profile;
