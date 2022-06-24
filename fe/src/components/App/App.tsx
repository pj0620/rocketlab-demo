import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import Header from '../Header/Header';
import RocketNodeForm from '../RocketNodeForm/RocketNodeForm';
import RocketTree from '../RocketTree/RocketTree';
import { APIProxyService } from '../../services/api-proxy.service';
import { useEffect, useState } from 'react';
import { RocketNodeI } from '../../types';

function App() {
  const apiProxyService = new APIProxyService();
  const [rocket, setRocket] = useState({} as RocketNodeI);

  useEffect(() => {
    apiProxyService.getFromPath('/')
      .then((resp) => setRocket(resp as RocketNodeI))
      .catch((e) => console.error('error getting rocket structure >> ', e));
  });

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (  
    <ThemeProvider theme={darkTheme}>
      <div className='main-content'>
        <Header />
        <div className="rocket-form">
          <RocketNodeForm/>
        </div>
        <div className="rocket-tree">
          {
            rocket?.Rocket ? <RocketTree rocket={rocket}/> : <h1 style={{color:'white'}}>Loading...</h1>
          }
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
