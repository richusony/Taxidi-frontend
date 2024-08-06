import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faGear, faGlobe, faList, faUsers, faWallet } from '@fortawesome/free-solid-svg-icons';

const HostSideBar = () => {
    const navigate = useNavigate();

    const redirectTo = (url) => {
        navigate(url.trim());
    }
    return (
        <div className='w-[20%] min-h-screen'>
            {/* Heading  */}
            <div className='mt-5 mr-5 pb-2 text-center border-b-2'>
                <Link to="/host" className='text-2xl font-bold px-5'>Taxid<span className='text-[#593CFB]'>i</span></Link>
            </div>

            <div className='mt-5 text-center'>
                <button className='py-1 px-10 bg-[#593CFB] text-white text-xl rounded'>Dashboard</button>
            </div>

            {/* Manage Bookings */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>MANAGE SERVICES</h1>
                <h1 onClick={() => redirectTo("/host/profile")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faUser} /> <span className='ml-2'>Profile</span></h1>
                <h1 onClick={() => redirectTo("/host/bookings")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Bookings</span></h1>
                <h1 onClick={() => redirectTo("/host/booking-history")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Booking History</span></h1>
                <h1 onClick={() => redirectTo("/host/wallet")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faWallet} /> <span className='ml-2'>Wallet</span></h1>
                <h1 onClick={() => redirectTo("/host/my-vehicles")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faUsers} /> <span className='ml-2'>My Vehicles</span></h1>
            </div>

        </div>
    )
}

export default HostSideBar