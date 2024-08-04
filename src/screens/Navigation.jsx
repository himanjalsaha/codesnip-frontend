import React, { useState } from 'react';
import SideNav from '../components/SideNav';
import Home from './Home';
import Vaults from './Vaults';
import Chat from './Chat';


const Navigation = () => {
  const [currentComponent, setCurrentComponent] = useState('CreateSnippet');

  const handleComponentChange = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <div className='flex overflow-x-hidden h-screen flex-1'>
      <SideNav onComponentChange={handleComponentChange} />
   
     
        {currentComponent === 'CreateSnippet' && <Home />}
        {currentComponent === 'Vaults' && <Vaults />}
        {currentComponent === 'chat' && <Chat />}
   

    </div>
  );
};

export default Navigation;
