import { createContext, useState, useEffect, useContext } from "react";
import io from "socket.io-client"
import AuthContext from "./AuthContext";

export const NotificationSocketContext = createContext();

export const useNotificationSocketContext = () => {
    return useContext(NotificationSocketContext);
}

export const NotificationSocketContextProvider = ({ children }) => {
    const [notificationSocket, setNotificationSocket] = useState(null)
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            const socket = io(`${import.meta.env.VITE_BACKEND}`, {
                query: {
                    userId: user._id
                }
            })

            setNotificationSocket(socket);

            // socket?.on("getOnlineUsers", (users) => {
            //     setOnlineUsers(users);
            // })
            return () => socket?.close();
        } else {
            if (notificationSocket) {
                notificationSocket.close();
                setNotificationSocket(null);
            }
        }
    }, [user])

    return (
        <NotificationSocketContext.Provider value={{ notificationSocket }}>
            {children}
        </NotificationSocketContext.Provider>
    )
}