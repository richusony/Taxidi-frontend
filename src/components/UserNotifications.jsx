import React from 'react'
import useNotification from '../hooks/useNotification'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const UserNotifications = ({setNotificationBox}) => {
    // const {notificationBox,  } = useNotification();
    return (
        <div className='absolute top-0 right-0 h-screen w-full bg-black flex justify-center items-center bg-opacity-50 z-50'>
            <div className='px-4 py-4 bg-white w-1/2 h-1/2 rounded-xl'>
                <div className='relative flex justify-center items-center'>
                    <h1 className='font-bold text-center'>Notifications</h1>
                    <FontAwesomeIcon className='absolute right-0 text-xl cursor-pointer' onClick={() => setNotificationBox(false)} icon={faClose} />
                </div>
            </div>
        </div>
    )
}

export default UserNotifications