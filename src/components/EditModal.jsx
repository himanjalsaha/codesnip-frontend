import React from "react";
import { motion } from "framer-motion";
import { SpringModal } from "./Modal";
import { EditModallayout } from "./EditModallayout";

const EditModal = ({ isOpen, onClose , code , filename , language , snippetId ,fetchsnippet }) => {
  
  return (
    <>
    

   
        <EditModallayout isOpen={isOpen} setIsOpen={onClose}  code={code} filename={filename} language={language} iseditable={true} snippetId={snippetId} fetchsnippet={fetchsnippet} />
    </>

  );
};

export default EditModal;
