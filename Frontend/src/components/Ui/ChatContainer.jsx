// src/components/Chat/ChatContainer.jsx
import React, { useEffect, useRef } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { getChatsFn, setSelectedUserFn } from "../../API/api";
import { sendChats } from "../../slices/chatSlice";
import { formatDate } from "../../lib/utils";
import MessageForm from "./MessageForm";
import { useSocket } from "../../SocketContext/Socket";
import { useNavigate } from "react-router-dom";
import "../../index.css";

const ChatContainer = () => {
  const dispatch         = useDispatch();
  const navigate         = useNavigate();
  const messagesEndRef   = useRef(null);           

  const { selectedUser, chats } = useSelector((state) => state.chat);
  const { user, onlineUsers }   = useSelector((state) => state.auth);

  const { subscribeToMessage, unsubscribeMessage } = useSocket();

  useEffect(() => {
    if (!selectedUser) return;
    getChatsFn(dispatch, selectedUser._id);
  }, [selectedUser, dispatch]);

  
  useEffect(() => {
    if (!selectedUser) return;

    const handleMessage = (msg) => {
    
      if (
        msg.senderId === selectedUser._id ||
        msg.receiverId === selectedUser._id
      ) {
        dispatch(sendChats(msg)); 
      }
    };

    subscribeToMessage(handleMessage);
    return () => unsubscribeMessage(handleMessage);
  }, [selectedUser, subscribeToMessage, unsubscribeMessage, dispatch]);


  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chats]);


  const handleCloseChat = () => {
    setSelectedUserFn(dispatch, null);
    navigate("/");
  };


  return (
    <section className="flex h-[calc(100vh-5rem)] md:h-[calc(100vh-6.1rem)] pt-[7.5rem] hide-scrollbar flex-1 flex-col bg-zinc-900 text-white">

      {/* Top bar */}
      <div className="p-2.5 border-b border-base-300 fixed top-28 left-0 right-0 bg-zinc-900">
        <div className="flex items-center justify-between">
          {/* Avatar */}
          <div className="relative">
            <div className="size-20 rounded-full overflow-hidden">
              <img
                src={selectedUser?.avatar || "/images/avatar.jpg"}
                alt={selectedUser?.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            {onlineUsers?.includes(selectedUser?._id) && (
              <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            )}
          </div>

          {/* Name + email */}
          <div className="space-y-[0.1rem]">
            <h3 className="font-medium">{selectedUser?.name}</h3>
            <p className="text-sm text-zinc-300 truncate">{selectedUser?.email}</p>
          </div>

          {/* Close button */}
          <button onClick={handleCloseChat}>
            <HiOutlineXMark className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Messages list */}
      <ul className="flex flex-col flex-1 overflow-y-auto space-y-4 p-3 mt-4 hide-scrollbar">
        {chats.length ? (
          chats.map((chat) => {
            const isMine = chat.senderId === user._id;
            return (
              <li key={chat._id} className={`flex items-end gap-2 ${isMine ? "justify-end" : "justify-start"}`}>
                {!isMine && (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={selectedUser.avatar || "/images/avatar.jpg"}
                      alt={selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className={`max-w-[75%] py-2 px-5 rounded-lg text-sm ${isMine ? "bg-green-800 text-white rounded-br-none" : "bg-zinc-700 text-white rounded-bl-none"}`}>
                  {chat.text && <p>{chat.text}</p>}
                  {chat.image && (
                    <div className="w-32 h-auto overflow-hidden rounded-lg mt-1">
                      <img src={chat.image} alt="sent" className="w-full h-auto object-cover" />
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

        {/* Sentinel for auto-scroll */}
        <div ref={messagesEndRef} />
      </ul>

      {/* Message input */}
      <MessageForm />
    </section>
  );
};

export default ChatContainer;
