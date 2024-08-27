import { createContext, useState, useEffect, useContext } from "react";
// import { useLoggedInUser } from "./LoggedInUserCnxtProvider";
import io from "socket.io-client"
import AuthContext from "./AuthContext";

export const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children}) =>{
    const [socket, setSocket] = useState(null)
    // const [onlineUsers, setOnlineUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(()=> {
    if(user) {
        const socket = io(`${import.meta.env.VITE_BACKEND}`, {
        query: {
            userId: user.email  
        }        
        })

        setSocket(socket);

        // socket?.on("getOnlineUsers", (users) => {
        //     setOnlineUsers(users);
        // })
    return ()=>socket?.close();
    } else{
        if(socket){
            socket.close();
            setSocket(null);
        }
    }
    },[user])

    return (
        <SocketContext.Provider value={{socket, onlineUsers}}>
            {children}
        </SocketContext.Provider>
        )
}