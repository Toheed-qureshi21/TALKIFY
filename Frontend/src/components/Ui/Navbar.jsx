import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdOutlineMessage } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaUser } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { logout } from "../../API/api.js";
import { FiMenu, FiX } from "react-icons/fi";
import { RiLoginBoxLine, RiUserReceived2Fill } from "react-icons/ri";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const currentSocket = useSelector((state) => state.auth.socket);

  const handleLogout = async () => {
    await logout(dispatch, currentSocket);
    navigate("/login");
    setIsOpen(false); 
  };

  const closeSidebar = () => setIsOpen(false);

  const NavLinks = ({ isMobile = false }) => (
    <>
      {!user ? (
        <div className={`flex flex-col ${isMobile ? "gap-6 mt-8 " : "md:flex-row gap-4"}`}>
          <NavLink to="/login" className="common-links flex items-center gap-2 " onClick={closeSidebar}>
            <RiLoginBoxLine /> Login
          </NavLink>
          <NavLink to="/signup" className="common-links flex items-center gap-2" onClick={closeSidebar}>
            <RiUserReceived2Fill /> Signup
          </NavLink>
        </div>
      ) : (
        <div className={`flex flex-col ${isMobile ? "gap-6" : "md:flex-row gap-4 text-lg"}`}>
          <NavLink to="/profile" className="common-links flex items-center gap-2">
            <FaUser /> Profile
          </NavLink>
          <button onClick={handleLogout} className="common-links flex items-center gap-2">
            <IoLogOutOutline className="text-xl" /> Logout
          </button>
          <div className="flex items-center">
            <img src={user?.avatar} alt={user?.name} className="w-12 h-12 rounded-full object-cover" />
          </div>
        </div>
      )}
    </>
  );

  return (
    <header className="bg-zinc-700 w-full shadow-lg border-b-2 border-white/10 py-6 px-10 sticky top-0 z-50 text-white">
      <div className="container md:px-[8%] flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-white font-bold">
          <h1 className="text-3xl">Talkify</h1>
          <MdOutlineMessage className="text-2xl mt-1" />
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavLinks />
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(true)} aria-label="Open menu">
          <FiMenu className="text-2xl" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed  z-40" onClick={closeSidebar}></div>

          {/* Sidebar Menu */}
          <div className="fixed top-0 left-0 h-full w-full bg-zinc-900 text-white shadow-lg z-50 p-6 flex flex-col space-y-6 transform transition-transform duration-300">
            {/* Close Button */}
            <button onClick={closeSidebar} className="absolute top-4 right-4 text-2xl" aria-label="Close menu">
              <FiX />
            </button>

            {/* Navigation Links */}
            <NavLinks isMobile={true} />
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
