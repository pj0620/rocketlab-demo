import React from 'react';
import Logo from '../../images/logo.svg';

function App() {
  return (  
    <div className='w-full h-3rem flex flex-rox'>
      <img src={Logo} alt="React Logo" className='h-full pl-5 pt-4' />
      <h1 className='text-white h-full ml-5 vertical-align-middle square-font'>Rocket Manager</h1>
    </div>
  );
}

export default App;
