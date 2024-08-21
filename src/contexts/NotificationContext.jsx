import { createContext, useState, useContext } from "react";
export const NotificationContext = createContext();

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}

export const NotificationContextProvider = ({ children }) => {
    const [notificationCount, setNotificationCount] = useState(0);
    const [notificationBox, setNotificationBox] = useState(false);


    return (
        <NotificationContext.Provider value={{ notificationBox, setNotificationBox, notificationCount, setNotificationCount }}>
            {children}
        </NotificationContext.Provider>
    )
}