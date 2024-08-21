import { useEffect } from "react";
import { useNotificationSocketContext } from "../contexts/NotificationSocketContext";
import { useNotificationContext } from "../contexts/NotificationContext";

const useRealTimeNotifications = (notifications, setNotifications) => {
    const { notificationSocket } = useNotificationSocketContext();
    const { setNotificationCount } = useNotificationContext();

    useEffect(() => {
        notificationSocket?.on("notify", (notification) => {
            console.log("notifications;; ", notification);
            setNotifications(prev => [...prev, notification]);
            setNotificationCount(notifications.length);
        });

        return () => { notificationSocket?.off("notify"); }
    }, [notificationSocket, notifications, setNotifications]);
};

export default useRealTimeNotifications;
