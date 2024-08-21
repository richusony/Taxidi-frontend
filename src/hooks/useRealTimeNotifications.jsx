import { useEffect } from "react";
import { useNotificationSocketContext } from "../contexts/NotificationSocketContext";

const useRealTimeNotifications = (notifications, setNotifications) => {
    const { notificationSocket } = useNotificationSocketContext();

    useEffect(() => {
        notificationSocket?.on("notify", (notification) => {
            console.log("notifications;; ",notification);
            setNotifications(prev => [...prev, notification]);
        });

        return () => { notificationSocket?.off("notify"); }
    }, [notificationSocket, notifications, setNotifications]);
};

export default useRealTimeNotifications;
