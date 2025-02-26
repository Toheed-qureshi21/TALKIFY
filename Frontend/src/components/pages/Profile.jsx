import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera, FaEnvelope, FaUser } from "react-icons/fa";
import { updatePic } from '../../API/api';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../lib/utils.js';
const Profile = () => {

  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);


  async function handleImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (e) => {
      const base64Img = reader.result;
      setImage(base64Img);
      await updatePic({ profilePic: base64Img }, dispatch);
      navigate('/profile');
      window.location.reload();


    }
  }
  return (
    <main className='h-screen w-screen bg-zinc-800  flex justify-center pt-[5rem]'>
      {/* Card section */}
      <section className='w-[80%] lg:w-[50%] h-[41rem] bg-zinc-900 rounded-lg flex flex-col items-center text-white pt-[2rem] gap-2 sm:gap-4 '>
        <div className='text-center'>
          <h2 className='text-2xl font-bold'>Profile</h2>
          <p className='text-gray-400'>Your profile details</p>
        </div>
        <div className='relative'>
          <img className='size-36 object-cover rounded-full ' src={user?.avatar || `/images/avatar.jpg`} alt="" />
          <label className='p-1.5 rounded-full bg-gray-500 absolute bottom-1.5 left-[6rem] hover:cursor-pointer'>
            <FaCamera className='' />
            <input onChange={handleImage} type="file" name="profilePic" className='hidden' />
          </label>
        </div>
        <p className='text-gray-300 text-sm max-sm:'>Click on camera to update profile picture</p>
        <div className='flex flex-col gap-2 justify-start w-full px-4 sm:px-12 mt-[1.5rem]'>
          <p className='text-gray-300 text-sm flex  items-center gap-2'><FaUser /> Name</p>
          <p className='bg-zinc-700 rounded-md p-2 w-full' >{user?.name}</p>
        </div>
        <div className='flex flex-col gap-2 justify-start w-full px-4 sm:px-12 mt-[1rem]'>
          <p className='text-gray-300 text-sm flex  items-center gap-2'><FaEnvelope />Email</p>
          <p className='bg-zinc-700 rounded-md p-2 w-full' >{user?.email}</p>
        </div>
        <div className='w-full px-4 sm:px-12 mt-[0.9rem]'>
          <h3>Account Details</h3>
          <div className='flex justify-between items-center mt-[0.5rem]'>
            <p>Member Since</p>
            <p>{formatDate(user?.createdAt)}</p>
          </div>
          <div className='w-full mt-[0.9rem]'>
            <hr className='text-gray-500' />
          </div>
          <div className='flex justify-between items-center mt-[0.8rem]  '>
            <p>Account Status</p>
            <p className='text-green-500'>Active</p>
          </div>
        </div>
      </section>

    </main>

  )
}

export default Profile
