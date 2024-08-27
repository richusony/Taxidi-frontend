import { useEffect } from "react";
import { useNotificationContext } from "../contexts/NotificationContext";
import { useNotificationSocketContext } from "../contexts/NotificationSocketContext";

const useRealTimeNotifications = (notifications, setNotifications) => {
    const { setNotificationCount } = useNotificationContext();
    const { notificationSocket } = useNotificationSocketContext();

    useEffect(() => {
        notificationSocket?.on("notify", (notification) => {
            console.log("notifications;; ", notification);
            setNotifications(prev => [...prev, notification]);
            setNotificationCount(prev => prev + 1);
        });

        return () => { notificationSocket?.off("notify"); }
    }, [notificationSocket]);
};

export default useRealTimeNotifications;
