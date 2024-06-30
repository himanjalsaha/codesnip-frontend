import React, { useState } from 'react';
import { FaAngleRight, FaTasks } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import { PiChatsTeardropLight } from 'react-icons/pi';
import { GiAbstract118 } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from your project

const SideNav = ({ onComponentChange }) => {
  const { currentUser } = useAuth(); // Access currentUser from useAuth hook
  const [open, setOpen] = useState(true);

  const handleComponentClick = (componentName) => {
    onComponentChange(componentName);
  };

  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  const displayName = currentUser?.displayName || currentUser?.email || '';
  const initials = getInitials(displayName);

  return (
    <div className={`border-r-2 fixed bg-gray-900 hidden md:block border-white h-screen ${open ? 'w-80' : 'w-20'} duration-300 relative text-white`}>
      <div className="flex flex-row items-center justify-between text-white m-5">
        <div className="logo flex flex-row items-center">
          <GiAbstract118 className={`w-10 h-10 duration-500 ${open ? 'rotate-[360deg]' : ''}`} />
          <span className={`font-extrabold mx-4 font-sans text-2xl ${!open ? 'scale-0' : ''} duration-300`}>CodeSnip</span>
        </div>
        <button onClick={() => setOpen(!open)}>
          <FaAngleRight className={`w-12 h-12 absolute ${open ? 'rotate-180' : ''} bg-indigo-500 duration-500 rounded-full -right-6 top-12`} />
        </button>
      </div>

      <div className="my task">
        <div className="text-gray-200 text-lg flex items-center flex-col m-2 p-2">
          <button onClick={() => handleComponentClick('CreateSnippet')} className="hover:bg-indigo-500 rounded-lg w-full p-2 flex items-center">
            <FaTasks className="m-1" />
            <span className={`${!open ? 'hidden' : 'block'} duration-300 mx-7`}>Create Snippet</span>
          </button>
          <button onClick={() => handleComponentClick('Vaults')} className="hover:bg-indigo-500 rounded-lg w-full p-2 flex items-center">
            <BsPersonWorkspace className="m-1" />
            <span className={`${!open ? 'hidden' : 'block'} duration-300 mx-7`}>Vaults</span>
          </button>
          {/* <button onClick={() => handleComponentClick('Share')} className="hover:bg-indigo-500 rounded-lg w-full p-2 flex items-center">
            <PiChatsTeardropLight className="m-1" />
            <span className={`${!open ? 'hidden' : 'block'} duration-300 mx-7`}>Share</span>
          </button> */}
        </div>
      </div>

      {/* Profile Card */}
      <div className={`absolute bottom-5 left-5 right-5  bg-[#1f2937] p-6 rounded-lg shadow-lg ${!open ? 'scale-0' : ''}`}>
        <div className="flex items-center justify-center flex-col">
          <div className=" size-20  rounded-full border-2 border-indigo-500 flex items-center justify-center bg-gray-300 text-indigo-500 font-bold">
            {initials}
          </div>
          <div className=" text-center">
            <h4 className="text-lg  text-white font-semibold">{currentUser.displayName || currentUser.email}</h4>
            <p className="text-gray-600">{currentUser.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
