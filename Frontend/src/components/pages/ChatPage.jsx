import React from 'react'
import SideComponent from '../Ui/SideComponent'
import { useSelector } from 'react-redux'
import NoChat from '../Ui/NoChat'
import ChatContainer from '../Ui/ChatContainer'
const ChatPage = () => {

    const {selectedUser} = useSelector((state)=>state.chat)

  return (
    // ! Chat page consists of 2 components
    // ! 1. Sidebar ✅
    // ! 2. Chat Container    

    <main className='w-screen h-screen  bg-zinc-900/80 text-white'>

      <section className='flex items-center  justify-center pt-[2rem]   px-[2.5rem]'>
        <div className="bg-zinc-800/75 rounded-lg shadow-lg w-full max-w-8xl h-[calc(100vh-10rem)]">
            <div className="flex h-full rounded-md overflow-hidden">

              <SideComponent/>
              <div className='sm:flex bg-zinc-800 my-section w-full h-full hidden hide-scrollbar'>
                {selectedUser ? <ChatContainer/>:<NoChat/>}
              </div>
            </div>

        </div>

      </section>

    </main>
  )
}

export default ChatPage

