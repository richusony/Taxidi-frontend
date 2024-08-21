import { createContext, useState, useContext } from "react";
export const NotificationContext = createContext();

export const useNotificationContext = () => {
    return useContext(NotificationContext);
}

export const NotificationContextProvider = ({ children }) => {
    const [notificationBox, setNotificationBox] = useState(false);


    return (
        <NotificationContext.Provider value={{ notificationBox, setNotificationBox }}>
            {children}
        </NotificationContext.Provider>
    )
}