import React, { useRef, useState } from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import { sendChatsFn } from '../../API/api';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast'
import { useSocket } from '../../SocketContext/Socket';

const MessageForm = () => {
    const [imagePreview, setImagePreview] = useState(null)
    const [text, setText] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const fileInputRef = useRef(null)
    const dispatch = useDispatch()
    const {sendMessage} = useSocket()
    const {selectedUser} = useSelector((state) => state.chat)
 
    const id = selectedUser?._id

    const handleFileInput = (e) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                setImagePreview(reader.result)
                setSelectedImage(reader.result)
            }
            reader.onerror = (error) => {
                console.error("Error converting image to Base64:", error);
            };
        }
        return
    }
    const handleRemoveImagePreview =() => {
            setImagePreview(null)
            setSelectedImage(null)
            if(fileInputRef.current){
                fileInputRef.current.value = null
            }
    }
    const handleSendMessage = async(e) => {
     
        e.preventDefault()
        if(!text.trim() && !imagePreview){
            return toast.error("Please enter a message or select an image")
        }
        try {
                await sendChatsFn(dispatch, id, {text,image:selectedImage})
                sendMessage(id, newMessage);
                setText("")
                setImagePreview(null)
                setSelectedImage(null)
                fileInputRef.current.value = null
                
        } catch (error) {
            toast.error(error.response.data.message)
           
        }

    }

    return (
        <section className=" w-full p-[1rem]">
            {/* If user sends an image content  */}
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative w-24 h-24">
                        <img src={imagePreview} alt="image" className="w-full h-full rounded-lg border border-base-300 object-cover" onClick={()=>window.open(imagePreview, '_blank')
                            } />
                        <button onClick={handleRemoveImagePreview} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center">
                            <HiOutlineXMark className='text-base-content text-lg' />
                        </button>
                    </div>
                </div>
            )}

            {/* If user sends a text content */}
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2  ">
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder='Type a message...' className="w-full rounded-full border border-base-300 bg-transparent px-4 py-2" />
                    <input type="file" accept='image/*' className="hidden" ref={fileInputRef} onChange={(e)=>handleFileInput(e)}/>
                    <button type='button' className=" p-2 rounded-full" onClick={()=>fileInputRef.current.click()} >
                        <CiImageOn className='size-6 md:size-8' />
                    </button>
                </div>
                <button type='submit' className='p-2 rounded-full' disabled={!text.trim() && !imagePreview}><IoMdSend className=' size-6 md:size-8' /></button>
            </form>
        </section>
    )
}

export default MessageForm
