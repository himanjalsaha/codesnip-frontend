import React, { useState } from "react";
import { motion } from "framer-motion";
import { BiDotsVerticalRounded } from "react-icons/bi";
import EditModal from "./EditModal";
import { FiEdit, FiShare, FiTrash } from "react-icons/fi";
import { set } from "firebase/database";

const Edit = ({ onDelete , code , filename ,language , snippetId , fetchsnippet }) => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showbutton , setshowbutton] = useState(true)


  const handleEditClick = () => {
    setshowbutton(false)
    setOpen(false);
    setModalOpen(true);
 
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setshowbutton(true)
  };

  return (
    <div className={`${showbutton && "z-10"} flex items-center justify-center`} >
      
      <motion.div animate={open ? "open" : "closed"}  className=" relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex  items-center  gap-2 px-3 py-1  rounded-lg text-indigo-50 bg-transparent"
          style={{ zIndex: 10 }} // Ensure the dropdown button is above other content
        >
          <span className="font-medium text-2xl ">
            <BiDotsVerticalRounded  className=""/>
          </span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%", zIndex: 9 }} // Adjust zIndex to keep it below modal
          className="flex flex-col gap-2 p-2 text-white rounded-lg bg-gray-900 shadow-xl absolute top-[120%] left-[50%] w-48 overflow-hidden"
        >
          <Option setOpen={setOpen} Icon={FiEdit} text="Edit" onClick={handleEditClick} />
        
          <Option setOpen={setOpen} Icon={FiTrash} text="Remove" onClick={onDelete} />
        </motion.ul>
      </motion.div>
      
      <EditModal isOpen={modalOpen} onClose={handleCloseModal} code={code} filename={filename} language={language} snippetId={snippetId} />
    </div>
  );
};

const Option = ({ text, Icon, setOpen, onClick }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={() => {
        setOpen(false);
        onClick && onClick();
      }}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-white hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default Edit;

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

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
