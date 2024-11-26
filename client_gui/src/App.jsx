import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import { checkLocalStorage } from './kernels/utils/set-interval'
import RenderRouter from './kernels/routers'
import { CookiesProvider } from 'react-cookie'
import { WebSocketProvider } from './kernels/context/WebSocketContext'

function App() {
  let interval = 60 * 60 * 1000;
  checkLocalStorage(interval);

  return (
    <>
      <CookiesProvider>
        <main className='flex'>
          <WebSocketProvider>
            <BrowserRouter basename='/client-gui'>
              <RenderRouter />
            </BrowserRouter>
          </WebSocketProvider>
        </main>
      </CookiesProvider>
    </>
  )
}

export default App;
