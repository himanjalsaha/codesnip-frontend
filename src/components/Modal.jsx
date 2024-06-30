import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { CodeBlock, dracula } from 'react-code-blocks';
import { themes, getSpanBgColor } from "../utils/Getspan";
import StaggeredDropDown from "./ThemeDropdown";
import SlideInNotifications from "./Toast";
import {
  a11yDark,
  a11yLight,
  anOldHope,
  androidstudio,
  arta,
  atomOneDark,
  atomOneLight,
  codepen,
  far,
  github,
  googlecode,
  hopscotch,
  hybrid,
  irBlack,
  monoBlue,
  monokaiSublime,
  monokai,
  nord,
  noctisViola,
  obsidian,
  ocean,
  paraisoDark,
  paraisoLight,
  pojoaque,
  purebasic,
  railscast,
  rainbow,
  shadesOfPurple,
  solarizedDark,
  solarizedLight,
  sunburst,
  tomorrowNightBlue,
  tomorrowNightBright,
  tomorrowNightEighties,
  tomorrowNight,
  tomorrow,
  vs2015,
  xt256,
  zenburn,
} from 'react-code-blocks';
import { CgClose, CgCross } from "react-icons/cg";
import { FcCancel } from "react-icons/fc";

const ExampleWrapper = ({ code, language, filename }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className="bg-slate-900">
      <button
        onClick={() => setIsOpen(true)}
        className=" bg-gradient-to-b absolute  bottom-0 right-0  flex items-center gap-2 from-[#6366F1] to-violet-300 text-white font-medium px-4 py-2 rounded-t rounded-r-none hover:opacity-90 transition-opacity">
        <BsEye /> See More
      </button>
      <SpringModal 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        code={code} 
        language={language} 
        filename={filename} 
        setToastMessage={setToastMessage}
      />
      <SlideInNotifications message={toastMessage} />
    </div>
  );
};

const SpringModal = ({ isOpen, setIsOpen, code, language, filename, setToastMessage }) => {
  const [selectedTheme, setSelectedTheme] = useState(dracula);
  
  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setToastMessage("Code copied to clipboard!");
    }, (err) => {
      setToastMessage("Failed to copy code.");
      console.error("Failed to copy code: ", err);
    });
  };

  const handleclose = () => {
    setIsOpen(false)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0.5, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className=" bg-gray-900 rounded-2xl overflow-hidden max-w-6xl w-full h-[92%] p-6 "
          >
            <div className="flex gap-2 justify-center items-center">
              <StaggeredDropDown
                themes={themes}
                selectedTheme={selectedTheme}
                setSelectedTheme={handleThemeChange}
              />
              <button
                onClick={copyCodeToClipboard}
                className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded  "
              >
                Copy Code
              </button>
              <button onClick={handleclose} className="absolute right-0 top-0 p-5 hover:bg-white rounded-full text-violet-400 transition duration-300">< CgClose className=" size-6"/></button>
            </div>
            <div className="h-full overflow-scroll scroll-smooth overflow-x-hidden place-content-center p-12 overflow-y-auto">
              <div className="flex justify-between items-center w-full px-3 bg-gray-800 rounded-t-2xl">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-gray-400 text-xs">{filename}</p>
                <FiMousePointer className="text-transparent text-4xl" />
              </div>
              <CodeBlock
                text={code}
                language={language}
                showLineNumbers={true}
                theme={selectedTheme} // Set the theme as needed
              />
              <div className="flex justify-end"></div>
              <div className={`px-2 py-4 rounded-b-2xl ${getSpanBgColor(selectedTheme)}`} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExampleWrapper;
