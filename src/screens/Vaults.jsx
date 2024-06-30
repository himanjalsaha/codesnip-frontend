import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Example from '../components/Card';
import Loader from '../components/Loader';
import ExampleWrapper from '../components/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nothing from '../assets/nothing.jpg';

const Vaults = () => {
  const { currentUser } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

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
      setHasLoaded(true);
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser.uid]);

  const debouncedFetchSnippets = useCallback(debounce(fetchSnippets, 500), [fetchSnippets]);

  useEffect(() => {
    // Fetch snippets immediately when component mounts
    debouncedFetchSnippets();
  }, [debouncedFetchSnippets]);

  const handleDeleteSnippet = async (snippetId) => {
    try {
      const response = await fetch(`https://codesnips-backend.onrender.com/snippets/${snippetId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete snippet');
      }
      setSnippets(snippets.filter(snippet => snippet.id !== snippetId));
      toast.success('Snippet deleted successfully');
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Failed to delete snippet');
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-900 text-white flex justify-center overflow-scroll">
      {loading && snippets.length === 0 ? (
        <p className="text-gray-400 flex justify-center items-center h-screen"><Loader /></p>
      ) : snippets.length === 0 ? (
        <div className="flex justify-center flex-col items-center h-screen">
          <img src={nothing} className=' size-28'/>
          <p className="text-xl text-gray-400">No snippets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map(snippet => (
            <div key={snippet.id} className=" rounded-lg">
              <Example
                filename={snippet.title}
                code={snippet.code}
                snippetId={snippet.id}
                language={snippet.language}
                onDelete={handleDeleteSnippet}
              />
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Vaults;
