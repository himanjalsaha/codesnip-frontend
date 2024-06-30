import React, { useState } from "react";
import { FiMousePointer } from "react-icons/fi";
import Edit from "./Edit";
import ExampleWrapper from "./Modal";

const Example = ({ filename, code , snippetId , language }) => {
  return (
    <div className="grid w-full place-content-center px-4 py-12 ">
   
      <CodeCard filename={filename} code={code}  snippetId={snippetId} language={language}/>
    </div>
  );
};

const CodeCard = ({ filename, code , snippetId , language }) => {
  const [showMore, setShowMore] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newFilename, setNewFilename] = useState(filename);
  const [newCode, setNewCode] = useState(code);



  const maxCodeLength = 200; // Maximum characters to show initially
  const displayCode = showMore ? code : code.substring(0, maxCodeLength);

  const handleDeleteSnippet = async () => {
    try {
      const response = await fetch(`https://codesnips-backend.onrender.com/snippets/${snippetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete snippet');
      }
     
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };


  const handleEdit = async () => {
    try {
      const response = await fetch(`https://codesnips-backend.onrender.com/snippets/${snippetId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add any authorization headers if needed
        },
        body: JSON.stringify({
          filename: newFilename,
          code: newCode,
          language: language // Include other fields you want to update
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update snippet');
      }
      // Optionally, you can update state or handle success message here
      setEditing(false);
    } catch (error) {
      console.error('Error updating snippet:', error);
    }
  };



  return (
    <div className="relative h-96 w-72 rounded-xl bg-gradient-to-br from-[#6366F1] to-violet-300">
          <div className=" flex flex-row-reverse">
          <Edit onDelete={() => handleDeleteSnippet()} />
          </div>
      <div className="absolute inset-4 rounded-xl bg-gray-900 shadow-lg">
        <div className="flex justify-between items-center w-full px-3 bg-gray-800 rounded-t-lg">
            
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          </div>
          <p className="text-gray-400 text-xs">{filename}</p>
          <FiMousePointer className="text-transparent text-4xl" />
          {/* Place Edit component here to align on the right */}
        
        </div>
        <div className="w-full p-4 flex-[0.9] bg-gray-900 text-white font-mono text-sm overflow-auto rounded-b-lg">
          <pre className="whitespace-pre-wrap">{displayCode}...</pre>
          {/* {code.length > maxCodeLength && (
          
          )} */}
          <div className=" absolute bottom-0 right-0">
          <ExampleWrapper  code={code} language={language} filename={filename}/>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Example;
