import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you have an AuthContext for currentUser
import Example from '../components/Card';
import Loader from '../components/Loader';
import Edit from '../components/Edit';
import ExampleWrapper from '../components/Modal';

const Vaults = () => {
  const { currentUser } = useAuth(); // Assuming useAuth provides currentUser
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false); // State to track if snippets have been loaded

  // Debounce function to limit fetch frequency
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Function to fetch snippets
  const fetchSnippets = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://codesnips-backend.onrender.com/snippets');
      if (!response.ok) {
        throw new Error('Failed to fetch snippets');
      }
      const data = await response.json();
      const filteredSnippets = data.filter(snippet => snippet.createdBy === currentUser.uid);
      setSnippets(filteredSnippets);
      setHasLoaded(true); // Set hasLoaded to true after successful fetch
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser.uid]);

  // Debounced fetch function with 500ms delay
  const debouncedFetchSnippets = useCallback(debounce(fetchSnippets, 500), [fetchSnippets]);

  useEffect(() => {
    // Fetch snippets only if they haven't been loaded yet
    if (!hasLoaded) {
      debouncedFetchSnippets();
    }
  }, [debouncedFetchSnippets, hasLoaded]);

  // Function to handle snippet deletion

  return (
    <div
      className="flex flex-col items-center space-y-4 overflow-scroll overflow-x-hidden w-screen bg-gray-900"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(17%2c 24%2c 39%2c 1)'%3e%3c/rect%3e%3cpath d='M655.6 570.23C775.39 498.99 713.23 88.43 929.93 84.92 1146.63 81.41 1331.52 294.04 1478.59 297.72' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M303.77 671.64C441.93 660.04 532.79 380.4 774.78 378.89 1016.78 377.38 1010.29 448.89 1245.8 448.89 1481.3 448.89 1597.76 379.08 1716.81 378.89' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M497.35 571.72C673.03 537.47 753.25 91.87 1026.68 89.64 1300.1 87.41 1413.94 293.19 1556 296.84' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M172.01 576.87C293.73 573.35 395.59 392.61 622.79 392.38 850 392.15 848.18 462.38 1073.58 462.38 1298.97 462.38 1410.31 392.59 1524.36 392.38' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3cpath d='M324.84 592.7C482.42 586.09 584.96 334.34 895.62 323.97 1206.29 313.6 1313.17 103.93 1466.41 99.97' stroke='rgba(51%2c121%2c194%2c0.58)' stroke-width='2'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {loading ? (
        <p className="text-gray-400 flex justify-center items-center h-screen"><Loader /></p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map(snippet => (
            <div key={snippet.id} className="p-4 rounded-lg">
              <Example filename={snippet.title} code={snippet.code} snippetId={snippet.id} language={snippet.language} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Vaults;
