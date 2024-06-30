import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const StaggeredDropDown = ({ themes, selectedTheme, setSelectedTheme }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    
    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative z-10 flex items-center justify-center">
      <motion.div animate={open ? "open" : "closed"} className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-50 bg-indigo-500 hover:bg-indigo-500 transition-colors"
        >
          <span className="font-medium text-sm">
            Select Theme
          </span>
          <motion.span variants={iconVariants}>
            <FiChevronDown />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className={`flex flex-col gap-2 p-2 rounded-lg bg-gray-900 shadow-xl absolute top-[120%] left-[50%] w-80 overflow-y-auto max-h-80 ${open ? 'visible' : 'hidden'}`}
        >
          {Object.keys(themes).map((themeName) => (
            <motion.li
              key={themeName}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer px-4 py-2 text-sm text-white hover:text-indigo-500"
              onClick={() => {
                setSelectedTheme(themes[themeName]);
                setOpen(false); // Close dropdown on theme selection
              }}
            >
              <motion.span variants={textVariants} transition={{ duration: 0.2 }}>{themeName}</motion.span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {

  closed: {
    opacity: 0,
    y: -15,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
    },
  },
};

const textVariants = {
 
};
