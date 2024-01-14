import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import RenderRouter from './routers'
import { authenticate } from './api/store/actions/auth_service/userActions'
import { checkLocalStorage } from './utils/set-interval'
import Signin from './screens/authScreen/Signin'
import { useSelector } from 'react-redux'
import GaiaAutoSignin from './screens/authScreen/GaiaAutoSignin'

function App() {
  let interval = 60 * 60 * 1000;
  checkLocalStorage(interval);
  // const [ accessToken, setAccessToken ] = useState(null);


  // const didAuthenticateRef = useRef();

  // useEffect(() => { 
  //   if (didAuthenticateRef.current) return;

  //   const checkGaiaConnected = async () => {
  //     const data = await authenticate();
  //     if (data) {
  //       setAccessToken(data);
  //     }
  //   }
  //   checkGaiaConnected();

  //   didAuthenticateRef.current = true;
  // }, []);

  return (
    <>
      <main className='flex'>
        <BrowserRouter basename='/client-gui'>
          {/* <GaiaAutoSignin /> */}
          <RenderRouter />
        </BrowserRouter>
      </main>
    </>
  )
}

export default App;
