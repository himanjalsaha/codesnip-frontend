import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { CodeBlock, dracula } from "react-code-blocks";
import { CgClose } from "react-icons/cg";
import { themes, getSpanBgColor } from "../utils/Getspan";
import StaggeredDropDown from "./ThemeDropdown";
import SlideInNotifications from "./Toast";
import { ClipLoader } from "react-spinners";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ExampleWrapper = ({ code, language, filename, snippetId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  return (
    <div className="bg-slate-900">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gray-900 absolute bottom-0 hover:text-violet-300 right-0 flex items-center gap-2 text-white font-medium px-4 py-2 rounded-t rounded-r-none hover:opacity-90 transition-opacity"
      >
        <BsEye className=" size-4 " /> <span className=" text-nowrap">See More</span>
      </button>
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        code={code}
        language={language}
        filename={filename}
        setToastMessage={setToastMessage}
        iseditable={false}
      />
      <SlideInNotifications message={toastMessage} />
    </div>
  );
};

export const SpringModal = ({
  isOpen,
  setIsOpen,
  code,
  language,
  filename,
  setToastMessage,
  iseditable,
  snippetId,
}) => {
  const [selectedTheme, setSelectedTheme] = useState(dracula);
  const [updatedCode, setUpdatedCode] = useState(code);
  const [showPreview, setShowPreview] = useState(iseditable);
  const [exportingPDF, setExportingPDF] = useState(false); // State for PDF export loader
  const divRef = useRef(null); // Ref for the specific div you want to export

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(code).then(
      () => {
        setToastMessage("Code copied to clipboard!");
      },
      (err) => {
        setToastMessage("Failed to copy code.");
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
  };

  const preview = () => {
    setShowPreview(!showPreview);
  };

  // Function to export specific div content as PDF using html2canvas and jsPDF
  const exportToPDF = () => {
    setExportingPDF(true)
    const divElement = divRef.current;
    const scrollTop = divElement.scrollTop;
    divElement.scrollTop = 0;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    html2canvas(divElement, {
      scrollY: -window.scrollY,
      scale: 1,
      height: divElement.scrollHeight,
      windowHeight: divElement.scrollHeight,
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      let imgHeight = canvas.height * pdfWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`${filename}.pdf`);
      setExportingPDF(false); // Finish exporting
      divElement.scrollTop = scrollTop;
    }).catch(error => {
      console.error('Failed to export PDF:', error);
      setExportingPDF(false); // Finish exporting on error
      divElement.scrollTop = scrollTop;
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
            className="bg-gray-900 rounded-2xl overflow-hidden md:max-w-6xl max-w-3xl w-full md:h-[92%] h-[88%] p-6"
          >
            {iseditable && (
              <div className="text-2xl flex justify-center font-mono items-center text-white">
                Edit
              </div>
            )}
            <div className="flex gap-2 justify-center items-center">
              <StaggeredDropDown
                themes={themes}
                selectedTheme={selectedTheme}
                setSelectedTheme={handleThemeChange}
              />
              <button
                onClick={copyCodeToClipboard}
                className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded"
              >
                Copy Code
              </button>
              {iseditable && (
                <button
                  onClick={preview}
                  className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded"
                >
                  Preview
                </button>
              )}
              <button
                onClick={exportToPDF}
                className="bg-indigo-500 hover:bg-indigo-500 transition-colors text-white font-medium px-4 py-2 rounded"
                disabled={exportingPDF} // Disable button while exporting PDF
              >
                {exportingPDF ? <ClipLoader size={20} color="#fff" /> : "Export as PDF"}
              </button>
              <button
                onClick={handleClose}
                className="absolute right-0 top-0 p-5 hover:bg-white rounded-full text-violet-400 transition duration-300"
              >
                <CgClose className="size-6" />
              </button>
            </div>
            <div ref={divRef} className="md:h-full h-96  md:w-full w-full overflow-scroll scroll-smooth overflow-x-hidden place-content-center md:p-12 p-2 overflow-y-auto">
              <div className="flex justify-between items-center w-full px-3 bg-gray-800 rounded-t-2xl">
                <div className="flex space-x-2">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-gray-400 text-xs outline-none bg-gray-800">{filename}</p>
                <FiMousePointer className="text-transparent text-4xl" />
              </div>
             
                <div >
                  <CodeBlock
                    text={code}
                    language={language}
                    showLineNumbers={true}
                    theme={selectedTheme}
                    wrapLongLines={true}
                    highlight="1"
                  />
                  <div
                    className={`px-2 py-4 rounded-b-2xl ${getSpanBgColor(selectedTheme)}`}
                  />
                </div>
              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExampleWrapper;
