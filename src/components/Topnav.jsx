import React, { useState } from 'react';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { FaAngleDown, FaTasks } from 'react-icons/fa';
import { BsPersonWorkspace } from 'react-icons/bs';
import { PiChatsTeardropLight } from 'react-icons/pi';
import { GiAbstract118 } from 'react-icons/gi';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook from your project

const Topnav = ({ onComponentChange }) => {
  const { currentUser } = useAuth(); // Access currentUser from useAuth hook
  const [open, setOpen] = useState(false); // State to manage the open/close state of the menu

  const handleComponentClick = (componentName) => {
    onComponentChange(componentName);
    setOpen(false); // Close the menu after clicking on a component
  };

  const getInitials = (name) => {
    if (!name) return '';
    const initials = name.split(' ').map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  const displayName = currentUser?.displayName || currentUser?.email || '';
  const initials = getInitials(displayName);

  return (
    <motion.div
      initial={{ backgroundColor: 'transparent' }}
      animate={{ backgroundColor: open ? '#1A202C' : 'transparent', height: open ? 'auto' : 80 }}
      className="flex items-center justify-between bg-gray-900 text-white h-20 px-6 shadow-md"
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setOpen(!open)}
        >
          <GiAbstract118 className="w-10 h-10 mr-2" />
        </motion.div>
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: open ? 1 : 0 }}
          className="font-extrabold mx-2 text-2xl"
        >
          CodeSnip
        </motion.span>
      </div>

      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleComponentClick('CreateSnippet')}
          className="hover:bg-indigo-500 rounded-lg px-4 py-2 flex items-center"
        >
          <FaTasks className="mr-2" />
          <span className={`${!open ? 'hidden' : 'block'}`}>Create Snippet</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleComponentClick('Vaults')}
          className="hover:bg-indigo-500 rounded-lg px-4 py-2 flex items-center ml-4"
        >
          <BsPersonWorkspace className="mr-2" />
          <span className={`${!open ? 'hidden' : 'block'}`}>Vaults</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleComponentClick('Share')}
          className="hover:bg-indigo-500 rounded-lg px-4 py-2 flex items-center ml-4"
        >
          <PiChatsTeardropLight className="mr-2" />
          <span className={`${!open ? 'hidden' : 'block'}`}>Share</span>
        </motion.button>
      </div>

      <div className="flex items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: open ? 1 : 0 }}
          className="size-12 rounded-full border-2 border-indigo-500 flex items-center justify-center bg-gray-300 text-indigo-500 font-bold mr-4"
        >
          {initials}
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: open ? 1 : 0 }}
          className="text-center"
        >
          <h4 className="text-lg text-white font-semibold">{currentUser.displayName || currentUser.email}</h4>
          <p className="text-gray-600">{currentUser.email}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Topnav;
