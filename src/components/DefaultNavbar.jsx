import { Link } from 'react-router-dom';
import useOnline from '../hooks/useOnline';
import { handleLogOut } from '../utils/helper';
import AuthContext from '../contexts/AuthContext';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNotificationContext } from '../contexts/NotificationContext';

const DefaultNavbar = () => {
    const isOnline = useOnline();
    const { user } = useContext(AuthContext);
    const [menu, setMenu] = useState(false);
    const [userData, setUserData] = useState(null);
    const { setNotificationBox, notificationCount } = useNotificationContext();

    const handleMenu = () => setMenu(prev => !prev);

    return (
        <nav className='px-5 md:px-10 py-5 flex justify-between'>
            <div><Link to="/" className='text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>

            <div className='flex items-center'>
                {/* <button className='mr-5'><FontAwesomeIcon icon={faBell} /></button> */}
                <Link to="/become-host" className='mr-4 px-4 py-1 border-2 border-gray-500'>Become a host</Link>
                <div className='relative'>
                    <FontAwesomeIcon className='text-2xl cursor-pointer' onClick={handleMenu} icon={faBars} />
                    <div className={`${menu ? 'absolute' : 'hidden'} top-14 right-0 w-48 px-5 py-2 z-10 bg-white rounded shadow-md border`}>
                        <div className='my-4'>
                            <Link className='hover:text-[#593CFB] text-lg' to="/profile">Profile</Link>
                        </div>
                        <div className='my-4'>
                            <Link className='relative hover:text-[#593CFB] text-lg' to="#" onClick={() => setNotificationBox(true)}>{notificationCount > 0 ? <span className='absolute top-1 -right-5 px-1 text-xs bg-[#593CFB] text-white rounded-full'>{notificationCount}</span> : ""}Notifications</Link>
                        </div>
                        <div className='my-4'>
                            <Link className='hover:text-[#593CFB] text-lg' to="/wallet">Wallet</Link>
                        </div>
                        <div className='my-4'>
                            <Link className='hover:text-[#593CFB] text-lg' to="/my-bookings">Bookings</Link>
                        </div>
                        {user ? <div className='my-4'>
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

export default DefaultNavbar