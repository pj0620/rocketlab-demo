import './App.css';
import { Alert, createTheme, Snackbar, ThemeProvider } from '@mui/material';
import Header from '../Header/Header';
import RocketNodeForm from '../RocketNodeForm/RocketNodeForm';
import RocketTree from '../RocketTree/RocketTree';
import { APIProxyService } from '../../services/api-proxy.service';
import { useEffect, useState } from 'react';
import { NewNodeRequest, RocketNodeI } from '../../types';

function App() {
  const apiProxyService = new APIProxyService();
  const [rocket, setRocket] = useState({} as RocketNodeI);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // not the best way...
  const [rocketFormKey, setRocketFormKey] = useState(1);

  useEffect(() => {
    apiProxyService.getFromPath('/')
      .then((resp) => setRocket(resp as RocketNodeI))
      .catch((e) => console.error('error getting rocket structure >> ', e));
  });

  const onNewNode = async (req:NewNodeRequest) => {
    try {
      const parsedVal = JSON.parse(req.value);
      if (!(typeof parsedVal === 'number' || typeof parsedVal === 'object')) {
        setShowError(true);
        return;
      }
      await apiProxyService.setFromPath(req.path, parsedVal);
      const resp = await apiProxyService.getFromPath('/');
      console.log('setting rocket to >>', resp);
      setRocket(resp as RocketNodeI);
      setRocketFormKey(rocketFormKey+1);
      setShowSuccess(true);
    }
    catch (e) {
      console.error('error adding node >> ', e);
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setShowSuccess(false);
    setShowError(false);
  };

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
          <RocketNodeForm newNodeHandler={onNewNode}/>
        </div>
        <div className="rocket-tree">
          {
            rocket ? <RocketTree key={rocketFormKey} rocket={rocket}/> : <h1 style={{color:'white'}}>Loading...</h1>
          }
        </div>
      </div>
      <Snackbar open={showSuccess} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Successfully Created Node
        </Alert>
      </Snackbar>
      <Snackbar open={showError} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Error Creating Node
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;
