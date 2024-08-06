import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminSideBar from '../../components/AdminSideBar'
import axios from 'axios'
import useOnline from '../../hooks/useOnline.jsx';
import ErrorToast from "../../components/ErrorToast.jsx";
import HostSideBar from '../../components/HostSideBar.jsx'
import HostNavbar from '../../components/HostNavBar.jsx'
import { faCar, faGear, faGlobe, faList, faUsers } from '@fortawesome/free-solid-svg-icons'
import { validateHost } from '../../utils/helper.js'

const HostDashboard = () => {
    const isOnline = useOnline();
    const [error, setError] = useState("");
    const [page, setPage] = useState("Dashboard");

    useEffect(() => {
        if (!isOnline) {
            setError("You are offline");
            return;
        }

        // validateHost();
    }, [])

    return (
        <div className='px-5 pb-5 bg-[#EDEDED] flex'>
            <HostSideBar />

            <div className='w-[80%]'>
                {/* Navbar  */}
                <HostNavbar page={page} />

                {/* Cards  */}
                <div className='mt-10 grid grid-cols-4 gap-5'>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Today's Booking</h1>
                        <h2>0</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Brands</h1>
                        <h2>9</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Body Types</h1>
                        <h2>4</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Cars</h1>
                        <h2>5</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Hosts</h1>
                        <h2>4</h2>
                    </div>
                    <div className='px-4 py-3 w-44 bg-white rounded-md shadow-md'>
                        <h1 className='mb-1 font-semibold'>Total Social Media</h1>
                        <h2>3</h2>
                    </div>

                </div>
            </div>
            <ErrorToast error={error} setError={setError}/>
        </div>
    )
}

export default HostDashboard