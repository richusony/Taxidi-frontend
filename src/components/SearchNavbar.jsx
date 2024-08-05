import { Link } from 'react-router-dom';
import useOnline from '../hooks/useOnline';
import axiosInstance from '../axiosConfig';
import { handleLogOut } from '../utils/helper';
import React, { useEffect, useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SearchNavbar = ({ tripStarts, tripEnds, setAvailableCars }) => {
    const isOnline = useOnline();
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    

    useEffect(() => {
        getUserDetails();
        getAvailableCars();
    }, []);

    const handleMenu = () => setMenu(prev => !prev);

    const getAvailableCars = async () => {
        try {
            const res = await axiosInstance.get(`/get-available-cars`, {
                params: {
                    bookingStarts: tripStarts,
                    bookingEnds: tripEnds
                }
            });
            console.log(res?.data);
            setAvailableCars(res?.data);
        } catch (error) {
            console.log(error)
        }
    }

    const getUserDetails = async () => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        try {
            const res = await axiosInstance.get('/profile');
            setUserData(res?.data?.user);
            // if (res.status !== 200) window.location.href = "/login";
        } catch (error) {
            // window.location.href = "/login";
            // console.error('Error fetching profile:', error);
        }
    };
    return (
        <nav className='px-10 py-5 flex justify-between'>
            <div><Link to="/" className='text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>

            <div className='flex justify-between'>
                <div className='border-b-2 pb-1 border-gray-600'>
                    <span className='text-[#593CFB] mr-2'>From</span>
                    <input value={tripStarts} type="datetime-local" className='outline-none' />
                </div>
                <div className='ml-8 border-b-2 pb-1 border-gray-600'>
                    <span className='text-[#593CFB] mr-2'>Until</span>
                    <input value={tripEnds} type="datetime-local" className='outline-none' />
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
    )
}

export default SearchNavbar