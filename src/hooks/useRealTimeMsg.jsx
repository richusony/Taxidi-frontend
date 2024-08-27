import { useEffect } from "react";
import { useSocketContext } from "../contexts/SocketContext";
// import notificationSound from "../assets/sounds/ElevenLabs_2024-04-10T04_49_24_Matilda.mp3";

const useRealTimeMsg = (messages, setMessages) => {
  const { socket } = useSocketContext();

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      // const sound = new Audio(notificationSound);
      // sound.play();
      console.log(newMessage);

      // Update messages state
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    socket?.on("newMessage", handleNewMessage);

    // Cleanup function to remove the listener
    return () => {
      socket?.off("newMessage", handleNewMessage);
    };
  }, [socket]); // Remove `messages` from dependency array
};

export default useRealTimeMsg;
