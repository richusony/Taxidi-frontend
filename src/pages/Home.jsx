import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HOME_BG_IMAGE_URL } from '../constants'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Home = () => {
    const [menu, setMenu] = useState(false);
    const handleMenu = () => setMenu(prev => !prev);
    return (
        <div className='overflow-x-hidden'>
            {/* Announcements */}
            <div className='py-2 bg-[#FBF9F6] text-center'>
                <p className='text-gray-500 text-sm'>Taxidi launched on Kozhikode!!</p>
            </div>

            {/* Navbar  */}
            <nav className='px-10 py-5 flex justify-between'>
                <div><Link to="/" className='text-2xl font-bold'>Taxid<span className='text-[#593CFB]'>i</span></Link></div>

                <div className='flex items-center'>
                    <button className='mr-4 px-4 py-1 border-2 border-gray-500'>Become a host</button>
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
                            <div className='my-4'>
                                <Link className='hover:text-[#593CFB] text-lg' to="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Date selection */}
            <div className="h-screen relative">
                <img className='h-full w-full object-cover' src={HOME_BG_IMAGE_URL} alt="" />

                <div className='px-5 py-8 w-10/12 absolute top-10 left-[8%] bg-white rounded-xl flex justify-between items-center shadow-md'>
                    <div>
                        <h2 className='font-semibold'>Start Date and Time</h2>
                        <div className='mt-2'>
                            <input type="datetime-local" className='px-4 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='ml-8'>
                        <h2 className='font-semibold'>End Date and Time</h2>
                        <div className='mt-2'>
                            <input type="datetime-local" className='px-4 outline-none border-2 rounded' />
                        </div>
                    </div>

                    <div className='ml-8'>
                        <button className='px-8 py-2 bg-[#593CFB] text-white rounded-lg'>Search</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home