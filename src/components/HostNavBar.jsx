import React from 'react';
import { handleHostLogOut } from '../utils/helper';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const HostNavbar = ({page}) => {
    
    return (
        <nav className='py-3 flex justify-between items-center'>
            <div>
                <h2 className='text-gray-500'>Pages / {page}</h2>
                <h2 className='text-semibold'>{page}</h2>
            </div>

            <div>
                <button onClick={handleHostLogOut} className='py-1 px-4 border border-[#593CFB] rounded text-[#593CFB]'>Logout</button>
                <span className='ml-5 cursor-pointer'><FontAwesomeIcon icon={faGear} /> Settings</span>
            </div>
        </nav >
    )
}

export default HostNavbar