import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faGear, faGlobe, faList, faUsers } from '@fortawesome/free-solid-svg-icons';

const AdminSideBar = () => {
    const navigate = useNavigate();

    const redirectTo = (url) => {
        navigate(url.trim());
    }
    return (
        <div className='h-screen w-[20%] overflow-y-scroll hideScrollBar scroll-smooth'>
            {/* Heading  */}
            <div className='mt-5 mr-5 pb-2 text-center border-b-2'>
                <Link to="/admin" className='text-2xl font-bold px-5'>Taxid<span className='text-[#593CFB]'>i</span></Link>
            </div>

            <div className='mt-5 text-center'>
                <button className='py-1 px-10 bg-[#593CFB] text-white text-xl rounded'>Dashboard</button>
            </div>

            {/* Manage Bookings */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>MANAGE BOOKINGS</h1>
                <h1 onClick={() => redirectTo("/admin/bookings")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Bookings</span></h1>
                <h1 onClick={() => redirectTo("/admin/booking-history")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Booking History</span></h1>
                <h1 onClick={() => redirectTo("/admin/verify-users")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faUsers} /> <span className='ml-2'>Verify Users</span></h1>
            </div>

            {/* Manage Services */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>MANAGE SERVICES</h1>
                <h1 onClick={() => redirectTo("/admin/brands")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Brands</span></h1>
                <h1 onClick={() => redirectTo("/admin/body-types")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faCar} /> <span className='ml-2'>Body Types</span></h1>
                <h1 onClick={() => redirectTo("/admin/cars")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faCar} /> <span className='ml-2'>Cars</span></h1>
            </div>

            {/* Manage Host */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>MANAGE HOST</h1>
                <h1 onClick={() => redirectTo("/admin/hosts")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Host</span></h1>
                <h1 onClick={() => redirectTo("/admin/host-requests")} className='mb-4 flex items-center cursor-pointer'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList} /> <span className='ml-2'>Host Requests</span></h1>
            </div>

            {/* Manage Site */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>SITE MANAGEMENT</h1>
                <Link to="/admin/social-media" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faGlobe} /> <span className='ml-2'>Social Media</span></Link>
            </div>


            {/* Settings */}
            <div className='mt-10'>
                <Link to="/admin/settings" className='mb-4 flex items-center'><FontAwesomeIcon className='w-6 h-4 p-1 rounded' icon={faGear} /> <span className='ml-2'>Settings</span></Link>
            </div>
        </div>
    )
}

export default AdminSideBar