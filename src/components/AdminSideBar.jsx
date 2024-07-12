import { faCar, faGear, faGlobe, faList, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

const AdminSideBar = () => {
  return (
    <div className='w-[20%]'>
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
                <Link to="/admin/bookings" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList}/> <span className='ml-2'>Bookings</span></Link>
                <Link to="/admin/booking-history" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList}/> <span className='ml-2'>Booking History</span></Link>
                <Link to="/admin/verify-users" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faUsers}/> <span className='ml-2'>Verify Users</span></Link>
            </div>

            {/* Manage Services */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>MANAGE SERVICES</h1>
                <Link to="/admin/brands" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faList}/> <span className='ml-2'>Brands</span></Link>
                <Link to="/admin/body-types" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faCar}/> <span className='ml-2'>Body Types</span></Link>
                <Link to="/admin/cars" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faCar}/> <span className='ml-2'>Cars</span></Link>
            </div>

            {/* Manage Site */}
            <div className='mt-5'>
                <h1 className='my-5 text-xl text-gray-400 font-semibold'>SITE MANAGEMENT</h1>
                <Link to="/admin/social-media" className='mb-4 flex items-center'><FontAwesomeIcon className='bg-white w-6 h-4 p-1 rounded' icon={faGlobe}/> <span className='ml-2'>Social Media</span></Link>
            </div>


            {/* Settings */}
            <div className='mt-10'>
                <Link to="/admin/settings" className='mb-4 flex items-center'><FontAwesomeIcon className='w-6 h-4 p-1 rounded' icon={faGear}/> <span className='ml-2'>Settings</span></Link>
            </div>
        </div>
  )
}

export default AdminSideBar