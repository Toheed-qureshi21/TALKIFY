import React from "react";
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearFormData, updateFormData } from '../../slices/formSlice';
import { authSuccess } from "../../slices/authSlice";
import { TiEye } from "react-icons/ti";
import { FaEyeSlash } from "react-icons/fa";

const AuthForm = ({
  showNameField,
  submitText,
  redirectText,
  redirectLink,
  redirectLinkText,
  onSubmit,
  image,
  authText,
  loading,
  isGuest,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.form.formData);
  const [showPassword, setShowPassword] = useState(false);
 


  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log(`${submitText} Data Submitted:`, formData);
    }
    dispatch(clearFormData({clearName: showNameField}));
  };

  const handleGuestLogin = async() => {
    const formData = {
      email: "guest@example.com",
      password: "000000",
    }
    dispatch(updateFormData(formData));
  }

  return (
    <main className="min-h-screen grid xl:grid-cols-2 place-items-center bg-zinc-800 text-white max-sm:px-4">
      {/* Form Section */}
      <form 
        onSubmit={handleSubmit} 
        className="space-y-6 flex flex-col w-full max-w-md shadow-xl bg-zinc-900 p-12 rounded-md max-xl:order-2 "
      >
        {/* Name Field (Only for SignUp) */}
        {showNameField && (
          <div className="relative">
            <input
              type="text"
              placeholder=" "
              required
              className="peer block w-full border border-gray-300 rounded-md pl-10 pt-4 pb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent text-white"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              autoComplete="off"
            />
            <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <label className="absolute left-10 px-1 bg-zinc-900 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 
                     -top-2 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs">
              Full Name
            </label>
          </div>
        )}

        {/* Email Field */}
        <div className="relative">
          <input
            type="email"
            placeholder=" "
            required
            className="peer block w-full border border-gray-300 rounded-md pl-10 pt-4 pb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent text-white"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            autoComplete="off"
          />
          <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <label className="absolute left-10 px-1 bg-zinc-900 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 
                     -top-2 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs">
            Email
          </label>
        </div>

        {/* Password Field */}
        <div className="relative">
          <input
            type={showPassword?"text":"password"}
            placeholder=" "
            required
            className="peer block w-full border border-gray-300 rounded-md pl-10 pt-4 pb-4 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-transparent text-white"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            autoComplete="off"
          />
          <FaLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
          <label className="absolute left-10 px-1 bg-zinc-900 transition-all duration-200 ease-in-out pointer-events-none text-gray-500 
                     -top-2 text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs">
            Password
          </label>
         <button className="absolute bottom-[1.2rem] right-3 text-xl" onClick={()=>setShowPassword((prev)=>!prev)}>{showPassword?<FaEyeSlash />:<TiEye />}</button>
      
        </div>


   
        <button type="submit" className="bg-yellow-300 py-2 text-black rounded-md hover:cursor-pointer hover:bg-yellow-500">
          {loading?"Loading...":submitText}
        </button>
        {
          isGuest && (
            <button onClick={handleGuestLogin} type="button" className="bg-red-400 py-2 text-black rounded-md hover:cursor-pointer hover:bg-red-500">
              {loading?"Loading...":"Login as Guest"}
            </button>
          )
        }

        <p className="text-center text-md">
          {redirectText}{" "}
          <NavLink to={redirectLink} className="text-yellow-300 hover:text-yellow-500">
            {redirectLinkText}
          </NavLink>
        </p>
      </form>

        <section className="flex flex-col justify-center items-center max-xl:order-1">
        <p className="text-2xl font-bold uppercase text-center mx-[10%]">
         {authText}
        </p>
        <div className="w-[20rem] lg:w-[30rem]">
          <img src={image} alt="Auth Illustration" className="w-full h-full object-cover mix-blend-difference" />
        </div>
      </section>
    </main>
  );
};

export default AuthForm;
