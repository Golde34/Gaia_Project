import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import { checkLocalStorage } from './utils/set-interval'
import GaiaAutoSignin from './screens/authScreen/GaiaAutoSignin'
import RenderRouter from './routers'

function App() {
  let interval = 60 * 60 * 1000;
  checkLocalStorage(interval);

  return (
    <>
      <main className='flex'>
        <BrowserRouter basename='/client-gui'>
          <RenderRouter />
        </BrowserRouter>
      </main>
    </>
  )
}

export default App;
