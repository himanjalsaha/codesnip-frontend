import React, { useState } from 'react';
import { FaAngleRight, FaTasks } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import { PiSparkleBold } from 'react-icons/pi';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from your project
import { LiaLaptopCodeSolid } from "react-icons/lia";
import { LuSparkle } from 'react-icons/lu';

// Modal Component for Logout Confirmation
const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-lg text-center font-semibold mb-4">Confirm Logout</h2>
        <p className="text-gray-600 mb-8">Are you sure you want to logout?</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 px-4 py-2 text-gray-600 rounded hover:bg-gray-200">Cancel</button>
          <button onClick={onLogout} className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">Logout</button>
        </div>
      </div>
    </div>
  );
};

const SideNav = ({ onComponentChange }) => {
  const { currentUser, logout } = useAuth(); // Access currentUser from useAuth hook
  const [open, setOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [activeButton, setActiveButton] = useState('CreateSnippet'); // State to track active button

  const handleComponentClick = (componentName) => {
    onComponentChange(componentName);
    setActiveButton(componentName); // Update active button state
  };

  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  const displayName = currentUser?.displayName || currentUser?.email || '';
  const initials = getInitials(displayName);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = () => {
    logout();
    closeModal(); // Close modal after logout
  };

  return (
    <div className={`border-r-2 fixed bg-gray-900 md:block border-white h-screen ${open ? 'w-80' : 'md:w-20 w-0'} duration-300 relative text-white`}>
      <div className="flex flex-col md:flex-row items-center justify-between text-white m-5">
        <div className="logo flex flex-row items-center">
          <LiaLaptopCodeSolid className={`w-10 h-10 duration-500 ${open ? 'rotate-[360deg]' : ''}`} />
          <span className={`font-extrabold mx-4 font-sans text-2xl ${!open ? 'scale-0' : ''} duration-300`}>CodeStore</span>
        </div>
        <button onClick={() => setOpen(!open)}>
          <FaAngleRight className={`w-12 h-12 absolute ${open ? 'rotate-180' : ''} bg-indigo-500 duration-500 md:rounded-full rounded-lg z-10 md:-right-6 -right-12 top-12`} />
        </button>
      </div>

      <div className="my-4">
        <div className="text-gray-200 gap-2 text-lg flex flex-col m-2 p-2">
          <button
            onClick={() => handleComponentClick('CreateSnippet')}
            className={`hover:bg-indigo-500 rounded-lg w-full p-2 flex items-center ${activeButton === 'CreateSnippet' ? 'md:bg-indigo-500 bg-none  text-white' : ''}`}
          >
            <FaTasks className="m-1" />
            <span className={`${!open ? 'hidden' : 'block'} duration-300 mx-2 md:mx-7`}>Create Snippet</span>
          </button>
          <button
            onClick={() => handleComponentClick('Vaults')}
            className={`hover:bg-indigo-500 rounded-lg w-full p-2 flex items-center ${activeButton === 'Vaults' ? 'md:bg-indigo-500 bg-none text-white' : ''}`}
          >
            <BsPersonWorkspace className="m-1" />
            <span className={`${!open ? 'hidden' : 'block'} duration-300 mx-2 md:mx-7`}>Your Vault</span>
          </button>
          <button
            onClick={() => handleComponentClick('chat')}
            className={`hover:bg-indigo-500 rounded-lg text-white w-full p-2 flex items-center relative ${activeButton === 'chat' ? 'md:bg-indigo-500 bg-none' : ''}`}
          >
            <PiSparkleBold className="m-1 text-white" />
            <span className={`${!open ? 'hidden' : 'block'} text-white duration-300 mx-2 md:mx-7`}>ai</span>
            <div className={`${!open ? 'hidden' : 'block'} relative inline-block`}>
              <div className="bg-gradient-to-r from-purple-400 to-blue-500 rounded-lg text-white px-2 py-1 text-xs">
                New
              </div>
              <div className="absolute inset-0 rounded-lg bg-transparent border-2 border-gradient-to-r from-purple-400 to-blue-500 pointer-events-none"></div>
            </div>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className={`absolute bottom-5 left-5 right-5 bg-gradient-to-r from-indigo-500 to-purple-500 p-6 rounded-lg shadow-xl transform transition-transform duration-300 ${!open ? 'scale-0' : 'scale-100'}`}>
        <div className="flex items-center justify-center flex-col text-white">
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center bg-gray-300 text-indigo-500 font-bold text-2xl">
            {initials}
          </div>
          <div className="text-center mt-4">
            <h4 className="text-lg font-semibold">{currentUser.displayName || currentUser.email}</h4>
            <p className="text-gray-200">{currentUser.email}</p>
          </div>
          <button
            className="bg-white text-indigo-500 font-medium mt-4 py-2 px-6 rounded-full shadow-lg hover:bg-indigo-100 transition-colors duration-300"
            onClick={openModal} // Open modal on click
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Modal */}
      <LogoutModal isOpen={showModal} onClose={closeModal} onLogout={handleLogout} />

    </div>
  );
};

export default SideNav;
