import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import { checkLocalStorage } from './utils/set-interval'
import GaiaAutoSignin from './screens/authScreen/GaiaAutoSignin'

function App() {
  let interval = 60 * 60 * 1000;
  checkLocalStorage(interval);

  return (
    <>
      <main className='flex'>
        <BrowserRouter basename='/client-gui'>
          <GaiaAutoSignin />
        </BrowserRouter>
      </main>
    </>
  )
}

export default App;
