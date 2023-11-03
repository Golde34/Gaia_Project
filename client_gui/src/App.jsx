import React, { useState, userEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'

import RenderRouter from './routers'

function App() {
  return (
    <main className='flex'>
      <BrowserRouter basename='/client-gui'>
        <RenderRouter />
      </BrowserRouter>
    </main>
  )
}

export default App;
