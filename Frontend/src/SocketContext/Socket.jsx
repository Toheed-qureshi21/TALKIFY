import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "../slices/authSlice";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    const backendUrl = import.meta.env.VITE_SERVER_URL;

    useEffect(() => {
        if (!user) return;

        const newSocket = io(backendUrl, {
            query: { userId: user._id },
            transports: ["websocket"],
            withCredentials: true,
        });

        setSocket(newSocket);

        newSocket.on("getOnlineUsers", (userIds) => {
            dispatch(setOnlineUsers(userIds));
        });

        return () => {
            newSocket.disconnect();
        };
    }, [user, dispatch]);

    const subscribeToMessage = (callback) => {
        if (!socket) return;
        socket.on("newMessage", callback);
    };

    const unsubscribeMessage = (callback) => {
        if (!socket) return;
        socket.off("newMessage", callback);
    };
    const sendMessage = (receiverId, message) => {
    if (!socket) return;
    socket.emit("sendMessage", { receiverId, message });
};


    return (
        <SocketContext.Provider value={{ socket, subscribeToMessage, unsubscribeMessage,sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
