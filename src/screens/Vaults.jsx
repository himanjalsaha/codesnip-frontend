import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Example from '../components/Card';
import Loader from '../components/Loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import nothing from '../assets/nothing.png';
import { motion, AnimatePresence } from 'framer-motion';

const Vaults = () => {
  const { currentUser } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(false);

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
    } catch (error) {
      console.error('Error fetching snippets:', error);
    } finally {
      setLoading(false);
    }
  }, [currentUser.uid]);

  const debouncedFetchSnippets = useCallback(debounce(fetchSnippets, 500), [fetchSnippets]);

  useEffect(() => {
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
    <div className="min-h-screen w-screen flex-1 overflow-x-hidden bg-gray-900 text-white flex justify-center overflow-scroll">
      {loading && snippets.length === 0 ? (
        <p className="text-gray-400 flex justify-center items-center h-screen"><Loader /></p>
      ) : snippets.length === 0 ? (
        <div className="flex justify-center flex-col items-center h-screen">
          <img src={nothing} className='h-80 w-96' />
          <p className="text-xl text-gray-400">No snippets found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {snippets.map(snippet => (
              <motion.div
                key={snippet.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="rounded-lg"
              >
                <Example
                  filename={snippet.title}
                  code={snippet.code}
                  snippetId={snippet.id}
                  language={snippet.language}
                  onDelete={handleDeleteSnippet}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Vaults;
