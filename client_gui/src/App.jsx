import React, { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import RenderRouter from './routers'
import { authenticate } from './api/store/actions/auth_service/userActions'
import { checkLocalStorage } from './utils/set-interval'
import Signin from './screens/authScreen/Signin'

function App() {
  let interval = 60 * 60 * 1000;
  checkLocalStorage(interval);
  const [ accessToken, setAccessToken ] = useState(null);

  useEffect(() => { 
    const checkGaiaConnected = async () => {
      const data = await authenticate();
      if (data) {
        setAccessToken(data);
      }
    }
    checkGaiaConnected();
    console.log("accessToken", accessToken);
  }, []);

  return (
    <>
    {accessToken ? (
      <main className='flex'>
        <BrowserRouter basename='/client-gui'>
          <RenderRouter />
        </BrowserRouter>
      </main> 
    ) : (
      <main className='flex'>
        <BrowserRouter basename='/client-gui'>
          <Signin accessToken={accessToken}/>
        </BrowserRouter>
      </main>
    )  
    }
    </>
  )
}

export default App;
