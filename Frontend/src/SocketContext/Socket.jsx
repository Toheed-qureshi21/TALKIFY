import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from "../slices/authSlice";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        if (!user) return;

        const newSocket = io("http://localhost:3000", {
            query: { userId: user._id },
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

    return (
        <SocketContext.Provider value={{ socket, subscribeToMessage, unsubscribeMessage }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => useContext(SocketContext);
