import moment from "moment";
import axiosInstance from '../axiosConfig'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNotificationContext } from '../contexts/NotificationContext'
import useRealTimeNotifications from "../hooks/useRealTimeNotifications";

const UserNotifications = () => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [notifications, setNotifications] = useState([]);
    const { setNotificationBox } = useNotificationContext();
    const [realTimeNotifications, setRealTimeNotifications] = useState([]);

    useEffect(() => {
        if (!user || user == null) {
            setNotificationBox(false);
            navigate("/login");
        }
        fetchAllNotifications();
    }, []);

    const fetchAllNotifications = async () => {
        try {
            const res = await axiosInstance.get("/notifications");
            setRealTimeNotifications([]);
            setNotifications(res?.data);
        } catch (error) {
            console.log(error);
        }
    }

    useRealTimeNotifications(realTimeNotifications, setRealTimeNotifications);

    return (
        <div className='absolute top-0 right-0 h-screen w-full bg-black flex justify-center items-center bg-opacity-50 z-50'>
            <div className='px-4 py-4 bg-white md:w-1/2 h-1/2 rounded-xl overflow-hidden'>
                <div className='mb-2 relative flex justify-center items-center'>
                    <h1 className='font-bold text-center'>Notifications</h1>
                    <FontAwesomeIcon className='absolute right-0 text-xl cursor-pointer' onClick={() => setNotificationBox(false)} icon={faClose} />
                </div>

                <div className='pb-4 h-full overflow-y-scroll hideScrollBar'>
                    {realTimeNotifications.length > 0 && realTimeNotifications.map((notify, index) => (
                        <div key={"notification" + index} className='mb-2 px-4 py-4 bg-gray-200 rounded flex justify-between items-center gap-x-2 shadow-md'>
                            <p className='text-gray-800 text-sm w-[90%]'>{notify}</p>
                            <span className='text-gray-500 text-xs w-[10%]'>{"just now"}</span>
                        </div>
                    ))}
                    {notifications.length > 0 ? notifications.map((notify) => (
                        <div key={notify._id} className='mb-2 px-4 py-4 bg-gray-200 rounded flex justify-between items-center gap-x-2 shadow-md'>
                            <p className='text-gray-800 text-sm w-[90%]'>{notify.context}</p>
                            <span className='text-gray-500 text-xs w-[10%]'>{moment(notify.createdAt).format("MMM DD, YYYY")}</span>
                        </div>
                    )) : <h1 className="text-center text-gray-600">No notifications yet</h1>}
                </div>
            </div>
        </div>
    )
}

export default UserNotifications