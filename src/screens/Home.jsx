import React, { useState } from 'react';
import {
  CodeBlock,
  a11yDark,
  a11yLight,
  anOldHope,
  androidstudio,
  arta,
  atomOneDark,
  atomOneLight,
  codepen,
  dracula,
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
import { SiJavascript, SiPython, SiHtml5, SiReact } from 'react-icons/si'; // Importing icons for JavaScript, Python, and HTML
import { FaFileCode } from 'react-icons/fa'; // Generic file icon
import { FiEdit, FiChevronDown, FiTrash, FiShare, FiPlusSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

import StaggeredDropDown from '../components/ThemeDropdown';
import LanguageDropdown from '../components/LanguageDropdown';
import { useAuth } from '../context/AuthContext';
import { BiSolidSave } from 'react-icons/bi';
import { getSpanBgColor } from '../utils/Getspan';
import Loader from '../components/Loader';
import { ClipLoader } from 'react-spinners';
const Home = () => {
  const {currentUser} = useAuth()
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedTheme, setSelectedTheme] = useState(dracula);
  const [userCode, setUserCode] = useState('');
  const [fileName, setFileName] = useState('Enter your filename'); // State for the file name
  const [showPreview, setShowPreview] = useState(false); // State to toggle between textarea and code preview
  const [errorMessage, setErrorMessage] = useState('');
  const [loading , setLoading] = useState(false)

  const languages = [
    'bash', 'c', 'clojure', 'cpp', 'csharp', 'dart', 'elixir', 'elm', 'erlang', 'fsharp', 'graphql', 'go', 'groovy',
    'haskell', 'html', 'java', 'javascript', 'jsx', 'julia', 'kotlin', 'lisp', 'makefile', 'matlab', 'objectivec',
    'ocaml', 'php', 'python', 'ruby', 'rust', 'scala', 'sql', 'swift', 'tsx', 'typescript'
  ];

  const themes = {
    a11yDark, a11yLight, anOldHope, androidstudio, arta, atomOneDark, atomOneLight,
    codepen, dracula, far, github, googlecode, hopscotch, hybrid, irBlack, monoBlue,
    monokaiSublime, monokai, nord, noctisViola, obsidian, ocean, paraisoDark, paraisoLight,
    pojoaque, purebasic, railscast, rainbow, shadesOfPurple, solarizedDark, solarizedLight,
    sunburst, tomorrowNightBlue, tomorrowNightBright, tomorrowNightEighties, tomorrowNight,
    tomorrow, vs2015, xt256, zenburn,
  };

  const snippets = {
    javascript: `
const greeting = "Hello, World!";
console.log(greeting);
    `,
    jsx: `
const greeting = "Hello, World!";
console.log(greeting);
    `,
    python: `
def greeting():
    print("Hello, World!")

greeting()
    `,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>
    `,
  };

  const handleChange = (e) => {
    setUserCode(e.target.value);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const getFileIcon = (language) => {
    switch (language) {
      case 'javascript':
        return <SiJavascript />;
      case 'jsx':
        return <SiReact />;
      case 'python':
        return <SiPython />;
      case 'html':
        return <SiHtml5 />;
      default:
        return <FaFileCode />;
    }
  };

  const getFileExtension = (language) => {
    switch (language) {
      case 'bash':
        return ".sh";
      case 'c':
        return ".c";
      case 'clojure':
        return ".clj";
      case 'cpp':
        return ".cpp";
      case 'csharp':
        return ".cs";
      case 'dart':
        return ".dart";
      case 'elixir':
        return ".ex";
      case 'elm':
        return ".elm";
      case 'erlang':
        return ".erl";
      case 'fsharp':
        return ".fs";
      case 'graphql':
        return ".graphql";
      case 'go':
        return ".go";
      case 'groovy':
        return ".groovy";
      case 'haskell':
        return ".hs";
      case 'html':
        return ".html";
      case 'java':
        return ".java";
      case 'javascript':
        return ".js";
      case 'jsx':
        return ".jsx";
      case 'julia':
        return ".jl";
      case 'kotlin':
        return ".kt";
      case 'lisp':
        return ".lisp";
      case 'makefile':
        return ".mk";
      case 'matlab':
        return ".m";
      case 'objectivec':
        return ".m";
      case 'ocaml':
        return ".ml";
      case 'php':
        return ".php";
      case 'python':
        return ".py";
      case 'ruby':
        return ".rb";
      case 'rust':
        return ".rs";
      case 'scala':
        return ".scala";
      case 'sql':
        return ".sql";
      case 'swift':
        return ".swift";
      case 'tsx':
        return ".tsx";
      case 'typescript':
        return ".ts";
      default:
        return ".ext";
    }
  };
  

  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
  };
  const saveSnippet = async () => {
    if (!userCode.trim()) {
      setErrorMessage('Code cannot be empty.');
      return;
    }


    
    try {
      const snippetData = {
        title: `${fileName}`+`${getFileExtension(selectedLanguage)}`,
        code: userCode,
        language: selectedLanguage,
        createdBy: currentUser.uid,
      };
      setLoading(true)
  
      const response = await fetch('https://codesnips-backend.onrender.com/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippetData),
      });
      setLoading(false)
  
      if (!response.ok) {
        throw new Error('Failed to save snippet');
      }
   
  
      alert('Snippet saved successfully!');
      setErrorMessage(''); // Clear error message on successful save
    } catch (error) {
      console.error('Error saving snippet:', error);
      alert('Failed to save snippet');
    }
  };
  

  return (
    <div className="min-h-screen w-screen  p-20 flex-1 bg-gray-900 text-white flex flex-col overflow-scroll  ">
     <div className="mb-4 flex flex-col md:flex-row justify-between items-center md:items-center gap-2">

      <button
         onClick={togglePreview}
         className=" md:px-6 mx-12 p-2  rounded-md text-white h-9 bg-indigo-500 hover:bg-indigo-600  transition"
       >
         {showPreview ? 'Edit' : 'Preview'}
       </button>
  

<div className='flex gap-3'>
<button
          onClick={saveSnippet}

          disabled={!userCode.trim()} // Disable button if userCode is empty
          className={`px-6 flex items-center justify-center rounded-md text-white h-9 transition ${
            !userCode.trim() ? 'bg-gray-500 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600'
          }`}
        >
      
          {loading ? <ClipLoader size={20} color="#fff" />: <><BiSolidSave className='mx-2' /> Save</>}
        </button>
{showPreview &&
       <div className="flex    space-x-4">
       
       <StaggeredDropDown
         themes={themes}
         selectedTheme={selectedTheme}
         setSelectedTheme={handleThemeChange}
       />
     
     </div> }

     <LanguageDropdown
         languages={languages}
         selectedLanguage={selectedLanguage}
         setSelectedLanguage={setSelectedLanguage}
       />
</div>

  
  
      </div>
      <div className="flex w-full md:space-x-4 justify-center">
        <div className="md:w-full w-96  md:h-screen h-96 flex flex-col">
   
          {showPreview ? (
            <>
                <div className={`bg-black text-white px-2 py-1 rounded-t-2xl flex items-center justify-between `}>
              <div className="flex items-center space-x-2">
                <span className={`mx-2 top-3  relative rounded-md p-2 items-center flex gap-2 ${getSpanBgColor(selectedTheme)}`}>
                  {getFileIcon(selectedLanguage)} {fileName}{getFileExtension(selectedLanguage)}
                </span>
              </div>
              <div className="flex items-center space-x-2 mx-4">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <div className="h-2 w-2 bg-yellow-300 rounded-full"></div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <CodeBlock
              text={userCode || snippets[selectedLanguage]}
              language={selectedLanguage}
              showLineNumbers={true}
              theme={selectedTheme}
         
            />
            <div className={`  px-2 py-4 rounded-b-2xl ${getSpanBgColor(selectedTheme)} ` }/>
            </>
            
      
          ) : (
            <>
                   <div className="flex items-center justify-between bg-gray-800 p-2 rounded-t-2xl">
            <div className="flex items-center space-x-2 mx-2">
              {getFileIcon(selectedLanguage)}
              <input
                type="text"
                className="flex-grow bg-transparent text-white outline-none ml-2"
                placeholder="Enter your filename"
                value={fileName}
                onChange={handleFileNameChange}
              />
            </div>
            <div className="flex items-center space-x-2 mx-4">
              <div className="h-2 w-2 bg-red-500 rounded-full"></div>
              <div className="h-2 w-2 bg-yellow-300 rounded-full"></div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <textarea
              className="flex-grow p-2 outline-none  bg-gray-800 border border-gray-700 rounded-b-2xl text-white resize-none"
              placeholder="Type or paste your code here..."
              value={userCode}
              onChange={handleChange}
              spellCheck="false" // Disable spell checking
              autoCorrect="off" // Turn off auto-correct
              autoComplete="off" // Disable auto-complete
              required
            />
            </>
   
          )}
        </div>
        {/* <div className="w-1/2 h-screen overflow-auto rounded-2xl">
          <div className="relative h-full">
            <div className={`bg-black text-white px-2 py-1 rounded-t-2xl flex items-center justify-between `}>
              <div className="flex items-center space-x-2">
                <span className={`mx-2 top-3  relative rounded-md p-2 items-center flex gap-2 ${getSpanBgColor()}`}>
                  {getFileIcon(selectedLanguage)} {fileName} {getFileExtension(selectedLanguage)}
                </span>
              </div>
              <div className="flex items-center space-x-2 mx-4">
                <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                <div className="h-2 w-2 bg-yellow-300 rounded-full"></div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <CodeBlock
              text={userCode || snippets[selectedLanguage]}
              language={selectedLanguage}
              showLineNumbers={true}
              theme={selectedTheme}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Home;
