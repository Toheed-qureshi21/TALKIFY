import React, { useEffect, useRef } from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { getChatsFn, setSelectedUserFn } from '../../API/api';
import { formatDate } from '../../lib/utils';
import MessageForm from './MessageForm';
import '../../index.css';
import { useSocket } from '../../SocketContext/Socket';
import { sendChats } from '../../slices/chatSlice';
import { useNavigate } from 'react-router-dom';

const ChatContainer = () => {
    const { selectedUser, chats} = useSelector((state) => state.chat);
    const { user, onlineUsers } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const messageRef = useRef(null);
    const navigate = useNavigate();


    useEffect(() => {
        if(!selectedUser) return;
        getChatsFn(dispatch, selectedUser?._id);
        console.log(selectedUser);
        
    }, [selectedUser]);
    const { subscribeToMessage, unsubscribeMessage } = useSocket();

    useEffect(() => {
        if (!selectedUser) return;

        const handleMessage = (newMessage) => {
           return dispatch(sendChats(newMessage)) 
           
        };

        subscribeToMessage(handleMessage);

        return () => {
           
            unsubscribeMessage(handleMessage);
        };
    }, [selectedUser, subscribeToMessage, unsubscribeMessage]);
    useEffect(() => {
      
            if (messageRef.current && chats) {
              messageRef.current.scrollIntoView({ behavior: "smooth" });
            
            
        }
      }, [chats]);

      const handleCloseChat = () => {
        setSelectedUserFn(dispatch, null);
        navigate("/");
      }

    return (
        <section className='flex h-[calc(100vh-5rem)] md:h-[calc(100vh-6.1rem)] pt-[7.5rem] hide-scrollbar flex-1 flex-col bg-zinc-900 text-white'>
 
            <div className="p-2.5 border-b border-base-300 fixed top-28 left-0 right-0 bg-zinc-900">
                <div className="flex items-center justify-between">

                    <div className="relative">
                        <div className="size-20 rounded-full overflow-hidden">
                            <img
                                src={selectedUser?.avatar || "/images/avatar.jpg"}
                                alt={selectedUser?.name}
                                className='w-full h-full object-cover rounded-full'
                            />
                        </div>

                        {onlineUsers?.includes(selectedUser?._id) && (
                            <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                        )}
                    </div>

                    <div className='space-y-[0.1rem]'>
                        <h3 className="font-medium">{selectedUser?.name}</h3>
                        <p className='text-sm text-zinc-300 truncate'>{selectedUser?.email}</p>
                    </div>


                    <button onClick={() => handleCloseChat()} >
                        <HiOutlineXMark className='text-2xl' />
                    </button>
                </div>
            </div>


  
            <ul className="flex flex-col flex-1 overflow-y-auto space-y-4 p-3 mt-4 hide-scrollbar">
                {chats.length > 0 ? (
                    chats.map((chat) => {
                        const isSentByUser = chat.senderId === user._id;
                        return (
                            <li ref={messageRef} key={chat._id} className={`flex items-end gap-2 ${isSentByUser ? "justify-end" : "justify-start"}`}>
                                {!isSentByUser && (
                                    <div className="w-10 h-10 rounded-full overflow-hidden">
                                        <img
                                            src={selectedUser.avatar || "/images/avatar.jpg"}
                                            alt={selectedUser.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                <div className={` max-w-[75%] py-2 px-5 rounded-lg text-sm ${isSentByUser ? "bg-green-800 text-white rounded-br-none" : "bg-zinc-700 text-white rounded-bl-none"}`}>
                                    {chat.text && <p>{chat.text}</p>}
                                    {chat.image && (
                                        <div className="w-32 h-auto overflow-hidden rounded-lg mt-1">
                                            <img
                                            src={chat.image}
                                            alt="Sent image"
                                            className="w-full h-auto object-cover"
                                        />
                                        </div>
                                    )}
                                    <div className="text-xs text-zinc-400 mt-1">{formatDate(chat.createdAt)}</div>
                                </div>
                            </li>
                        );
                    })
                ) : (
                    <p className="text-center text-zinc-400 mt-4">No messages yet</p>
                )}
            </ul>
            {/* Chat messages Ends */}

            <MessageForm />
        </section>
    );
}

export default ChatContainer;
