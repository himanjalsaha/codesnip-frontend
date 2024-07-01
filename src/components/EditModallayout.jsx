import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { CodeBlock, dracula } from "react-code-blocks";
import { CgClose } from "react-icons/cg";
import StaggeredDropDown from "./ThemeDropdown";
import { themes, getSpanBgColor } from "../utils/Getspan";
import SlideInNotifications from "./Toast";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ClipLoader } from 'react-spinners';
export const EditModallayout = ({
    isOpen,
    setIsOpen,
    code: initialCode,
    language,
    filename: initialFilename,
    setToastMessage,
    iseditable,
    snippetId,
    fetchsnippet
  }) => {
    const [selectedTheme, setSelectedTheme] = useState(dracula);
    const [updatedCode, setUpdatedCode] = useState(initialCode);
    const [showPreview, setShowPreview] = useState(iseditable);
    const [updateFilename, setUpdateFilename] = useState(initialFilename);
    const [loading, setLoading] = useState(false); // State to manage loading state of update

    const handleThemeChange = (theme) => {
      setSelectedTheme(theme);
    };
  
    const copyCodeToClipboard = () => {
      navigator.clipboard.writeText(updatedCode).then(
        () => {
          toast.success("Code copied to clipboard!");
        },
        (err) => {
          toast.error("Failed to copy code.");
          console.error("Failed to copy code: ", err);
        }
      );
    };
  
    const handleClose = () => {
      setIsOpen(false);
    };
  
    const handleChange = (e) => {
      setUpdatedCode(e.target.value);
    };
  
    const handleFileChange = (e) => {
      setUpdateFilename(e.target.value);
      console.log(updateFilename);
    };
  
    const handleUpdate = () => {
      const updatedSnippet = {
        code: updatedCode,
        language,
        title: updateFilename,
      };

      setLoading(true); // Set loading state true on update start

      updateSnippet(updatedSnippet);
    };
  
    const preview = () => {
      setShowPreview(!showPreview);
    };
  
    const updateSnippet = (snippet) => {
      fetch(`https://codesnips-backend.onrender.com/snippets/${snippetId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippet),
      })
        .then((response) => response.json())
        .then((data) => {
          // Simulate delay for demonstration purposes
          setTimeout(() => {
            toast.success("Snippet updated successfully!");
            console.log("Snippet updated:", data);
    
            // Update local state with new values
            setUpdatedCode(data.code);
            setUpdateFilename(data.filename);
            fetchsnippet()
    
            setIsOpen(false); // Close the modal after successful update
            setLoading(false); // Set loading state false after update completes
          }, 1000); // Simulated delay of 1 second
        })
        .catch((error) => {
          toast.error("Failed to update snippet.");
          console.error("Error updating snippet:", error);
          setLoading(false); // Set loading state false on error
        });
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.5, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0.5, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl overflow-hidden max-w-6xl w-full h-[92%] p-6"
            >
              {iseditable && (
                <div className="text-2xl flex justify-center font-mono items-center text-white">
                  Edit
                </div>
              )}
              <div className="flex gap-2 justify-center items-center">
              
                <button
                  onClick={copyCodeToClipboard}
                  className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded"
                >
                  Copy Code
                </button>
                <StaggeredDropDown
                  themes={themes}
                  selectedTheme={selectedTheme}
                  setSelectedTheme={handleThemeChange}
                />
                {iseditable && (
                  <button
                    onClick={preview}
                    className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded"
                  >
                    Preview
                  </button>
                )}
                <button
                  onClick={handleUpdate}
                  className={`bg-green-500 hover:bg-green-600 transition-colors text-white font-medium px-4 py-2 rounded ${loading ? 'cursor-wait' : ''}`}
                  disabled={loading}
                >
                  {loading ? <ClipLoader size={20} color="#fff" /> : 'Update'}
                </button>
                <button
                  onClick={handleClose}
                  className="absolute right-0 top-0 p-5 hover:bg-white rounded-full text-violet-400 transition duration-300"
                >
                  <CgClose className="size-6" />
                </button>
              </div>
              <div className="h-full overflow-scroll scroll-smooth overflow-x-hidden place-content-center p-12 overflow-y-auto">
                <div className="flex justify-between items-center w-full px-3 bg-gray-800 rounded-t-2xl">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  </div>
                  <input
                    className="text-gray-400 text-xs outline-none bg-gray-800"
                    value={updateFilename}
                    onChange={handleFileChange}
                  />
                  <FiMousePointer className="text-transparent text-4xl" />
                </div>
                {showPreview ? (
                  <textarea
                    className="flex-grow w-full h-full mb-5 p-2 outline-none bg-gray-800 border border-gray-700 rounded-b-2xl text-white resize-none"
                    placeholder="Type or paste your code here..."
                    value={updatedCode}
                    onChange={handleChange}
                    spellCheck="false"
                    autoCorrect="off"
                    autoComplete="off"
                    required
                  />
                ) : (
                  <>
                    <CodeBlock
                      text={updatedCode}
                      language={language}
                      showLineNumbers={true}
                      theme={selectedTheme}
                    />
                    <div
                      className={`px-2 py-4 rounded-b-2xl ${getSpanBgColor(
                        selectedTheme
                      )}`}
                    />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
        <ToastContainer />
      </AnimatePresence>
    );
  };
  
  export default EditModallayout;
