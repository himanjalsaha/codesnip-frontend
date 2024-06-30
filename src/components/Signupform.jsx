/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/

import { useState } from 'react';
import logo from '../assets/logo-dark.png'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
export default function Signupform() {
    const [username, setusername] = useState('');

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const {signup} = useAuth()
    const navigate=useNavigate()
     const handlesubmit = async (e)=>{
        e.preventDefault();
       try{
       await signup(email , password , username)
       navigate('/')
       
       } 
       catch(error){
        console.log(error);
       }

     }

    return (

      <>
      
        <div className="flex min-h-full bg-black flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto  w-auto"
         src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handlesubmit}>
            <div>
    <label for="username" class="block text-sm text-gray-500 dark:text-gray-300">username</label>

    <div class="relative flex items-center mt-2">
      

        <input type="username" placeholder="username"  onChange={(e) => setusername(e.target.value)} class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
    </div>
</div>
         <div>
    <label for="email" class="block text-sm text-gray-500 dark:text-gray-300">Email Address</label>

    <div class="relative flex items-center mt-2">
        <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mx-3 text-gray-400 dark:text-gray-500">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
        </span>

        <input type="email" placeholder="john@example.com" onChange={(e)=>setEmail(e.target.value)} class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-11 pr-5 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
    </div>
</div>
<div>
    <div class="flex items-center justify-between">
        <label for="password" class="block text-sm text-gray-500 dark:text-gray-300">Password</label>
        <a href="#" class="text-xs text-gray-600 hover:underline dark:text-gray-400">Forget Password?</a>
    </div>

    <div class="relative flex items-center mt-2">
        <button class="absolute right-0 focus:outline-none rtl:left-0 rtl:right-auto">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
            </svg>
        </button>

        <input type="password" placeholder="password"  onChange={(e)=>setPassword(e.target.value)} class="block w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-gray-200 rounded-lg pl-5 pr-11 rtl:pr-5 rtl:pl-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
    </div>
</div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign up
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
               Login
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }
  