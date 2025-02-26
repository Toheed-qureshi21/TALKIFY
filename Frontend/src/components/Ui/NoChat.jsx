import React from 'react'
import { HiOutlineChatBubbleBottomCenterText } from "react-icons/hi2";
const NoChat = () => {
  return (
        <div className="w-full flex flex-1 flex-col items-center justify-center p-[4rem]">
            <div className="text-center space-y-6">
                <div className="flex justify-center gap-4 mb-4 ">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-bounce">
                            <HiOutlineChatBubbleBottomCenterText className='text-primary text-4xl' />
                        </div>
                    </div>
                </div>
                <div className='space-y-3'>
                <h2 className='text-2xl font-semibold'> Select a Chat to Get Started</h2>
                <p className='text-zinc-400'> Pick a conversation from the sidebar or start a new one to begin chatting.</p>
                </div>
            </div>
        </div>
  )
}

export default NoChat
