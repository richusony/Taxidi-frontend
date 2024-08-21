import React, { useState } from 'react'

const useNotification = () => {
    const [notificationBox, setNotificationBox] = useState(false);

    const toggleNotificationBox = () => {
        setNotificationBox(prev => !prev);
    };

    return { notificationBox, toggleNotificationBox };
}

export default useNotification