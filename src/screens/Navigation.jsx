import React, { useState } from 'react';
import SideNav from '../components/SideNav';
import Home from './Home';
import Vaults from './Vaults';


const Navigation = () => {
  const [currentComponent, setCurrentComponent] = useState('CreateSnippet');

  const handleComponentChange = (componentName) => {
    setCurrentComponent(componentName);
  };

  return (
    <div className='flex h-screen flex-1'>
      <SideNav onComponentChange={handleComponentChange} />
   
     
        {currentComponent === 'CreateSnippet' && <Home />}
        {currentComponent === 'Vaults' && <Vaults />}
   

    </div>
  );
};

export default Navigation;
