import React, { useState } from 'react'
import { HiUsers } from "react-icons/hi2";
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFn, setSelectedUserFn } from '../../API/api';
import { useEffect } from 'react';
import { UserSkeletons } from '../Skeletons/UserSkeletons';
import { NavLink } from 'react-router-dom';

const SideComponent = () => {
    const { users, isUserLoading, error, selectedUser} = useSelector((state) => state.chat);
    const {onlineUsers} = useSelector((state)=>state.auth);
    const [showOnlineUsers, setShowOnlineUsers] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        getUsersFn(dispatch);
    }, [dispatch]);

    if (error) {
        return <div className='text-red-500'>{error}</div>
    }
    const filteredUsers = showOnlineUsers
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

    return (
        <aside className='max-sm:w-full w-[30rem] flex flex-col bg-zinc-900/90  h-full'>
            <div className="w-full border-b h-full pt-2 px-4 ">
                <div className="flex items-center gap-2">
                    <HiUsers />
                    <span className='font-medium hidden lg:block'>Contacts</span>
                </div>
                <div className="mt-3 hidden lg:flex items-center gap-2">
                    <label className='cursor-pointer flex items-center gap-2'>
                        <input type="checkbox" className='bg-zinc-800' value={showOnlineUsers} onChange={(e)=>setShowOnlineUsers(e.target.checked)} />
                        <span className='text-sm'>Show Online Users</span>
                    </label>
                    <span className="text-xs text-zinc-500">{onlineUsers?.length > 0 ? onlineUsers?.length-1 : 0}</span>
                </div>
                <div className="overflow-y-auto w-full py-4">
                    {isUserLoading?<UserSkeletons length={users?.length}/>:(
                        filteredUsers?.map((user) => {
                            return (
                                <NavLink to={`/chat`} key={user._id} onClick={() => setSelectedUserFn(dispatch, user)} className={`w-full p-2 flex items-center gap-2 hover:bg-zinc-950/50 hover:rounded-lg ${selectedUser?._id === user._id ? "bg-zinc-950/75" : ""}`}>
                                    <div className="relative ">
                                        <img src={user.avatar || "/images/default.png"} alt={user.name} className='w-12 h-12 rounded-full object-cover' />
                                        {onlineUsers?.includes(user?._id) && (
                                            <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"></span>
                                        )
                                     } 
                                    </div>
                                    <div className=" text-left min-w-0">
                                        <div className="font-medium truncate">{user.name}</div>
                                        <div className="text-xs text-zinc-500 truncate">{user.email}</div>
                                    </div>
    
                                </NavLink>
                            )
                        })
                    )}
                </div>
            </div>
        </aside>
    )
}

export default SideComponent
