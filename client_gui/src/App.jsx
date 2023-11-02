import React, { useState, userEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom'

import Dashboard from './views/Dashboard'
import RenderRouter from './routers'
// import Project from './views/Project'

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
